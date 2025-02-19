import React, { useContext, useEffect } from 'react';
import { Context } from '../js/store/appContext';
import './ClientList.css';

const ClientList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCustomers();
  }, []);

  // Filtramos los clientes según su estado
  const activeCustomers = store.customers?.filter(customer => customer.state === true) || [];
  const inactiveCustomers = store.customers?.filter(customer => customer.state === false) || [];

  // Handlers para cada botón (acá se puede agregar la lógica necesaria)
  const handleDarBaja = (customer) => {
    console.log("Dar baja", customer);
    // Acá va la lógica para dar baja
  };

  const handleEliminar = (customer) => {
    console.log("Eliminar", customer);
    // Acá va la lógica para eliminar
  };

  const handleGenerarTarjeta = (customer) => {
    console.log("Generar Tarjeta", customer);
    // Acá va la lógica para generar tarjeta
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
                <button className="btn baja-btn" onClick={() => handleDarBaja(customer)}>Dar baja</button>
                <button className="btn eliminar-btn" onClick={() => handleEliminar(customer)}>Eliminar</button>
                <button className="btn tarjeta-btn" onClick={() => handleGenerarTarjeta(customer)}>Generar Tarjeta</button>
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
      {renderCustomerList("Activos", activeCustomers)}
      {renderCustomerList("Inactivos", inactiveCustomers)}
    </div>
  );
};

export default ClientList;
