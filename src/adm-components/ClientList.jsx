import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../js/store/appContext';
import './ClientList.css';
// import GenerateCardModal from './GenerateCardModal';

const ClientList = () => {
  const { store, actions } = useContext(Context);
  const [reload, setReload] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    actions.getCustomers();
  }, [reload]);

  // Filtramos los clientes según su estado
  const activeCustomers = store.customers?.filter(customer => customer.state === true) || [];
  const inactiveCustomers = store.customers?.filter(customer => customer.state === false) || [];

  // Handler para eliminar
  const handleEliminar = (customer) => {
    console.log("Eliminar", customer);
    // Lógica para eliminar
  };

  // Handler para generar tarjeta: abre el modal
  // const handleGenerarTarjeta = (customer) => {
  //   console.log("Generar Tarjeta", customer);
  //   setSelectedCustomer(customer);
  // };

  // Handler para dar baja o alta (toggle)
  const toggleStateCustomer = async (customer, actionType) => {
    const confirmMsg = actionType === "dar_baja" 
      ? "¿Estás seguro que querés dar de baja al usuario?" 
      : "¿Estás seguro que querés dar de alta al usuario?";
      
    if (!window.confirm(confirmMsg)) return; // Si cancela, no hacemos nada

    const result = await actions.stateCustomer(customer, actionType);
    if (result) {
      // Si todo salió bien, cambiamos el flag para refrescar la lista
      setReload(!reload);
    } else {
      alert("Algo no salió como se esperaba.");
    }
  };

  // Función para renderizar una sección de clientes con título
  const renderCustomerList = (title, customers) => (
    <div className="customer-list-section">
      <h3>{title}</h3>
      {customers.length === 0 ? (
        <p>No hay clientes en esta categoría.</p>
      ) : (
        <div className="customer-list">
          {customers.map((customer, index) => (
            <div className="customer-item" key={index}>
              <div className="customer-info">
                <span className="customer-name" title={customer.name}>{customer.name}</span>
                <span className="customer-email" title={customer.email}>{customer.email}</span>
                <span className="customer-curp" title={customer.curp}>{customer.curp}</span>
              </div>
              <div className="customer-actions">
                {customer.state ? (
                  <button className="btn baja-btn" onClick={() => toggleStateCustomer(customer, "dar_baja")}>
                    confirmar pago
                  </button>
                ) : (
                  <button className="btn alta-btn" onClick={() => toggleStateCustomer(customer, "dar_alta")}>
                    Informa falta pagar
                  </button>
                )}
                <button className="btn eliminar-btn" onClick={() => handleEliminar(customer)}>
                  Eliminar
                </button>
                {/* <button className="btn tarjeta-btn" onClick={() => handleGenerarTarjeta(customer)}>
                  Generar Tarjeta
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="client-list-container">
      <h2>Lista de Clientes</h2>
      {renderCustomerList("Por pagar", activeCustomers)}
      {renderCustomerList("Pagos", inactiveCustomers)}
      {/* {selectedCustomer && (
        <GenerateCardModal 
          customer={selectedCustomer} 
          onClose={() => setSelectedCustomer(null)} 
        />
      )} */}
    </div>
  );
};

export default ClientList;
