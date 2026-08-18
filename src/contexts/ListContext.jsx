import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Cria o contexto para as Listas de Compras
const ListContext = createContext();

// Provedor que envolve o aplicativo e disponibiliza as funções de lista para todos os componentes
export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]); // Estado que guarda todas as listas do usuário
  const { userToken } = useAuth(); // Pega o token do contexto de Autenticação

  // 1. BUSCAR LISTAS DO BACKEND
  const fetchLists = async () => {
    if (!userToken) return;
    try {
      // Faz uma chamada GET para buscar as listas do usuário autenticado
      const response = await fetch("http://127.0.0.1:5000/api/lists", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = await response.json();
      if (response.ok) setLists(data); // Atualiza o estado com as listas recebidas
    } catch (err) {
      console.error("Erro ao buscar listas:", err);
    }
  };

  // Efeito que busca as listas toda vez que o usuário loga (quando o token muda)
  useEffect(() => {
    if (userToken) fetchLists();
  }, [userToken]);

  // 2. CRIAR NOVA LISTA
  const addList = async (listName, budgetValue = 0) => {
    try {
      // Converte o valor do orçamento para número (trata vírgula como ponto)
      const sanitizedBudget =
        Number(budgetValue.toString().replace(",", ".")) || 0;
        
      const response = await fetch("http://127.0.0.1:5000/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          name: listName,
          budget: sanitizedBudget,
        }),
      });

      if (response.ok) {
        const newList = await response.json();
        // Adiciona a nova lista no topo do estado atual (sem precisar recarregar tudo)
        setLists((prev) => [newList, ...prev]);
        return newList;
      }
    } catch (err) {
      console.error("Erro ao criar lista:", err);
      return null;
    }
  };

  // 3. EXCLUIR UMA LISTA COMPLETA
  const deleteFullList = async (listId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/lists/${listId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.ok) {
        // Remove a lista do estado local filtrando pelo ID
        setLists((prev) => prev.filter((l) => l._id !== listId));
        return true;
      }
    } catch (err) {
      console.error("Erro ao excluir lista completa:", err);
      return false;
    }
  };

  // 4. ADICIONAR ITEM DENTRO DE UMA LISTA
  const addItemToList = async (listId, itemData) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/lists/${listId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            name: itemData.name,
            quantity: Number(itemData.quantity) || 1,
            price: Number(itemData.price) || 0,
          }),
        }
      );
      if (response.ok) {
        const updatedList = await response.json();
        // Atualiza apenas a lista que recebeu o novo item no estado global
        setLists((prev) =>
          prev.map((l) => (l._id === listId ? updatedList : l))
        );
        return updatedList;
      }
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
    }
  };

  // 5. MARCAR/DESMARCAR ITEM (CHECKBOX)
  const toggleItemStatus = async (listId, itemId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/lists/${listId}/items/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.ok) {
        const updatedList = await response.json();
        // Atualiza a lista com o novo estado do item
        setLists((prev) =>
          prev.map((l) => (l._id === listId ? updatedList : l))
        );
      }
    } catch (error) {
      console.error("Erro ao alternar status:", error);
    }
  };

  // 6. DELETAR ITEM DE UMA LISTA
  const deleteItem = async (listId, itemId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/lists/${listId}/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.ok) {
        const updatedList = await response.json();
        // Atualiza a lista removendo o item do estado
        setLists((prev) =>
          prev.map((l) => (l._id === listId ? updatedList : l))
        );
      }
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  // Exporta o estado e todas as funções para serem usadas nos componentes
  return (
    <ListContext.Provider
      value={{
        lists,
        addList,
        deleteFullList,
        fetchLists,
        addItemToList,
        toggleItemStatus,
        deleteItem,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

// Hook personalizado para usar o contexto de listas facilmente
export const useLists = () => useContext(ListContext);
