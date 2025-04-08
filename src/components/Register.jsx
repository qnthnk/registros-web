import React, { useContext, useState } from 'react';
import { Context } from '../js/store/appContext';
import { FaUser, FaLock } from "react-icons/fa";
import { HiMiniIdentification } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import gifLoading from "../img/loader-9342.gif";
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate()
  const [wrongPassDuplicated, setWrongPassDuplicated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [formDataRegister, setFormDataRegister] = useState({
    dni: '',
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDataRegister({ ...formDataRegister, [name]: value });
  };

  const handleChange2 = (event) => {
    setWrongPassDuplicated(false);
    const { name, value } = event.target;
    setFormDataRegister({ ...formDataRegister, [name]: value });
  };
///sdsdsd
  const handleVerifications = async () => {
    if (formDataRegister.password.length < 8) {
      alert("El password debe ser por lo menos de 8 caracteres");
      return;
    }
    if (formDataRegister.name.length < 2) {
      alert("Nombre y apellido deben contener al menos dos letras");
      return;
    }
    if (!formDataRegister.email.includes("@")) {
      alert("Correo electrónico no válido");
      return;
    }
    if (formDataRegister.password !== passwordCheck) {
      setWrongPassDuplicated(true);
      return;
    }
    try {
      setIsLoading(true);
      let true_or_false = await actions.register(formDataRegister);
      if (true_or_false) {
        setIsLoading(false);
        alert("Usuario creado con éxito");
        navigate('/')
        // cambiar el alert por un elemento que dependa de un estado local o un sweet alert
      }
    } catch (e) {
      console.log("Error en registro");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Asegúrate de que `event` esté definido aquí.
    handleVerifications();
  };

  return (
    <div className='wrapper' >
      <form onSubmit={handleSubmit}>
        <h1>Regístrate</h1>
        <div className="input-box">
          <input type="text" placeholder='DNI' autocomplete="off" name='dni' value={formDataRegister.dni} onChange={handleChange} required />
          <HiMiniIdentification className='icon' />
        </div>
        <div className="input-box">
          <input type="text" placeholder='Nombre' autoComplete='name' name='name' value={formDataRegister.name} onChange={handleChange} required />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="email" placeholder='Email' autoComplete='email' name='email' value={formDataRegister.email} onChange={handleChange} required />
          <MdEmail className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Contraseña' autoComplete='new-password' name='password' value={formDataRegister.password} onChange={handleChange2} required />
          <FaLock className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Repetir Contraseña' autoComplete='new-password' name='passwordCheck' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} required />
          <FaLock className='icon' />
        </div>
        {
          wrongPassDuplicated && <p style={{ color: "white", fontSize: "18px" }}>Tu password no coincide</p>
        }
        <button type='submit'>{isLoading ? (
          <img
            src={gifLoading}
            alt='gift de carga'
            style={{ width: '30vh', height: '5vh' }}
          />
        ) : (<h5>Registrate</h5>)}</button>
        
        <div className="register-link">
          <label className="clickLogueate" onClick={() => navigate('/')}>Ya tenés cuenta? Logueate acá</label>
        </div>
      </form>
    </div>
  );
}

export default Register;
