import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_SERVER_URL;

const userContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

 
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  
  const login = async (data) => {
    try {
      const response = await axios.post(`${URL}/login`, data);
      const { ok, user, token } = response.data;
  
      if (ok) {
        setUser(user);
        setToken(token);
        return { success: true };
      } else {
        return { success: false };
      }
  
    } catch (error) {
      console.error("Login error:", error);
      return { success: false };
    }
  };

 
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    Swal.fire({
      title: "Éxito",
      text: "Has cerrado sesión correctamente.",
      icon: "success",
      timer: 1500,
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <userContext.Provider value={{ user, token, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
