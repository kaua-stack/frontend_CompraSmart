import React, { createContext, useContext, useState, useEffect } from "react";

// Cria o contexto de Autenticação (Auth)
const AuthContext = createContext();

// Função auxiliar para inicializar os dados do usuário a partir do LocalStorage (persistência)
const getInitialData = () => {
    // Tenta recuperar o token e o nome salvos no navegador (se existirem)
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");

    return {
        isAuthenticated: !!token, // Se existe token, o usuário está autenticado
        userToken: token,         // Guarda o token na memória do React
        userName: name,           // Guarda o nome do usuário
    };
};

// Provedor que gerencia o estado de login em todo o sistema
export const AuthProvider = ({ children }) => {
    // Estado que controla se o usuário está logado ou não
    const [authState, setAuthState] = useState(getInitialData);

    // Função para realizar o Login Real
    const login = (token, name) => {
        // Salva os dados no LocalStorage para que o login não se perca ao dar F5
        localStorage.setItem("userToken", token);
        localStorage.setItem("userName", name);

        // Atualiza o estado do React
        setAuthState({
            isAuthenticated: true,
            userToken: token,
            userName: name,
        });
    };

    // Função especial para o Login de Demonstração (Sem Senha)
    const loginAsDemo = () => {
        const demoToken = "demo-token-12345";
        const demoName = "Usuário Demo";
        
        // Salva dados fakes para o modo demonstração
        localStorage.setItem("userToken", demoToken);
        localStorage.setItem("userName", demoName);

        setAuthState({
            isAuthenticated: true,
            userToken: demoToken,
            userName: demoName,
        });
    };

    // Função para sair da conta (Logout)
    const logout = () => {
        // Limpa tudo o que foi salvo no navegador
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");

        // Reseta o estado do React para deslogado
        setAuthState({
            isAuthenticated: false,
            userToken: null,
            userName: null,
        });
    };

    // Disponibiliza o estado e as funções para todos os componentes filhos
    return (
        <AuthContext.Provider value={{ ...authState, login, logout, loginAsDemo }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar a autenticação de forma simples nos componentes
export const useAuth = () => {
    return useContext(AuthContext);
};
