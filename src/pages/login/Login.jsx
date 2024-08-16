import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const URL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
  const { login } = useUser();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  if (!URL) {
    console.error("Server URL is not defined");
    return <div>Error: Server URL not defined</div>;
  }

  async function onLogin(data) {
    try {
      const result = await login(data);
  
      if (result.success) {
        Swal.fire("Éxito", "Inicio de sesión exitoso", "success").then(() => {
          navigate("/"); // Redirige a la página principal
        });
      } else {
        Swal.fire("Error", "El inicio de sesión falló. Por favor, verifica tus credenciales.", "error");
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      Swal.fire("Error", "El inicio de sesión falló. Por favor, verifica tus credenciales.", "error");
    }
  }

  return (
    <div className="login-container">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <form className="login-form" onSubmit={handleSubmit(onLogin)}>
        <h1>Login</h1>
        <label>Correo electrónico</label>
        <input
          {...register("email", { required: true })}
          type="text"
          placeholder="Correo electrónico"
        />

        <label>Contraseña</label>
        <input
          {...register("password", { required: true, maxLength: 20 })}
          type="password"
          placeholder="Contraseña"
        />

        <button type="submit" className="button">
          Ingresar
        </button>
      </form>
    </div>
  );
}
