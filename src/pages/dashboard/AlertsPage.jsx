import React, { useState, useEffect } from "react";
import api from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Trash2, Plus, Check } from "lucide-react";

// =========================================================================
// PÁGINA: Alertas de Saúde (AllergiesPage/AlertsPage)
// Gerencia restrições alimentares do usuário para inteligência pré-compra.
// =========================================================================

// Uma coleção base de alergias para botão rápido na UI
const COMMON_ALLERGIES = [
  "Amendoim",
  "Leite",
  "Glúten",
  "Ovos",
  "Peixes",
  "Crustáceos",
  "Soja",
  "Nozes",
];

export default function AllergiesPage() {
  // stados para controlar as seleções, e o input manual.
  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [loading, setLoading] = useState(true);

  // Assim que abrir a página, bate na API do backend para pegar que restrições o user já salvou
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users/profile");
        // Salva na memória do react para podermos exibir na interface visual
        setAllergies(data.allergies || []);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false); // Remove o estado visual "carregando..."
      }
    };
    fetchProfile();
  }, []);

  // -------------------------------------------------------------
  // Função auxiliar central: sincronizar os cliques no Frontend com o Backend DB
  // -------------------------------------------------------------
  const updateAllergies = async (updatedList) => {
    try {
      // Faz uma requisição "PUT" (atualizar) na rota de perfil enviando um Array String "[]"
      await api.put("/users/profile", { allergies: updatedList });
      // Atualiza o desenho na tela
      setAllergies(updatedList);
    } catch (err) {
      console.error("Erro ao atualizar alergias:", err);
    }
  };

  // Trata o clique que foi feito em cima das opções prontas (grid)
  const handleToggleAllergy = (allergyName) => {
    const isSelected = allergies.includes(allergyName);
    let updated;
    
    // Se ele tiver clicado em algo que já está selecionado, ele na verdade quer remover!
    if (isSelected) {
      updated = allergies.filter((a) => a !== allergyName);
    } else {
      // Caso contrário, junte tudo que ele tinha + a opção nova que clicou
      updated = [...allergies, allergyName];
    }
    
    // Manda pro DB
    updateAllergies(updated);
  };

  // Trata o campo de texto manual onde a pessoa digita exotica como "Corante X"
  const handleAddManual = (e) => {
    e.preventDefault(); 
    // Evita duplicatas exatas ou sujeira em branco
    if (!newAllergy.trim() || allergies.includes(newAllergy.trim())) return;
    
    const updated = [...allergies, newAllergy.trim()];
    updateAllergies(updated);
    setNewAllergy(""); // Limpa o input pra ele botar mais depois
  };

  if (loading)
    // Trazido um visual pulse melhorzinho pra loading.
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="p-8 text-center text-slate-400 font-black animate-pulse uppercase tracking-widest text-xs">
          Analisando Saúde...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pt-8">
        
        {/* ================================================== */}
        {/* CABEÇALHO */}
        {/* ================================================== */}
        <header className="flex items-center gap-4">
          <div className="w-14 h-14 bg-red-100/50 border border-red-100 rounded-[1.2rem] flex items-center justify-center text-red-500 shadow-sm">
            <ShieldAlert size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Alertas de Saúde
            </h1>
            <p className="text-[10px] font-black text-red-500/80 uppercase tracking-[0.2em] mt-1">
              Blindagem de Carrinho
            </p>
          </div>
        </header>

        {/* ================================================== */}
        {/* GRID DAS ALERGIAS COMUNS. Renderizadas visualmente com "active/inactive" classes */}
        {/* ================================================== */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {COMMON_ALLERGIES.map((item) => {
            const active = allergies.includes(item);
            return (
              <button
                key={item}
                onClick={() => handleToggleAllergy(item)}
                className={`p-4 rounded-[1.5rem] font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border-2 transform active:scale-95 ${
                  active
                    ? "bg-red-50 border-red-500 text-red-600 shadow-[0_8px_30px_rgb(239,68,68,0.15)]"
                    : "bg-white border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-400 hover:border-slate-200"
                }`}
              >
                {item}
                {/* Se ativo mudamos o ícone de + para um Check maravilhoso */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${active ? "bg-red-500 text-white" : "bg-slate-50 text-slate-300"}`}>
                  {active ? (
                    <Check size={14} strokeWidth={4} />
                  ) : (
                    <Plus size={14} strokeWidth={3} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ================================================== */}
        {/* CARD INPUT MANUAL - para criar uma restrição ad-hoc */}
        {/* ================================================== */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] bg-white mt-8 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span> 
              Customizar Restrição
            </p>
            <form onSubmit={handleAddManual} className="flex gap-3 relative">
              <Input
                placeholder="Ex: Corante e150a, Aspartame..."
                className="h-16 rounded-[1.2rem] text-sm sm:text-lg font-bold bg-slate-50 shadow-inner border-transparent focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all pl-5 pr-16"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-slate-900 hover:bg-slate-800 transition-all shadow-md shrink-0 flex items-center justify-center text-white"
              >
                <Plus strokeWidth={3} size={20} />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* ================================================== */}
        {/* LISTA DINÂMICA DE ALERGIAS MANUAIS (exibe só as que não estão nos blocos base) */}
        {/* ================================================== */}
        <div className="space-y-3 pt-4">
          {allergies
            .filter((a) => !COMMON_ALLERGIES.includes(a))
            .map((custom, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white shadow-sm border border-slate-100 group transition-all hover:border-red-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-red-400 transition-colors"></div>
                  <span className="font-black text-slate-700 uppercase tracking-wide text-sm italic">
                    {custom}
                  </span>
                </div>
                {/* Reproveita `handleToggleAllergy` que na verdade deleta se existir */}
                <button
                  onClick={() => handleToggleAllergy(custom)}
                  className="text-slate-300 hover:text-red-500 bg-slate-50 hover:bg-red-50 p-2 rounded-lg transition-all"
                >
                  <Trash2 size={18} strokeWidth={2.5}/>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
