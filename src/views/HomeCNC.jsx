import React from 'react';
import './HomeCNC.css';
import Cuponera from './../img/cupon.jpg'


import BackgroundVideo from "../img/CNClogin.gif";

const cuponeraStyle = {
  width: "100%",
  height: "auto",
  display: "block",
  maxWidth: "100%", // asegura que nunca sobrepase el contenedor
};

const HomeCNC = () => {

  const handleDescarga = () => {
    const link = document.createElement('a');
    link.href = Cuponera;
    link.download = 'cuponera.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
    <div className="background-video-container">
      <img src={BackgroundVideo} alt="Background Video" className="background-video" />
    </div>
    <div className="contentVideo" style={{ overflow: "hidden" }}>
        <div className="containerLI" style={{ overflow: "hidden" }}>
          <h3 className="titleCNC">Cupones del mes</h3>
        <img src={Cuponera} alt="Cuponera" style={cuponeraStyle} />
        <button 
            onClick={handleDescarga} 
            className='btn btn-success'
          >
            Descargar cuponera
          </button>
        </div>
        </div>

    </>


  );
};

export default HomeCNC;
