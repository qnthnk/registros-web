import React from 'react';
import './CardBack.css';

const CardBack = ({ data }) => {
  return (
    <div className="card-back">
      <div className="card-back-info">
        <p>Organización: {data.org}</p>
        <p>Calle: {data.address_street}</p>
        <p>Número: {data.address_number}</p>
        <p>Email: {data.email}</p>
        <p>Celular: {data.cell_num}</p>
        <p>Instagram: {data.instagram}</p>
        <p>Facebook: {data.facebook}</p>
        <p>Teléfono: {data.tel_num}</p>
      </div>
    </div>
  );
};

export default CardBack;
