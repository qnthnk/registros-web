import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../js/store/appContext.js';
import './Login.css';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import gifLoading from '../img/loader-9342.gif';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { store, actions } = useContext(Context);

  const handlerLogin = async () => {
    try {
      setIsLoading(true);
      const info = {
        email: email,
        password: pass,
      };
      await actions.login(info);
      if (store.userName !== '' && store.userName !== undefined) {
        actions.wrongPass(false);
        navigate('/createcustomer');
      } else {
        actions.wrongPass(true);
        setEmail('');
        setPass('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerSetEmail = (text) => {
    setEmail(text);
    actions.wrongPass(false);
    if (rememberMe) {
      localStorage.setItem('inputEmail', text);
    } else {
      localStorage.removeItem('inputEmail');
    }
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    if (!isChecked) {
      localStorage.removeItem('inputEmail');
    } else {
      localStorage.setItem('inputEmail', email);
    }
  };

  const handlerSetPass = (text) => {
    setPass(text);
    actions.wrongPass(false);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('inputEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='wrapper d-flex justify-content-center'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlerLogin();
        }}
            >
        <h1>Bienvenidos</h1>
        <div className='input-box tex'>
          <input
            type='email'
            placeholder='Entidad'
            id='email'
            value={email}
            autoComplete='email'
            onChange={(e) => handlerSetEmail(e.target.value)}
            required
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Contraseña'
            id='password'
            value={pass}
            autoComplete='current-password'
            onChange={(e) => handlerSetPass(e.target.value)}
            required
          />
          <span className="icon password-toggle" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {store.wrongPass && (
          <p style={{ color: 'white', fontSize: '18px' }}>
            Contraseña incorrecta
          </p>
        )}
        <div className='remember-forgot'>
          <label>
            <input
              type='checkbox'
              name='rememberMe'
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Recordarme en este dispositivo
          </label>
        </div>
        <button type='submit'>
          {isLoading ? (
            <img
              src={gifLoading}
              alt='gif de carga'
              style={{ width: '50%', height: '140%' }}
            />
          ) : (
            <h5>Ingresar</h5>
          )}
        </button>
        {/* Opcional: enlace para registrarse */}
        {/* <div className='register-link'>
          <p>No tienes cuenta? <span onClick={() => navigate('/loginregister')} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Registrate acá</span></p>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
