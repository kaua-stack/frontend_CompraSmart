import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  ChefHat, 
  Plus, 
  Check, 
  Store, 
  Star, 
  Heart, 
  ArrowRight,
  ShoppingCart
} from "lucide-react";

export default function ReceitasSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white py-24 px-4 overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Coluna da Esquerda: Textos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-500/30">
              <ChefHat size={16} />
              <span>Funcionalidade Exclusiva</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Descubra quanto custa fazer <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">qualquer receita</span>
            </h2>
            
            <p className="text-lg text-blue-100/80 mb-8 leading-relaxed max-w-xl">
              Busque receitas, adicione ingredientes automaticamente e veja o custo total antes mesmo de ir ao mercado. Planeje, economize e cozinhe com mais inteligência.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/20 p-3 rounded-xl border border-orange-500/30">
                  <Star className="text-orange-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-orange-50">Listas Salvas</h4>
                  <p className="text-sm text-blue-100/70">"Receita da Vovó", "Almoço de Domingo"... Salve suas receitas e reutilize sempre que quiser!</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl border border-green-500/30">
                  <Store className="text-green-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-green-50">Comparação Integrada</h4>
                  <p className="text-sm text-blue-100/70">E o melhor: o app ainda compara preços entre mercados para garantir que você sempre pague o menor valor.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coluna da Direita: Simulação UI */}
          <motion.div 
            className="relative lg:ml-auto w-full max-w-md mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Base do "App" */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-blue-900/50 text-gray-800 border border-gray-200 relative z-10 w-full overflow-hidden">
              
              {/* Topo: Busca */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-3 border border-gray-200">
                  <Search className="text-gray-400 w-5 h-5" />
                  <span className="text-gray-600 font-medium">Bolo de cenoura</span>
                </div>
              </motion.div>

              {/* Ingredientes e IA */}
              <motion.div variants={itemVariants} className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-100">
                <h4 className="font-semibold text-orange-900 mb-3 text-sm flex justify-between items-center">
                  <span>Ingredientes necessários</span>
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full">4 itens</span>
                </h4>
                
                {/* Bloco Inteligente */}
                <div className="bg-white rounded-xl p-3 mb-3 shadow-sm border border-orange-100/50">
                  <p className="text-xs font-semibold text-blue-600 mb-2">💡 Você já possui alguns ingredientes</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between text-gray-500 opacity-70">
                      <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Ovos</div>
                      <span className="text-xs">em casa</span>
                    </li>
                    <li className="flex items-center justify-between text-gray-800 font-medium">
                      <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-orange-400" /> Farinha</div>
                      <span className="text-xs">comprar</span>
                    </li>
                    <li className="flex items-center justify-between text-gray-800 font-medium">
                      <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-orange-400" /> Açúcar</div>
                      <span className="text-xs">comprar</span>
                    </li>
                    <li className="flex items-center justify-between text-gray-800 font-medium">
                      <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-orange-400" /> Cenoura</div>
                      <span className="text-xs">comprar</span>
                    </li>
                  </ul>
                </div>

                <div className="flex bg-orange-500 hover:bg-orange-600 cursor-pointer transition-colors text-white rounded-xl py-3 justify-center items-center gap-2 font-bold shadow-md shadow-orange-500/20">
                  <Plus className="w-5 h-5" />
                  <span>Adicionar à lista</span>
                </div>
              </motion.div>

              {/* Resultado e Custos */}
              <motion.div variants={itemVariants} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">Lista criada automaticamente!</span>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Custo adicional estimado</p>
                  
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-200">
                    <span className="text-gray-600">Mercado A</span>
                    <span className="font-semibold text-gray-800">R$ 21,50</span>
                  </div>
                  <div className="flex justify-between items-center bg-green-50 p-2.5 rounded-lg border border-green-200 shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                    <span className="text-green-800 font-bold ml-1">Mercado B (Sugestão)</span>
                    <span className="font-bold text-green-700">R$ 18,00</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-200">
                    <span className="text-gray-600">Mercado C</span>
                    <span className="font-semibold text-gray-800">R$ 23,20</span>
                  </div>
                </div>
              </motion.div>

            </div>

             {/* Elemento flutuante */}
             <motion.div 
               className="absolute -right-8 top-12 bg-white text-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 z-20 flex items-center gap-3 w-56 hidden md:flex"
               initial={{ opacity: 0, x: 20, y: 10 }}
               whileInView={{ opacity: 1, x: 0, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.8, type: "spring" }}
             >
               <div className="bg-red-100 text-red-500 p-2 rounded-xl">
                 <Heart className="w-5 h-5 fill-current" />
               </div>
               <div>
                 <p className="text-xs text-gray-500">Adicionado de</p>
                 <p className="text-sm font-bold">Receita da Vovó</p>
               </div>
             </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
