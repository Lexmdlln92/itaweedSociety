import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";
import { routes } from "./config/routes";
import Home from "./pages/Home";

function App() {
  return (
    <>
      {/* Componente para scroll automático al cambiar de ruta */}
      <ScrollToTop 
        behavior="smooth" 
        delay={100}
        excludePaths={['/']} // Agregar rutas donde no quieras auto-scroll si es necesario
      />
      
      <Navbar />
      <main className="pt-16 pb-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;