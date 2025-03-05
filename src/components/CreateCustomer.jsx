import React, { useState, useEffect, useContext, useRef } from 'react';
import { Context } from '../js/store/appContext';
import { useNavigate } from 'react-router-dom';
import CardFront from './CardFront';
import './CreateCustomer.css';

const initialCustomerData = {
  name: '',
  lastname_f: '',
  lastname_m: '',
  // agregar campo a bd
  cve: '',
  curp: '',
  entidad_nac: '',
  municipio_nac: '',
  org: '',
  address_street: '',
  address_number: '',
  colonia: '',
  postal_code: '',
  localidad: '',
  entidad_dir: '',
  municipio_dir: '',
  email: '',
  cell_num: '',
  instagram: '',
  facebook: '',
  password_hash: '',
  url_image_self_photo: '',
  url_image_card_front: '',
  url_image_card_back: '',
  tel_num: '',
  comment: '',
};

const CreateCustomer = () => {
  const [customerData, setCustomerData] = useState(() => {
    const saved = localStorage.getItem('customerData');
    return saved ? JSON.parse(saved) : initialCustomerData;
  });
  const [loadingSelfPhoto, setLoadingSelfPhoto] = useState(false);
  const [clearAfterSubmit, setClearAfterSubmit] = useState(true);
  const [localImage, setLocalImage] = useState(''); // preview local para self photo
  const [updateMode, setUpdateMode] = useState(false);
  const [customerDeudor, setCustomerDeudor] = useState(true); // true por default para permitir alta
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const formContainerRef = useRef(null);
  const curpInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('customerData', JSON.stringify(customerData));
  }, [customerData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Función para verificar el CURP y actualizar estados
  const verifyCurp = async () => {
    if (customerData.curp.trim() !== '') {
      try {
        const { deudor, exists } = await actions.checkCustomerExists(customerData.curp);
        console.log("Resultado de checkCustomerExists:", { deudor, exists });
        if (exists) {
          setUpdateMode(true);
          setCustomerDeudor(deudor);
          return { exists, deudor };
        } else {
          setUpdateMode(false);
          setCustomerDeudor(true);
          return { exists: false, deudor: true };
        }
      } catch (error) {
        console.error("Error al verificar el CURP:", error);
        setUpdateMode(false);
        setCustomerDeudor(true);
        return { exists: false, deudor: true };
      }
    } else {
      setUpdateMode(false);
      setCustomerDeudor(true);
      return { exists: false, deudor: true };
    }
  };

  // Se sigue usando en el onBlur
  const handleCurpBlur = async () => {
    await verifyCurp();
  };

  const resizeImage = (file, maxWidth, maxHeight, quality = 0.9) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxWidth;
              height = maxWidth / aspectRatio;
            } else {
              height = maxHeight;
              width = maxHeight * aspectRatio;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(blob => {
            resolve(blob);
          }, "image/jpeg", quality);
        };
        img.onerror = error => reject(error);
      };
      reader.onerror = error => reject(error);
    });
  };

  // Handler para subir imagen a Google Drive usando el action de flux
  const uploadImageToDriveHandler = async (e, imageField, setLoading) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoading(true);
    try {
      const file = files[0];
      const resizedImage = await resizeImage(file, 98, 121, 0.9);
      // Generar preview local a partir del blob redimensionado
      const localPreviewUrl = URL.createObjectURL(resizedImage);
      const url = await actions.uploadImageToDrive(resizedImage);
      console.log("Imagen subida a Google Drive:", url);
      if (url.startsWith("https://drive.google.com/uc?id=")) {
        const parts = url.split('?');
        if (parts.length < 2) throw new Error("Formato de URL no esperado");
        const query = parts[1];
        const queryParts = query.split('=');
        if (queryParts.length !== 2) throw new Error("No se pudo extraer el ID de la imagen");
        const fileId = queryParts[1];
        const customUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=view`;
        setCustomerData(prev => ({
          ...prev,
          [imageField]: customUrl
        }));
        setLocalImage(localPreviewUrl);
      } else {
        alert("Error: La URL devuelta no es válida.");
      }
    } catch (error) {
      console.error('Error uploading image to Drive:', error);
      alert("Error al subir la imagen.");
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setCustomerData(initialCustomerData);
    localStorage.removeItem('customerData');
    setUpdateMode(false);
    setCustomerDeudor(true);
    setLocalImage('');
    if (formContainerRef.current) {
      formContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (customerData.curp && customerData.curp.length !== 18) {
      alert("El campo CURP debe estar completo y ser válido.");
      return;
    }
    
    // Forzamos la verificación del CURP en el submit
    const { exists, deudor } = await verifyCurp();
    
    // Si existe y el usuario no es deudor, bloqueo el submit.
    if (exists && !deudor) {
      alert("Usuario pago. No permite actualizaciones.");
      return;
    }
    
    console.log("Submitting customer data:", customerData);
    try {
      let result = await actions.createCustomer(customerData);
      if (result) {
        alert(`Socio ${result} con éxito.`);
        if (clearAfterSubmit) {
          resetFields();
        }
      } else {
        actions.logout();
        navigate('/redirect-home');
      }
      if (formContainerRef.current) {
        formContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearFields = () => {
    if (window.confirm("¿Estás seguro de que deseas limpiar todos los campos?")) {
      resetFields();
    }
  };

  const handleToggleClear = () => {
    setClearAfterSubmit(prev => !prev);
  };

  let curpMessage = "";
  if (!customerData.curp.trim()) {
    curpMessage = "Nota: Si el CURP ya se registró previamente, se actualizarán los datos.";
  } else if (updateMode && !customerDeudor) {
    curpMessage = "Usuario pago. No permite actualizaciones";
  } else if (updateMode) {
    curpMessage = "El CURP ingresado existe. Se realizará una actualización.";
  } else {
    curpMessage = "Nota: CURP nuevo. Se procede a crear usuario.";
  }

  return (
    <div className="create-customer-container">
      <h1 style={{color:"#F2F2F2", fontWeight:"bolder"}}>Alta de registros</h1>
      <div className='section'>
        <div style={{marginRight:"5%"}}>
          <div className="carnet-preview">
            <CardFront data={customerData} localImage={localImage} />
          </div>
        </div>
        <div style={{width:"100%", backgroundColor:"#F2F2F2", padding:"10px", borderRadius: '8px'}}>
          <div ref={formContainerRef} style={{ height: '400px', overflowY: 'auto', padding: '10px' }}>
            <form onSubmit={handleSubmit} className="customer-form">
              <h3>Datos Generales:</h3>
              <div className="form-group">
                <label>CURP:</label>
                <input
                  ref={curpInputRef}
                  type="text"
                  name="curp"
                  value={customerData.curp}
                  onChange={handleChange}
                  onBlur={handleCurpBlur}
                  required
                />
                <small className="curp-info">{curpMessage}</small>
              </div>
              <div className="form-group">
                <label>Nombre:</label>
                <input type="text" name="name" value={customerData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Apellido Paterno:</label>
                <input type="text" name="lastname_f" value={customerData.lastname_f} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Apellido Materno:</label>
                <input type="text" name="lastname_m" value={customerData.lastname_m} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Clave de Elector:</label>
                <input type="text" name="cve" value={customerData.cve} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Estructura:</label>
                <select name="org" value={customerData.org} onChange={handleChange}>
                  <option>Seleccione una opción</option>
                  <option value="Comite Ejecutivo Nacional">Comite Ejecutivo Nacional</option>
                  <option value="Confederacion Nacional Agronomica">Confederacion Nacional Agronomica</option>
                  <option value="SAF">SAF</option>
                  <option value="Conmujer">Conmujer</option>
                  <option value="Vanguardia Juvenil Agrarista">Vanguardia Juvenil Agrarista</option>
                  <option value="Ramas de produccion">Ramas de produccion</option>
                  <option value="Comite Ejecutivo Estatal">Comite Ejecutivo Estatal</option>
                  <option value="Comite Municipales Campesinos">Comite Municipales Campesinos</option>
                  <option value="Comite de Base Campesino">Comite de Base Campesino</option>
                  <option value="Miembro Activo">Miembro Activo</option>
                </select>
                <hr />
                <h3>Dirección:</h3>
              </div>
              <div className="form-group">
                <label>Calle:</label>
                <input type="text" name="address_street" value={customerData.address_street} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Número:</label>
                <input type="text" name="address_number" value={customerData.address_number} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Colonia:</label>
                <input type="text" name="colonia" value={customerData.colonia} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Código Postal:</label>
                <input type="text" name="postal_code" value={customerData.postal_code} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Localidad:</label>
                <input type="text" name="localidad" value={customerData.localidad} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Entidad:</label>
                <input type="text" name="entidad_dir" value={customerData.entidad_dir} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Municipio:</label>
                <input type="text" name="municipio_dir" value={customerData.municipio_dir} onChange={handleChange} />
              </div>
              <hr />
              <h3>Datos de contacto:</h3>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={customerData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Celular:</label>
                <input type="text" name="cell_num" value={customerData.cell_num} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Teléfono fijo:</label>
                <input type="text" name="tel_num" value={customerData.tel_num} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Instagram:</label>
                <input type="text" name="instagram" value={customerData.instagram} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Facebook:</label>
                <input type="text" name="facebook" value={customerData.facebook} onChange={handleChange} />
              </div>
              {/* Sección de subida de imágenes */}
              <div className="form-group file-input">
                <label>Foto de Credencial:</label>
                <input type="file" onChange={(e) => uploadImageToDriveHandler(e, 'url_image_self_photo', setLoadingSelfPhoto)} />
                {loadingSelfPhoto && <span>Cargando imagen...</span>}
                {localImage && (
                  <img src={localImage} alt="Self" className="preview-image" />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <div className="toggle-group">
        <label htmlFor="clearToggle">Borrar campos al terminar de crear/actualizar?:</label>
        <br />
        <input
          type="checkbox"
          id="clearToggle"
          checked={clearAfterSubmit}
          onChange={handleToggleClear}
        />
        <span>{clearAfterSubmit ? "Activado" : "  Marca para activar el borrado automático."}</span>
      </div>
      <div className="button-group mb-3">
        {(!updateMode || (updateMode && customerDeudor)) && (
          <button type="submit" onClick={handleSubmit} className="submit-btn">
            {updateMode ? "Actualizar Socio" : "Crear Socio"}
          </button>
        )}
        <button type="button" className="clear-btn" onClick={handleClearFields}>
          Limpiar campos
        </button>
      </div>
    </div>
  );
};

export default CreateCustomer;
