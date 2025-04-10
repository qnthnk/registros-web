import React from 'react';
import './CardFront.css';
import tope from './../img/Blanco.png'

const Lideres = [
  { entidad: "Aguascalientes", lider: "C. Carlos Estrada Valdez", firma: "AGS" },
  { entidad: "Baja California", lider: "C. Mario Soto Ibarra", firma: "BC" },
  { entidad: "Baja California Sur", lider: "C. Jorge Ramírez Martínez", firma: "BCS" },
  { entidad: "Campeche", lider: "C. Luis Felipe Mora Hernández", firma: "PENDIENTE" },
  { entidad: "Chiapas", lider: "C. José Odilón Ruiz Sánchez", firma: "CHIS" },
  { entidad: "Chihuahua", lider: "C. Carlos Manjarrez Domínguez", firma: "CUU" },
  { entidad: "Ciudad de México", lider: "C. Cesar Rodrigo Lara Hernández", firma: "CDMX" },
  { entidad: "Coahuila", lider: "C. José Natividad Navarro Morales", firma: "COA" },
  { entidad: "Colima", lider: "Sen. Mely Romero Celis ", firma: "COL" },
  { entidad: "Durango", lider: "C. José Ángel Beltrán Félix", firma: "DGO" },
  { entidad: "Guanajuato", lider: "C. Lorenzo Chávez Zavala", firma: "GTO" },
  { entidad: "Guerrero", lider: "C. Guillermo Reyes Villela", firma: "GRO" },
  { entidad: "Hidalgo", lider: "C. José Luis González León", firma: "PENDIENTE" },
  { entidad: "Jalisco", lider: "SIN NOMBRE", firma: "PENDIENTE" },
  { entidad: "Estado de México", lider: "C. María del Carmen Carreño García", firma: "EDOMEX" },
  { entidad: "Michoacán", lider: "C. Felipe de Jesús Contreras Correa", firma: "MICH" },
  { entidad: "Morelos", lider: "C. Félix Mauricio Rodríguez Pineda", firma: "PENDIENTE" },
  { entidad: "Nayarit", lider: "C. Carlos Manuel Castillón Medina", firma: "NAY" },
  { entidad: "Nuevo León", lider: "C. Esaú González Arias", firma: "NL" },
  { entidad: "Oaxaca", lider: "C. Amando Demetrio Bohórquez Reyes", firma: "OAX" },
  { entidad: "Puebla", lider: "C. Teodomiro Ortega González", firma: "PUE" },
  { entidad: "Querétaro", lider: "C. Guillermo Joaquín Montenegro Gutiérrez", firma: "PENDIENTE" },
  { entidad: "Quintana Roo", lider: "C. Luis José Martin López", firma: "PENDIENTE" },
  { entidad: "San Luis Potosí", lider: "C. Héctor Covarrubias Godoy", firma: "SLP" },
  { entidad: "Sinaloa", lider: "C. Miguel Ángel López Miranda", firma: "" },
  { entidad: "Sonora", lider: "C. Sergio Lugo Mendivil", firma: "SON" },
  { entidad: "Tabasco", lider: "C. Ramón Cornelio Gómez", firma: "PENDIENTE" },
  { entidad: "Tamaulipas", lider: "C. Raúl García Vallejo", firma: "TAMPS" },
  { entidad: "Tlaxcala", lider: "C. Tulio Larios Aguilar", firma: "PENDIENTE" },
  { entidad: "Veracruz", lider: "C. Manuel Guerrero Gómez", firma: "VER" },
  { entidad: "Yucatán", lider: "C. Juan Manuel Medina Castro", firma: "YUC" },
  { entidad: "Zacatecas", lider: "SIN NOMBRE", firma: "PENDIENTE" },
  
];

const CardBack = () => {
  const userData = "Aguascalientes"|| {};
  const { lider = "A.Paterno" } = userData;

  const matchedEntity = Lideres.find(entity => entity.lider === lider);

  return (
    <>
      <div className="">
        <p className="cardHolderEntidad">{matchedEntity ? matchedEntity.entidad : "Entidad no encontrada"}</p>
        <p className="cardHolderLider">{matchedEntity ? matchedEntity.lider : "Entidad no encontrada"}</p>
        <img src="/workspaces/registros-web/src/img/firmas/${matchedEntity ? matchedEntity.firma}" className="cardHolderFirma"/>

      </div>
    </>
  );
};

export default CardBack;
