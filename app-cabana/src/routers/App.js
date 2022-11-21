import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/login/login";
import AppRoutes from "../routers/AppRoutes";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Home/*"
          element={
            <PrivateRoute user={user}>
              <AppRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
