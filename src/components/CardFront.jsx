import React from 'react';
import './CardFront.css';
import tope from './../img/Blanco.png'

const CardFront = ({ data, localImage }) => {
  console.log(data);
  return (
    <>
      {data.url_image_self_photo ? (
        <img
          className="cardHolderPicture"
          src={localImage || tope}
          alt="Foto"
        />
      ) : (
        <img
          className="cardHolderPicture"
          src="/path/to/default/image.jpg"
          alt="Default Foto"
        />
      )}
      <div className="">
        <p className="cardHolderLNF">{data.lastname_f || "A.Paterno"}</p>
        <p className="cardHolderLNM">{data.lastname_m || "A.Materno"}</p>
        <p className="cardHolderN">{data.name || "Nombre"}</p>
        <p className="cardHolderO">{data.org || "Estructura"}</p>
        <p className="cardHolderC">{data.curp || "CURP"}</p>
        <p className="cardHolderEnt">{data.entidad_dir || "Entidad"}</p>
        <p className="cardHolderMun">{data.municipio_dir || "Municipio"}</p>
        <p className="cardHolderVig"></p>
      </div>
    </>
  );
};

export default CardFront;
