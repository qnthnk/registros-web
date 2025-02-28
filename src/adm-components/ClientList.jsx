import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../js/store/appContext';
import './ClientList.css';

const ClientList = () => {
  const { store, actions } = useContext(Context);
  const [refreshFlag, setRefreshFlag] = useState(true);

  useEffect(() => {
    actions.getCustomers();
  }, [refreshFlag]);

  // Filtramos los clientes según su estado
  const activeCustomers = store.customers?.filter(customer => customer.state === true) || [];
  const inactiveCustomers = store.customers?.filter(customer => customer.state === false) || [];

  const handleDarBaja = (customer) => {
    console.log("Dar baja", customer);
    // Lógica para dar baja
  };

  const handleEliminar = async (customer) => {
    // Paso 1: Preguntar confirmación al usuario
    if (!window.confirm(`¿Estás seguro de eliminar a ${customer.name}?`)) {
      return; // Paso 2: Si dice que no, se corta la ejecución
    }
    // Paso 3: Ejecutar el action deleteCustomer
    const isDeleted = await actions.deleteCustomer(customer);
    if (isDeleted) {
      // Paso 4: Si se eliminó correctamente, mostramos un alert y toggleamos el flag
      alert(`${customer.name} eliminado con éxito`);
      setRefreshFlag(prev => !prev);
    }
  };

  const handleGenerarTarjeta = (customer) => {
    console.log("Generar Tarjeta", customer);
    // Lógica para generar tarjeta
  };

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
                {/* <button className="btn tarjeta-btn" onClick={() => handleGenerarTarjeta(customer)}>Generar Tarjeta</button> */}
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
