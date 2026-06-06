// src/pages/profile/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ========================================
   FRAMER MOTION VARIANTS (Fiel a VisionLEXPage)
   ======================================== */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

/* ========================================
   SVG ICONS
   ======================================== */
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 6" />
  </svg>
);

const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconGoogle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconBack = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

/* ========================================
   EVOLUTION ILLUSTRATION
   ======================================== */


/* ========================================
   LOGIN PAGE COMPONENT
   ======================================== */
export default function LoginPage() {
  const navigate = useNavigate();

  const [view, setView] = useState("options"); // "options", "email-login", "password-login", "email-reset", "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ========================================
     HANDLERS
     ======================================== */
  const handleMagicLinkSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      console.log("Magic link request:", { email });
      setTimeout(() => {
        setSuccess("¡Revisa tu correo! Te enviamos un enlace de acceso");
        setTimeout(() => {
          setEmail("");
          setView("options");
          setSuccess("");
          setLoading(false);
        }, 2500);
      }, 1200);
    } catch (err) {
      setError(err.message || "Error al enviar el enlace");
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      console.log("Login attempt:", { email, password });
      setTimeout(() => {
        setSuccess("¡Bienvenido! Redirigiendo...");
        setTimeout(() => navigate("/"), 1500);
      }, 1200);
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      console.log("Google login iniciado");
      setSuccess("Conectando con Google...");
    } catch (err) {
      setError(err.message || "Error al conectar con Google");
      setLoading(false);
    }
  };

  return (
    <section className="nap-root min-h-screen flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      {/* -- GEOMETRIC BACKGROUND (Idéntico a VisionLEXPage) -- */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="w-full max-w-lg bg-black/40 border border-white/5 p-8 md:p-10 backdrop-blur-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Marcador técnico industrial de esquina */}
        {/* <span className="nap-badge-tech absolute top-3 right-3 text-[10px] font-mono text-purple-400/50 select-none">
            LEX AUTHENTICATION SYSTEM
        </span> */}

        {/* ========================================
           HEADER - MAIN OPTIONS VIEW
           ======================================== */}
        <AnimatePresence mode="wait">
          {view === "options" && (
            <motion.div
              key="header"
              variants={formVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="text-center mb-8"
            >


              <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tighter uppercase leading-none text-white mb-2">
                Inicia
                <br />
                <span className="text-purple-500">Sesión</span>
              </h1>

              <div className="w-12 h-[1px] bg-purple-500/50 mx-auto my-4" />

              <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Elige cómo deseas acceder a tu cuenta
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================
           MAIN OPTIONS BUTTONS
           ======================================== */}
        <AnimatePresence mode="wait">
          {view === "options" && (
            <motion.div
              key="options"
              variants={formVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-4"
            >
              {/* Option 1: Magic Link */}
              <motion.button
                variants={cardVariants}
                className="w-full text-left bg-zinc-950/40 border border-zinc-800 hover:border-purple-500/40 p-4 flex items-center gap-4 group transition-all duration-300 cursor-pointer"
                onClick={() => setView("email-reset")}
              >
                <div className="text-purple-400 bg-purple-950/30 p-2 border border-purple-900/40">
                  <IconMail />
                </div>
                <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase flex-1 group-hover:text-white transition-colors">
                  Recibir clave de acceso rápido por email
                </span>
                <div className="text-zinc-500 group-hover:text-purple-400 transition-transform group-hover:translate-x-1">
                  <IconArrow />
                </div>
              </motion.button>

              {/* Option 2: Email + Password */}
              <motion.button
                variants={cardVariants}
                className="w-full text-left bg-zinc-950/40 border border-zinc-800 hover:border-purple-500/40 p-4 flex items-center gap-4 group transition-all duration-300 cursor-pointer"
                onClick={() => setView("password-login")}
              >
                <div className="text-purple-400 bg-purple-950/30 p-2 border border-purple-900/40">
                  <IconUser />
                </div>
                <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase flex-1 group-hover:text-white transition-colors">
                  Ingresar con email y contraseña
                </span>
                <div className="text-zinc-500 group-hover:text-purple-400 transition-transform group-hover:translate-x-1">
                  <IconArrow />
                </div>
              </motion.button>

              {/* Option 3: Google */}
              <motion.button
                variants={cardVariants}
                className="w-full text-left bg-zinc-950/40 border border-zinc-800 hover:border-purple-500/40 p-4 flex items-center gap-4 group transition-all duration-300 cursor-pointer"
                onClick={handleGoogleLogin}
              >
                <div className="text-purple-400 bg-purple-950/30 p-2 border border-purple-900/40">
                  <IconGoogle />
                </div>
                <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase flex-1 group-hover:text-white transition-colors">
                  Ingresar con Google
                </span>
                <div className="text-zinc-500 group-hover:text-purple-400 transition-transform group-hover:translate-x-1">
                  <IconArrow />
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================
           FORM: EMAIL + PASSWORD LOGIN
           ======================================== */}
        <AnimatePresence mode="wait">
          {view === "password-login" && (
            <motion.div
              key="password-form"
              variants={formVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="flex items-center justify-between mb-6 border-b border-zinc-900 pb-4">
                <button
                  className="text-zinc-400 hover:text-purple-400 transition-colors cursor-pointer"
                  onClick={() => {
                    setView("options");
                    setEmail("");
                    setPassword("");
                    setError("");
                    setSuccess("");
                  }}
                >
                  <IconBack />
                </button>
                <h2 className="text-sm font-mono tracking-widest text-white uppercase font-black">Inicia Sesión</h2>
                <div style={{ width: "16px" }} />
              </div>

              <form onSubmit={handlePasswordLogin} className="flex flex-col gap-5">
                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">Correo electrónico</label>
                  <div className="relative flex items-center bg-zinc-950/60 border border-zinc-800 px-3 text-zinc-400 focus-within:border-purple-500/50 transition-colors">
                    <IconMail />
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent border-none py-3 px-3 text-sm text-white focus:outline-none placeholder-zinc-600 font-mono"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">Contraseña</label>
                  <div className="relative flex items-center bg-zinc-950/60 border border-zinc-800 px-3 text-zinc-400 focus-within:border-purple-500/50 transition-colors">
                    <IconLock />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-transparent border-none py-3 px-3 text-sm text-white focus:outline-none placeholder-zinc-600 font-mono"
                    />
                    <button
                      type="button"
                      className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </button>
                  </div>
                </div>

                {/* Alert Messages */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 bg-red-950/20 border border-red-500/30 text-red-400 text-xs font-mono tracking-wide"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 bg-purple-950/20 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-wide"
                    >
                      {success}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-purple-950/20 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span>{loading ? "Procesando..." : "Entrar"}</span>
                  {!loading && <IconArrow />}
                </motion.button>

                {/* Footer Actions */}
                <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-zinc-900 text-center">
                  <h3>
                    <button 
                      type="button"
                      className="text-[11px] font-mono tracking-wider text-zinc-500 hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer uppercase" 
                      onClick={() => setView("register")}
                    >
                      no tienes una cuenta? Regístrate
                    </button>
                  </h3>
                  <h3>
                    <button 
                      type="button"
                      className="text-[11px] font-mono tracking-wider text-zinc-500 hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer uppercase" 
                      onClick={() => setView("email-reset")}
                    >
                      Restablecer contraseña
                    </button>
                  </h3>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================
           FORM: MAGIC LINK (Email Reset/Access)
           ======================================== */}
        <AnimatePresence mode="wait">
          {view === "email-reset" && (
            <motion.div
              key="email-form"
              variants={formVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="flex items-center justify-between mb-6 border-b border-zinc-900 pb-4">
                <button
                  className="text-zinc-400 hover:text-purple-400 transition-colors cursor-pointer"
                  onClick={() => {
                    setView("options");
                    setEmail("");
                    setError("");
                    setSuccess("");
                  }}
                >
                  <IconBack />
                </button>
                <h2 className="text-sm font-mono tracking-widest text-white uppercase font-black">Acceso Rápido</h2>
                <div style={{ width: "16px" }} />
              </div>

              <form onSubmit={handleMagicLinkSubmit} className="flex flex-col gap-5">
                <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                  Te enviaremos un enlace de acceso a tu correo electrónico.
                </p>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">Correo electrónico</label>
                  <div className="relative flex items-center bg-zinc-950/60 border border-zinc-800 px-3 text-zinc-400 focus-within:border-purple-500/50 transition-colors">
                    <IconMail />
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent border-none py-3 px-3 text-sm text-white focus:outline-none placeholder-zinc-600 font-mono"
                    />
                  </div>
                </div>

                {/* Alert Messages */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 bg-red-950/20 border border-red-500/30 text-red-400 text-xs font-mono tracking-wide"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 bg-purple-950/20 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-wide"
                    >
                      {success}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-purple-950/20 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span>{loading ? "Enviando..." : "Enviar enlace"}</span>
                  {!loading && <IconArrow />}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* -- CORNER ACCENTS (Fiel a la línea de cortes limpios de Vision LEX) -- */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />
    </section>
  );
}