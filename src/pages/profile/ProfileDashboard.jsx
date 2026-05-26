// src/pages/profile/ProfileDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export default function ProfileDashboard() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/profile");
  };

  // Helpers phone formatting
  const formatPhoneGroups = (digits = "") => {
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 8);
    const d = digits.slice(8, 10);
    return [a, b, c, d].filter(Boolean).join(" ");
  };

  const extractDigitsFromPhone = (phone = "") => {
    if (!phone) return "";
    let digits = phone.replace(/\D/g, "");
    if (digits.length > 10 && digits.startsWith("57")) digits = digits.slice(2);
    if (digits.length > 10) digits = digits.slice(-10);
    return digits.slice(0, 10);
  };

  const buildFullPhoneFromDigits = (digits = "") => {
    if (!digits) return "";
    return `+57 ${formatPhoneGroups(digits)}`;
  };

  const isValidPhoneDigits = (digits = "") => /^\d{10}$/.test(digits);

  // Edit flows
  const startEdit = (field) => {
    setEditingField(field);
    setFeedback("");
    if (field === "phone") {
      setTempValue(extractDigitsFromPhone(userData.phone));
    } else {
      setTempValue(userData[field] || "");
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue("");
    setFeedback("");
    setShowConfirmModal(false);
  };

  const onPhoneInputChange = (e) => {
    const raw = e.target.value || "";
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    setTempValue(digits);
  };

  const onRequestSave = () => {
    if (!editingField) return;
    if (editingField === "name") {
      if (!tempValue.trim()) {
        setFeedback("El nombre no puede estar vacío.");
        return;
      }
    }
    if (editingField === "phone") {
      if (!tempValue.trim()) {
        setFeedback("El teléfono no puede estar vacío.");
        return;
      }
      if (!isValidPhoneDigits(tempValue.trim())) {
        setFeedback("Formato inválido. Debes ingresar 10 dígitos. Ej: 300 200 50 25");
        return;
      }
    }
    setShowConfirmModal(true);
  };

  const confirmSave = async () => {
    if (!editingField) return;
    setIsSaving(true);
    setShowConfirmModal(false);
    setFeedback("");

    try {
      const changes = {};
      if (editingField === "name") changes.name = tempValue.trim();
      if (editingField === "phone") changes.phone = buildFullPhoneFromDigits(tempValue.trim());

      if (typeof updateProfile === "function") {
        const result = await updateProfile(changes);
        if (result.ok) {
          setUserData({
            name: result.user?.name ?? userData.name,
            email: result.user?.email ?? userData.email,
            phone: result.user?.phone ?? userData.phone,
          });
          setFeedback("Cambios guardados correctamente.");
          setEditingField(null);
          setTempValue("");
        } else {
          setFeedback(result.error || "Error actualizando perfil.");
        }
      } else {
        // Fallback: si por alguna razón updateProfile no está disponible
        const optimistic = { ...userData, ...changes };
        setUserData(optimistic);
        try {
          localStorage.setItem("user", JSON.stringify(optimistic));
        } catch {
          // ignore localStorage write errors
        }
        setFeedback("Cambios guardados localmente.");
        setEditingField(null);
        setTempValue("");
      }
    } catch (err) {
      console.error("confirmSave error:", err);
      setFeedback("Ocurrió un error al guardar. Revisa la consola.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(""), 5000);
    }
  };

  return (
    <section className="min-h-screen bg-[#2a0a59] text-white flex items-center justify-center px-4 py-10">
      <div className="bg-white text-gray-900 rounded-lg p-8 shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <FaUserCircle size={100} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">Perfil</h1>
        </div>

        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <p className="text-sm text-gray-500">Nombre</p>
                {editingField === "name" ? (
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    placeholder="Tu nombre"
                    autoFocus
                  />
                ) : (
                  <p className="font-semibold">{userData?.name || "No disponible"}</p>
                )}
              </div>

              <div className="ml-3">
                {editingField === "name" ? (
                  <div className="flex items-center space-x-2">
                    <button onClick={onRequestSave} disabled={isSaving} className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                      {isSaving ? "Guardando..." : "Guardar"}
                    </button>
                    <button onClick={cancelEdit} disabled={isSaving} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300">
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button onClick={() => startEdit("name")} className="p-2 rounded hover:bg-gray-100"><FiEdit size={18} /></button>
                )}
              </div>
            </div>
          </div>

          {/* Correo */}
          <div>
            <p className="text-sm text-gray-500">Correo</p>
            <p className="font-semibold">{userData?.email || "No disponible"}</p>
          </div>

          {/* Teléfono */}
          <div>
            <div className="flex items-start justify-between">
              <div className="w-full">
                <p className="text-sm text-gray-500">Teléfono</p>

                {editingField === "phone" ? (
                  <div className="mt-1 flex items-center">
                    <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-sm text-gray-700">+57</span>
                    <input
                      type="tel"
                      value={formatPhoneGroups(tempValue)}
                      onChange={onPhoneInputChange}
                      className="mt-0 ml-0 w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none"
                      placeholder="300 200 50 25"
                      autoFocus
                    />
                  </div>
                ) : (
                  <p className="font-semibold">{userData?.phone || "No registrado"}</p>
                )}

                {!userData?.phone && (
                  <p className="mt-1 text-xs italic text-gray-500">
                    El número de teléfono es necesario para el seguimiento del pedido y notificaciones de entrega.
                  </p>
                )}
              </div>

              <div className="ml-3">
                {editingField === "phone" ? (
                  <div className="flex items-center space-x-2">
                    <button onClick={onRequestSave} disabled={isSaving} className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                      {isSaving ? "Guardando..." : "Guardar"}
                    </button>
                    <button onClick={cancelEdit} disabled={isSaving} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300">
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button onClick={() => startEdit("phone")} className="p-2 rounded hover:bg-gray-100"><FiEdit size={18} /></button>
                )}
              </div>
            </div>
          </div>
        </div>

        {feedback && <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded text-sm">{feedback}</div>}

        <button onClick={handleLogout} className="mt-6 w-full bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700">Cerrar sesión</button>
      </div>

      {/* Modal confirm */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white text-gray-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-3">Confirmar cambios</h3>
            <p className="text-sm mb-4">¿Aceptas aplicar el cambio en <strong>{editingField}</strong> con el valor:</p>
            <div className="mb-4 p-3 border border-gray-200 rounded bg-gray-50 text-sm">
              {editingField === "phone" ? buildFullPhoneFromDigits(tempValue) : tempValue}
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded">Cancelar</button>
              <button onClick={confirmSave} disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded">{isSaving ? "Aplicando..." : "Sí, aplicar cambios"}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
