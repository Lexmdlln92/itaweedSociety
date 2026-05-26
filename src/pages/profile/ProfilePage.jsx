// src/pages/profile/ProfilePage.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack, IoEye, IoEyeOff, IoMail, IoPerson } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";

// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function ProfilePage() {
  const { login, user } = useAuth(); // ahora también obtenemos user
  const navigate = useNavigate();
  
  // Si ya hay usuario, redirigimos al dashboard
  useEffect(() => {
    if (user) {
      navigate("/profile/dashboard", { replace: true });
    }
  }, [user, navigate]);

  // Estados para controlar las diferentes vistas del componente
  const [currentView, setCurrentView] = useState('main');
  
  // Estados para manejar los datos de los formularios
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados para manejar loading y errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Limpiar mensajes de error y éxito
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // Función para manejar el envío del formulario de acceso rápido (Magic Link)
  const handleQuickAccess = async (e) => {
    e.preventDefault();
    clearMessages();
    
    // Validación básica del email
    if (!email || !email.includes('@')) {
      setError('Por favor ingresa un email válido');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/magic-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(`Magic link enviado a ${email}. Revisa tu bandeja de entrada.`);
        setEmail(""); // Limpiar el formulario
        
        // Opcional: mostrar instrucciones adicionales
        setTimeout(() => {
          setSuccess(`Magic link enviado. El enlace expirará en 15 minutos.`);
        }, 3000);
      } else {
        setError(data.message || 'Error enviando magic link');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el login tradicional con email y contraseña
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    clearMessages();
    
    // Validación de campos requeridos
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    // Validación de formato de email
    if (!email.includes('@')) {
      setError('Por favor ingresa un email válido');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Usar el contexto de autenticación para manejar los tokens
        const tokens = data.data?.tokens || data.tokens;
        const userResponse = data.data?.user || data.user;
        
        if (tokens && userResponse) {
          login(userResponse, tokens);
          setSuccess('¡Login exitoso! Redirigiendo...');
          
          // Limpiar formulario
          setEmail("");
          setPassword("");
          
          // Redirigir al dashboard del perfil
          navigate('/profile/dashboard');
        } else {
          setError('Respuesta del servidor incompleta');
        }
      } else {
        // Manejo de errores específicos
        if (response.status === 401) {
          setError('Email o contraseña incorrectos');
        } else if (response.status === 404) {
          setError('Usuario no encontrado. ¿Deseas registrarte?');
        } else {
          setError(data.message || 'Error en el login');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para iniciar el proceso de autenticación con Google OAuth
  const handleGoogleLogin = () => {
    clearMessages();
    setIsLoading(true);
    
    try {
      // Redirigir directamente al endpoint de Google OAuth del backend
      window.location.href = `${API_BASE_URL}/auth/google`;
    } catch (error) {
      console.error('Error:', error);
      setError('Error al iniciar autenticación con Google');
      setIsLoading(false);
    }
  };

  // Función para volver a la vista principal desde cualquier subvista
  const goBack = () => {
    setCurrentView('main');
    clearMessages();
    // Limpiar los formularios cuando el usuario regrese
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <section className="min-h-screen bg-[#2a0a59] text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        {/* Vista Principal */}
        {currentView === 'main' && (
          <div className="w-full max-w-md">
            <div className="bg-gray-100 rounded-lg p-6 text-gray-900 mb-6">
              <h2 className="text-center text-xl font-semibold mb-6">
                INICIA SESIÓN
              </h2>

              {/* Mensajes de error o éxito globales */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}

              <div className="space-y-3">
                {/* Opción 1: Magic Link */}
                <button
                  onClick={() => setCurrentView('quickAccess')}
                  disabled={isLoading}
                  className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md text-sm text-left hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoMail className="text-lg mr-3 text-gray-600" />
                  <span>RECIBIR CLAVE DE ACCESO RÁPIDO POR EMAIL</span>
                </button>

                {/* Opción 2: Email/Password */}
                <button
                  onClick={() => setCurrentView('emailLogin')}
                  disabled={isLoading}
                  className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md text-sm text-left hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoPerson className="text-lg mr-3 text-gray-600" />
                  <span>INGRESAR CON EMAIL Y CONTRASEÑA</span>
                </button>

                {/* Opción 3: Google OAuth */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md text-sm text-left hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaGoogle className="text-lg mr-3 text-red-500" />
                  <span>
                    {isLoading ? 'REDIRIGIENDO A GOOGLE...' : 'INGRESAR CON GOOGLE'}
                  </span>
                </button>
              </div>

              {/* Link para registro */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  ¿No tienes una cuenta?{' '}
                  <Link 
                    to="/register" 
                    className="text-purple-600 hover:text-purple-800 hover:underline transition-colors duration-200 font-medium"
                  >
                    REGÍSTRATE
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Vista 2: Magic Link */}
        {currentView === 'quickAccess' && (
          <div className="w-full max-w-md">
            <div className="bg-gray-100 rounded-lg p-6 text-gray-900 mb-6">
              <div className="flex items-center mb-4">
                <button 
                  onClick={goBack}
                  disabled={isLoading}
                  className="mr-3 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 disabled:opacity-50"
                  aria-label="Volver"
                >
                  <IoArrowBack size={20} />
                </button>
                <h2 className="text-lg font-semibold">
                  ACCESO RÁPIDO POR EMAIL
                </h2>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Ingresa tu email y te enviaremos un enlace mágico para iniciar sesión sin contraseña.
              </p>

              {/* Mensajes de error o éxito */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{success}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleQuickAccess} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="usuario@gmail.com"
                    autoComplete="email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4a5d3a] text-white py-3 rounded-md font-medium hover:bg-[#3a4d2a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'ENVIANDO...' : 'ENVIAR ENLACE MÁGICO'}
                </button>

                <div className="text-center text-xs text-gray-500 mt-3">
                  El enlace de acceso expirará en 15 minutos
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Vista 3: Email/Password Login */}
        {currentView === 'emailLogin' && (
          <div className="w-full max-w-md">
            <div className="bg-gray-100 rounded-lg p-6 text-gray-900 mb-6">
              <div className="flex items-center mb-4">
                <button 
                  onClick={goBack}
                  disabled={isLoading}
                  className="mr-3 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 disabled:opacity-50"
                  aria-label="Volver"
                >
                  <IoArrowBack size={20} />
                </button>
                <h2 className="text-lg font-semibold">
                  INGRESAR CON EMAIL Y CONTRASEÑA
                </h2>
              </div>

              {/* Mensajes de error o éxito */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{success}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50"
                    placeholder="usuario@gmail.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CONTRASEÑA</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50"
                      placeholder="••••••••"
                      autoComplete="current-password"
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
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4a5d3a] text-white py-3 rounded-md font-medium hover:bg-[#3a4d2a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'INGRESANDO...' : 'INGRESAR'}
                </button>

                <div className="text-center space-y-2 mt-4">
                  <p className="text-sm">
                    <Link 
                      to="/register" 
                      className="text-purple-600 hover:text-purple-800 hover:underline transition-colors duration-200"
                    >
                      ¿No tienes una cuenta? REGÍSTRATE
                    </Link>
                  </p>
                  <p className="text-sm">
                    <Link 
                      to="/forgot-password" 
                      className="text-purple-600 hover:text-purple-800 hover:underline transition-colors duration-200"
                    >
                      OLVIDÉ MI CONTRASEÑA
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </section>
  );
}
