import React from 'react';
import './CardFront.css';

const CardFront = ({ data }) => {
  console.log(data);
  return (
    <>
    <div className="card-front">
      <div className="cardContainer creditCard">
        <div className="card-photo">
          {data.url_image_self_photo ? (
            <img src={data.url_image_self_photo} alt="Foto" />
          ) : (
            <div className="placeholder">Foto</div>
          )}
        </div>
        <div className="creditCardFront">
        <p className="cardHolderLNF">{data.lastname_f || "A.Paterno"}</p>
            <p className="cardHolderLNM">{data.lastname_m || "A.Materno"}</p>
            <p className="cardHolderN">{data.name || "Nombre"}</p>
            <p className="cardHolderC" style={{maxWidth:"5px"}}>{data.org || "Estructura"}</p>
            <p className="cardHolderO" style={{maxWidth:"5px"}}>{data.curp || "CURP"}</p>
            <p className="cardHolderEnt">{data.entidad_dir || "Entidad"}</p>
            <p className="cardHolderExp">Expedición</p>
            <p className="cardHolderVig">Vigencia</p>

        </div>
      </div>
    </div>
    </>
  );
};

export default CardFront;
