import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ShieldAlert,
  CreditCard,
  LineChart,
  CheckCircle,
  TrendingDown,
  PieChart,
  Brain,
  Search,
  Settings,
  ShieldCheck
} from "lucide-react";

export default function SolucaoSection() {
  const solucao = [
    {
      key: "lista",
      titulo: "Lista Inteligente",
      descricao: "Crie e organize suas listas de compras com facilidade, separando por categorias e mercados.",
      Icon: ShoppingCart,
    },
    {
      key: "comparar",
      titulo: "Comparação de Mercados",
      descricao: "Compare preços da sua lista em diferentes mercados e descubra onde economizar mais.",
      Icon: CreditCard,
    },
    {
      key: "gastos",
      titulo: "Controle de Gastos",
      descricao: "Acompanhe quanto está gastando em tempo real e evite surpresas no caixa.",
      Icon: PieChart,
    },
    {
      key: "decisao",
      titulo: "Decisão de Compra Inteligente",
      descricao: "Saiba exatamente onde comprar com base no melhor custo-benefício.",
      Icon: Brain,
    },
    {
      key: "total",
      titulo: "Total em Tempo Real",
      descricao: "Acompanhe o valor total da sua compra em tempo real enquanto adiciona ou remove itens.",
      Icon: LineChart,
    },
    {
      key: "checklist",
      titulo: "Checklist Ao Vivo",
      descricao: "Marque os produtos que já pegou no carrinho e veja o progresso da sua compra de forma clara.",
      Icon: CheckCircle,
    },
    {
      key: "economia",
      titulo: "Histórico de Economia",
      descricao: "Visualize um relatório completo de quanto você já economizou usando o CompraSmart ao longo do tempo.",
      Icon: TrendingDown,
    },
    {
      key: "sugestao",
      titulo: "Sugestão de Economia",
      descricao: "Receba indicações automáticas de quais itens estão mais baratos em qual mercado perto de você.",
      Icon: Settings,
    },
    {
      key: "alerta",
      titulo: "Alerta de Ingredientes",
      descricao: "Receba alertas sobre ingredientes que podem não ser recomendados para você.",
      Icon: ShieldAlert,
    },
    {
      key: "busca",
      titulo: "Busca Inteligente",
      descricao: "Pesquise ingredientes e entenda melhor o que está consumindo.",
      Icon: Search,
    },
    {
      key: "verificacao",
      titulo: "Verificação Simples",
      descricao: "Sistema simples e direto para verificar se um produto se adequa ao seu perfil alimentar.",
      Icon: ShieldCheck,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <section className="bg-slate-50 py-24 px-4 border-t border-gray-100" id="solucao">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">TUDO O QUE VOCÊ PRECISA</h2>
          <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            A solução definitiva para as suas compras
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            O CompraSmart é o seu assistente inteligente de compras. Organizamos tudo para que você economize tempo, dinheiro e ganhe tranquilidade.
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {solucao.map((item) => {
            const Icon = item.Icon;
            return (
              <motion.article
                key={item.key}
                variants={itemVariants}
                className="bg-white rounded-3xl p-8 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group cursor-default"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-50/80 group-hover:bg-blue-600 group-hover:scale-110 group-hover:text-white rounded-2xl mb-6 mx-auto transition-all duration-300 text-blue-600 ring-4 ring-white shadow-sm">
                  <Icon className="w-8 h-8" />
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {item.titulo}
                </h4>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.descricao}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
