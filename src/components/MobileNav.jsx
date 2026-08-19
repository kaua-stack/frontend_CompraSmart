import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  ListChecks,
  AlertTriangle,
  User,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLists } from "@/contexts/ListContext"; // Importando o contexto para criar a lista

const navItems = [
  { path: "/dashboard", label: "Home", Icon: HomeIcon },
  { path: "/dashboard/lists", label: "Listas", Icon: ListChecks },
  // Espaçador para o botão central
  { isSpacer: true },
  { path: "/dashboard/alerts", label: "Alertas", Icon: AlertTriangle },
  { path: "/dashboard/profile", label: "Perfil", Icon: User },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addList } = useLists();

  // Estados para o Modal Global de Nova Lista
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setError("");
    setIsSubmitting(true);
    try {
      const newList = await addList(name.trim(), budget);
      if (newList && newList._id) {
        setName("");
        setBudget("");
        setShowModal(false);
        navigate(`/dashboard/lists/${newList._id}`);
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Não foi possível criar a lista. Verifique se o backend está ativo e se você está autenticado.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLinkActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t p-2 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-40 px-4 h-16">
        {navItems.map((item, index) => {
          if (item.isSpacer) {
            return <div key="spacer" className="w-14" />; // Espaço para o botão flutuante
          }

          const isActive = isLinkActive(item.path);
          const Icon = item.Icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center transition-all ${
                isActive ? "text-blue-600 scale-110" : "text-slate-400"
              }`}
            >
              <Icon
                className={`${isActive ? "w-6 h-6" : "w-5 h-5"}`}
                strokeWidth={isActive ? 3 : 2}
              />
              <span
                className={`text-[10px] font-black uppercase tracking-tighter mt-0.5 ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Botão Flutuante Central */}
        <Button
          type="button"
          onClick={() => {
            setError("");
            setShowModal(true);
          }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 w-14 h-14 rounded-2xl shadow-lg shadow-blue-200 border-4 border-white active:scale-90 transition-all z-50 p-0"
        >
          <Plus className="w-8 h-8 text-white" strokeWidth={3} />
        </Button>
      </nav>

      {/* MODAL GLOBAL DE CRIAÇÃO */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-4">
          <Card className="w-full max-w-md rounded-[2.5rem] border-none shadow-2xl animate-in slide-in-from-bottom duration-300">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">
                  Nova Lista
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 p-2 hover:bg-slate-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-5">
                {error && (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 italic">
                    Nome da Lista
                  </label>
                  <Input
                    placeholder="Ex: Compras da Semana"
                    className="h-14 rounded-2xl bg-slate-50 border-none text-lg font-bold px-6"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 italic">
                    Limite de Gasto (Budget)
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400 italic">
                      R$
                    </span>
                    <Input
                      type="number"
                      placeholder="0,00"
                      className="h-14 rounded-2xl bg-slate-50 border-none text-lg font-bold pl-14"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !name.trim()}
                  className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-lg shadow-blue-100 mt-2"
                >
                  {isSubmitting ? "Criando..." : "Criar Agora"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
