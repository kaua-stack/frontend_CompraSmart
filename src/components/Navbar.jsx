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
import { Link } from "react-router-dom"; 

export function Navbar() {
  return (
    <header className="w-full px-6 md:px-12 py-4 flex justify-between items-center fixed top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <h1 className="text-2xl font-black tracking-tight text-gray-900 flex items-center gap-2">
        <a href="#home" className="hover:text-blue-600 transition-colors flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span>Compra<span className="text-blue-600">Smart</span></span>
        </a>
      </h1>

      <nav className="hidden md:flex gap-8 text-gray-600 font-medium text-sm lg:text-base">
        <a href="#solucao" className="hover:text-blue-600 hover:scale-105 transition-all">
          Funcionalidades
        </a>
        <a href="#pricing" className="hover:text-blue-600 hover:scale-105 transition-all">
          Planos
        </a>
        <a href="#faq" className="hover:text-blue-600 hover:scale-105 transition-all">
          Perguntas Frequentes
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2 shadow-sm font-semibold transition-all">
              Entrar
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 text-blue-600">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white/95 backdrop-blur-sm border-l-0">
              <SheetHeader className="mb-8 mt-4">
                <SheetTitle className="text-left text-2xl font-bold flex items-center gap-2">
                  <span>🛒</span> Compra<span className="text-blue-600">Smart</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 text-lg font-medium text-gray-700">
                <a href="#solucao" className="hover:text-blue-600 border-b border-gray-100 pb-2">
                  Funcionalidades
                </a>
                <a href="#pricing" className="hover:text-blue-600 border-b border-gray-100 pb-2">
                  Planos
                </a>
                <a href="#faq" className="hover:text-blue-600 border-b border-gray-100 pb-2">
                  Perguntas Frequentes
                </a>
                <div className="mt-8">
                  <Link to="/login" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-bold shadow-md">
                      Entrar na Conta
                    </Button>
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
