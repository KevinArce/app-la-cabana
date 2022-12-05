import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./assets/login.css";
import logo from "./assets/img/logo.png";
import imgFloating from "./assets/img/img-floating.png";
import serviceApi from "../../services/services";

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
  // const validatePassword = (password) => {
  //   if (password.length < 3) {
  //     return "Password must be at least 8 characters";
  //   }
  //   if (password.search(/[a-z]/i) < 0) {
  //     return "Password must contain at least one letter.";
  //   }
  //   if (password.search(/[0-9]/) < 0) {
  //     return "Password must contain at least one digit.";
  //   }
  //   return "";
  // };

  // const handleSubmit = (evnt) => {
  //   evnt.preventDefault();
  //   const { usuario, pass } = formData;
  //   const passwordError = pass;
  //   if (passwordError) {
  //     alert(passwordError);
  //     return;
  //   }
  //   if (usuario === "") {
  //     alert("Usuario is required");
  //     return;
  //   }
  //   if (pass === "") {
  //     alert("Password is required");
  //     return;
  //   }

  //   // serviceApi.post("authUsers", formData).then((response) => {
  //   //   console.log(response);
  //   //   // Save the response in the local storage
  //   //   // const dataUserlogin = localStorage.setItem(
  //   //   //   "dataUserlogin",
  //   //   //   JSON.stringify(response.data)
  //   //   // );
  //   //   // // Show only the nomProv from the response
  //   //   // const nomProv = localStorage.setItem(
  //   //   //   "nomProv",
  //   //   //   JSON.stringify(response.data.nomProv)
  //   //   // );
  //   //   //const user = localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
  //   //   //const nomProveedor = localStorage.setItem("nomProv", JSON.stringify(response.data.nomProv));

  //   //   if (response.data.error === 0) {
  //   //     navigate("/admin");
  //   //   } else {
  //   //     alert(response.data.message);
  //   //   }
  //   // });
  // };
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
              // onClick={(e) => {
              //   handleSubmit(e);
              // }}
            >
              Ingresar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
