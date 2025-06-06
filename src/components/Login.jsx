import React, { useState, useContext, useEffect } from "react";
import { Context } from "../js/store/appContext.js";
import "./Login.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gifLoading from "../img/Loading_2.gif";
import BackgroundGIF from "../img/CNClogin.gif";
import logo3 from "../img/LOGOCNC.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
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
      if (store.userName !== "" && store.userName !== undefined) {
        actions.wrongPass(false);
        navigate("/home");
      } else {
        actions.wrongPass(true);
        setEmail("");
        setPass("");
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
      localStorage.setItem("inputEmail", text);
    } else {
      localStorage.removeItem("inputEmail");
    }
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    if (!isChecked) {
      localStorage.removeItem("inputEmail");
    } else {
      localStorage.setItem("inputEmail", email);
    }
  };

  const handlerSetPass = (text) => {
    setPass(text);
    actions.wrongPass(false);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("inputEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="background-video-containerLI">
        <img
          src={BackgroundGIF}
          alt="Background Video"
          className="background-video"
        />
      </div>
      <div className="contentVideo" style={{ overflow: "hidden" }}>
        <div className="containerLI" style={{ overflow: "hidden" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlerLogin();
                }}
                className="form"
              >
                <img src={logo3} alt="Logo" className="navbar-logo" />
                <div className="row">
                {/* <input
                    id="entidad"
                    value={email}
                    onChange={(e) => handlerSetEmail(e.target.value)}
                    required
                    className="input"
                  /> */}
                  <select
                    id="entidad"
                    value={email}
                    onChange={(e) => handlerSetEmail(e.target.value)}
                    required
                    className="input"
                  >
                    <option value="" disabled>
                      Seleccione un estado
                    </option>
                    <option value="terminaluser@example.com">user</option>
                    <option value="responsable@example.com">Admin</option>
                    <option value="Nacional">Nacional</option>
                    <option value="Aguascalientes">Aguascalientes</option>
                    <option value="Baja California">Baja California</option>
                    <option value="Baja California Sur">Baja California Sur</option>
                    <option value="Campeche">Campeche</option>
                    <option value="Chiapas">Chiapas</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Ciudad de México">Ciudad de México</option>
                    <option value="Coahuila">Coahuila</option>
                    <option value="Colima">Colima</option>
                    <option value="Durango">Durango</option>
                    <option value="Estado de México">Estado de México</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Hidalgo">Hidalgo</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="Michoacán">Michoacán</option>
                    <option value="Morelos">Morelos</option>
                    <option value="Nayarit">Nayarit</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Oaxaca">Oaxaca</option>
                    <option value="Puebla">Puebla</option>
                    <option value="Querétaro">Querétaro</option>
                    <option value="Quintana Roo">Quintana Roo</option>
                    <option value="San Luis Potosí">San Luis Potosí</option>
                    <option value="Sinaloa">Sinaloa</option>
                    <option value="Sonora">Sonora</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Tamaulipas">Tamaulipas</option>
                    <option value="Tlaxcala">Tlaxcala</option>
                    <option value="Veracruz">Veracruz</option>
                    <option value="Yucatán">Yucatán</option>
                    <option value="Zacatecas">Zacatecas</option>
                    
                  </select>
                </div>
                <div className="row">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    id="password"
                    value={pass}
                    autoComplete="current-password"
                    onChange={(e) => handlerSetPass(e.target.value)}
                    required
                    style={{ color: "black" }}
                    className="input"
                  />
                </div>
                {store.wrongPass && (
                  <p style={{ color: "white", fontSize: "18px" }}>
                    Contraseña incorrecta
                  </p>
                )}
                <button className='btnLG' type="submit">
                  {isLoading ? (
                    <img
                      src={gifLoading}
                      alt="gif de carga"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <h5>Ingresar</h5>
                  )}
                </button>
              </form>
          </div>
        </div>
    </>
  )
};

export default Login;
