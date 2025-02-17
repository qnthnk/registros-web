import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../js/store/appContext';
import CardFront from './CardFront';
import CardBack from './CardBack';
import './CreateCustomer.css';

const initialCustomerData = {
  name: '',
  lastname_f: '',
  lastname_m: '',
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
  // Estado para decidir si limpiar campos al terminar de crear/actualizar
  const [clearAfterSubmit, setClearAfterSubmit] = useState(false);
  // Estado que indica si el CURP ya existe
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

  // Handler para cuando el input de CURP pierde el foco
  const handleCurpBlur = async () => {
    if (customerData.curp.trim() !== '') {
      try {
        const exists = await actions.checkCustomerExists(customerData.curp);
        setUpdateMode(exists);
      } catch (error) {
        console.error("Error al verificar el CURP:", error);
      }
    }
  };

  const uploadImage = async (e, imageField, setLoading) => {
    console.log("entro en uploadImage");
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const data = new FormData();
    data.append('file', files[0]);
    const preset_name = 'yu1h90st'; // Reemplazar con tu preset
    const cloud_name = 'drlqmol4c'; // Reemplazar con tu cloud name
    data.append('upload_preset', preset_name);
    setLoading(true);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: data
      });
      const file = await response.json();
      console.log("url de la imagen: ", file.secure_url);
      setCustomerData(prev => ({
        ...prev,
        [imageField]: file.secure_url
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setCustomerData(initialCustomerData);
    localStorage.removeItem('customerData');
    setUpdateMode(false);
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
    if(window.confirm("¿Estás seguro de que deseas limpiar todos los campos?")) {
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
        <CardFront data={customerData} />
        <CardBack data={customerData} />
      </div>
      <form onSubmit={handleSubmit} className="customer-form">
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
        {/* Resto de campos */}
        <div className="form-group">
          <label>Entidad Nacimiento:</label>
          <input type="text" name="entidad_nac" value={customerData.entidad_nac} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Municipio Nacimiento:</label>
          <input type="text" name="municipio_nac" value={customerData.municipio_nac} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Organización:</label>
          <input type="text" name="org" value={customerData.org} onChange={handleChange} />
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
          <label>Entidad Dirección:</label>
          <input type="text" name="entidad_dir" value={customerData.entidad_dir} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Municipio Dirección:</label>
          <input type="text" name="municipio_dir" value={customerData.municipio_dir} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={customerData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Celular:</label>
          <input type="text" name="cell_num" value={customerData.cell_num} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Instagram:</label>
          <input type="text" name="instagram" value={customerData.instagram} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Facebook:</label>
          <input type="text" name="facebook" value={customerData.facebook} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input type="text" name="tel_num" value={customerData.tel_num} onChange={handleChange} />
        </div>
        <div className="form-group file-input">
          <label>Foto Self:</label>
          <input type="file" onChange={(e) => uploadImage(e, 'url_image_self_photo', setLoadingSelfPhoto)} />
          {loadingSelfPhoto && <span>Cargando imagen...</span>}
          {customerData.url_image_self_photo && (
            <img src={customerData.url_image_self_photo} alt="Self" className="preview-image" />
          )}
        </div>
        <div className="form-group file-input">
          <label>Imagen Credencial Frente:</label>
          <input type="file" onChange={(e) => uploadImage(e, 'url_image_card_front', setLoadingCardFront)} />
          {loadingCardFront && <span>Cargando imagen...</span>}
          {customerData.url_image_card_front && (
            <img src={customerData.url_image_card_front} alt="Credencial Frente" className="preview-image" />
          )}
        </div>
        <div className="form-group file-input">
          <label>Imagen Credencial Atrás:</label>
          <input type="file" onChange={(e) => uploadImage(e, 'url_image_card_back', setLoadingCardBack)} />
          {loadingCardBack && <span>Cargando imagen...</span>}
          {customerData.url_image_card_back && (
            <img src={customerData.url_image_card_back} alt="Credencial Atrás" className="preview-image" />
          )}
        </div>
        <div className="toggle-group">
          <label htmlFor="clearToggle">Borrar campos al terminar de crear/actualizar:</label>
          <input 
            type="checkbox" 
            id="clearToggle" 
            checked={clearAfterSubmit}
            onChange={handleToggleClear} 
          />
          <span>{clearAfterSubmit ? "Activado" : "Desactivado"}</span>
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            {updateMode ? "Actualizar Socio" : "Crear Socio"}
          </button>
          <button type="button" className="clear-btn" onClick={handleClearFields}>Limpiar campos</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;
