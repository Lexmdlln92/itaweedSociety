// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div className="pt-20">Cargando...</div>;

  if (!isAuthenticated && location.pathname === '/profile') {
    return children; // permitir /profile (login) sin redirigir a sí mismo
  }

  if (!isAuthenticated) {
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
