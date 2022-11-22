import React, { useContext } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/login/login";
import AppRoutes from "../routers/AppRoutes";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <HashRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute user={user}>
              <AppRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
      
    </HashRouter>
  );
};

export default App;
