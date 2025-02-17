import React from 'react';
import './CardFront.css';

const CardFront = ({ data }) => {
  return (
    <div className="card-front">
      <div className="card-top">
        <div className="card-photo">
          {data.url_image_self_photo ? (
            <img src={data.url_image_self_photo} alt="Foto" />
          ) : (
            <div className="placeholder">Foto</div>
          )}
        </div>
        <div className="card-basic">
          <p className="card-name">{data.name} {data.lastname_f} {data.lastname_m}</p>
          <p className="card-curp">CURP: {data.curp}</p>
          <p className="card-dir">Dirección: {data.entidad_dir}, {data.municipio_dir}</p>
          <p className="card-colonia">Colonia: {data.colonia}</p>
          <p className="card-localidad">Localidad: {data.localidad}</p>
        </div>
      </div>
      <div className="card-bottom">
        <p className="card-postal">C.P.: {data.postal_code}</p>
        <p className="card-state">Estado: {data.state ? "Activo" : "Inactivo"}</p>
        <p className="card-created">Creado: {new Date(data.created_at).toLocaleDateString()}</p>
        <p className="card-mun_nac">Municipio Nac.: {data.municipio_nac}</p>
        <p className="card-ent_nac">Entidad Nac.: {data.entidad_nac}</p>
      </div>
    </div>
  );
};

export default CardFront;
