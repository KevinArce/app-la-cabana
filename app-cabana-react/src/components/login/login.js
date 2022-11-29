import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./assets/login.css";
import logo from "./assets/img/logo.png";
import imgFloating from "./assets/img/img-floating.png";


const Login = () => {
  // ocultar y mostrar contraseña
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ usuario: "", clave: "" });

  const handleUsuarioChange = (evnt) => {
    setFormData({ ...formData, usuario: evnt.target.value });
  };
  const handlePasswordChange = (evnt) => {
    setFormData({ ...formData, clave: evnt.target.value });
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  //Add a password validation function
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (password.search(/[a-z]/i) < 0) {
      return "Password must contain at least one letter.";
    }
    if (password.search(/[0-9]/) < 0) {
      return "Password must contain at least one digit.";
    }
    return "";
  };

  // Add a username validation function
  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    const { usuario, clave } = formData;
    const passwordError = validatePassword(clave);
    if (passwordError) {
      alert(passwordError);
      return;
    }
    if (usuario === "admin" && clave === "Admin12345678") { // Estos son los accesos que deje quedamos
      navigate("/admin");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-body p-0 m-0">
      <div className="login-body p-0 m-0">
        <img className="floating-img" src={imgFloating} alt="floating-img" />
        <div className="d-flex flex-column justify-content-center align-items-center mt-4 login-header">
          <img className="logo" src={logo} alt="logo" />
        </div>
      </div>

      <form action="">
        <h3 className="txt-login">Ingreso de Credenciales</h3>
        <div className="container-inputs mt-5">
          <input
            className="input-user w-100"
            type="text"
            required
            onChange={handleUsuarioChange}
          />
        </div>
        <div className="container-inputs mt-4">
          <input
            className="input-user w-100"
            type={passwordType}
            onChange={handlePasswordChange}
            required
          />
          <button
            className="btn-show-pass"
            type="button"
            onClick={togglePassword}
          >
            {passwordType === "password" ? (
              <i className="fa-light fa-eye"></i>
            ) : (
              <i className="fa-light fa-eye-slash"></i>
            )}
          </button>

          <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <button
              className={"btn-login"}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Ingresar
            </button>
          </div>
        </div>
      </form>

      <div className="m-0 w-100 px-3 mt-5 d-flex justify-content-center">
        <div className="col-8 d-flex justify-content-center">
          <NavLink className="link-bottom" to="/register">
            ¿No tienes cuenta? Crear cuenta
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
