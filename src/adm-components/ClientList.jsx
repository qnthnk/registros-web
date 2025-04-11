import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../js/store/appContext';
import './ClientList.css';
import GenerateCardModal from './GenerateCardModal';


const ClientList = () => {
  const { store, actions } = useContext(Context);
  const [reload, setReload] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);


  useEffect(() => {
    actions.getCustomers();
  }, [reload]);

  // Filtramos los clientes según su estado
  const activeCustomers = store.customers?.filter(customer => customer.deudor === true) || [];
  const inactiveCustomers = store.customers?.filter(customer => customer.deudor === false) || [];

  // Handler para eliminar
  const handleEliminar = async (customer) => {
    if (!window.confirm(`¿Estás seguro de eliminar a ${customer.name}?`)) return;
    const isDeleted = await actions.deleteCustomer(customer);
    if (isDeleted) {
      alert(`${customer.name} eliminado con éxito`);
      setReload(prev => !prev);
    }
  };

  // Handler para dar baja o alta (toggle)
  const toggleStateCustomer = async (customer, actionType) => {
    const confirmMsg = actionType === "dar_baja"
      ? "¿Estás seguro que el usuario pagó? Esta acción NO tiene vuelta atrás."
      : "¿Estás seguro que el usuario no pagó?";
    if (!window.confirm(confirmMsg)) return;

    const result = await actions.stateCustomer(customer, actionType);
    if (result) {
      setReload(!reload);
    } else {
      alert("Algo no salió como se esperaba.");
    }
  };



  // Función para renderizar una sección de clientes con título
  // showActions determina si se muestran o no los botones de acción.
  const renderCustomerList = (title, customers, showActions = true) => (
    <div className="customer-list-section">
        <h3>{title}</h3>
        {customers.length === 0 ? (
          <p>No hay registros en esta categoría.</p>
        ) : (
          <div className="customer-list">
            {customers.map((customer, index) => (
              <div className="customer-item" key={index}>
                <div className="customer-info">
                  <span className="customer-name" title={customer.name}>{customer.name}</span>
                  <span className="customer-email" title={customer.email}>{customer.email}</span>
                  <span className="customer-curp" title={customer.curp}>{customer.curp}</span>
                </div>
                {showActions && (
                  <div className="customer-actions">
                    {customer.deudor ? (
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
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      );

      return (

      <div className="grid-form p-5 mt-5">
        <h2>Lista de registros</h2>
        <h6>(últimos 50 creados)</h6>

        {renderCustomerList("Por pagar", activeCustomers, true)}
        {renderCustomerList("Pagos", inactiveCustomers, false)}
        {selectedCustomer && (
          <GenerateCardModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>

      );
};

      export default ClientList;
