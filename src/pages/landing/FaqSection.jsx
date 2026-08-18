import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqItems = [
    {
      value: "item-1",
      question: "É realmente grátis?",
      answer: "Sim! O plano básico é gratuito para sempre, perfeito para quem quer começar a organizar as compras."
    },
    {
      value: "item-2",
      question: "Como o app ajuda a economizar?",
      answer: "O CompraSmart rastreia seus gastos, sugere o mercado mais barato para a sua lista e apresenta um histórico claro da sua economia ao longo do tempo."
    },
    {
      value: "item-3",
      question: "Posso usar em qualquer mercado?",
      answer: "Sim! Você pode criar listas para o mercado da esquina ou grandes redes. A comparação de preços funciona com os locais mapeados na sua região."
    },
    {
      value: "item-4",
      question: "Como funciona a comparação de preços?",
      answer: "Nossa inteligência compara os valores da sua lista nos mercados locais e indica onde a sua compra total fica mais barata, ajudando a tomar a melhor decisão."
    },
    {
      value: "item-5",
      question: "O app ajuda a entender ingredientes?",
      answer: "Exatamente! Além da economia, o app possui um recurso adicional para identificar e explicar possíveis ingredientes restritivos em produtos."
    },
    {
      value: "item-6",
      question: "Funciona offline?",
      answer: "Sim, suas listas ficam salvas no seu celular, mesmo sem internet, você consegue continuar anotando e riscando seus itens."
    },
    {
      value: "item-7",
      question: "Meus dados estão seguros?",
      answer: "Sim, usamos criptografia para manter suas informações e hábitos de compra totalmente protegidos."
    }
  ];

  return (
    <section id="faq" className="px-4 py-32 max-w-4xl mx-auto text-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <h2 className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">SUPORTE E FAQ</h2>
        <h3 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">Perguntas Frequentes</h3>
        <p className="text-gray-600 mb-10 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Tirando suas dúvidas para você começar a economizar com o pé direito.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10 mx-auto"
      >
        <Accordion type="single" collapsible className="w-full text-left">
          {faqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value} className="border-b-gray-100 last:border-0">
              <AccordionTrigger className="text-gray-800 hover:text-blue-600 hover:no-underline transition-colors text-[17px] font-bold py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6 text-[15px]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FaqSection;
