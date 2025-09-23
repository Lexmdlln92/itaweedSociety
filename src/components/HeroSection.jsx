// src/components/HeroSection.jsx
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import hero from '../assets/hero/d2d-lex.webp';

export default function HeroSection() {
  // Hook para obtener el progreso del scroll
  const { scrollYProgress } = useScroll();
  /*instrucciones de desplazamientos
  // ===== GUÍA DE MODIFICACIÓN DE DESPLAZAMIENTOS =====
  // useTransform(scrollYProgress, [rango_scroll], [rango_valores])
  // 
  // DIRECCIONES:
  // x: positivo = derecha, negativo = izquierda
  // y: positivo = abajo, negativo = arriba
  // scale: 1 = tamaño normal, >1 = más grande, <1 = más pequeño
  // rotate: grados de rotación (positivo = horario)
  //
  // EJEMPLOS:
  // Hacia la derecha: [0, 300]
  // Hacia la izquierda: [0, -300] 
  // Hacia abajo: [0, 200]
  // Hacia arriba: [0, -200]
  // Crecer: [1, 2]
  // Encoger: [1, 0.5]
  */
  // "PRENDAS" - se mueve hacia la izquierda
  const prendasX = useTransform(scrollYProgress, [0, 1], [0, -6000]);
  
  // "QUE COINCIDE" - se mueve hacia la derecha más lento
  const coincideX = useTransform(scrollYProgress, [0, 1], [0, 6000]);
  
  // "Con Tu Style" - se mueve hacia la izquierda más rápido
  const styleX = useTransform(scrollYProgress, [0, 1], [0, -6000]);
  
  // "SIN MIEDO A BRILLAR" - MODIFICADO: desplazamiento descendente + cambio de escala
  const brillarY = useTransform(scrollYProgress, [0, 1], [0, 1000]);     // Desciende 800px
  const brillarScale = useTransform(scrollYProgress, [0, 1], [1, 4]); // Crece 2.5x
  
  // "100% COLOMBIANO" - se mueve hacia la derecha con rotación
  const colombianoX = useTransform(scrollYProgress, [0, 1], [0, 6000]);
  const colombianoRotate = useTransform(scrollYProgress, [0, 1], [1, 2]);
  
  // Párrafo - efecto de fade y desplazamiento vertical
  const parrafoY = useTransform(scrollYProgress, [0, 1], [0, 4000]);
  const parrafoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3]);
  
  // Imagen - efecto de escala y desplazamiento
  const imagenScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const imagenY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className="text-center py-2 bg-transparent relative overflow-hidden">
      <h1 className="text-2xl font-bold leading-tight text-white mt-3">
        
        {/* PRENDAS - se mueve hacia la izquierda */}
        <motion.span 
          style={{ x: prendasX }}
          className="font-montserrat font-black text-3xl block mb-3"
        >
          PRENDAS
        </motion.span>
        
        {/* QUE COINCIDE - se mueve hacia la derecha */}
        <motion.span 
          style={{ x: coincideX }}
          className="font-rock text-4xl block mb-1"
        >
          QUE COINCIDE 
        </motion.span>
        
        {/* Con Tu Style - se mueve hacia la izquierda más rápido */}
        <motion.span 
          style={{ x: styleX }}
          className="font-rock text-4xl block mb-2 mt-2"
        >
          Con Tu Style 
        </motion.span>
        
        {/* SIN MIEDO A BRILLAR - MODIFICADO: desplazamiento descendente + escala */}
        <motion.div 
          style={{ 
            y: brillarY,      // Desplazamiento descendente
            scale: brillarScale // Cambio de escala
          }}
          className="font-londrina text-6xl text-purple-300 inline-block"
        >
          SIN MIEDO A BRILLAR
        </motion.div>
        
        <br />
        
        {/* 100% COLOMBIANO - se mueve hacia la derecha con rotación */}
        <motion.div 
          style={{ 
            y: colombianoX, 
            rotate: colombianoRotate 
          }}
          className="font-dancing text-3xl text-purple-300 inline-block"
        >
          %100 Colombianos
        </motion.div>
        
        <br />
      </h1>
      
      {/* Párrafo con fade y desplazamiento vertical */}
      <motion.p 
        style={{ 
          y: parrafoY, 
          opacity: parrafoOpacity 
        }}
        className="mt-1 text-gray-500"
      >
        marcas para gente chimbita .
      </motion.p>
      
      {/* Imagen con escala y desplazamiento */}
      <motion.img 
        src={hero} 
        alt="Hero" 
        style={{ 
          scale: imagenScale, 
          y: imagenY 
        }}
        className="w-full mt-4 rounded-md"
      />
    </section>
  );
}

// ===== EJEMPLOS DE MODIFICACIÓN =====
//
// Para mover texto hacia ARRIBA mientras haces scroll:
// const textoY = useTransform(scrollYProgress, [0, 1], [0, -500]);
//
// Para mover texto DIAGONALMENTE (derecha + abajo):
// const textoX = useTransform(scrollYProgress, [0, 1], [0, 300]);
// const textoY = useTransform(scrollYProgress, [0, 1], [0, 200]);
// style={{ x: textoX, y: textoY }}
//
// Para ROTAR mientras se mueve:
// const textoRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
// style={{ x: textoX, rotate: textoRotate }}
//
// Para cambiar OPACIDAD:
// const textoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
// style={{ opacity: textoOpacity }}
//
// Para COMBINAR múltiples efectos:
// style={{ 
//   x: textoX, 
//   y: textoY, 
//   scale: textoScale, 
//   rotate: textoRotate,
//   opacity: textoOpacity 
// }}