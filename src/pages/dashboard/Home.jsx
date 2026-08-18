import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import {
  Bell,
  ListChecks,
  User,
  ShoppingBag,
  TrendingDown,
  Store,
  Tag,
  Calendar,
  ChevronRight,
  Wallet,
  ArrowDown,
  ChefHat,
  LineChart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// =========================================================================
// CONTEXTOS
// Utilizamos os contextos para obter dados que vêm do hook e da API (Backend).
// Mesmo sendo frontend, consumimos esses dados que VOCÊ gerenciará pelo backend.
// =========================================================================
import { useAuth } from "@/contexts/AuthContext";
import { useLists } from "@/contexts/ListContext";

// =========================================================================
// COMPONENTE: FinancialSummary (Resumo Financeiro)
// =========================================================================
const FinancialSummary = ({ totalBudget, totalSpent }) => {
  const percentUsed =
    totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
  
  const saldoRestante = totalBudget - totalSpent;

  return (
    <Card className="shadow-2xl mb-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-none rounded-[2.5rem] overflow-hidden relative group transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10 duration-500">
        <TrendingDown size={140} />
      </div>
      
      <CardContent className="pt-10 p-8 relative z-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-2 text-left">
            Limite Consolidado
          </p>
          <p className="text-5xl font-black italic tracking-tighter text-left bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent drop-shadow-md">
            R$ {totalBudget.toFixed(2).replace(".", ",")}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-400">Uso do Orçamento</span>
            <span
              className={`transition-colors duration-300 ${
                totalSpent > totalBudget ? "text-red-400" : "text-blue-400"
              }`}
            >
              {percentUsed.toFixed(0)}%
            </span>
          </div>
          <Progress
            value={percentUsed}
            className="h-2.5 bg-slate-800/50 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-blue-400 transition-all shadow-inner"
          />
        </div>

        <Separator className="my-8 bg-slate-800/50" />

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest text-left">
              No Carrinho
            </p>
            <p className="font-black text-2xl text-emerald-400 tracking-tight text-left drop-shadow-sm">
              R$ {totalSpent.toFixed(2).replace(".", ",")}
            </p>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest text-right">
              Saldo Geral
            </p>
            <p
              className={`font-black text-2xl tracking-tight drop-shadow-sm transition-colors ${
                saldoRestante < 0 ? "text-red-400" : "text-slate-100"
              }`}
            >
              R$ {saldoRestante.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// =========================================================================
// PÁGINA PRINCIPAL: Home (Dashboard)
// =========================================================================
export default function Home() {
  const { userName } = useAuth(); 
  const { lists, fetchLists } = useLists(); 

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const getPriceComparison = () => {
    const itemMap = {};
    lists.forEach((list) => {
      list.items?.forEach((item) => {
        const name = item.name.toLowerCase().trim();
        if (item.price > 0) {
          if (!itemMap[name]) itemMap[name] = [];
          itemMap[name].push({
            price: item.price,
            market: list.market || "Outro", 
            date: list.createdAt,
          });
        }
      });
    });

    return Object.entries(itemMap)
      .map(([name, prices]) => {
        const sorted = prices.sort((a, b) => a.price - b.price);
        const best = sorted[0]; 
        const worst = sorted[sorted.length - 1]; 
        const economy = worst.price - best.price; 
        return { name, best, worst, economy };
      })
      .filter((item) => item.economy > 0)
      .sort((a, b) => b.economy - a.economy)
      .slice(0, 3);
  };

  const comparisons = getPriceComparison();
  
  const totalBudgetReal = lists.reduce(
    (acc, list) => acc + (Number(list.budget) || 0),
    0
  );
  
  const totalSpentReal = lists.reduce((acc, list) => {
    const marcados = list.items?.filter((i) => i.checked) || [];
    return acc + marcados.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }, 0);

  const recentLists = [...lists].reverse().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24 font-sans">
      
      {/* CABEÇALHO (HEADER FIXO) */}
      <header className="bg-white/70 backdrop-blur-2xl sticky top-0 z-50 p-6 border-b border-white shadow-sm shadow-slate-100/50">
        <div className="flex justify-between items-center max-w-2xl mx-auto w-full">
          <span className="font-black text-2xl bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent tracking-tighter italic">
            CompraSmart
          </span>
          <Link to="/dashboard/profile" className="transform transition-transform active:scale-95">
            <div className="w-11 h-11 bg-white rounded-[1.2rem] flex items-center justify-center text-slate-600 border border-slate-200 shadow-md shadow-slate-200/50 hover:bg-slate-50 transition-colors">
              <User size={20} strokeWidth={2.5}/>
            </div>
          </Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL (MAIN) */}
      <main className="flex-1 p-6 max-w-2xl mx-auto w-full space-y-10">
        
        {/* Saudação */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Olá, {userName ? userName.split(" ")[0] : "Usuário"}!
          </h2>
          <p className="text-xs font-bold text-blue-600/80 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Plano Gratuito
          </p>
        </section>

        {/* Resumo */}
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
          <FinancialSummary
            totalBudget={totalBudgetReal}
            totalSpent={totalSpentReal}
          />
        </section>

        {/* ================================================== */}
        {/* NOVOS ATALHOS: Receitas E Histórico (Landing page features) */}
        {/* ================================================== */}
        <section className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <Link to="/dashboard/recipes" className="block active:scale-95 transition-transform">
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.3)] transition-all rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-500 text-white overflow-hidden relative group">
              <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 delay-75">
                <ChefHat size={120} strokeWidth={1}/>
              </div>
              <CardContent className="p-5 flex flex-col justify-between h-36 relative z-10 w-full">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner">
                   <ChefHat size={20} strokeWidth={2.5}/>
                </div>
                <div>
                   <p className="font-black text-xl tracking-tight leading-tight mb-1">Receitas</p>
                   <p className="text-[9px] uppercase tracking-widest font-black text-orange-100 opacity-90">Planeje pratos</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/history" className="block active:scale-95 transition-transform">
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.3)] transition-all rounded-[2rem] bg-gradient-to-br from-emerald-400 to-emerald-500 text-white overflow-hidden relative group">
              <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 delay-75">
                <LineChart size={120} strokeWidth={1}/>
              </div>
              <CardContent className="p-5 flex flex-col justify-between h-36 relative z-10 w-full">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner">
                   <LineChart size={20} strokeWidth={2.5}/>
                </div>
                <div>
                   <p className="font-black text-xl tracking-tight leading-tight mb-1">Histórico</p>
                   <p className="text-[9px] uppercase tracking-widest font-black text-emerald-100 opacity-90">R$ Poupados</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Listas Recentes */}
        <section className="space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                <ShoppingBag size={18} strokeWidth={2.5} />
              </div>
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-500">
                Acessos Recentes
              </h3>
            </div>
            <Link
              to="/dashboard/lists"
              className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 transition-colors py-1 px-2 hover:bg-blue-50 rounded-md"
            >
              Ver todas
            </Link>
          </div>

          <div className="space-y-4">
            {recentLists.length > 0 ? (
              // Map: Roda a função para cada lista dentro do `recentLists` criando um HTML pra elas.
              recentLists.map((list) => (
                <Link key={list._id} to={`/dashboard/lists/${list._id}`} className="block transform transition-all active:scale-95">
                  <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)] transition-all rounded-[2rem] overflow-hidden group bg-white hover:bg-blue-50/30">
                    <CardContent className="p-5 flex items-center gap-5">
                      
                      {/* Ícone customizado indicando o Mês de criação */}
                      <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-[1.2rem] flex flex-col items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-sm">
                        <Calendar size={18} strokeWidth={2.5} />
                        <span className="text-[8px] font-black uppercase mt-1 tracking-wider">
                          {new Date(list.createdAt)
                            .toLocaleDateString("pt-BR", { month: "short" })
                            .replace(".", "")}
                        </span>
                      </div>
                      
                      {/* Informações centrais da Lista */}
                      <div className="flex-1 text-left">
                        <p className="font-black text-slate-800 text-lg group-hover:text-blue-900 transition-colors">
                          {list.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-slate-400 uppercase tracking-wide mt-1">
                          <Store size={12} strokeWidth={2.5}/>
                          <span>{list.market || "Geral"}</span>
                        </div>
                      </div>
                      
                      {/* Seta de navegação animada pro lado ao encostar */}
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 group-hover:bg-blue-100 transition-colors">
                        <ChevronRight
                          size={20}
                          strokeWidth={2.5}
                          className="text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              // Empty State: O que mostrar quando o usuário é novo e não tem listas cadastradas.
              <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-10 text-center border-2 border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ListChecks size={28} />
                </div>
                <p className="text-slate-500 font-bold text-sm">
                  Crie sua primeira lista no botão no centro da tela inferior!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Compartivo de Inteligência */}
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 fill-mode-both">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg shadow-sm">
                <Tag size={18} strokeWidth={2.5} />
              </div>
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-500">
                Inteligência de Mercado
              </h3>
            </div>
            <span className="text-[9px] bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-2.5 py-1 rounded-full font-black uppercase tracking-wider drop-shadow-sm">
              Plus
            </span>
          </div>

          <div className="grid gap-5">
            {comparisons.length > 0 ? (
              comparisons.map((item, i) => (
                <Card
                  key={i}
                  className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] transition-all duration-300 rounded-[2rem] bg-white overflow-hidden relative group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
                  
                  <CardContent className="p-7">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-black text-slate-900 text-xl capitalize italic">
                        {item.name}
                      </h4>
                      <div className="bg-emerald-50/80 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                        🏆 Melhor Escolha
                      </div>
                    </div>

                    <div className="space-y-4 relative">
                      <div className="flex items-center justify-between text-sm px-3 opacity-60 filter grayscale hover:grayscale-0 transition-all">
                        <span className="font-bold flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <Store size={14} />
                          </div>
                          {item.worst.market}
                        </span>
                        <span className="font-black line-through text-slate-400">
                          R$ {item.worst.price.toFixed(2).replace(".", ",")}
                        </span>
                      </div>

                      <div className="flex justify-center -my-3 relative z-10">
                        <div className="bg-white rounded-full p-1.5 border border-slate-100 shadow-sm text-emerald-500">
                          <ArrowDown size={14} strokeWidth={3}/>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-base bg-gradient-to-r from-emerald-50 to-emerald-100/50 p-4 rounded-2xl border border-emerald-100/60 shadow-inner group-hover:border-emerald-200 transition-colors">
                        <span className="text-emerald-800 font-bold flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[1rem] bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                            <Store size={18} strokeWidth={2.5} />
                          </div>
                          <span className="font-black text-lg">{item.best.market}</span>
                        </span>
                        <span className="text-emerald-600 font-black text-2xl drop-shadow-sm">
                          R$ {item.best.price.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-dashed border-slate-200 flex justify-between items-center bg-slate-50/50 -mx-7 -mb-7 px-7 pb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                          <Wallet size={16} className="text-emerald-600" />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Dinheiro Salvo:
                        </p>
                      </div>
                      <span className="font-black text-xl text-emerald-600 tracking-tighter bg-emerald-100/50 px-3 py-1 rounded-xl border border-emerald-200/50 shadow-sm">
                        + R$ {item.economy.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/30 rounded-[2.5rem] p-8 text-center border border-emerald-100/50 shadow-sm">
                <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <Tag size={24} strokeWidth={2.5} />
                </div>
                <p className="text-emerald-800 font-black text-sm uppercase tracking-widest mb-1">Sem Dados de Comparação</p>
                <p className="text-emerald-600/70 font-bold text-xs leading-relaxed">
                  Adicione preços em no mínimo dois mercados diferentes para nossa inteligência criar a mágica da economia.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
