import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";
import { routes } from "./config/routes";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext"; // Agregar esta línea

function App() {
  return (
    <CartProvider> {/* Agregar este wrapper */}
      <>
        <ScrollToTop 
          behavior="smooth" 
          delay={100}
          excludePaths={['/']}
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
    </CartProvider>
  );
}

export default App;