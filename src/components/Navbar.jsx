import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../js/store/appContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo3 from '../img/LOGOCNC.png';

// React Icons
import { FaHome, FaPlus, FaSearch, FaListAlt } from 'react-icons/fa';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { VscSignOut } from 'react-icons/vsc';
import { TiThMenu } from 'react-icons/ti';
import { RiAdminFill } from 'react-icons/ri';

// Bootstrap
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

  useEffect(() => {
    initTooltips();
  }, []);

  const handleToggle = () => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(el => {
      const instance = Tooltip.getInstance(el);
      if (instance) instance.dispose();
    });

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

    setTimeout(() => {
      initTooltips();
    }, 300);
  };

  // 👉 Función para cerrar el menú colapsable
  const closeNavbarMenu = () => {
    const collapseEl = document.getElementById('navbarCollapseContent');
    const collapseInstance = Collapse.getInstance(collapseEl);
    if (collapseInstance && collapseEl.classList.contains('show')) {
      collapseInstance.hide();
    }
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

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarCollapseContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "none", background: "transparent" }}
        >
          <TiThMenu style={{ fontSize: "2em", color: "black" }} />
        </button>

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse" id="navbarCollapseContent">
          <ul className="navbar-nav myNav-ul">
            <li className="nav-item">
              <button
                className="socialContainerNav"
                onClick={() => {
                  navigate("/");
                  closeNavbarMenu();
                }}
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
                className="socialContainerNav"
                onClick={() => {
                  navigate("/createcustomer");
                  closeNavbarMenu();
                }}
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
                onClick={() => {
                  navigate("/registros");
                  closeNavbarMenu();
                }}
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
                className="socialContainerNav"
                onClick={() => {
                  navigate("/busca-socio");
                  closeNavbarMenu();
                }}
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
                className="socialContainerNav"
                onClick={() => {
                  navigate("/ayuda");
                  closeNavbarMenu();
                }}
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
                  onClick={() => {
                    navigate("/admin");
                    closeNavbarMenu();
                  }}
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="left"
                  title="Admin"
                >
                  <RiAdminFill style={{ fontSize: "1.5em" }} />
                </button>
              </li>
            )}

            <li className="nav-item">
              <button
                className="socialContainerNav"
                onClick={() => {
                  handlerLogOut();
                  closeNavbarMenu();
                }}
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
