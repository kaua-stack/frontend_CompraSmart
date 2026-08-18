// src/components/Footer.jsx
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        {/* Logo e nome */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🛒</span>
          <span className="font-black text-white text-2xl tracking-tight">Compra<span className="text-blue-500">Smart</span></span>
        </div>

        {/* Texto */}
        <p className="text-sm text-gray-400 text-center uppercase tracking-[0.2em] font-semibold text-blue-500/80">
          O SEU ASSISTENTE INTELIGENTE DE COMPRAS
        </p>

        {/* Aviso de Saúde */}
        <div className="bg-slate-900/50 rounded-2xl p-5 max-w-2xl text-center border border-slate-800 shadow-xl mt-2">
          <p className="text-[13px] text-slate-400 italic font-medium leading-relaxed">
            ⚠️ Importante: Este aplicativo é um auxílio nutricional e financeiro, contudo, não substitui a orientação técnica e profissional de médicos ou especialistas em casos de restrições alimentares agudas severas.
          </p>
        </div>

        {/* Ícones de redes sociais */}
        <div className="flex gap-6 text-2xl mt-4">
          <a href="#" className="text-slate-500 hover:text-blue-400 hover:scale-110 transition-all duration-300">
            <FaInstagram />
          </a>
          <a href="#" className="text-slate-500 hover:text-blue-400 hover:scale-110 transition-all duration-300">
            <FaTwitter />
          </a>
          <a href="#" className="text-slate-500 hover:text-blue-400 hover:scale-110 transition-all duration-300">
            <FaFacebook />
          </a>
        </div>

        {/* Links adicionais */}
        <div className="flex gap-8 text-sm mt-4 font-semibold text-slate-400">
          <a href="#" className="hover:text-blue-400 transition-colors">
            Privacidade
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Termos de Uso
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Contato
          </a>
        </div>

        {/* Direitos autorais */}
        <div className="w-full border-t border-slate-800/80 mt-8 pt-8 text-center text-slate-500 font-medium">
          <p className="text-sm">
            © {new Date().getFullYear()} CompraSmart. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
