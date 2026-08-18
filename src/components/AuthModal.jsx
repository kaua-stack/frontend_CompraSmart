// src/components/AuthModal.jsx

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./LoginForm";

// Recebe a prop para o texto do botão
export function AuthModal({ buttonText = "Entrar" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Entre na sua conta para ter acesso a mais funcionalidades.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
