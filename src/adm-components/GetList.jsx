import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import './GetList.css';

const GetList = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { actions } = useContext(Context);

  // Handler para descargar Excel
  const handleDownloadExcel = async () => {
    setIsDownloading(true);
    try {
      await actions.downloadExcel();
    } catch (error) {
      alert("Error descargando el excel.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="getlist-container">
      <div className="download-excel-container">
        <button className="btn download-excel-btn-blue" onClick={handleDownloadExcel} disabled={isDownloading}>
          {isDownloading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Descargando...(puede demorar)
            </>
          ) : (
            <>
              Descargar Excel Total <i className="fas fa-arrow-down"></i>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GetList;
