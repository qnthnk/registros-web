import React, { useContext, useState } from 'react';
import { Context } from '../js/store/appContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo3 from '../img/LOGOCNC.png'

const Navbar = () => {
    const { actions } = useContext(Context);
    const [ contador , setContador ] = useState(0)
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    // const name = localStorage.getItem('name')
    const admin = JSON.parse(localStorage.getItem('admin'));
    const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';


    const handlerLogOut = () => {
        actions.logout()
        navigate('/')
    }

    const handleShowRegister = () =>{
        if(contador > 10){
            navigate('/loginregister')
        }else{
            setContador(prev => prev + 1)
        }
    }
    return (

        <nav className="container-fluid navbar navbar-expand-lg bg-body-danger">
            <div className="container-fluid">
                <div className='logo_and_title'>
                    <img className="logo" src={logo3} alt="logo petroclub" onClick={handleShowRegister} />
                    <br/>
                    <h4 className='title_navbar'>CNC Digital</h4>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav nav-underline nav-tabs">
                        {
                            token && (
                                <li className="nav-item">
                                    <Link className={isActive('/')} to="/">Inicio</Link>
                                </li>
                            )

                        }

{
                            token && (
                                <li className="nav-item">
                                    <Link className={isActive('/createcustomer')} to="/createcustomer">Nuevo Usuario</Link>
                                </li>
                            )
                        }

                        {/* {
                            token && (
                                <li className="nav-item">
                                    <Link className={isActive('/estadistica')} to="/estadistica">Estadística</Link>
                                </li>
                            )
                        }
                        {
                            token && (
                                <li className="nav-item">
                                    <Link className={isActive('/main')} to="/main">Cartografia</Link>
                                </li>
                            )
                        }

                        {
                            token && (
                                <li className="nav-item">
                                    <Link className={isActive('/utilidades')} to="/utilidades">Herramientas</Link>
                                </li>
                            )
                        } */}
                        {/* <li className="nav-item">
                            <Link className={isActive('/plus')} to="/plus">Saber más</Link>
                        </li> */}
                        {/* {
                            !token && (
                                <li className="nav-item">
                                    <Link className={isActive('/loginregister')} to="/loginregister">Registrate</Link>
                                </li>
                            )
                        } */}

                        {token && (
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle perfil" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Perfil
                                </div>

                                <ul className="dropdown-menu ">
                                    {
                                        admin && <li><div className="dropdown-item" onClick={() => navigate("/admin")} >Admin</div></li>
                                    }
                                    <li><div className="dropdown-item" onClick={() => navigate("/profile")}>Perfil</div></li>
                                    <li><div className="dropdown-item" onClick={handlerLogOut}>Log-out</div></li>
                                </ul>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </nav>


    );
}

export default Navbar;
