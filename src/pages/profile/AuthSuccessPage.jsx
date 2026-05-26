// src/pages/profile/AuthSuccessPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AuthSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const { refetch } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refresh');

    if (token && refreshToken) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      setStatus('success');

      // Actualizar contexto (refetch traerá /auth/me y actualizará user)
      refetch().finally(() => {
        setTimeout(() => navigate('/'), 1200);
      });
    } else {
      setStatus('error');
      setTimeout(() => navigate('/profile'), 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#2a0a59] flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a0a59] mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Procesando autenticación...</h2>
            <p className="text-gray-600">Espera un momento mientras completamos tu inicio de sesión.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">¡Autenticación exitosa!</h2>
            <p className="text-gray-600 mb-4">Has iniciado sesión correctamente. Serás redirigido en un momento.</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error de autenticación</h2>
            <p className="text-gray-600 mb-4">Hubo un problema con tu inicio de sesión. Serás redirigido para intentar de nuevo.</p>
          </>
        )}
      </div>
    </div>
  );
}
