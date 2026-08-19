import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLists } from "@/contexts/ListContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ListChecks,
  ShoppingCart,
  Plus,
  Target,
  X,
  Package,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// =========================================================================
// PÁGINA: ListsPage (Minhas Listas)
// Mostra uma visualização em Grade (Grid) com todas as compras do usuário.
// O backend cuidará de toda persistência de adição e exclusão pelo hook `useLists`
// =========================================================================
export default function ListsPage() {
  const { lists, addList, deleteFullList } = useLists(); // Hook que acessa dados locais atualizados via API
  const navigate = useNavigate();

  // STADOS (Estados) da Interface -> Controlam os efeitos visuais de Popups (Modais)
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  // STADOS do Formulário de Criação -> Para "guardar" o que a pessoa digita antes de salvar.
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================================
  // Função p/ CHamar o backend e criar lista passando pelas regras
  // =========================================================================
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setError("");
    setIsSubmitting(true);
    try {
      // Chama o contexto de Listas, que persiste a lista em POST /api/lists.
      const newList = await addList(name.trim(), budget);
      if (newList) {
        setName("");
        setBudget("");
        setShowModal(false);
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Não foi possível criar a lista. Verifique se o backend está ativo e se você está autenticado.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // Abre Confirmação Visual para Deletar - UX de Segurança (Impede miss-clicks)
  // =========================================================================
  const openDeleteModal = (e, list) => {
    e.stopPropagation(); // IMPORTANTE: Sem isso, clicar no botão de excluir iria redirecionar para dentro da lista!
    setListToDelete(list);
    setShowDeleteModal(true);
  };

  // Funcao efetiva de deletar chamando o backend pelo context
  const confirmDelete = async () => {
    if (listToDelete) {
      await deleteFullList(listToDelete._id);
      setShowDeleteModal(false);
      setListToDelete(null);
    }
  };

  // =========================================================================
  // FRONTEND: ESTADO VAZIO.
  // Exibido se `lists.length === 0` (usuário não tem nada criado).
  // =========================================================================
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 bg-white/60 backdrop-blur-md rounded-[3rem] border border-slate-200 mt-6 shadow-sm animate-in fade-in zoom-in duration-500">
      <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-5 rounded-[1.5rem] mb-6 shadow-inner ring-4 ring-white">
        <ShoppingCart className="w-12 h-12 text-blue-600 drop-shadow-sm" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
        Sua despensa está vazia!
      </h2>
      <p className="text-slate-400 font-bold mt-2 text-sm max-w-[200px] text-center">
        Comece organizando suas futuras compras aqui.
      </p>
      <Button
        type="button"
        onClick={() => {
          setError("");
          setShowModal(true);
        }}
        className="mt-8 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all text-white rounded-2xl px-8 h-12 font-black shadow-lg shadow-blue-600/30"
      >
        <Plus className="mr-2 w-5 h-5" /> CRIAR LISTA
      </Button>
    </div>
  );

  return (
    <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto pb-32 font-sans bg-[#F8FAFC]">
      
      {/* ================================================== */}
      {/* CABEÇALHO DA PÁGINA */}
      {/* ================================================== */}
      <div className="flex justify-between items-center mb-8 animate-in slide-in-from-top-4 fade-in duration-500">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Minhas Listas
          </h1>
          <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1">
            {lists.length} Listas Ativas
          </p>
        </div>
        
        {/* Botão de NOVA LISTA no topo */}
        <Button
          type="button"
          onClick={() => {
            setError("");
            setShowModal(true);
          }}
          className="rounded-[1.2rem] bg-slate-900 hover:bg-slate-800 hover:-translate-y-0.5 transition-all h-12 px-5 font-black shadow-lg shadow-slate-200 text-white"
        >
          <Plus className="mr-1 w-5 h-5" /> Criar
        </Button>
      </div>

      {/* ================================================== */}
      {/* RENDERIZAÇÃO DA GRADE DE LISTAS */}
      {/* ================================================== */}
      {lists.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 animate-in fade-in zoom-in-95 duration-500 delay-100 fill-mode-both">
          {lists.map((list) => (
            // A Card é clicável (navigate manda pra ListDetailsPage)
            <Card
              key={list._id}
              onClick={() => navigate(`/dashboard/lists/${list._id}`)}
              className="group relative overflow-hidden bg-white border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-[2.5rem]"
            >
              {/* Filete de cor dinâmico do lado esquerdo para embelezar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-slate-100 group-hover:bg-gradient-to-b group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-500" />
              
              <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-[1.2rem] group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <ListChecks className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-black text-slate-800 tracking-tight group-hover:text-blue-900 transition-colors">
                    {list.name}
                  </CardTitle>
                </div>

                {/* ================================================== */}
                {/* LIXEIRA DE EXCLUIR: Pára a navegação (`e.stopPropagation()`) */}
                {/* ================================================== */}
                <button
                  onClick={(e) => openDeleteModal(e, list)}
                  className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-[1rem] transition-all hover:scale-110 active:scale-95"
                >
                  <Trash2 size={18} strokeWidth={2.5} />
                </button>
              </CardHeader>
              
              <CardContent className="px-6 pb-6 pt-3 flex justify-between items-center ml-[3.2rem]">
                <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-black uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">
                  <Package className="w-3.5 h-3.5" />
                  <span>{list.items?.length || 0} itens</span>
                </div>
                {/* Só mostra limite financeiro se a pessoa preencheu ao criar */}
                {Number(list.budget) > 0 && (
                  <div className="flex items-center gap-1.5 text-emerald-600 text-[9px] font-black uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">
                    <Target className="w-3.5 h-3.5" />
                    <span>
                      Lim: R$ {Number(list.budget).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ================================================== */}
      {/* POPUP (MODAL): CRIAR NOVA LISTA */}
      {/* ================================================== */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-sm rounded-[3rem] border-none shadow-2xl bg-white overflow-hidden animate-in zoom-in-95 duration-200">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Nova Lista
                </h2>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 cursor-pointer transition-colors" onClick={() => setShowModal(false)}>
                  <X size={20} strokeWidth={3}/>
                </div>
              </div>

              {/* O Formulario envia os dados para a funcao handleCreate */}
              <form onSubmit={handleCreate} className="space-y-6 flex flex-col">
                {error && (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Como se chama?
                  </label>
                  <Input
                    placeholder="Ex: Rancho do mês..."
                    className="h-14 rounded-[1.2rem] bg-slate-50 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold text-lg px-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Meta Financeira Opcional
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-300">
                      R$
                    </span>
                    <Input
                      type="number"
                      className="h-14 rounded-[1.2rem] bg-slate-50 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold text-lg pl-12"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-[1.2rem] bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all font-black text-lg text-white shadow-lg shadow-blue-600/30 mt-2"
                >
                  {isSubmitting ? "Criando..." : "Salvar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ================================================== */}
      {/* POPUP (MODAL): PERIGO - CONFIRMAR EXCLUSÃO */}
      {/* ================================================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-xs rounded-[3rem] border-none shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 bg-white">
            <div className="bg-gradient-to-b from-red-50 to-white px-8 pt-10 pb-6 flex flex-col items-center text-center">
              <div className="bg-red-100 p-4 rounded-[1.5rem] mb-5 text-red-600 ring-4 ring-white shadow-sm">
                <AlertTriangle size={32} strokeWidth={3} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Excluir Lista?
              </h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed px-2">
                Prestes a apagar <br />
                <span className="text-red-600 font-black italic">"{listToDelete?.name}"</span>.<br/> Isso é permanente.
              </p>
            </div>
            <CardContent className="p-6 bg-white flex flex-col gap-3">
              <Button
                onClick={confirmDelete}
                className="w-full h-14 rounded-[1.2rem] bg-red-600 hover:bg-red-700 active:scale-95 transition-all font-black text-white shadow-lg shadow-red-200"
              >
                Sim, Excluir Agora
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowDeleteModal(false)}
                className="w-full h-12 rounded-[1.2rem] font-black text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all"
              >
                Cancelar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
