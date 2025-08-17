// src/pages/ProfilePage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [open, setOpen] = useState(true); // el modal aparece al montar
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);

  const handleGoogle = () => {
    // placeholder: aquí conectas con tu flujo OAuth
    // por ahora solo demo
    alert("Conectar con Google (placeholder)");
  };

  const handleEmailContinue = (e) => {
    e.preventDefault();
    // placeholder: enviar al flujo de login/registro con email
    alert(`Enviar código / continuar con ${email}`);
  };

  return (
    <section className="min-h-screen bg-[#2a0a59] text-white px-4 pt-6">
      {/* Encabezado superior (como en referencia) */}
      <div className="text-center mb-6">
      </div>

      {/* Si modal cerrado mostramos un CTA simple para reabrir (útil en mobile) */}
      {!open && (
        <div className="flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-full border border-white text-white"
          >
            Abrir ingreso
          </button>
        </div>
      )}

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Fondo semitransparente */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Card */}
          <div className="relative w-full max-w-md mx-4">
            <div className="bg-white text-gray-900 rounded-xl shadow-xl overflow-hidden">
              <button
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                aria-label="Cerrar"
                style={{ zIndex: 10 }}
              >
              </button>

              <div className="p-6 pt-8">
                <h2 className="text-center text-lg font-semibold mb-3">
                  ¿Ya tienes una cuenta?
                </h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                  Inicia sesión o crea una cuenta para acceder a tus pedidos y
                  configuraciones.
                </p>

                {/* Si solicitó continuar con email, mostramos el formulario */}
                {showEmailForm ? (
                  <form onSubmit={handleEmailContinue} className="space-y-3">
                    <label className="text-xs text-gray-600">Correo electrónico</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="tu@email.com"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#00c853] text-white py-2 rounded-md font-medium"
                    >
                      Continuar
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="w-full mt-1 border border-gray-200 text-gray-700 py-2 rounded-md text-sm"
                    >
                      Volver
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {/* Ingresar a Perfil (link) */}
                    <Link
                      to="/profile" // aquí navega a perfil; en producción solo si ya autenticado
                      onClick={() => {
                        // si quieres forzar cierre o lógica extra:
                        setOpen(false);
                        navigate("/profile");
                      }}
                      className="block w-full text-center px-4 py-2 rounded-md border border-gray-200 text-sm bg-gray-50 hover:bg-gray-100"
                    >
                      ingresar a Perfil
                    </Link>

                    {/* Botón Google */}
                    <button
                      onClick={handleGoogle}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-sm bg-white hover:bg-gray-50"
                    >
                      <span className="text-lg">G</span>
                      <span>Continuar con Google</span>
                    </button>

                    {/* Botón email verde */}
                    <button
                      onClick={() => setShowEmailForm(true)}
                      className="w-full bg-[#00c853] text-white py-2 rounded-md font-medium text-sm"
                    >
                      Continuar con correo electrónico
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Pie explicativo pequeño (opcional) */}
            <div className="mt-3 text-center text-xs text-white/80">
              Al continuar aceptas nuestras condiciones y la política de privacidad.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
