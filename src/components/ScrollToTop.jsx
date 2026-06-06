import { useEffect, useState } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const HOME_PATH = '/';

const ScrollToTop = ({ 
  behavior = 'smooth',
  excludePaths = [],
  delay = 0,
  autoScroll = false
}) => {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Estado que indica si la página fue recargada (F5 / Ctrl+R) estando en el home
  const [isHomeReload, setIsHomeReload] = useState(false);

  // ─── MUY IMPORTANTE ───────────────────────────────────────────────────────
  // Deshabilitar la restauración automática del scroll del browser.
  // Sin esto, el browser restaura la posición DESPUÉS de que React monta,
  // pisando cualquier scrollTo que hagamos desde JS.
  // Se hace aquí (antes del primer render útil) para que tome efecto a tiempo.
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Detectar reload en el home una sola vez al montar el componente
  useEffect(() => {
    const navEntry = performance.getEntriesByType('navigation')[0];
    const isReload = navEntry?.type === 'reload';
    const isHome = location.pathname === HOME_PATH;

    if (isReload && isHome) {
      setIsHomeReload(true);
    }
  // Solo se ejecuta al montar — sin dependencias reactivas
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efecto principal de scroll
  useEffect(() => {
    // Caso especial: reload en home → siempre ir al top (instantáneo)
    if (isHomeReload) {
      // Disparo 1: inmediato (antes de que el browser intente restaurar)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // Disparo 2: en el siguiente frame de pintura, por si el browser
      // restaura la posición justo después del primer scrollTo
      const rafId = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });

      setIsHomeReload(false);
      return () => cancelAnimationFrame(rafId);
    }

    // Navegación back/forward → no hacer scroll
    if (navigationType === 'POP') {
      return;
    }

    // autoScroll desactivado → no hacer scroll
    if (!autoScroll) {
      return;
    }

    // Ruta excluida → no hacer scroll
    if (excludePaths.includes(location.pathname)) {
      return;
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: behavior
      });
    };

    if (delay > 0) {
      const timeoutId = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToTop();
    }
  }, [location.pathname, behavior, excludePaths, delay, autoScroll, navigationType, isHomeReload]);

  // Función global para scroll manual desde Navbar u otros componentes
  useEffect(() => {
    window.scrollToTopManually = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: behavior
      });
    };

    return () => {
      delete window.scrollToTopManually;
    };
  }, [behavior]);

  return null;
};

export default ScrollToTop;