//src/pages/profile/SubscribePage.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function SubscribePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubscribe = () => {
    // Aquí más adelante podrás implementar lógica real de suscripción (Stripe, Supabase, etc.)
    localStorage.setItem("isSubscribed", "true");
    navigate("/checkout");
  };

  return (
    <section className="min-h-screen bg-[#2a0a59] text-white flex items-center justify-center px-4">
      <div className="bg-white text-gray-900 rounded-lg p-8 shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Suscripción</h1>
        <p className="mb-6 text-center text-gray-700">
          Hola <span className="font-semibold">{user?.name || "usuario"}</span>,  
          para continuar con tu compra necesitas activar tu suscripción.
        </p>

        <button
          onClick={handleSubscribe}
          className="w-full bg-[#4a5d3a] text-white py-3 rounded-md font-medium hover:bg-[#3a4d2a] transition-colors duration-200"
        >
          Activar suscripción
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          La suscripción es requerida solo para realizar compras en la web.
        </p>
      </div>
    </section>
  );
}
