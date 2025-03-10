import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../js/store/appContext.js';
import { useNavigate } from 'react-router-dom';
import './Usuarios.css';

const Usuarios = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Estado para el acordeón del formulario
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // Estado para el formulario de creación de usuario
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    name: '',
    curp: '',
    terminal_id: '',
    first_pass: ''
  });
  // Flag para refrescar la lista cuando se crea un usuario nuevo
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [loadingIndividual, setLoadingIndividual] = useState(false);

  const handleDownloadExcel = async (user_id, user_name) => {
    try {
      setLoadingIndividual(true);
      await actions.downloadExcelByUser(user_id, user_name);
    } catch (error) {
      console.error("Error en descarga individual:", error);
    } finally {
      setLoadingIndividual(false);
    }
  };

  // Handlers existentes
  const handleEdit = (user) => {
    actions.setUserForEdit(user);
    navigate('/editar-usuario');
  };

  const handleDelete = (user) => {
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.name}? Esta acción no se puede deshacer.`);
    if (confirmed) {
      let result = actions.deleteUser(user.id);
      if (result) {
        alert(`Usuario ${user.name} eliminado con éxito.`)
        setRefreshFlag((prev) => !prev)
      } else {
        alert(`Error al eliminar a ${user.name}.`)
      }
    }
  };

  const handleAdminToggle = async (user) => {
    try {
      const message = user.admin ? 'quitarle' : 'darle';
      const confirmed = window.confirm(`¿Estás seguro de que deseas ${message} acceso de administrador a ${user.name}?`);
      if (confirmed) {
        const response = await actions.toggleAdmin(user.email, user.admin);
        console.log(response.message);
        if (response) {
          setRefreshFlag((prev) => !prev)
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handler para el cambio de inputs en el formulario
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handler para crear un nuevo usuario
  const handleCreateNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await actions.createNewUser(newUser);
      if (result) {
        alert("usuario creado");
        // Alternamos el flag para refrescar la lista en el useEffect
        setRefreshFlag(!refreshFlag);
        // Reseteamos el formulario
        setNewUser({
          email: '',
          password: '',
          name: '',
          curp: '',
          terminal_id: '',
          first_pass: ''
        });
        // Cerramos el acordeón
        setIsAccordionOpen(false);
      } else {
        alert("falla al crear al usuario");
      }
    } catch (error) {
      console.error(error)
    }

  };

  // useEffect para cargar usuarios y terminales
  useEffect(() => {
    actions.getUsers();
    actions.getTerminales();
  }, [store.trigger, refreshFlag]);

  return (
    <div className="usuarios-container">
      <button className="btn crear-usuario" onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
        {isAccordionOpen ? "Cerrar formulario" : "Crear usuario"}
      </button>

      {isAccordionOpen && (
        <div className="accordion-form">
          <form onSubmit={handleCreateNewUser}>
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" name="name" value={newUser.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" name="password" value={newUser.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={newUser.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>CURP</label>
              <input type="text" name="curp" value={newUser.curp} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Terminal</label>
              <select name="terminal_id" value={newUser.terminal_id} onChange={handleChange} required>
                <option value="">Seleccione una terminal</option>
                {store.terminales &&
                  store.terminales.map((terminal) => (
                    <option key={terminal.terminal_id} value={terminal.terminal_id}>
                      {terminal.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label>Clave Admin</label>
              <input type="text" name="first_pass" value={newUser.first_pass} onChange={handleChange} required />
            </div>
            <span>*Si no sabe la clave, digite cualquier cosa. El usuario creado no será admin en su creación.</span>
            <button type="submit" className="btn confirmar">
              Crear Usuario
            </button>
          </form>
        </div>
      )}

      {store.users.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <div className="usuarios-list">
          {store.users.map((user) => (
            <div key={user.id} className="usuario-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>CURP: {user.curp}</p>
              <div className="botones-container">
                <button className="btn editar" onClick={() => handleEdit(user)}>
                  Editar
                </button>
                <button className="btn eliminar" onClick={() => handleDelete(user)}>
                  Eliminar
                </button>
                <button
                  className={`btn admin ${user.admin ? 'admin-activo' : 'admin-inactivo'}`}
                  onClick={() => handleAdminToggle(user)}
                >
                  {user.admin ? 'Admin' : 'No Admin'}
                </button>
                <button
                  onClick={() => handleDownloadExcel(user.id, user.name)}
                  className="btn descargar"
                >
                  {loadingIndividual ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-download"></i>
                  )}{" "}
                  Descargar sus Registros
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Usuarios;
