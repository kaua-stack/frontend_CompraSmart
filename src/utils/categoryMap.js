// src/utils/categoryMap.js
export const CATEGORY_MAP = {
  Açougue: {
    keywords: [
      "carne",
      "bife",
      "frango",
      "linguiça",
      "picanha",
      "costela",
      "salsicha",
      "maminha",
      "bacon",
      "presunto",
      "moída",
    ],
    color: "#ef4444", // Vermelho
  },
  Higiene: {
    keywords: [
      "shampoo",
      "sabonete",
      "pasta",
      "dente",
      "escova",
      "desodorante",
      "papel higiênico",
    ],
    color: "#ec4899", // Rosa/Pink
  },
  Limpeza: {
    keywords: [
      "detergente",
      "amaciante",
      "sabão",
      "cloro",
      "desinfetante",
      "esponja",
      "álcool",
    ],
    color: "#06b6d4", // Ciano/Azul claro
  },
  Hortifruti: {
    keywords: [
      "banana",
      "maçã",
      "tomate",
      "cebola",
      "alho",
      "alface",
      "batata",
      "cenoura",
    ],
    color: "#22c55e", // Verde
  },
  Laticínios: {
    keywords: ["leite", "queijo", "iogurte", "manteiga", "requeijão", "danone"],
    color: "#f59e0b", // Laranja/Amarelo
  },
  Padaria: {
    keywords: ["pão", "bisnaga", "bolo", "biscoito", "bolacha", "torrada"],
    color: "#844d36", // Marrom
  },
  Mercearia: {
    keywords: [
      "arroz",
      "feijão",
      "macarrão",
      "óleo",
      "azeite",
      "café",
      "açúcar",
    ],
    color: "#6366f1", // Índigo/Roxo
  },
  Bebidas: {
    keywords: ["cerveja", "refrigerante", "suco", "vinho", "água"],
    color: "#3b82f6", // Azul
  },
};

export const getCategory = (itemName) => {
  if (!itemName) return "Outros";
  const name = itemName.toLowerCase();
  for (const [category, data] of Object.entries(CATEGORY_MAP)) {
    if (data.keywords.some((keyword) => name.includes(keyword))) {
      return category;
    }
  }
  return "Outros";
};
