import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../js/store/appContext.js';
import './HomeCNC.css';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import gifLoading from '../img/loader-9342.gif';

const HomeCNC = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  return (
      <div className='container wrapper'>
        <h1>Home CNC</h1>
        <p>Este es el Home CNC</p>
      </div>
  );
};

export default HomeCNC;
