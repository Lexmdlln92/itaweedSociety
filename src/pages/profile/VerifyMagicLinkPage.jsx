// src/pages/profile/VerifyMagicLinkPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function VerifyMagicLinkPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    console.log('🔍 Token recibido:', token);
    console.log('🔗 API URL:', API_BASE_URL);
    
    if (!token) {
      setStatus('error');
      setError('Token de verificación no encontrado en la URL');
      return;
    }

    verifyMagicLink(token);
  }, [searchParams]);

  const verifyMagicLink = async (token) => {
    try {
      console.log('📤 Enviando petición a:', `${API_BASE_URL}/auth/verify-magic-link`);
      
      const response = await fetch(`${API_BASE_URL}/auth/verify-magic-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      console.log('📥 Respuesta status:', response.status);

      const data = await response.json();
      console.log('📦 Datos recibidos:', data);

      if (response.ok && data.success) {
        // Guardar tokens y usuario
        localStorage.setItem('accessToken', data.data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        setStatus('success');
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setStatus('error');
        setError(data.message || 'Error verificando el enlace');
      }
    } catch (error) {
      console.error('❌ Error en verificación:', error);
      setStatus('error');
      setError('Error de conexión. Verifica que el servidor esté funcionando en ' + API_BASE_URL);
    }
  };

  const handleRetry = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#2a0a59] flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a0a59] mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verificando enlace...
            </h2>
            <p className="text-gray-600">
              Espera mientras verificamos tu enlace de acceso rápido.
            </p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              ¡Verificación exitosa!
            </h2>
            <p className="text-gray-600 mb-4">
              Has iniciado sesión correctamente. Serás redirigido en un momento.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-800 text-sm">
                Bienvenido de nuevo a Itaweed Society
              </p>
            </div>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Error de verificación
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
            <p className="text-gray-600 mb-4">
              El enlace puede haber expirado o ya fue utilizado.
            </p>
            <button
              onClick={handleRetry}
              className="w-full bg-[#2a0a59] text-white py-2 px-4 rounded-md hover:bg-[#1a0a39] transition-colors"
            >
              Intentar de nuevo
            </button>
          </>
        )}
      </div>
    </div>
  );
}