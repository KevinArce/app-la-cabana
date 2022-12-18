import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("El usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required("El usuario es requerido")
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(15, "El usuario debe tener máximo 15 caracteres"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(15, "La contraseña debe tener máximo 15 caracteres")
    .oneOf(
      [Yup.ref("username"), null],
      "La contraseña no puede ser igual al usuario"
    ),
  password2: Yup.string()
    .required("La contraseña es requerida")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
  age: Yup.number()
    .min(18, "Debe ser mayor de edad")
    .required("La edad es requerida"),
});
