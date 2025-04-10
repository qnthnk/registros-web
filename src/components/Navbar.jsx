import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../js/store/appContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo3 from '../img/LOGOCNC.png';
import { FaHome } from "react-icons/fa";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FaInfo } from "react-icons/fa";
import { TbSocial } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import { TiThMenu } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";

const Navbar = () => {
    const { actions } = useContext(Context);
    const [contador, setContador] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name') || '';

    const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };

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
        <>
        {token && (
            <nav
                className="navbar row"
                style={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: 100,
                    height: "100px",
                    backgroundColor: "white",
                }}
            >
                <div
                    className="logoContainer col-3"
                    style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                    <img
                        src={logo3}
                        alt="Logo"
                        className="logo"
                        style={{ width: "70px", height: "70px", borderRadius: "50%", boxShadow: "0 0 10px rgb(0, 0, 0)" }}
                    />
                        <h2 className='title dm-serif-text-regular' style={{color:"black"}}>{name}</h2>
                </div>

                {token && (
                    <form
                        className="container-fluid justify-content-end p-3 col-9"
                        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                    >
                        <button
                            className="socialContainerNav"
                            style={{ border: "none" }}
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            <FaHome className="iconNav" style={{ fontSize: "2em" }} />
                        </button>
                        <button
                            className="socialContainerNav"
                            style={{ border: "none" }}
                            type="button"
                            onClick={() => navigate("/ayuda")}
                        >
                            <BiSolidHelpCircle className="iconNav" style={{ fontSize: "2em" }} />
                        </button>
                      

                        <div className="dropdown">
                            <a
                                className="socialContainerNav"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ textDecoration: "none", color: "white" }}
                            >
                                <TiThMenu className="iconNav" style={{ fontSize: "2em" }} />
                            </a>
                            <ul
                                className="dropdown-menu"
                                style={{
                                    border: "none",
                                    boxShadow: "none",
                                    backgroundColor: "transparent",
                                }}
                            >
                                <div
                                    className="card"
                                    style={{ border: "none", backgroundColor: "transparent" }}
                                >
                                    {token && (
                                        <div className="socialContainer containerOne" onClick={() => navigate("/createcustomer")}>
                                            <svg className="socialSvg instagramSvg" viewBox="0 0 16 16" >
                                                <FaPlus />
                                            </svg>
                                        </div>
                                    )}
                                    <div href="#" className="socialContainer containerTwo" onClick={() => navigate("/registros")}>
                                        <svg className="socialSvg twitterSvg" viewBox="0 0 16 16" >
                                            <FaListAlt />
                                        </svg>
                                    </div>

                                    <div href="#" className="socialContainer containerThree" onClick={() => navigate("/busca-socio")}>
                                        <svg className="socialSvg linkdinSvg" viewBox="0 0 16 16" >
                                            <FaSearch />
                                        </svg>
                                    </div>
                                    {isAdmin && (
                                        <div href="#" className="socialContainer containerFour" onClick={() => navigate("/admin")}>
                                            <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16" >
                                                <RiAdminFill />
                                            </svg>
                                        </div>
                                    )}
                                      <button
                            className="socialContainerNav"
                            style={{ border: "none" }}
                            type="button"
                            onClick={handlerLogOut}
                        >
                            <VscSignOut className="iconNav" style={{ fontSize: "2em" }} />
                        </button>
                                </div>
                            </ul>
                        </div>
                    </form>
                )}
            </nav>
               )}
        </>
    );
};

export default Navbar;
