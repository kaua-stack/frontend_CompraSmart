import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; 
import { Check } from "lucide-react"; 

const PricingCard = ({ plan, index }) => {
  const { name, price, isPopular, features, buttonText, buttonClass } = plan;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className={`relative flex flex-col p-10 rounded-[2rem] shadow-xl transition-all duration-300 hover:-translate-y-2 ${
        isPopular ? "bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-blue-900/20 shadow-2xl" : "bg-white text-gray-800 border border-gray-100"
      }`}
    >
      {isPopular && (
        <span className="absolute top-0 right-0 -mt-4 mr-8 bg-yellow-400 text-yellow-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
          Mais Vantajoso
        </span>
      )}

      <h3 className={`text-2xl lg:text-3xl font-black mb-2 tracking-tight ${isPopular ? "text-white" : "text-gray-900"}`}>{name}</h3>
      <p
        className={`text-sm mb-8 min-h-[40px] leading-relaxed font-medium ${
          isPopular ? "text-blue-100" : "text-gray-500"
        }`}
      >
        {name === "Gratuito"
          ? "Ideal para organizar suas compras essenciais de forma inteligente."
          : name === "Plus"
          ? "Para quem leva a economia a sério e quer comparar os mercados."
          : "Para famílias que buscam controle total e recursos avançados."}
      </p>

      <div className="flex items-end mb-8 border-b pb-8 border-opacity-20 border-white">
        <span
          className={`text-5xl lg:text-6xl font-black tracking-tighter ${
            isPopular ? "text-white" : "text-gray-900"
          }`}
        >
          {price.split("/")[0]}
        </span>
        <span
          className={`ml-1 text-xl font-medium mb-2 ${
            isPopular ? "text-blue-200" : "text-gray-400"
          }`}
        >
          {price.split("/")[1] ? `/${price.split("/")[1]}` : ""}
        </span>
      </div>

      <ul className="flex-1 space-y-5 text-left mb-10">
        {features.map((feature, idx) => {
          return (
            <li key={idx} className="flex items-start gap-3">
              <div className={`mt-1 p-1 rounded-full ${isPopular ? "bg-white/20" : "bg-blue-50"}`}>
                <Check
                  className={`flex-shrink-0 w-3 h-3 ${
                    isPopular ? "text-white" : "text-blue-600"
                  }`}
                  strokeWidth={3}
                />
              </div>
              <span
                className={`text-[15px] font-medium leading-tight ${
                  isPopular ? "text-white/90" : "text-gray-600"
                }`}
              >
                {feature}
              </span>
            </li>
          );
        })}
      </ul>

      <Button
        className={`w-full font-bold py-7 text-lg rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg ${buttonClass} ${
          isPopular ? "text-blue-700 bg-white hover:bg-gray-50 hover:-translate-y-1" : "hover:-translate-y-1"
        }`}
      >
        {buttonText}
      </Button>
    </motion.article>
  );
};

export default function PricingSection() {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0/mês",
      isPopular: false,
      features: [
        "Listas de compras básicas",
        "Controle simples de orçamento",
        "Detecção básica de ingredientes",
        "Checklists interativos",
      ],
      buttonText: "Começar Agora",
      buttonClass: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    },
    {
      name: "Plus",
      price: "R$ 9,90/mês",
      isPopular: true,
      features: [
        "Tudo do plano Gratuito",
        "Comparação entre múltiplos mercados",
        "Histórico de listas e economia",
        "Controle de gastos avançado",
        "Múltiplas listas salvas",
      ],
      buttonText: "Testar o Plus",
      buttonClass: "",
    },
    {
      name: "Premium",
      price: "R$ 19,90/mês",
      isPopular: false,
      features: [
        "Comparação ilimitada de mercados",
        "Relatórios completos de economia",
        "Notificações de otimização",
        "Recursos de organização familiar",
        "Exportar e compartilhar dados",
      ],
      buttonText: "Seja Premium",
      buttonClass: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    },
  ];

  return (
    <section id="pricing" className="bg-slate-50 py-32 px-4 border-t border-gray-100 relative overflow-hidden">
      {/* Decoração da Section de Preços */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-20"
        >
          <h2 className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">INVESTIMENTO</h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Escolha o plano ideal
          </h3>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Comece de graça e descubra como o nosso assistente transforma a sua forma de se organizar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
