import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import scan from '../img/aproach_nfc2.gif';
import './Capture.css';
import useNFCReader from "../hooks/useNFCReader.js";

const Capture = () => {
  const [curp, setCurp] = useState("");
  const [formView, setFormView] = useState(false);
  const { store, actions } = useContext(Context);

  // Desactivamos la lectura NFC si ya se mostró el formulario
  const scanningEnabled = !formView;

  // Iniciamos la lectura NFC solo si scanningEnabled es true
  useNFCReader(setCurp, scanningEnabled);

  // Estado para el payload de la transacción
  const [transactionPayload, setTransactionPayload] = useState({
    fuel_type_id: "", // "Nafta", "Diesel" o "Gas"
    pay_amount: "",
    quantity_liters: ""
  });

  useEffect(() => {
    const checkCurp = async () => {
      // Solo chequeamos si hay curp y aún no mostramos el formulario
      if (curp !== "" && !formView) {
        console.log("Curp detectado en useEffect:", curp);
        try {
          let permitido = await actions.firstCheck(curp);
          console.log("Resultado de firstCheck:", permitido);
          if (permitido) {
            setFormView(true);
          } else {
            alert("Algo salió mal... intente nuevamente");
          }
        } catch (error) {
          console.error("Error en checkCurp:", error);
        }
      }
    };

    checkCurp();
  }, [curp, actions, formView]);

  // Actualizar los valores del formulario en el estado
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionPayload({
      ...transactionPayload,
      [name]: value,
    });
  };

  // Handler para guardar la transacción y resetear el estado
  const handleSaveTransaction = async (e) => {
    e.preventDefault();
    const finalPayload = {
      terminal_id: store.user.terminal,
      sales_person_id: store.user.id,
      curp,
      ...transactionPayload
    };
    console.log("Enviando transacción:", finalPayload);
    try {
      let result = await actions.saveTransaction(finalPayload);
      if (result) {
        alert("Todo salió bien. Transacción guardada");
        // Reseteamos para volver al estado inicial
        setFormView(false);
        setCurp("");
        setTransactionPayload({
          fuel_type_id: "",
          pay_amount: "",
          quantity_liters: ""
        });
      } else {
        alert("Algo salió mal... Intente nuevamente.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="capture-container">
      {formView ? (
        <div className="form-container">
          <h2>Formulario de Transacción</h2>
          <form onSubmit={handleSaveTransaction}>
            <div className="form-group">
              <label htmlFor="fuel_type_id" className="to-white">Tipo de Combustible</label>
              <select 
                name="fuel_type_id" 
                id="fuel_type_id" 
                value={transactionPayload.fuel_type_id} 
                onChange={handleInputChange} 
                required
              >
                <option value="">Seleccione...</option>
                <option value="Nafta">Nafta</option>
                <option value="Diesel">Diesel</option>
                <option value="Gas">Gas</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pay_amount" className="to-white">Monto de Pago</label>
              <input 
                type="number" 
                name="pay_amount" 
                id="pay_amount" 
                value={transactionPayload.pay_amount} 
                onChange={handleInputChange}
                step="0.01" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity_liters" className="to-white">Cantidad de Litros</label>
              <input 
                type="number" 
                name="quantity_liters" 
                id="quantity_liters" 
                value={transactionPayload.quantity_liters} 
                onChange={handleInputChange}
                step="0.01" 
                required 
              />
            </div>
            <button type="submit" className="submit-btn">Guardar Transacción</button>
          </form>
        </div>
      ) : (
        <div className="nfc-container">
          <img src={scan} alt="aproach nfc" />
          <h5 className="nfc-text">Acerque una tarjeta NFC...</h5>
        </div>
      )}
      <p className="status-text">
        {curp ? `Tarjeta detectada: ${curp}` : "Esperando..."}
      </p>
    </div>
  );
};

export default Capture;
