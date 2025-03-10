import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext';
import './Reportes.css';

const Reportes = () => {
  const { store, actions } = useContext(Context);
  const [curpInput, setCurpInput] = useState('');

  // Maneja la búsqueda del Customer por CURP.
  const handleSearch = async () => {
    if (!curpInput.trim()) {
      alert("Ingrese un CURP");
      return;
    }
    // El action searchCustomerByCurp debe extraer admin y user_id desde localStorage y enviar el payload.
    const result = await actions.searchCustomerByCurp(curpInput);
    if (!result) {
      alert("No se encontró registro con ese CURP para el usuario actual");
    }
  };

  // Handler para informar el pago
  const handleInformarPago = async () => {
    const confirmacion = window.confirm(
      "Esta acción no tiene vuelta atrás. ¿Estás seguro de informar pago?"
    );
    if (!confirmacion) return;

    // Llama al action que actualiza el estado del Customer individual.
    const res = await actions.stateCustomerIndividual(store.customer_finded, "dar_baja");
    if (!res) {
      alert("Error en el cambio de estado");
    }
  };

  return (
    <div className="reportes-container">
      <h2>Buscar Customer por CURP</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Ingrese CURP"
          value={curpInput}
          onChange={(e) => setCurpInput(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {store.customer_finded && (
        <div className="customer-card">
          <h3>Detalle del Customer</h3>
          <p>
            <strong>Creado por:</strong> {store.customer_finded.created_by}
          </p>
          <p>
            <strong>Nombre:</strong> {store.customer_finded.name}
          </p>
          
          <p>
            <strong>Apellido:</strong> {store.customer_finded.lastname_f}
          </p>
          <p>
            <strong>CURP:</strong> {store.customer_finded.curp}
          </p>
          {store.customer_finded.deudor ? (
            <button className="btn-informar" onClick={handleInformarPago}>Informar pago</button>
          ) : (
            <p className="pago-text">Pago</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Reportes;
