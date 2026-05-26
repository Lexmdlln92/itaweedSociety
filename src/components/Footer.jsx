// src/components/Footer.jsx
import { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok, FaSpotify } from "react-icons/fa";
import logo from "../assets/footer/d2d-universo-logo.webp";

const menus = [
  {
    title: "Sobre la marca",
    items: ["Sobre nosotros", "Cómo se hace la magia", "Cultura", "Trabaja en Itaweed Society"],
  },
  {
    title: "Contacto",
    items: ["+57 311 222 3344", "+57 320 444 5566", "+57 302 123 4567"],
  },
  {
    title: "Ayuda",
    items: ["Envíos", "Seguimiento de pedidos", "Preguntas frecuentes"],
  },
];

const socials = [
  { icon: FaWhatsapp,  label: "WhatsApp",  href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaFacebook,  label: "Facebook",  href: "#" },
  { icon: FaTiktok,    label: "TikTok",    href: "#" },
  { icon: FaSpotify,   label: "Spotify",   href: "#" },
];

// Hook: detecta si el elemento entró en el viewport
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Logo con efecto rebote estilo DVD
function DvdLogo({ src }) {
  const containerRef = useRef(null);
  const posRef       = useRef({ x: 80, y: 40 });
  const velRef       = useRef({ x: 1.1, y: 0.8 });
  const rafRef       = useRef(null);
  const imgRef       = useRef(null);
  const [pos, setPos] = useState({ x: 80, y: 40 });

  // Colores que cambia al rebotar — tono violeta/ámbar/blanco coherente con el proyecto
  const colors = [
    "brightness(1) sepia(0) saturate(1)",
    "brightness(0.9) sepia(1) saturate(3) hue-rotate(270deg)",   // violeta
    "brightness(1) sepia(1) saturate(4) hue-rotate(15deg)",      // ámbar
    "brightness(1.2) sepia(0) saturate(0.5)",                    // blanco frío
    "brightness(0.8) sepia(1) saturate(5) hue-rotate(240deg)",   // púrpura profundo
  ];
  const colorIdx = useRef(0);
  const [filter, setFilter] = useState(colors[0]);

  useEffect(() => {
    const LOGO_W = 120;
    const LOGO_H = 70;

    const animate = () => {
      const container = containerRef.current;
      if (!container) return;
      const maxX = container.offsetWidth  - LOGO_W;
      const maxY = container.offsetHeight - LOGO_H;

      let { x, y }   = posRef.current;
      let { x: vx, y: vy } = velRef.current;

      x += vx;
      y += vy;

      let bounced = false;

      if (x <= 0)    { x = 0;    vx = Math.abs(vx); bounced = true; }
      if (x >= maxX) { x = maxX; vx = -Math.abs(vx); bounced = true; }
      if (y <= 0)    { y = 0;    vy = Math.abs(vy); bounced = true; }
      if (y >= maxY) { y = maxY; vy = -Math.abs(vy); bounced = true; }

      if (bounced) {
        colorIdx.current = (colorIdx.current + 1) % colors.length;
        setFilter(colors[colorIdx.current]);
      }

      posRef.current = { x, y };
      velRef.current = { x: vx, y: vy };
      setPos({ x, y });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden border-b border-white/10"
      style={{ height: "120px", background: "black" }}
    >
      {/* Scanlines sutiles para el mood retro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
          zIndex: 2,
        }}
      />

      <img
        ref={imgRef}
        src={src}
        alt="Itaweed Society"
        style={{
          position: "absolute",
          left: pos.x,
          top:  pos.y,
          width: "120px",
          filter: filter,
          transition: "filter 0.15s ease",
          zIndex: 3,
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function Footer() {
  const [openMenus, setOpenMenus]   = useState([]);
  const [hoveredSocial, setHovered] = useState(null);
  const [footerRef, footerInView]   = useInView(0.1);

  const toggleMenu = (index) => {
    setOpenMenus((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <footer ref={footerRef} className="bg-black text-white overflow-hidden relative">

      {/* ── FRANJA SUPERIOR DECORATIVA ── */}
      <div className="border-t border-white/10 px-6 py-4 md:px-16 lg:px-24 flex items-center justify-between">
        <span className="text-white/15 text-xs font-montserrat tracking-[0.3em] uppercase">
          Est. 2024
        </span>
        <div className="flex gap-2">
          {["■", "■", "■"].map((s, i) => (
            <span key={i} className="text-white/10 text-xs">
              {s}
            </span>
          ))}
        </div>
        <span className="text-white/15 text-xs font-montserrat tracking-[0.3em] uppercase">
          Medellín · CO
        </span>
      </div>

      {/* ── LOGO DVD BOUNCING ── */}
      <DvdLogo src={logo} />

      {/* ── CUERPO PRINCIPAL ── */}
      <div className="px-6 py-5 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Columna izquierda — logo estático + tagline + redes */}
        <div className="flex flex-col gap-8 items-center">
          {/* Logo estático pequeño */}
          <div
            style={{
              opacity:   footerInView ? 1 : 0,
              transform: footerInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}
          >
            
          </div>

          {/* Tagline */}
          <p
            className="text-white/30 text-sm font-montserrat tracking-widest uppercase max-w-xs leading-relaxed items-center text-center"
            style={{
              opacity:   footerInView ? 1 : 0,
              transform: footerInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
            }}
          >
            Redes sociales <br />
            
          </p>

          {/* Redes sociales */}
          <div className="flex gap-5 justify-center">
            {socials.map(({ icon: Icon, label, href }, i) => (
              <a
                key={i}
                href={href}
                aria-label={label}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors duration-200"
                style={{
                  opacity:   footerInView ? 1 : 0,
                  transform: footerInView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.5 + i * 0.07}s, transform 0.6s ease ${0.5 + i * 0.07}s`,
                }}
              >
                {void Icon}
                <Icon size={30} />
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                  style={{
                    transform: hoveredSocial === i ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Columna derecha — menús acordeón */}
        <div className="flex flex-col gap-0 divide-y divide-white/10">
          {menus.map((menu, index) => (
            <div
              key={index}
              style={{
                opacity:   footerInView ? 1 : 0,
                transform: footerInView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease ${0.4 + index * 0.1}s, transform 0.6s ease ${0.4 + index * 0.1}s`,
              }}
            >
              <button
                onClick={() => toggleMenu(index)}
                className="w-full flex justify-between items-center py-4 font-montserrat font-semibold text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <span>{menu.title}</span>
                <span
                  className="text-white/40 group-hover:text-white font-light text-xl leading-none"
                  style={{
                    display: "inline-block",
                    transform: openMenus.includes(index) ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  +
                </span>
              </button>

              <div
                style={{
                  maxHeight: openMenus.includes(index) ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <ul className="pb-4 space-y-2">
                  {menu.items.map((item, i) => (
                    <li
                      key={i}
                      className="group/item flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 cursor-pointer font-montserrat"
                    >
                      <span className="inline-block w-0 group-hover/item:w-3 h-px bg-amber-400 transition-all duration-200" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BORDE INFERIOR ── */}
      <div className="border-t border-white/10 px-6 py-5 md:px-16 lg:px-24 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/15 text-xs font-montserrat tracking-widest uppercase text-center">
          © 2024 Itaweed Society. Todos los derechos reservados.
        </p>
        <p className="text-white/10 text-xs font-montserrat tracking-widest uppercase">
          Hecho con obsesión en Medellín
        </p>
      </div>

    </footer>
  );
}
