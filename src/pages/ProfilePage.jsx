// src/pages/ProfilePage.jsx
import { useState } from "react";
import { Link } from "react-router-dom"; // useNavigate
import { IoArrowBack, IoEye, IoEyeOff, IoMail, IoPerson } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import Footer from "../components/Footer";

export default function ProfilePage() {
  // Estados para controlar las diferentes vistas del componente
  // 'main','quickAccess','emailLogin'  
  const [currentView, setCurrentView] = useState('main');
  // Estados para manejar los datos de los formularios
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // se implementara mas adelante
//  const navigate = useNavigate();

  // Función para manejar el envío del formulario de acceso rápido
  // Este método enviará un código de acceso temporal al email del usuario
  const handleQuickAccess = (e) => {
    e.preventDefault();
    
    // Validación básica del email
    if (!email || !email.includes('@')) {
      alert('Por favor ingresa un email válido');
      return;
    }
    
    // Aquí implementarías la lógica para enviar el código de acceso rápido
    // Por ejemplo: llamada a tu API backend
    console.log("Enviando código de acceso rápido a:", email);
    alert(`Código de acceso enviado a ${email}`);
    
    // En una implementación real, podrías redirigir a una página de verificación
    // navigate("/verify-code", { state: { email } });
  };

  // Función para manejar el login tradicional con email y contraseña
  const handleEmailLogin = (e) => {
    e.preventDefault();
    
    // Validación de campos requeridos
    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    // Aquí implementarías la lógica de autenticación con tu backend
    console.log("Intentando login con:", email);
    alert(`Iniciando sesión con ${email}`);
    
    // En caso de login exitoso, redirigir al dashboard o perfil del usuario
    // navigate("/dashboard");
  };

  // Función para iniciar el proceso de autenticación con Google OAuth
  const handleGoogleLogin = () => {
    // Aquí implementarías la integración con Google OAuth
    console.log("Iniciando OAuth con Google");
    alert("Función de Google OAuth pendiente de implementar");
    
    // En una implementación real sería algo como:
    // window.location.href = 'https://tu-api.com/auth/google';
  };

  // Función para volver a la vista principal desde cualquier subvista
  const goBack = () => {
    setCurrentView('main');
    // Limpiar los formularios cuando el usuario regrese
    setEmail("");
    setPassword("");
  };

  return (
    // Contenedor principal que ocupa toda la altura de la pantalla
    <section className="min-h-screen bg-[#2a0a59] text-white flex flex-col">
      {/* Contenido principal que toma todo el espacio disponible */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        {/* Vista Principal - Pantalla inicial con las tres opciones de ingreso */}
        {currentView === 'main' && (
          <div className="w-full max-w-md">
            <div className="bg-gray-100 rounded-lg p-6 text-gray-900 mb-6">
              <h2 className="text-center text-xl font-semibold mb-6">
                INICIA SESIÓN
              </h2>

              <div className="space-y-3">
                {/* Opción 1: Recibir clave de acceso rápido por email */}
                <button
                  onClick={() => setCurrentView('quickAccess')}
                  className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md text-sm text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <IoMail className="text-lg mr-3 text-gray-600" />
                  <span>RECIBIR CLAVE DE ACCESO RÁPIDO POR EMAIL</span>
                </button>

                {/* Opción 2: Ingresar con email y contraseña */}
                <button
                  onClick={() => setCurrentView('emailLogin')}
                  className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md text-sm text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <IoPerson className="text-lg mr-3 text-gray-600" />
                  <span>INGRESAR CON EMAIL Y CONTRASEÑA</span>
                </button>

                {/* Opción 3: Ingresar con Google */}
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md text-sm text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <FaGoogle className="text-lg mr-3 text-red-500" />
                  <span>INGRESAR CON GOOGLE</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Vista 2: Formulario de Acceso Rápido por Email */}
        {currentView === 'quickAccess' && (
          <div className="w-full max-w-md">
            <div className="bg-gray-100 rounded-lg p-6 text-gray-900 mb-6">
              {/* Header con botón de regreso y título */}
              <div className="flex items-center mb-4">
                <button 
                  onClick={goBack}
                  className="mr-3 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                  aria-label="Volver"
                >
                  <IoArrowBack size={20} />
                </button>
                <h2 className="text font-semibold">
                  RECIBIR CLAVE DE ACCESO RÁPIDO POR EMAIL
                </h2>
              </div>

              <form onSubmit={handleQuickAccess} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="usuario@gmail.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4a5d3a] text-white py-3 rounded-md font-medium hover:bg-[#3a4d2a] transition-colors duration-200"
                >
                  ENVIAR
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Vista 3: Formulario de Login con Email y Contraseña */}
        {currentView === 'emailLogin' && (
          <div className="w-full max-w-md">
            <div className="bg-gray-100 rounded-lg p-6 text-gray-900 mb-6">
              {/* Header con botón de regreso y título */}
              <div className="flex items-center mb-4">
                <button 
                  onClick={goBack}
                  className="mr-3 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                  aria-label="Volver"
                >
                  <IoArrowBack size={20} />
                </button>
                <h2 className="text-lg font-semibold">
                  INGRESAR CON EMAIL Y CONTRASEÑA
                </h2>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                {/* Campo de Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="usuario@gmail.com"
                  />
                </div>

                {/* Campo de Contraseña con funcionalidad de mostrar/ocultar */}
                <div>
                  <label className="block text-sm font-medium mb-2">CONTRASEÑA</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4a5d3a] text-white py-3 rounded-md font-medium hover:bg-[#3a4d2a] transition-colors duration-200"
                >
                  INGRESAR
                </button>

                {/* Links adicionales para registro y recuperación de contraseña */}
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
      
      {/* Footer que se mantiene siempre en la parte inferior */}
      <Footer />
    </section>
  );
}