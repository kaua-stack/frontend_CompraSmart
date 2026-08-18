import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ilustration.png";
import { Link } from "react-router-dom";
import {
  FaQuestion,
  FaDollarSign,
  FaExclamationTriangle,
  FaShoppingBag,
  FaClock,
  FaSearchDollar
} from "react-icons/fa";

const ProblemaCard = ({ icone: Icone, texto, colorClass, index }) => (
  <motion.div 
    className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <div className={`p-3 rounded-full bg-slate-50 ${colorClass}`}>
      <Icone size={24} />
    </div>
    <p className="text-sm md:text-base text-gray-700 font-medium">
      {texto}
    </p>
  </motion.div>
);

const HeroSection = () => {
  const problemas = [
    {
      icone: FaQuestion,
      texto: "Esquece itens importantes na hora da compra?",
      colorClass: "text-blue-500",
    },
    {
      icone: FaDollarSign,
      texto: "Não sabe quanto vai gastar e acaba estourando o orçamento?",
      colorClass: "text-green-500",
    },
    {
      icone: FaExclamationTriangle,
      texto: "Tem dificuldade em entender ingredientes ou possui restrições?",
      colorClass: "text-orange-500",
    },
    {
      icone: FaShoppingBag,
      texto: "Não sabe qual mercado é mais econômico para sua lista?",
      colorClass: "text-indigo-500",
    },
    {
      icone: FaClock,
      texto: "Perde tempo organizando listas com papel e caneta?",
      colorClass: "text-purple-500",
    },
    {
      icone: FaSearchDollar,
      texto: "Já comprou mais caro sem perceber a variação de preço?",
      colorClass: "text-red-500",
    },
  ];

  return (
    <>
      <section className="relative flex flex-col items-center text-center px-4 pt-32 pb-24 gap-6 bg-slate-50 items-center justify-center overflow-hidden">
        {/* Background blobs decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
           <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <motion.div
           className="px-4 py-2 border border-blue-200 bg-blue-50/50 rounded-full text-blue-700 text-sm font-semibold mb-2 relative z-10"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          Seu Parceiro de Compras
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight max-w-4xl relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Transforme as compras de mercado em{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            decisões inteligentes
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg md:text-xl max-w-2xl relative z-10 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Organize listas, controle seus gastos, compare os melhores mercados da sua região e faça compras mais seguras.
        </motion.p>

        <motion.div
          className="relative z-10 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/login">
            <Button className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 text-lg md:text-xl px-10 py-7 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 font-bold">
              Começar a economizar grátis
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="relative z-10 mt-12 w-full max-w-3xl px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
           <img
             src={heroImage}
             alt="Ilustração de compras online"
             className="w-full h-auto drop-shadow-2xl rounded-xl object-contain mx-auto mix-blend-darken hover:scale-105 transition-transform duration-700"
             style={{ maxHeight: '400px' }}
           />
        </motion.div>
      </section>

      <div className="bg-white py-24 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">Desafios Comuns</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Você já sentiu esses problemas no mercado?</h3>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {problemas.map((problema, index) => (
              <ProblemaCard
                key={index}
                index={index}
                icone={problema.icone}
                texto={problema.texto}
                colorClass={problema.colorClass}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
