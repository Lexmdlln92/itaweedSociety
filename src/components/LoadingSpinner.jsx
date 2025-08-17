// src/components/LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Spinner principal */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm animate-pulse">Cargando...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;