import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
      const response = await fetch("http://127.0.0.1:5000/user", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: name,
          user_email: email,
          user_password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const loginResponse = await fetch("http://127.0.0.1:5000/login", {
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

        const loginData = await loginResponse.json();

        if (!loginResponse.ok || !loginData.accessToken) {
          navigate("/dashboard", { replace: true });
          return;
        }

        login(loginData.accessToken, name);
        navigate("/dashboard", { replace: true });
      } else {
        setError(data.error || data.message || "Falha ao cadastrar. Tente novamente.");
      }
    } catch (err) {
      setError(
        "Erro de conexão com o servidor. Verifique se o backend está ativo."
      );
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
