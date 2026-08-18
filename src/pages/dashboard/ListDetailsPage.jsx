import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLists } from "@/contexts/ListContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import api from "@/services/api";

// Função utilitária global do sistema para tentar agrupar produtos pelo nome ("Fruta", "Higiene")
import { CATEGORY_MAP, getCategory } from "@/utils/categoryMap";

import {
  Trash2,
  Plus,
  Minus,
  Target,
  ShoppingBag,
  AlertCircle,
  X,
  AlertTriangle,
} from "lucide-react";

// =========================================================================
// INTELIGÊNCIA ESTÁTICA - MAPA DE ALERGIAS DA PLATAFORMA
// =========================================================================
// Esta lista dita gatilhos comuns de ingredientes perigosos para as condições selecionadas.
const ALLERGY_MAP = {
  Lactose: [
    "leite", "queijo", "iogurte", "manteiga", "requeijão", 
    "creme de", "whey", "pudim", "condensado", "coalhada",
    "ricota", "muçarela", "margarina", "achocolatado",
  ],
  Glúten: [
    "pão", "farinha", "macarrão", "cerveja", "biscoito",
    "bolacha", "bolo", "pizza", "salgadinho", "coxinha",
    "pastel", "espaguete", "quibe", "cevada", "malte",
  ],
  Vegetariano: [
    "carne", "frango", "peixe", "bacon", "presunto", "salsicha",
    "hambúrguer", "steak", "linguiça", "salame", "mortadela",
    "picanha", "costela", "nugget", "calabresa", "peru", "lombo",
  ],
  Vegano: [
    "carne", "frango", "peixe", "ovo", "leite", "mel", "queijo",
    "manteiga", "bacon", "iogurte", "presunto", "gelatina", "maionese",
  ],
  Amendoim: [
    "paçoca", "amendoim", "nucita", "pé de moleque", "castanha",
    "noz", "avelã", "pistache", "nutella", "amêndoa",
  ],
  Açúcar: [
    "refrigerante", "doce", "chocolate", "bala", "recheado",
    "sorvete", "açúcar", "caramelo", "xarope", "goiabada",
  ],
  "Frutos do Mar": [
    "camarão", "lagosta", "siri", "caranguejo", "ostra",
    "lula", "polvo", "mexilhão",
  ],
};

// =========================================================================
// PÁGINA: DETALHES DA LISTA (ListDetailsPage)
// Onde o usuário de fato insere os produtos que vai comprar no supermercado.
// =========================================================================
export default function ListDetailsPage() {
  const { id } = useParams(); // Hook do React-Router pra pegar via URL qual abaerta.

  // Funções fornecidas pelo contexto global ligado à sua API Backend 
  const { lists, addItemToList, toggleItemStatus, deleteItem } = useLists();
  
  // Stados locais visuais 
  const [list, setList] = useState(null); // Essa é a lista atual isolada
  const [newItem, setNewItem] = useState({ name: "", quantity: 1, price: "" }); // Formulário provisório
  const [showWarning, setShowWarning] = useState(true); // Alvo estourou limite financeiro?

  // Lógica de restrições por saúde 
  const [userAllergies, setUserAllergies] = useState([]);
  const [allergyConflict, setAllergyConflict] = useState(null); // Guarada "Lactose" se detecar leite
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // =========================================================================
  // 1. CARREGAMENTO INICIAL 
  // Busca a lista atual em tela && as alergias cadastradas na DB
  // =========================================================================
  useEffect(() => {
    // 1(a) Busca a lista corrente
    const found = lists.find((l) => l._id === id);
    if (found) setList(found);

    // 1(b) Busca se o user tem restrições cadastradas via backend para usar.
    const fetchAllergies = async () => {
      try {
        const { data } = await api.get("/users/profile");
        setUserAllergies(data.allergies || []);
      } catch (err) {
        console.error("Erro ao carregar alergias", err);
      }
    };
    fetchAllergies();
  }, [lists, id]);

  // =========================================================================
  // 2. DETECTOR (MOTOR DE BUSCA)
  // Reage sempre que o usuário digita uma letrinha Nova!
  // =========================================================================
  useEffect(() => {
    const input = newItem.name.toLowerCase().trim();
    if (input.length < 2) return setAllergyConflict(null); // só pesquisa se tiver no min 2 letras

    let found = null;
    userAllergies.forEach((allergy) => {
      const allergyName = typeof allergy === "string" ? allergy : allergy.name;
      const allergyNorm = allergyName.toLowerCase();
      // O Array de derivados
      const derivatives = ALLERGY_MAP[allergyName] || [];
      
      // Checa se o usuário digitou algum derivado (ex: "leite") OU o nome da alerga em si ("lactose")
      if (
        derivatives.some((d) => input.includes(d)) ||
        input.includes(allergyNorm) ||
        (allergyNorm.includes(input) && input.length > 3)
      ) {
        found = allergyName;
      }
    });
    setAllergyConflict(found);
  }, [newItem.name, userAllergies]);

  // Carregamento Preventivo
  if (!list)
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <span className="animate-pulse">Preparando check-out...</span>
      </div>
    );

  // =========================================================================
  // 3. FLUXO DE ADIÇÃO (Frontend -> Backend Contexto)
  // =========================================================================
  
  // Tenta adicionar
  const handleAddAttempt = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    
    // Se a máquina acusou que tem derivado de leite sendo que o cara tem lactosa, joga modal popup na cara dele
    if (allergyConflict) setShowConfirmModal(true);
    else confirmAdd(); // Caminho livre sem alergias.
  };

  // Efetivação a adição após varrer (ou após ele confirmar no modal "Ok vou correr risco")
  const confirmAdd = async () => {
    const itemData = {
      name: newItem.name.trim(),
      quantity: Number(newItem.quantity) || 1,
      // Troca vírgula pra ponto para o banco de dados salvar certinho matematicamente
      price: Number(newItem.price.toString().replace(",", ".")) || 0,
      // Executa o utilitário frontend que chuta de qual departamento aquele alimento pertence
      category: getCategory(newItem.name),
    };
    
    // Dispara a requisão via Context p/ seu Backend
    await addItemToList(list._id, itemData);
    
    // Limpa a tela proxima digitação
    setNewItem({ name: "", quantity: 1, price: "" });
    setAllergyConflict(null);
    setShowConfirmModal(false);
  };

  // Status Globais do Array
  const items = list.items || [];
  const totalItens = items.length;
  const itensMarcados = items.filter((i) => i.checked).length;
  // Regra de três pra achar a % da barra de preenchimento
  const porcentagemItens = totalItens > 0 ? (itensMarcados / totalItens) * 100 : 0;
  
  // Somatória Dinâmica!
  const totalGeral = items.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );
  
  const valorLimite = Number(list.budget || 0);
  const ultrapassouLimite = valorLimite > 0 && totalGeral > valorLimite;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 pb-96 relative bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* ================================================== */}
      {/* MODAL / POPUP UX -> Risco de Alergia Encontrado */}
      {/* ================================================== */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <Card className="w-full max-w-sm border-none shadow-2xl rounded-[3rem] bg-white p-8 text-center space-y-8 animate-in zoom-in-95 duration-300">
            {/* Visual Perigo Red */}
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 shadow-inner ring-[6px] ring-white">
              <AlertTriangle size={48} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                Risco Detectado!
              </h3>
              <p className="text-slate-500 text-sm font-bold mt-3 leading-relaxed">
                Temos indícios de que <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded-md italic">"{newItem.name}"</span>{" "}
                tem contaminação com <span className="font-black underline decoration-red-500 decoration-2 underline-offset-2">"{allergyConflict}"</span>.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button
                onClick={confirmAdd}
                className="bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all h-14 rounded-[1.2rem] font-black text-white uppercase tracking-widest shadow-[0_8px_30px_rgb(239,68,68,0.3)]"
              >
                Ignorar e Adicionar
              </Button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 transition-colors font-black text-xs uppercase py-4 rounded-[1.2rem]"
              >
                Cancelar Inclusão
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ================================================== */}
      {/* HEADER: NOME DA LISTA E SINAL DE ESTOURO ORÇAMENTÁRIO */}
      {/* ================================================== */}
      <header className="flex justify-between items-end animate-in fade-in slide-in-from-top-4 duration-500 pt-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            {list.name}
          </h1>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-3 bg-blue-100/50 inline-block px-3 py-1 rounded-md">
            Organizado por Corredores Inteligentes
          </p>
        </div>
        
        {/* Se o dinheiro furou e existia limite, pisca a tag de perigo */}
        {ultrapassouLimite && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-red-500/20 animate-pulse">
            Teto Estourado
          </div>
        )}
      </header>

      {/* ================================================== */}
      {/* CARD: ENTRADA INTELIGENTE DE PRODUTOS  */}
      {/* O fundo deste card reage com a cor vermelha se detectar alergia */}
      {/* ================================================== */}
      <Card
        className={`border-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2.5rem] transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 delay-100 ${
          allergyConflict ? "bg-red-50 ring-2 ring-red-500 shadow-red-500/10" : "bg-white"
        }`}
      >
        <CardContent className="p-6 md:p-8 space-y-5">
          {/* Campo Nome. Ex: "Arroz..." */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
              O que faltou ?
            </label>
            <Input
              placeholder="Digite pra bater no motor..."
              className={`h-16 rounded-[1.2rem] text-lg lg:text-xl font-bold border-transparent focus:bg-white focus:ring-4 transition-all shadow-inner ${allergyConflict ? "bg-white text-red-600 focus:ring-red-200" : "bg-slate-50 text-slate-900 focus:ring-blue-100"}`}
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>
          
          <div className="flex gap-4">
            {/* Campo Valor em R$ Ex: "5,99" */}
            <div className="relative flex-[2.5]">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-black ${allergyConflict ? "text-red-400" : "text-slate-400"}`}>
                R$
              </span>
              <Input
                placeholder="0,00"
                className={`border-transparent h-14 rounded-[1.2rem] pl-12 text-lg font-bold shadow-inner focus:bg-white transition-all ${allergyConflict ? "bg-white focus:ring-red-200 text-red-600" : "bg-slate-50 focus:ring-blue-100"}`}
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    // RegEx que não deixa humano digitar letras em campo de preço.
                    price: e.target.value.replace(/[^0-9,.]/g, ""),
                  })
                }
              />
            </div>
            
            {/* Campo Incremento + e - 1, com visualização */}
            <div className={`flex items-center rounded-[1.2rem] px-2 gap-4 h-14 flex-[1.5] justify-between shadow-inner ${allergyConflict ? "bg-white" : "bg-slate-50"}`}>
              <button
                onClick={() =>
                  setNewItem({
                    ...newItem,
                    quantity: Math.max(1, newItem.quantity - 1),
                  })
                }
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${allergyConflict ? "text-red-500 hover:bg-red-50" : "text-blue-600 hover:bg-blue-100"}`}
              >
                <Minus size={20} strokeWidth={3} />
              </button>
              <span className={`font-black text-xl truncate ${allergyConflict ? "text-red-600" : "text-slate-700"}`}>
                {newItem.quantity}
              </span>
              <button
                onClick={() =>
                  setNewItem({ ...newItem, quantity: newItem.quantity + 1 })
                }
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${allergyConflict ? "text-red-500 hover:bg-red-50" : "text-blue-600 hover:bg-blue-100"}`}
              >
                <Plus size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
          
          <Button
            onClick={handleAddAttempt}
            className={`w-full h-16 rounded-[1.2rem] font-black text-lg sm:text-xl tracking-wide shadow-xl active:scale-[0.98] transition-all duration-300 ${
              allergyConflict
                ? "bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/30 hover:from-red-700 hover:to-red-600 text-white"
                : "bg-gradient-to-r from-blue-700 to-blue-500 shadow-blue-500/30 hover:from-blue-800 hover:to-blue-600 text-white"
            }`}
          >
            {allergyConflict ? "VER ALERTA DETECTADO" : "Adicionar à Cesta"}
          </Button>
        </CardContent>
      </Card>

      {/* ================================================== */}
      {/* SESSÃO: CORREDORES RENDERIZADOS */}
      {/* O React vai varrer todo map de categorias (Açougue, Frios, Higiene...) */}
      {/* e colocar os itens daquele corredor para agrupar e guiar a pessoa no super. */}
      {/* ================================================== */}
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
        
        {/* Usamos Object.keys de CATEGORY_MAP + "Outros" nativamente */}
        {Object.keys(CATEGORY_MAP)
          .concat("Outros")
          .map((categoryName) => {
            
            // FILTRA: Da lista inteira de itens (da api), os que são deste bendito laço.
            const categoryItems = items.filter((item) => {
              const itemCat = item.category || getCategory(item.name);
              return itemCat === categoryName;
            });

            // Se O cara não botou nenhuma carne, não vou desenhar o "AÇOUGUE" limpo e vazio.
            // Eu pulo.
            if (categoryItems.length === 0) return null;

            return (
              <div key={categoryName} className="space-y-5">
                
                {/* Título do "Corredor do Supermercado" Premium Layout */}
                <div className="flex items-center gap-3 px-2">
                  <div className="h-6 w-1.5 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
                  <h2 className="text-[13px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    {categoryName}
                  </h2>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-200/50 px-2.5 py-1 rounded-md shadow-inner">
                    {categoryItems.length} un
                  </span>
                </div>

                {/* Itens pertencentes a essa categoria */}
                <div className="space-y-3">
                  {categoryItems.map((item) => (
                    // Esse Card de Item reage (fica pálido) se `item.checked` for TRUE (O cara jogou fisicamente no carrinho dele e ticou).
                    <div
                      key={item._id}
                      className={`flex items-center justify-between p-5 rounded-[1.5rem] border transition-all duration-300 group ${
                        item.checked
                          ? "bg-slate-100/50 opacity-50 border-transparent shadow-none grayscale-[0.5]"
                          : "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] border-transparent hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)] hover:border-blue-100"
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        
                        {/* O Checkbox que dispara a API para salvar o CHECK */}
                        <div className={`p-1 rounded-xl transition-colors ${item.checked ? "bg-slate-200" : "bg-blue-50 group-hover:bg-blue-100"}`}>
                           <Checkbox
                            checked={item.checked}
                            onCheckedChange={() =>
                              toggleItemStatus(list._id, item._id)
                            }
                            className="w-6 h-6 rounded-lg pointer-events-auto"
                          />
                        </div>
                        
                        <div>
                          {/* Nome e Formatação de Texto se tiver Checked. */}
                          <p
                            className={`font-black text-lg transition-all ${
                              item.checked
                                ? "line-through text-slate-400"
                                : "text-slate-800"
                            }`}
                          >
                            {item.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {item.quantity} un × R${" "}
                            {Number(item.price).toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-5">
                        <span className={`font-black text-lg transition-colors ${item.checked ? "text-slate-400": "text-slate-800"}`}>
                          R${" "}
                          {(Number(item.price) * Number(item.quantity))
                            .toFixed(2)
                            .replace(".", ",")}
                        </span>
                        
                        {/* Botão Clicavel da LLICHEIRA pra explodir o item da DB */}
                        <button
                          onClick={() => deleteItem(list._id, item._id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-200 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={20} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* ================================================== */}
      {/* 4. BARRA DE STATUS INFERIOR (Floating Bottom Bar) */}
      {/* Ela é fixed, fica o tempo inteiro mostrando se você tá milionário ou estourado. */}
      {/* ================================================== */}
      <div className="fixed bottom-[0px] md:bottom-[72px] left-0 right-0 bg-white/80 backdrop-blur-3xl border-t border-slate-100/50 px-6 py-6 z-40 shadow-[0_-20px_40px_rgba(0,0,0,0.06)] pb-10 md:pb-6 font-sans">
        <div className="max-w-2xl mx-auto space-y-5">
          
          {/* Se a grana superou, um card em VERMELHO SALTA PARA FORA */}
          {ultrapassouLimite && showWarning && (
            <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-500 text-white p-4 rounded-2xl animate-in slide-in-from-bottom duration-500 shadow-xl shadow-red-500/20">
              <div className="flex items-center gap-3">
                <div className="bg-red-700/50 p-2 rounded-lg">
                   <AlertCircle size={20} strokeWidth={3} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-sm">
                  Cuidado: Teto furado!
                </p>
              </div>
              <button onClick={() => setShowWarning(false)} className="hover:bg-red-700 p-2 rounded-lg transition-colors">
                <X size={18} strokeWidth={3}/>
              </button>
            </div>
          )}
          
          {/* Progress Bar de Preenchimento (% de produtos da lista já pegos) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
              <span className="flex items-center gap-2">
                <ShoppingBag size={14} className="text-blue-500" /> Marcados
              </span>
              <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-500">
                {itensMarcados} / {totalItens}
              </span>
            </div>
            
            {/* A Barra pintando gradualmente */}
            <Progress
              value={porcentagemItens}
              className="h-3.5 bg-slate-100/80 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-blue-400 rounded-full shadow-inner border border-slate-200/50"
            />
          </div>
          
          {/* Valores Reais $ Subtotal e Meta de Gasto */}
          <div className="flex justify-between items-end pt-2">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 italic">
                Subtotal
              </p>
              <p
                className={`text-4xl font-black leading-none tracking-tighter transition-colors drop-shadow-sm ${
                  ultrapassouLimite ? "text-red-500" : "bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                }`}
              >
                <span className={`text-base mr-1 ${ultrapassouLimite ? "text-red-400" : "text-slate-400"}`}>R$</span>
                {totalGeral.toFixed(2).replace(".", ",")}
              </p>
            </div>
            
            <div className="text-right border-l-2 pl-6 border-slate-100/80">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 italic">
                Meta de Gasto
              </p>
              <div className="flex items-center gap-2 justify-end bg-slate-50 px-3 py-1.5 rounded-[1rem] border border-slate-100">
                <Target
                  size={18}
                  className={
                    valorLimite > 0 ? "text-blue-500" : "text-slate-300"
                  }
                  strokeWidth={2.5}
                />
                <p
                  className={`text-xl font-black leading-none ${
                    valorLimite > 0 ? "text-slate-700" : "text-slate-300"
                  }`}
                >
                  R$ {valorLimite.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
