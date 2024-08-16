import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Registro.css';

const API_URL = 'http://localhost:3000/api/users';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    province: 'BA',
    observations: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData);
      console.log('Usuario registrado:', response.data);
      Swal.fire('Éxito', 'Usuario registrado correctamente', 'success');
      // Limpia el formulario después de un registro exitoso
      setFormData({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        province: 'BA',
        observations: ''
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
    }
  };

  return (
    <div className="main-contact">
      <div className="contact-form-wrapper">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="box-shadow">REGISTRO</h2>
          <div className="input-group">
            <label htmlFor="fullname">Nombre Completo (*)</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Juan Perez"
              required
              minLength="5"
              maxLength="30"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Correo Electrónico (*)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="usuarioejemplo@gmail.com"
              required
              minLength="5"
              maxLength="35"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña (*)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              minLength="5"
              maxLength="25"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña (*)</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar Contraseña"
              required
              minLength="5"
              maxLength="25"
            />
          </div>

          <div className="input-group">
            <label htmlFor="birthDate">Fecha de Nacimiento (*)</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="province">Seleccione su Provincia (*)</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="BA">Buenos Aires</option>
              <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
              <option value="CAT">Catamarca</option>
              <option value="CH">Chaco</option>
              <option value="CHU">Chubut</option>
              <option value="COR">Córdoba</option>
              <option value="CO">Corrientes</option>
              <option value="ER">Entre Ríos</option>
              <option value="FOR">Formosa</option>
              <option value="JU">Jujuy</option>
              <option value="LP">La Pampa</option>
              <option value="LR">La Rioja</option>
              <option value="ME">Mendoza</option>
              <option value="MI">Misiones</option>
              <option value="NEU">Neuquén</option>
              <option value="RN">Río Negro</option>
              <option value="SA">Salta</option>
              <option value="SJ">San Juan</option>
              <option value="SL">San Luis</option>
              <option value="SC">Santa Cruz</option>
              <option value="SF">Santa Fe</option>
              <option value="SE">Santiago del Estero</option>
              <option value="TAI">Tierra del Fuego, Antártida e Islas del Atlántico Sur</option>
              <option value="TU">Tucumán</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="observations">Observaciones</label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              placeholder="Ingrese su mensaje aquí"
              minLength="20"
              maxLength="300"
            ></textarea>
          </div>

          <button type="submit" className="form-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
