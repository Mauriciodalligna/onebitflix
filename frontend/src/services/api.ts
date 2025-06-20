import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("onebitflix-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("onebitflix-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
