import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    // Se estiver logado, renderiza o componente aninhado (DashboardLayout)
    return <Outlet />;
  } else {
    // Se NÃO estiver logado, redireciona para a página de login
    // Usamos state={{ from: location }} para que o login saiba para onde voltar
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
