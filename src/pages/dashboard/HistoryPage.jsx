import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingDown,
  ChevronLeft,
  Calendar,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// =========================================================================
// PÁGINA: Histórico (HistoryPage)
// Relatórios visuais do dinheiro poupado usando a Inteligência de Compra.
// O backend deverá providenciar o array de somas de economia mensal.
// =========================================================================
export default function HistoryPage() {
  // Exemplo visual (dados que virão da API do Python futura)
  const totalPoupadoMes = 145.5;
  const meses = [
    { mes: "Abril", valor: 145.5, tendencia: "up" },
    { mes: "Março", valor: 89.2, tendencia: "up" },
    { mes: "Fevereiro", valor: 110.0, tendencia: "down" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 font-sans flex flex-col">
      {/* HEADER DE NAVEGAÇÃO SUPERIOR */}
      <header className="bg-white/70 backdrop-blur-2xl sticky top-0 z-50 p-6 border-b border-white shadow-sm flex items-center gap-4">
        <Link to="/dashboard" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          <ChevronLeft size={20} strokeWidth={3} />
        </Link>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Meu Histórico
          </h1>
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
            Relatório de Economia
          </p>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto w-full space-y-8 mt-2 flex-col flex-1">
        
        {/* Bloco Destaque: Grana Poupada */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-emerald-400 text-white overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <TrendingDown size={180} strokeWidth={2} />
            </div>
            
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center gap-2 bg-emerald-700/50 w-fit px-3 py-1 rounded-full shadow-inner mb-6">
                <Calendar size={14} strokeWidth={3}/>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">
                  Mês Atual
                </span>
              </div>
              
              <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-1">
                Total Economizado
              </p>
              <h2 className="text-5xl font-black italic tracking-tighter drop-shadow-md">
                R$ {totalPoupadoMes.toFixed(2).replace(".", ",")}
              </h2>
              
              <div className="mt-8 pt-6 border-t border-emerald-500/50 flex gap-4 text-emerald-50 text-sm font-medium">
                <span className="flex items-center gap-1 bg-emerald-500/50 px-2 py-1 rounded-md">
                  <ArrowUpRight size={16}/> +23% 
                </span>
                <span className="self-center">em relação ao mês passado.</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Resumo Mensal */}
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100 fill-mode-both">
          <div className="flex items-center gap-2.5 px-2">
            <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600">
              <Wallet size={18} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-500">
              Últimos Meses
            </h3>
          </div>

          <div className="space-y-4">
            {meses.map((m, i) => (
              <Card key={i} className="border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem] bg-white overflow-hidden">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-[1rem] flex items-center justify-center text-slate-400 font-black text-xl italic border border-slate-100/50">
                      {m.mes.substring(0, 3)}
                    </div>
                    <span className="font-black text-slate-700 text-lg">{m.mes}</span>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-black text-emerald-600 text-xl tracking-tighter">
                      R$ {m.valor.toFixed(2).replace(".", ",")}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest font-black text-slate-400 mt-1">Economizados</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Call to action ou Empty info do rodapé */}
        <div className="text-center pt-8">
           <p className="text-xs font-bold text-slate-400 px-8 uppercase tracking-widest leading-relaxed">
             A inteligência contínua compara seus itens e garante que você sempre pare de gastar atoa!
           </p>
        </div>

      </main>
    </div>
  );
}
