import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './Admin.css';
import Navbar from '../components/Navbar.jsx'
import Usuarios from '../adm-components/Usuarios.jsx';
import Reportes from '../adm-components/Reportes.jsx';
import ClientList from '../adm-components/ClientList.jsx';
import RedirectToHome from '../components/RedirectHome.jsx';
import CreateCustomer from '../components/CreateCustomer.jsx';

const Admin = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('crear-cliente');


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
            case 'crear-cliente':
                return <CreateCustomer />;
            case 'lista-clientes':
                return <ClientList />;
            default:
                return <Usuarios />;
        }
    };
    const admin = JSON.parse(localStorage.getItem('admin'));
    const token = localStorage.getItem('token')
    return (
        <div>
            {
                admin === true && token ? (
                    <div>
                        <div className="admin-container">
                            <div className="admin-tabs">
                                <button
                                    className={`tab-button ${activeTab === 'crear-cliente' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('crear-cliente')}
                                >
                                    Crear Cliente
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'usuarios' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('usuarios')}
                                >
                                    Usuarios
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'reportes' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('reportes')}
                                >
                                    Reportes
                                </button>

                                <button
                                    className={`tab-button ${activeTab === 'lista-clientes' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('lista-clientes')}
                                >
                                    Lista de Clientes
                                </button>
                            </div>
                            <div className="admin-content">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                ) : (
                    <RedirectToHome />
                )
            }
        </div>
    )
}

export default Admin