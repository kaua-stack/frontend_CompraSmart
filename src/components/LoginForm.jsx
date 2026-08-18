import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function LoginForm() {
  // Estados para controlar o que o usuário digita nos campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Estados para controle de erro e carregamento
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate(); // Hook para redirecionar o usuário
  const { login, loginAsDemo } = useAuth(); // Pega as funções do contexto de autenticação

  // Função para entrar no modo de demonstração (sem precisar de conta real)
  // const handleDemoLogin = () => {
  //   loginAsDemo();
  //   navigate("/dashboard", { replace: true });
  // };

  // Função chamada ao clicar em "Entrar"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento automático da página
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          user_password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.accessToken) {
          const userName = email.split("@")[0] || "Usuário";
          login(data.accessToken, userName);
          navigate("/dashboard", { replace: true });
        } else {
          setError("O servidor não retornou um token válido.");
        }
      } else {
        setError(data.error || data.message || "E-mail ou senha incorretos.");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Exibe a mensagem de erro se algo der errado */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      {/* Campo de E-mail */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Campo de Senha */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Senha
          </label>
          <a href="#" className="text-xs text-blue-600 hover:underline">
            Esqueceu a senha?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Botão de Entrar (Login Real) */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      {/* Botão de Demo (Acesso Rápido)
      <Button
        type="button"
        variant="outline"
        className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
        onClick={handleDemoLogin}
        disabled={isLoading}
      >
        Entrar como Demo (Sem Senha)
      </Button> */}

      {/* Link para criar uma nova conta */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Não tem uma conta?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:underline"
        >
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
