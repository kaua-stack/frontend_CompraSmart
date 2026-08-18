// src/components/NewListModal.jsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLists } from "@/contexts/ListContext";
import { useNavigate } from "react-router-dom"; // Importado para redirecionar

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewListModal({ isOpen, setIsOpen }) {
  const [listName, setListName] = useState("");
  const { addList } = useLists();
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleCreate = async () => {
    if (listName.trim() === "") {
      alert("Por favor, digite um nome para a lista.");
      return;
    }

    try {
      // 🚨 1. Espera a criação da lista e recebe o objeto retornado (com o _id do banco)
      const newList = await addList(listName.trim());

      // 🚨 2. Verifica se a lista foi criada com sucesso e tem um ID
      if (newList && newList._id) {
        setListName(""); // Limpa o input
        setIsOpen(false); // Fecha o modal

        // 🚀 3. Redireciona o usuário para a página de detalhes da nova lista
        navigate(`/dashboard/lists/${newList._id}`);
      }
    } catch (error) {
      console.error("Erro ao criar e redirecionar:", error);
      alert("Houve um erro ao criar a lista. Tente novamente.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Lista de Compras</DialogTitle>
          <DialogDescription>
            Dê um nome à sua lista para começar a adicionar itens.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="listName" className="text-right">
              Nome
            </Label>
            <Input
              id="listName"
              placeholder="Ex: Supermercado Semanal"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="col-span-3"
              onKeyDown={(e) => {
                if (e.key === "Enter" && listName.trim() !== "") {
                  handleCreate();
                }
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} disabled={listName.trim() === ""}>
            Criar e Adicionar Itens
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
