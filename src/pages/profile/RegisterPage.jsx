// src/pages/profile/RegisterPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack, IoEye, IoEyeOff, IoPerson, IoMail, IoLockClosed } from "react-icons/io5";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const passwordMeetsPolicy = (pwd) => {
  // mínimo 8, al menos una mayúscula, una minúscula y un número
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // usamos login del contexto

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Limpiar error al escribir
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("El nombre es requerido");
      return false;
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Email inválido");
      return false;
    }
    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    if (!passwordMeetsPolicy(formData.password)) {
      setError("La contraseña debe contener al menos una mayúscula, una minúscula y un número");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password
        }),
      });

      const data = await response.json();

      // Manejo flexible del shape de respuesta
      // Algunas versiones del backend devuelven { success: true, data: { tokens, user } }
      // otras devuelven { success: true, tokens: ..., user: ... }
      const tokens = data?.tokens || data?.data?.tokens || null;
      const user = data?.user || data?.data?.user || { email: formData.email, name: formData.name };

      if (response.ok && tokens) {
        // Guardar vía contexto (useAuth.login) — se encargará de localStorage también
        login(user, tokens);

        setSuccess('¡Cuenta creada exitosamente! Redirigiendo...');
        // Redirigir según necesidad (profile por defecto)
        setTimeout(() => {
          navigate('/profile');
        }, 1200);
        return;
      }

      // Si backend devuelve errores de validación estructurados
      if (data?.errors && Array.isArray(data.errors)) {
        // express-validator style
        setError(data.errors.map(e => e.msg || e).join(' • '));
      } else {
        setError(data.message || 'Error creando la cuenta');
      }

    } catch (err) {
      console.error('Error en registro:', err);
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
    } finally {
      setIsLoading(false);
    }
  };

  // Indicador simple de fuerza de contraseña
  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return '';
    if (p.length < 8) return 'Muy débil';
    if (!passwordMeetsPolicy(p)) return 'Débil';
    return 'Fuerte';
  };

  return (
    <section className="min-h-screen bg-[#2a0a59] text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-100 rounded-lg p-6 text-gray-900 mb-6">
            {/* Header */}
            <div className="flex items-center mb-4">
              <Link 
                to="/profile"
                className="mr-3 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                aria-label="Volver"
              >
                <IoArrowBack size={20} />
              </Link>
              <h2 className="text-xl font-semibold">
                CREAR CUENTA
              </h2>
            </div>

            {/* Mensajes */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <IoPerson className="inline mr-1" />
                  NOMBRE COMPLETO
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <IoMail className="inline mr-1" />
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50"
                  placeholder="tu-email@gmail.com"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <IoLockClosed className="inline mr-1" />
                  CONTRASEÑA
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50"
                    placeholder="Mínimo 8 caracteres"
                    aria-describedby="password-strength"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                  </button>
                </div>
                <p id="password-strength" className="text-xs mt-1 text-gray-600">
                  Fortaleza: <span className={`font-semibold ${passwordStrength() === 'Fuerte' ? 'text-green-600' : 'text-yellow-600'}`}>{passwordStrength()}</span>
                </p>
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <IoLockClosed className="inline mr-1" />
                  CONFIRMAR CONTRASEÑA
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50"
                    placeholder="Repite tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
                    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4a5d3a] text-white py-3 rounded-md font-medium hover:bg-[#3a4d2a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
              </button>

              {/* Link para login */}
              <div className="text-center mt-4">
                <p className="text-sm">
                  ¿Ya tienes una cuenta?{' '}
                  <Link 
                    to="/profile" 
                    className="text-purple-600 hover:text-purple-800 hover:underline transition-colors duration-200"
                  >
                    INICIA SESIÓN
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
