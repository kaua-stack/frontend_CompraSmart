import React from "react";
import {
  User,
  Mail,
  Crown,
  LogOut,
  Settings,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// =========================================================================
// CONTEXTO DE AUTH
// Precisamos disto para pegar o logout e o nome e email autenticados.
// O Backend é quem gerencia o JWT e destrói os cookies na chamada `logout`.
// =========================================================================
import { useAuth } from "@/contexts/AuthContext";

// =========================================================================
// PROFILE PAGE (Meu Perfil)
// Dashboard visual do cliente para status de software, planos, e deslogar.
// =========================================================================
export default function Profile() {
  // Retirando dados injetados via JWT (ou sessão da DB de backend)
  const { userName, userEmail, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 font-sans flex flex-col">
      {/* ================================================== */}
      {/* IDENTIDADE TOP NAV BAR VISUAL (Avatar do cliente) */}
      {/* ================================================== */}
      <div className="bg-white border-b border-slate-100 p-8 pt-16 text-center shadow-sm">
        <div className="relative inline-block animate-in zoom-in duration-500">
          {/* Avatar principal. Como não temos upload de foto ainda, usamos cor sólida */}
          <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/30 text-white mb-5 transition-transform hover:scale-105 duration-300">
            <User size={48} strokeWidth={2.5} />
          </div>
          {/* Indicador de Online verde (UX clássico) */}
          <div className="absolute bottom-4 right-0 bg-emerald-400 border-[5px] border-white w-7 h-7 rounded-full shadow-sm"></div>
        </div>
        
        {/* Dados Pessoais preenchidos do Backend dinamicamente */}
        <h1 className="text-3xl font-black text-slate-900 tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-both">
          {userName || "Configurando..."}
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 fill-mode-both">
          <Mail size={14} className="text-slate-300" /> {userEmail || "email@anonimo"}
        </div>
      </div>

      <main className="flex-1 p-4 md:p-8 max-w-2xl mx-auto w-full space-y-8 mt-4">
        
        {/* ================================================== */}
        {/* MÓDULO ASSINATURA & PLANOS (Gamification/Premium UI) */}
        {/* Mostra ao usuário o status da licença do App, dando gatilho de valor */}
        {/* ================================================== */}
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both">
          <div className="flex items-center gap-2.5 px-3">
            <div className="bg-amber-100 p-1.5 rounded-lg text-amber-500">
              <CreditCard size={18} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">
              Sua Assinatura
            </h3>
          </div>
          
          {/* Cartão escuro para denotar o plano Premium / Elite */}
          <Card className="border border-slate-800/50 shadow-2xl shadow-slate-900/10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white overflow-hidden relative group">
            {/* Decalque decorativo de Coroa que brilha no hover */}
            <Crown
              className="absolute -right-4 -bottom-4 text-white/5 transition-all duration-700 rotate-12 group-hover:scale-110 group-hover:text-amber-500/10"
              size={180}
            />
            {/* Decorativo light ray/sparkle */}
            <Sparkles className="absolute top-6 right-6 text-amber-400/20" size={40} />

            <CardContent className="p-8 relative z-10 w-full h-full">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-3 py-1.5 rounded-full w-fit mb-4 shadow-sm shadow-amber-400/20">
                    <Crown size={14} strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Acesso Beta Elite
                    </span>
                  </div>
                  <h4 className="text-3xl font-black italic tracking-tighter drop-shadow-md">
                    Smart Pro
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400/80 uppercase tracking-widest mb-1">
                    Ciclo
                  </p>
                  <p className="text-2xl font-black text-amber-400 italic">
                    Livre
                  </p>
                </div>
              </div>

              {/* Benefícios que o cliente está utilizando gratuitamente */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
                  <div className="bg-emerald-500/20 p-1 rounded-full text-emerald-400">
                    <ShieldCheck size={16} strokeWidth={3} />
                  </div>
                  Scanner de comparativo em todo Brasil
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
                  <div className="bg-emerald-500/20 p-1 rounded-full text-emerald-400">
                    <ShieldCheck size={16} strokeWidth={3} />
                  </div>
                  Listagem e orçamentos múltiplos libados
                </div>
              </div>

              {/* Tag text rodapé premium */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-400/70 uppercase tracking-widest">
                  Status da Conta
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> Ativo e Funcional
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ================================================== */}
        {/* CONFIGURAÇÕES GERAIS / SEGURANÇA E DESLOGAR */}
        {/* ================================================== */}
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both mt-8">
          <div className="flex items-center gap-2.5 px-3">
            <div className="bg-slate-200 p-1.5 rounded-lg text-slate-500">
              <Settings size={18} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">
              Segurança
            </h3>
          </div>

          <div className="space-y-3">
            {/* O Botão de Logout de forma super chamativa que acionará o seu AuthContext (que por consequência fala com a API) */}
            <button
              onClick={logout}
              className="w-full p-6 bg-white border border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2rem] flex items-center justify-between group hover:border-red-200 hover:shadow-[0_8px_30px_rgb(239,68,68,0.1)] hover:bg-gradient-to-r hover:from-white hover:to-red-50/50 transition-all duration-300 active:scale-[0.98]"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-red-50 text-red-500 rounded-[1.2rem] flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">
                  <LogOut size={24} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-800 text-lg group-hover:text-red-900 transition-colors">Encerrar Sessão</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    Deslogar segurança local
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full group-hover:bg-red-100 transition-colors">
                <ChevronRight
                  size={20}
                  strokeWidth={2.5}
                  className="text-slate-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all"
                />
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
