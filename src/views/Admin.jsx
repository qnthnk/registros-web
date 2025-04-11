import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './Admin.css';
import Usuarios from '../adm-components/Usuarios.jsx';
import Reportes from '../adm-components/Reportes.jsx';
import ClientList from '../adm-components/ClientList.jsx';
import RedirectToHome from '../components/RedirectHome.jsx';
import GetList from '../adm-components/GetList.jsx';

const Admin = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('lista-clientes');


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tab = queryParams.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [location.search]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'usuarios':
                return <Usuarios />;
            case 'reportes':
                return <Reportes />;
            case 'get-list':
                return <GetList />;
            case 'lista-clientes':
                return <ClientList />;
            default:
                return <Usuarios />;
        }
    };
    const admin = JSON.parse(localStorage.getItem('admin'));
    const token = localStorage.getItem('token')
    return (
        <>
            <div className="create-customer-container">
                <h1 style={{ color: "#000000", fontWeight: "bolder", marginTop: "9vh" }}>Panel de control</h1>

                {/** Contenedor GRID con 3 áreas: card, form, controls */}
                <div className="container-grid">
                    {/* Área 1: Card */}
                    <div>
                        {
                            admin === true && token ? (
                                <div>
                                    <div className="grid-card">
                                        <div className="button-group">
                                            <button
                                                className={`submit-btn ${activeTab === 'lista-clientes' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('lista-clientes')}
                                            >
                                                Últimos 50 registros
                                            </button>
                                            <button
                                                className={`submit-btn ${activeTab === 'get-list' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('get-list')}
                                            >
                                                Descargar listados
                                            </button>
                                            <button
                                                className={`submit-btn ${activeTab === 'usuarios' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('usuarios')}
                                            >
                                                Administrar usuarios
                                            </button>
                                            <button
                                                className={`submit-btn ${activeTab === 'reportes' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('reportes')}
                                            >
                                                Buscar registro
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <RedirectToHome />
                            )
                        }
                    </div>

                    {/* Área 2: Form */}
                    {/* <div className="grid-form"> */}
                        <div className="customer-form">
                            {renderTabContent()}
                        </div>
                    {/* </div> */}

                    {/* Área 3: Controls (checkbox + botones) */}
                    <div className="grid-controls">
                        {/* Add your controls here */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin