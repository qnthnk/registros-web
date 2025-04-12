import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../js/store/appContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Importa el CSS personalizado
import logo3 from '../img/LOGOCNC.png';

// React Icons
import { FaHome, FaPlus, FaSearch, FaListAlt } from 'react-icons/fa';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { VscSignOut } from 'react-icons/vsc';
import { TiThMenu } from 'react-icons/ti';
import { RiAdminFill } from 'react-icons/ri';

// Importá Tooltip y Collapse de bootstrap
import { Tooltip, Collapse } from 'bootstrap';

const Navbar = () => {
  const { actions } = useContext(Context);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name') || '';

  useEffect(() => {
    if (token) {
      actions.checkAdmin()
        .then(result => setIsAdmin(result.admin))
        .catch(err => {
          console.error("Error verificando admin:", err);
          setIsAdmin(false);
        });
    }
  }, [token, actions]);

  // Función para inicializar los tooltips
  const initTooltips = () => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new Tooltip(tooltipTriggerEl, {
        boundary: 'window',
        container: 'body',
        trigger: 'hover'
      });
    });
  };

  // Inicializar tooltips al montar
  useEffect(() => {
    initTooltips();
  }, []);

  // Handler para el toggler (botón hamburguesa)
  const handleToggle = () => {
    // Desecha tooltips activos
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(el => {
      const instance = Tooltip.getInstance(el);
      if (instance) instance.dispose();
    });

    // Controlar el collapse manualmente
    const collapseEl = document.getElementById('navbarCollapseContent');
    let collapseInstance = Collapse.getInstance(collapseEl);
    if (!collapseInstance) {
      collapseInstance = new Collapse(collapseEl, { toggle: false });
    }
    if (collapseEl.classList.contains('show')) {
      collapseInstance.hide();
    } else {
      collapseInstance.show();
    }
    // Re-activar tooltips un poco después de togglear
    setTimeout(() => {
      initTooltips();
    }, 300);
  };

  const handlerLogOut = () => {
    actions.logout();
    navigate('/');
  };

  if (!token) return null;

  return (
    <nav className="custom-navbar navbar navbar-expand-md fixed-top">
      <div className="container-fluid">
        {/* Logo y Título */}
          <img src={logo3} alt="Logo" className="navbar-logo" />
          <h2 className="navbar-title">{name}</h2>

        {/* Botón hamburguesa: sin data-bs-toggle, controlado manualmente */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarCollapseContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "none", background: "transparent" }}
          border="none"
        >
          <TiThMenu style={{ fontSize: "2em", color: "black" }} />
        </button>

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse" id="navbarCollapseContent">
          <ul className="navbar-nav myNav-ul">
            <li className="nav-item">
              <button
                className="socialContainerNav"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-placement="left"
                title="Inicio"
              >
                <FaHome style={{ fontSize: "1.5em" }} />
              </button>
            </li>
            
            <li className="nav-item">
              <button
                className="socialContainerNav "
                onClick={() => navigate("/createcustomer")}
                style={{ cursor: "pointer" }}
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-placement="left"
                title="Crear Socio"
              >
                <FaPlus style={{ fontSize: "1.5em" }} />
              </button>
            </li>
            <li className="nav-item">
              <button
                className="socialContainerNav"
                onClick={() => navigate("/registros")}
                style={{ cursor: "pointer" }}
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-placement="left"
                title="Registros"
              >
                <FaListAlt style={{ fontSize: "1.5em" }} />
              </button>
            </li>
            <li className="nav-item">
              <button
                className="socialContainerNav "
                onClick={() => navigate("/busca-socio")}
                style={{ cursor: "pointer" }}
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-placement="left"
                title="Buscar Socio"
              >
                <FaSearch style={{ fontSize: "1.5em" }} />
              </button>
            </li>
            <li className="nav-item">
              <button
                className="socialContainerNav "
                onClick={() => navigate("/ayuda")}
                style={{ cursor: "pointer" }}
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-placement="left"
                title="Ayuda"
              >
                <BiSolidHelpCircle style={{ fontSize: "1.5em" }} />
              </button>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <button
                  className="socialContainerNav"
                  onClick={() => navigate("/admin")}
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="left"
                  data-bs-boundary="window"
                  data-bs-container="body"
                  title="Admin"
                >
                  <RiAdminFill style={{ fontSize: "1.5em" }} />
                </button>
              </li>
            )}
            <li className="nav-item">
              <button
                className="socialContainerNav"
                onClick={handlerLogOut}
                style={{ cursor: "pointer" }}
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-placement="left"
                title="Salir"
              >
                <VscSignOut style={{ fontSize: "1.5em" }} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
