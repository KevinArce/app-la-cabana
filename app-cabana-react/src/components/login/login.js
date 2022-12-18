import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./assets/login.css";
import logo from "./assets/img/logo.png";
import imgFloating from "./assets/img/img-floating.png";
import serviceApi from "../../services/services";
import { useDetailsStore } from "../../store";
import { Loader } from "../generalComponents";

const Login = () => {
  const setDetails = useDetailsStore((state) => state.setDetails);
  const [loading, setLoading] = useState(false);
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

  // const validatePassword = (password) => {
  //   if (password.length < 3) {
  //     return "Password must be at least 3 characters";
  //   }
  //   if (password.search(/[a-z]/i) < 0) {
  //     return "Password must contain at least one letter.";
  //   }
  //   if (password.search(/[0-9]/) < 0) {
  //     return "Password must contain at least one digit.";
  //   }
  //   return "";
  // };

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    setLoading(true);
    const { usuario, pass } = formData;
    const passwordError = pass;
    if (passwordError) {
      alert(passwordError);
      return;
    }
    if (usuario === "") {
      alert("Usuario is required");
      return;
    }
    if (pass === "") {
      alert("Password is required");
      return;
    }

    serviceApi.post("authUsers", formData).then((response) => {
      setLoading(false);
      if (response.data.error === 0) {
        //save on local storage
        const detailsObj = {
          usuario: response.data.data.usuario,
          nombre: response.data.data.nombre,
          codProv: response.data.data.codProv,
          nomProv: response.data.data.nomProv,
          tipo: response.data.data.tipo,
        };

        setDetails(detailsObj);
        localStorage.setItem("details", JSON.stringify(detailsObj));
        navigate("/admin");
      } else {
        setLoading(false);
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
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
              disabled={loading}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <Loader height={25} width={25} color={"#fff"} stroke={4} />
                </div>
              ) : (
                "Ingresar"
              )}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
