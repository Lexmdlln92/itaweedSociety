// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import NewArrivals from "../components/NewArrivals";
import BrandSection from "../components/BrandSection";
import CustomizationSection from "../components/CustomizationSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <NewArrivals />
      <BrandSection/>
      <CustomizationSection/>
      {/* Siguiente: Stories, Newsletter, Footer */}
    </>
  );
}
