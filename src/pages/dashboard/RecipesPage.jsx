import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChefHat,
  Plus,
  Check,
  Store,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// =========================================================================
// PÁGINA: Receitas (RecipesPage)
// Permite ao usuário buscar uma receita e adicionar os ingredientes à sua lista
// A lógica do botão de salvar ficará para o Backend/API que você construirá.
// =========================================================================
export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Exemplo Estático (Mock de dados que viria do seu Backend AI)
  // Como combinamos, crio a UI e você gerencia o Backend no Python depois.
  const mockedRecipe = {
    name: "Bolo de Cenoura",
    ingredients: [
      { name: "Ovos", status: "em casa", price: 0 },
      { name: "Farinha", status: "comprar", price: 4.5 },
      { name: "Açúcar", status: "comprar", price: 5.2 },
      { name: "Cenoura", status: "comprar", price: 3.8 },
    ],
    totalExtra: 13.5,
  };

  const [simulatedSearch, setSimulatedSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    // Simula que achou a receita (em um projeto real chamaria a API do backend)
    setSimulatedSearch(true); 
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 font-sans flex flex-col">
      {/* ================================================== */}
      {/* HEADER DE NAVEGAÇÃO SUPERIOR */}
      {/* ================================================== */}
      <header className="bg-white/70 backdrop-blur-2xl sticky top-0 z-50 p-6 border-b border-white shadow-sm flex items-center gap-4">
        <Link to="/dashboard" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          <ChevronLeft size={20} strokeWidth={3} />
        </Link>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Inteligência de Receitas
          </h1>
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
            Receitas & Planejamento
          </p>
        </div>
      </header>

      {/* ================================================== */}
      {/* CONTEÚDO PRINCIPAL */}
      {/* ================================================== */}
      <main className="p-6 max-w-2xl mx-auto w-full space-y-8 mt-2 flex-col flex-1">
        
        {/* Bloco de Busca (Formulário) */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-orange-400 text-white overflow-hidden relative">
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <ChefHat size={140} strokeWidth={1} />
            </div>
            <CardContent className="p-8 relative z-10">
              <h2 className="text-3xl font-black italic tracking-tighter drop-shadow-md mb-2">
                O que tem para o almoço?
              </h2>
              <p className="text-orange-100 text-sm font-medium mb-6 leading-relaxed max-w-[280px]">
                Busque uma receita e descubra quanto custa fazê-la. Nós separamos só o que falta na despensa.
              </p>

              <form onSubmit={handleSearch} className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">
                  <Search size={22} strokeWidth={2.5}/>
                </div>
                <Input
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border-none shadow-inner bg-white text-slate-900 font-bold text-lg"
                  placeholder="Ex: Bolo de Cenoura..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </CardContent>
          </Card>
        </section>

        {/* ================================================== */}
        {/* RESULTADO (Simulado para fins de GUI Front-end) */}
        {/* Quando ele digita algo, a tela mostra os cards como combinamos no plan */}
        {/* ================================================== */}
        {simulatedSearch ? (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100 fill-mode-both">
            <div className="flex items-center gap-2.5 px-2">
              <div className="bg-orange-100 p-1.5 rounded-lg text-orange-500">
                <ChefHat size={18} strokeWidth={2.5} />
              </div>
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-500">
                Receita Encontrada
              </h3>
            </div>

            <Card className="border border-orange-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] bg-white overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-2xl font-black text-slate-800 tracking-tight">{mockedRecipe.name}</h4>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {mockedRecipe.ingredients.length} Ingredientes
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  {mockedRecipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100/60">
                      <div className="flex items-center gap-3">
                        {ing.status === "em casa" ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center">
                            <Check size={16} strokeWidth={3}/>
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                            <Store size={16} strokeWidth={3}/>
                          </div>
                        )}
                        <span className={`font-black text-[15px] ${ing.status === "em casa" ? "text-slate-400 line-through" : "text-slate-700"}`}>
                          {ing.name}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                        {ing.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center bg-orange-50 rounded-2xl p-5 border border-orange-100/50 mb-5">
                  <div>
                    <p className="text-[10px] uppercase font-black text-orange-500 tracking-widest mb-1">Custo Estimado a Comprar</p>
                    <p className="text-3xl font-black text-slate-800 italic tracking-tighter leading-none">
                      <span className="text-lg mr-1">R$</span>{mockedRecipe.totalExtra.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>

                {/* Este botão num escopo full stack executaria uma chamada Axios para o backend */}
                <Button className="w-full h-14 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-black rounded-[1.2rem] text-lg shadow-lg shadow-orange-500/20 group uppercase tracking-wide">
                  Adicionar Ingredientes Faltantes
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                </Button>
              </CardContent>
            </Card>
          </section>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-10 text-center border-2 border-dashed border-slate-200 mt-10">
            <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={28} />
            </div>
            <p className="text-slate-500 font-bold text-sm">
              Pesquise qualquer receita acima para o robô mapear o custo.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
