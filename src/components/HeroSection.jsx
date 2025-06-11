// src/components/HeroSection.jsx
import hero from '../assets/d2d-lex.png'

export default function HeroSection() {
  return (
    <section className="text-center px-4 py-6 bg-transparent">
      <h1 className="text-2xl font-bold leading-tight text-white mt-10">
        FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
      </h1>
      <p className="mt-3 text-gray-500">
        Browse our unique selection crafted to reflect your individuality.
      </p>
      <img src={hero} alt="Hero" className="w-full mt-4 rounded-md" />
    </section>
  );
}
