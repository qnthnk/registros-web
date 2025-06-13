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
                    <option value="nacional@cnc.com">Nacional</option>
                    <option value="aguascalientes@cnc.com">Aguascalientes</option>
                    <option value="bajacalifornia@cnc.com">Baja California</option>
                    <option value="bajacaliforniasur@cnc.com">Baja California Sur</option>
                    <option value="campeche@cnc.com">Campeche</option>
                    <option value="chiapas@cnc.com">Chiapas</option>
                    <option value="chihuahua@cnc.com">Chihuahua</option>
                    <option value="ciudaddemexico@cnc.com">Ciudad de México</option>
                    <option value="coahuila@cnc.com">Coahuila</option>
                    <option value="colima@cnc.com">Colima</option>
                    <option value="durango@cnc.com">Durango</option>
                    <option value="estadodemexico@cnc.com">Estado de México</option>
                    <option value="guanajuato@cnc.com">Guanajuato</option>
                    <option value="guerrero@cnc.com">Guerrero</option>
                    <option value="hidalgo@cnc.com">Hidalgo</option>
                    <option value="jalisco@cnc.com">Jalisco</option>
                    <option value="michoacan@cnc.com">Michoacán</option>
                    <option value="morelos@cnc.com">Morelos</option>
                    <option value="nayarit@cnc.com">Nayarit</option>
                    <option value="nuevoleon@cnc.com">Nuevo León</option>
                    <option value="oaxaca@cnc.com">Oaxaca</option>
                    <option value="puebla@cnc.com">Puebla</option>
                    <option value="queretaro@cnc.com">Querétaro</option>
                    <option value="quintanaroo@cnc.com">Quintana Roo</option>
                    <option value="sanluispotosi@cnc.com">San Luis Potosí</option>
                    <option value="sinaloa@cnc.com">Sinaloa</option>
                    <option value="sonora@cnc.com">Sonora</option>
                    <option value="tabasco@cnc.com">Tabasco</option>
                    <option value="tamaulipas@cnc.com">Tamaulipas</option>
                    <option value="tlaxcala@cnc.com">Tlaxcala</option>
                    <option value="veracruz@cnc.com">Veracruz</option>
                    <option value="yucatan@cnc.com">Yucatán</option>
                    <option value="zacatecas@cnc.com">Zacatecas</option>
                    
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
