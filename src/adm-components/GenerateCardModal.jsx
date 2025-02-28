import React, { useState, useEffect } from 'react';
import useNFCWriter from '../hooks/useNFCWriter';
import './GenerateCardModal.css';

const GenerateCardModal = ({ customer, onClose }) => {
  // writeStatus: null -> en proceso, "Funcionó" -> éxito, "Algo salió mal" -> error
  const [writeStatus, setWriteStatus] = useState(null);
  const writeToNfc = useNFCWriter();

  useEffect(() => {
    if (!writeStatus) {
      // Se intenta escribir el CURP del customer en la tarjeta NFC
      writeToNfc(customer.curp, setWriteStatus);
    }
  }, [customer, writeStatus, writeToNfc]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {writeStatus === null && (
          <>
            <h3>Generar Tarjeta</h3>
            <p><strong>Nombre:</strong> {customer.name}</p>
            <p><strong>CURP:</strong> {customer.curp}</p>
            <div className="spinner">
              <i className="fa fa-spinner fa-spin"></i>
            </div>
            <p>Acerque su tarjeta para grabar los cambios</p>
            <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          </>
        )}
        {writeStatus === "Funcionó" && (
          <>
            <h3>¡Éxito!</h3>
            <div className="success-icon">
              <i className="fa fa-check-circle" style={{ color: 'green', fontSize: '48px' }}></i>
            </div>
            <p>Tarjeta grabada con éxito</p>
            <button className="accept-btn" onClick={onClose}>Aceptar</button>
          </>
        )}
        {writeStatus === "Algo salió mal" && (
          <>
            <h3>Error</h3>
            <div className="error-icon">
              <i className="fa fa-times-circle" style={{ color: 'red', fontSize: '48px' }}></i>
            </div>
            <p>Error al grabar la tarjeta</p>
            <button className="accept-btn" onClick={onClose}>Aceptar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default GenerateCardModal;
