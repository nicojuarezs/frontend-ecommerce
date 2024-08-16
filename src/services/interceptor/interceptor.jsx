import axios from "axios";
import { useUser } from "../../context/UserContext"; // Asegúrate de que esta ruta es correcta

const useApi = () => {
  const { token } = useUser(); // Obtén el token desde el contexto

  const api = axios.create({
    baseURL: "http://localhost:3000/api", // Asegúrate de que esta URL es correcta
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};

export default useApi;
