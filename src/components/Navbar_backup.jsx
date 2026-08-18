// src/components/Navbar.jsx

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom"; // Importa o Link

export function Navbar() {
  return (
    <header className="w-full px-4 sm:px-8 py-4 flex justify-between items-center shadow-md fixed top-0 bg-white z-50">
      <h1 className="text-2xl font-bold">
        <a href="#home" className="hover:text-red-600">
          CompraSmart
        </a>
      </h1>

      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <a href="#features" className="hover:text-red-600 transition-colors">
          Recursos
        </a>
        <a href="#precos" className="hover:text-red-600 transition-colors">
          Planos
        </a>
        <a href="#contato" className="hover:text-red-600 transition-colors">
          Contato
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          {/* O botão agora é um Link que navega para /login */}
          <Link to="/login">
            <Button variant="outline">Entrar</Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <a href="#features" className="hover:text-red-600">
                  Recursos
                </a>
                <a href="#precos" className="hover:text-red-600">
                  Planos
                </a>
                <a href="#contato" className="hover:text-red-600">
                  Contato
                </a>
                <div className="mt-4">
                  {/* Link para a página de login */}
                  <Link to="/login">
                    <Button>Entrar</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
