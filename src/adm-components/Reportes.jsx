import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext';
import './Reportes.css';
import tope from './../img/Blanco.png';
import Swal from 'sweetalert2'

const Reportes = () => {
  const { store, actions } = useContext(Context);
  const [curpInput, setCurpInput] = useState('');

  // Maneja la búsqueda del Customer por CURP.
  const handleSearch = async () => {
    if (!curpInput.trim()) {
      Swal.fire({
        title: "Ingrese un CURP de 18 dígitos",
        icon: "warning",
        draggable: true
      });
      return;
    }
    // El action searchCustomerByCurp debe extraer admin y user_id desde localStorage y enviar el payload.
    const result = await actions.searchCustomerByCurp(curpInput);
    if (!result) {
      Swal.fire({
        title: "No se encontró registro",
        icon: "error",
        draggable: true
      });
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
    <>
    <img src={tope} style={{width:"100%", height:"90px"}} alt="tope" className="tope" />
    
    <div className="grid-form p-5" style={{height:"60vh"}}>
      <h2>Buscar registro por CURP</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Ingrese CURP"
          value={curpInput}
          onChange={(e) => setCurpInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (curpInput.length !== 18) {
                Swal.fire({
                  title: "El CURP debe tener 18 dígitos",
                  icon: "warning",
                  draggable: true
                });
                return;
              }
              handleSearch();
            }
          }}
        />
        <button className='search-button'
          onClick={() => {
            if (curpInput.length !== 18) {
              Swal.fire({
                title: "El CURP debe tener 18 dígitos",
                icon: "warning",
                draggable: true
              });
              return;
            }
            handleSearch();
          }}
        >
          Buscar
        </button>
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
    </>
  );
};

export default Reportes;
