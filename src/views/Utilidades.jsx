import React, { useState } from 'react'
import './Utilidades.css';
import Navbar from '../components/Navbar.jsx'
import Utilidad2 from '../utilidades-components/Utilidad2.jsx';
import Afiliaciones from '../utilidades-components/Afiliaciones.jsx';
import RedirectToHome from '../components/RedirectHome.jsx';

const Utilidades = () => {
  const [activeTab, setActiveTab] = useState('usuarios');

  const renderTabContent = () => {
      switch (activeTab) {
          case 'Afiliaciones':
              return <Afiliaciones />;
          case 'ResumenesInstantaneos':
              return <Utilidad2 />;
          default:
              return <Afiliaciones />;
      }
  };
  const token = localStorage.getItem('token')
  return (
      <div>
          <Navbar />
          {
            token ? (
                  <div>
                      <div className="admin-container">
                          <div className="admin-tabs">

                              <button
                                  className={`tab-button ${activeTab === 'Afiliaciones' ? 'active' : ''}`}
                                  onClick={() => setActiveTab('Afiliaciones')}
                              >
                                  Afiliaciones
                              </button>
                              <button
                                  className={`tab-button ${activeTab === 'ResumenesInstantaneos' ? 'active' : ''}`}
                                  onClick={() => setActiveTab('ResumenesInstantaneos')}
                              >
                                  Opcion 2
                              </button>
                          </div>
                          <div className="admin-content bg-dark-subtle">
                              {renderTabContent()}
                          </div>
                      </div>
                  </div>
              ) : (
                <RedirectToHome/>
            )
          }
      </div>
  )
}

export default Utilidades