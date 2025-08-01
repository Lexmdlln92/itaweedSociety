// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import NewArrivals from "../components/NewArrivals";
import BrandSection from "../components/BrandSection";
import CustomizationSection from "../components/CustomizationSection";
import StorieSection from "../components/StorieSection";
import Undertake from "../components/Undertake";
import Collaborations from "../components/Collaborations";
import States from "../components/States";
import Footer from "../components/Footer";
import MarqueeText from "../components/MarqueeText";


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MarqueeText 
        text="👽 D2D 🔥 LEX 👽 D2D 🔥 LEX " 
        speed="10s" 
        fontClass="font-londrina" 
      />
      <NewArrivals />
      <BrandSection/>
      <CustomizationSection/>
      <StorieSection/>
      <MarqueeText 
        text="Los sueños son para ser perseguidos 24/7 ✨" 
        speed="14s" 
        fontClass="font-rock" 
      />
      <Undertake />
      <Collaborations/>
      <States />
      <Footer/>
      {/* Newsletter, Footer */}
    </>
  );
}
