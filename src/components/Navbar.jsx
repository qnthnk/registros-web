import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../js/store/appContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo3 from '../img/LOGOCNC.png';

const Navbar = () => {
    const { actions } = useContext(Context);
    const [contador, setContador] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name') || '';

    const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

    // UseEffect para chequear el rol admin al cargar el componente
    useEffect(() => {
        if (token) {
            actions.checkAdmin()
                .then(result => {
                    setIsAdmin(result.admin);
                })
                .catch(err => {
                    console.error("Error verificando admin:", err);
                    setIsAdmin(false);
                });
        }
    }, [token, actions]);

    const handlerLogOut = () => {
        actions.logout();
        navigate('/');
    };

    const handleShowRegister = () => {
        if (contador > 10) {
            navigate('/loginregister');
        } else {
            setContador(prev => prev + 1);
        }
    };

    return (
        <nav className="container-fluid navbar navbar-expand-lg bg-body-danger">
            <div className="container-fluid d-flex align-items-center">
                <div className="logo_and_title">
                    <img className="logo" src={logo3} alt="logo petroclub" onClick={handleShowRegister} />
                    <h4 className="title_navbar">CNC Digital</h4>
                </div>
                {token && (
                    <div className="welcome-message d-none d-lg-block">
                        Bienvenido, {name}
                    </div>
                )}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav nav-underline nav-tabs ms-auto">
                        {token && (
                            <li className="nav-item">
                                <Link className={isActive('/createcustomer')} to="/createcustomer">Nuevo Registro</Link>
                            </li>
                        )}
                        {token && (
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle perfil" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Perfil
                                </div>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <div className="dropdown-item mano" onClick={() => navigate("/ayuda")}>
                                            Ayuda
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown-item mano" onClick={() => navigate("/registros")}>
                                            Registros
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown-item mano" onClick={() => navigate("/busca-socio")}>
                                            Busca Socio
                                        </div>
                                    </li>
                                    {isAdmin && (
                                        <li>
                                            <div className="dropdown-item mano" onClick={() => navigate("/admin")}>
                                                Panel de control
                                            </div>
                                        </li>
                                    )}
                                    <li>
                                        <div className="dropdown-item mano" onClick={handlerLogOut}>
                                            Salir
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
