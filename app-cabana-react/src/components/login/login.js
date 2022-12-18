import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import classNames from "classnames";
import serviceApi from "../../services/services";
import { loginSchema } from "../../validations";
import { useDetailsStore } from "../../store";
import logo from "./assets/img/logo.png";
import imgFloating from "./assets/img/img-floating.png";
import { Loader } from "../generalComponents";
import "./assets/login.css";

const Login = () => {
  const setDetails = useDetailsStore((state) => state.setDetails);
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setLoading(true);
      serviceApi
        .post("authUsers", {
          usuario: values.username,
          clave: values.password,
        })
        .then((response) => {
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
    },
  });

  return (
    <div className="login-body p-0 m-0">
      <div className="login-body p-0 m-0">
        <img className="floating-img" src={imgFloating} alt="floating-img" />
        <div className="d-flex flex-column justify-content-center align-items-center mt-4 login-header">
          <img className="logo" src={logo} alt="logo" />
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <h3 className="txt-login">Ingreso de Credenciales</h3>
        <div className="container-inputs mt-5">
          <input
            className={classNames("input-user w-100", {
              error: formik.touched.username && formik.errors.username,
            })}
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
          />
          <p className="text-danger">
            {formik.touched.username && formik.errors.username}
          </p>
        </div>
        <div className="container-inputs mt-4">
          <input
            className={classNames("input-user w-100", {
              error: formik.touched.password && formik.errors.password,
            })}
            type={passwordType}
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <p className="text-danger">
            {formik.touched.password && formik.errors.password}
          </p>
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
            <button className={"btn-login"} disabled={loading} type="submit">
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
