// src/components/ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Aquí puedes enviar el error a un servicio de logging (Sentry, LogRocket...)
    console.error('ErrorBoundary captured:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold mb-2">Algo salió mal</h2>
            <p className="mb-4">Estamos trabajando para solucionarlo. Intenta recargar la página.</p>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">{String(this.state.error)}</pre>
            <button
              className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white"
              onClick={() => window.location.reload()}
            >
              Recargar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
