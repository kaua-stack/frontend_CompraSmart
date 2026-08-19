import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const ListContext = createContext(null);

function replaceList(previousLists, updatedList) {
  return previousLists.map((list) =>
    String(list._id || list.id) === String(updatedList._id || updatedList.id)
      ? updatedList
      : list,
  );
}

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const { userToken } = useAuth();

  const fetchLists = useCallback(async () => {
    if (!userToken) {
      setLists([]);
      return [];
    }

    const { data } = await api.get("/api/lists");
    setLists(Array.isArray(data) ? data : []);
    return data;
  }, [userToken]);

  useEffect(() => {
    fetchLists().catch((error) => {
      console.error("Erro ao buscar listas:", error);
      setLists([]);
    });
  }, [fetchLists]);

  const addList = async (listName, budgetValue = 0) => {
    const { data } = await api.post("/api/lists", {
      name: listName,
      budget: Number(String(budgetValue).replace(",", ".")) || 0,
    });
    setLists((previousLists) => [data, ...previousLists]);
    return data;
  };

  const deleteFullList = async (listId) => {
    await api.delete(`/api/lists/${listId}`);
    setLists((previousLists) =>
      previousLists.filter((list) => String(list._id || list.id) !== String(listId)),
    );
    return true;
  };

  const searchProducts = async (query, limit = 12) => {
    const normalizedQuery = String(query || "").trim();
    if (normalizedQuery.length < 2) return [];
    const { data } = await api.get("/api/products/search", {
      params: { q: normalizedQuery, limit },
    });
    return Array.isArray(data) ? data : [];
  };

  const addItemToList = async (listId, itemData) => {
    const { data } = await api.post(`/api/lists/${listId}/items`, {
      name: itemData.name,
      productId: itemData.productId || null,
      quantity: Number(itemData.quantity) || 1,
      price: itemData.price === "" ? null : Number(String(itemData.price).replace(",", ".")),
      category: itemData.category || null,
      unit: itemData.unit || null,
    });
    setLists((previousLists) => replaceList(previousLists, data));
    return data;
  };

  const updateItemQuantity = async (listId, itemId, quantity) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    const { data } = await api.patch(`/api/lists/${listId}/items/${itemId}`, {
      quantity: safeQuantity,
    });
    setLists((previousLists) => replaceList(previousLists, data));
    return data;
  };

  const toggleItemStatus = async (listId, itemId) => {
    const { data } = await api.patch(`/api/lists/${listId}/items/${itemId}`);
    setLists((previousLists) => replaceList(previousLists, data));
    return data;
  };

  const deleteItem = async (listId, itemId) => {
    const { data } = await api.delete(`/api/lists/${listId}/items/${itemId}`);
    setLists((previousLists) => replaceList(previousLists, data));
    return data;
  };

  const compareList = async (listId, markets = []) => {
    const { data } = await api.post(`/api/lists/${listId}/compare`, {
      markets,
    });
    return data;
  };

  return (
    <ListContext.Provider
      value={{
        lists,
        addList,
        deleteFullList,
        fetchLists,
        searchProducts,
        addItemToList,
        updateItemQuantity,
        toggleItemStatus,
        deleteItem,
        compareList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useLists = () => useContext(ListContext);
