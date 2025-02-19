import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../js/store/appContext';
import { useNavigate } from 'react-router-dom';
import './UpdateUser.css'; // Asegurate de tener este archivo para los estilos

const UpdateUser = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Inicializamos el formulario con los datos del usuario a editar
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    curp: '',
    terminal_id: '',
    password: ''
  });

  useEffect(() => {
    if (store.userForEdit) {
      setFormData({
        email: store.userForEdit.email || '',
        name: store.userForEdit.name || '',
        curp: store.userForEdit.curp || '',
        terminal_id: store.userForEdit.terminal_id || '',
        password: store.userForEdit.password
      });
    }
    // Traemos las terminales para el select
    actions.getTerminales();
  }, [store.userForEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actions.updateUser(formData);
    if (result) {
      alert("Usuario actualizado con éxito!");
      // Redirigimos a /admin con el tab 'usuarios' seleccionado
      navigate('/admin?tab=usuarios');
    } else {
      alert("Error al actualizar el usuario");
    }
  };

  return (
    <div className="update-user-container">
      <h2>Actualizar Usuario</h2>
      <form onSubmit={handleSubmit} className="update-user-form">
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>CURP</label>
          <input 
            type="text" 
            name="curp" 
            value={formData.curp} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password/Opcional</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Terminal</label>
          <select 
            name="terminal_id" 
            value={formData.terminal_id} 
            onChange={handleChange} 
            required
          >
            <option value="">Seleccione una terminal</option>
            {store.terminales &&
              store.terminales.map((terminal) => (
                <option key={terminal.terminal_id} value={terminal.terminal_id}>
                  {terminal.name}
                </option>
              ))
            }
          </select>
        </div>
        <button type="submit" className="btn">
          Actualizar Usuario
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
