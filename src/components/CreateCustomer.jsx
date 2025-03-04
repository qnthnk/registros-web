import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../js/store/appContext';
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
  const [loadingCardFront, setLoadingCardFront] = useState(false);
  const [loadingCardBack, setLoadingCardBack] = useState(false);
  const [clearAfterSubmit, setClearAfterSubmit] = useState(false);
  const [localImage, setLocalImage] = useState(''); // preview local para self photo
  const [updateMode, setUpdateMode] = useState(false);
  const { actions } = useContext(Context);

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

  const handleCurpBlur = async () => {
    console.log("handleCurpBlur entró con valor , ", customerData.curp);
    if (customerData.curp.trim() !== '') {
      try {
        const exists = await actions.checkCustomerExists(customerData.curp);
        setUpdateMode(exists);
      } catch (error) {
        console.error("Error al verificar el CURP:", error);
      }
    }
  };

  // Handler para subir imagen a Google Drive usando el action de flux
  // Se genera el preview local y se guarda la URL remota en customerData
  const uploadImageToDriveHandler = async (e, imageField, setLoading) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoading(true);
    try {
      const file = files[0];

      // Generar preview local
      const localPreviewUrl = URL.createObjectURL(file);

      // Subir la imagen a través del action (este action debe devolver la URL remota)
      const url = await actions.uploadImageToDrive(file);
      console.log("Imagen subida a Google Drive:", url);

      // Suponemos que la URL viene en formato "https://drive.google.com/uc?id=FILE_ID..."
      if (url.startsWith("https://drive.google.com/uc?id=")) {
        // Extraer el fileId
        const parts = url.split('?'); // ["https://drive.google.com/uc", "id=FILE_ID"]
        if (parts.length < 2) throw new Error("Formato de URL no esperado");
        const query = parts[1]; // "id=FILE_ID"
        const queryParts = query.split('=');
        if (queryParts.length !== 2) throw new Error("No se pudo extraer el ID de la imagen");
        const fileId = queryParts[1];

        // Armar la URL remota final usando drive.usercontent (para que sirva correctamente en un <img>)
        const customUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=view`;

        // Actualizamos customerData con la URL remota
        setCustomerData(prev => ({
          ...prev,
          [imageField]: customUrl
        }));

        // Y guardamos el preview local en estado local para mostrarlo inmediatamente
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
    setLocalImage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting customer data:", customerData);
    try {
      let result = await actions.createCustomer(customerData);
      if (result) {
        alert(`Cliente ${result} con éxito.`);
        if (clearAfterSubmit) {
          resetFields();
        }
      } else {
        alert("O el token se venció o el server anda sacando chispas...");
      }
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

  return (
    <div className="create-customer-container">
      <h1>Crear/Actualizar</h1>
      <div className="carnet-preview">
        <CardFront data={customerData} localImage={localImage} />
      </div>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid black', padding: '10px' }}>
        <form onSubmit={handleSubmit} className="customer-form">
          <hr />
          <h3>Datos Generales:</h3>
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
            <label>CURP:</label>
            <input
              type="text"
              name="curp"
              value={customerData.curp}
              onChange={handleChange}
              onBlur={handleCurpBlur}
              required
            />
            <small className="curp-info">
              {updateMode
                ? "El CURP ingresado existe, se realizará una actualización."
                : "Nota: Si el CURP ya existe, se actualizarán los datos."}
            </small>
          </div>
          <div className="form-group">
            <label>Estructura:</label>
            <select name="org" value={customerData.org} onChange={handleChange}>
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
            <h3>Direccion:</h3>
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
            <label>Foto Self:</label>
            <input type="file" onChange={(e) => uploadImageToDriveHandler(e, 'url_image_self_photo', setLoadingSelfPhoto)} />
            {loadingSelfPhoto && <span>Cargando imagen...</span>}
            {localImage && (
              <img src={localImage} alt="Self" className="preview-image" />
            )}
          </div>
          <div className="form-group file-input">
            <label>Imagen Credencial Frente:</label>
            <input type="file" onChange={(e) => uploadImageToDriveHandler(e, 'url_image_card_front', setLoadingCardFront)} />
            {loadingCardFront && <span>Cargando imagen...</span>}
            {customerData.url_image_card_front && (
              <img src={customerData.url_image_card_front} alt="Credencial Frente" className="preview-image" />
            )}
          </div>
          <div className="form-group file-input">
            <label>Imagen Credencial Atrás:</label>
            <input type="file" onChange={(e) => uploadImageToDriveHandler(e, 'url_image_card_back', setLoadingCardBack)} />
            {loadingCardBack && <span>Cargando imagen...</span>}
            {customerData.url_image_card_back && (
              <img src={customerData.url_image_card_back} alt="Credencial Atrás" className="preview-image" />
            )}
          </div>
        </form>
      </div>
      <div className="toggle-group">
        <label htmlFor="clearToggle">Borrar campos al terminar de crear/actualizar:</label>
        <br />
        <input
          type="checkbox"
          id="clearToggle"
          checked={clearAfterSubmit}
          onChange={handleToggleClear}
        />
        <span>{clearAfterSubmit ? "Activado" : "Desactivado"}</span>
      </div>
      <div className="button-group">
        <button type="submit" onClick={handleSubmit} className="submit-btn">
          {updateMode ? "Actualizar Socio" : "Crear Socio"}
        </button>
        <button type="button" className="clear-btn" onClick={handleClearFields}>
          Limpiar campos
        </button>
      </div>
    </div>
  );
};

export default CreateCustomer;
