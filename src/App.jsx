// src/App.jsx

import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// UTILS E CONTEXTOS
import PrivateRoute from "./utils/PrivateRoute"; // Mantido
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Importado com useAuth
import { ListProvider } from "./contexts/ListContext"; // Importado

// PÁGINAS E COMPONENTES
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MobileNav from "./components/MobileNav";
import Home from "./pages/dashboard/Home";
import ListsPage from "./pages/dashboard/ListsPage";
import AlertsPage from "./pages/dashboard/AlertsPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import NewListModal from "./components/NewListModal";
import ListDetailsPage from "./pages/dashboard/ListDetailsPage";
import RecipesPage from "./pages/dashboard/RecipesPage";
import HistoryPage from "./pages/dashboard/HistoryPage";
// =======================================================
// 1. DASHBOARD LAYOUT
// =======================================================
const DashboardLayout = () => {
  // Estado para controlar a abertura/fechamento do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // Estrutura base para garantir que o MobileNav fique fixo
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {" "}
      {/* Adicionado pb-20 para não esconder conteúdo */}
      {/* O Outlet renderiza o conteúdo da rota filha (Home, ListsPage, etc.) */}
      <Outlet />
      {/* A navegação móvel fica fixa e passa a função para abrir o modal */}
      <MobileNav onFabClick={() => setIsModalOpen(true)} />
      <NewListModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

// =======================================================
// 2. FUNÇÃO PRINCIPAL APP
// Define todas as rotas e injeta Contextos
// =======================================================
export default function App() {
  // A verificação de autenticação será feita dentro do PrivateRoute (que usa useAuth)

  return (
    <BrowserRouter>
      {/*  AuthProvider deve envolver TUDO que precisa saber sobre o usuário */}
      <AuthProvider>
        <Routes>
          {/* ========================================
            ROTAS PÚBLICAS
            ======================================== */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ROTA RAIZ (/) - Sempre renderiza a LandingPage */}
          <Route path="/" element={<LandingPage />} />

          {/* ========================================
            ROTAS PROTEGIDAS (DASHBOARD)
            ======================================== */}
          <Route element={<PrivateRoute />}>
            {/* ListProvider ENVOLVENDO AS ROTAS DO DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <ListProvider>
                  <DashboardLayout />
                </ListProvider>
              }
            >
              {/* ROTAS FILHAS */}
              <Route index element={<Home />} />
              <Route path="lists" element={<ListsPage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="lists/:id" element={<ListDetailsPage />} />
              <Route path="recipes" element={<RecipesPage />} />
              <Route path="history" element={<HistoryPage />} />
              {/* Redirecionamento 404 dentro do Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          {/* Rota Fallback/404 Global */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
