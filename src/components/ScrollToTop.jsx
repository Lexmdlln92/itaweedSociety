
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ 
  behavior = 'smooth',
  excludePaths = [],
  delay = 0 
}) => {
  const location = useLocation();

  useEffect(() => {
    // Si la ruta actual está en las rutas excluidas, no hacer scroll
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

    // Si hay delay, usar setTimeout
    if (delay > 0) {
      const timeoutId = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToTop();
    }
  }, [location.pathname, behavior, excludePaths, delay]);

  return null;
};

export default ScrollToTop;