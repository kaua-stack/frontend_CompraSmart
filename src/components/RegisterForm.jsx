import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";

export function RegisterForm() {
  // Estados para capturar os dados do novo usuário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Estado para exibir erros caso o cadastro falhe
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Função chamada ao clicar em "Criar conta"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post("/user", {
        user_name: name,
        user_email: email,
        user_password: password,
      });

      const { data: loginData } = await api.post("/login", {
        user_email: email,
        user_password: password,
      });

      if (!loginData?.accessToken) {
        setError("A conta foi criada, mas o servidor não retornou um token válido.");
        return;
      }

      login(loginData.accessToken, name);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || "Erro de conexão com o servidor. Verifique se o backend está ativo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mensagem de erro amigável */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Campo para o Nome Completo */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium leading-none">
          Nome
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Campo para o E-mail */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium leading-none">
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Campo para escolher a Senha */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium leading-none">
          Senha
        </label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Botão de Finalizar Cadastro */}
      <Button type="submit" className="w-full">
        Criar conta
      </Button>

      {/* Link de volta para a tela de Login */}
      <div className="mt-4 text-center text-sm">
        Já tem uma conta?{" "}
        <Link to="/login" className="underline">
          Entrar
        </Link>
      </div>
    </form>
  );
}
