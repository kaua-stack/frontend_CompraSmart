import axios from "axios";

// Cria uma instância do Axios para centralizar as chamadas à API
// Assim, não precisamos repetir a URL base em todos os arquivos
const api = axios.create({
  // URL do backend Node.js/Express com MySQL
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
});

// Interceptor de Requisição: roda antes de QUALQUER chamada à API
api.interceptors.request.use(
  (config) => {
    // Busca o token de autenticação que salvamos no navegador ao fazer login
    const token = localStorage.getItem("userToken");

    // Log para ajudar no debug se a conexão falhar
    console.log("DEBUG: Tentando enviar o token:", token);

    if (token) {
      // Limpa aspas extras que o LocalStorage às vezes coloca no token
      const cleanToken = token.replace(/"/g, "");
      
      // Adiciona o token no cabeçalho 'Authorization' da requisição
      // O backend espera o formato "Bearer <token>"
      config.headers.Authorization = `Bearer ${cleanToken}`;
      console.log("DEBUG: Header de autorização configurado!");
    } else {
      console.log("DEBUG: Token não encontrado no LocalStorage!");
    }

    return config;
  },
  (error) => {
    // Caso ocorra um erro antes mesmo de enviar a requisição
    return Promise.reject(error);
  }
);

export default api;
