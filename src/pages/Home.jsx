import React, { Suspense } from "react";
import HeroSection from "../components/sections/HeroSection";
import MarqueeText from "../components/MarqueeText";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

// Importación dinámica
const NewArrivals = React.lazy(() => import("../components/sections/NewArrivals"));
const BrandSection = React.lazy(() => import("../components/sections/BrandSection"));
const CustomizationSection = React.lazy(() => import("../components/sections/CustomizationSection"));
const StorieSection = React.lazy(() => import("../components/sections/StorieSection"));
const Undertake = React.lazy(() => import("../components/sections/Undertake"));
const Collaborations = React.lazy(() => import("../components/sections/Collaborations"));
const States = React.lazy(() => import("../components/sections/States"));

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeText 
        text="👽 D2D 🔥 LEX 👽 D2D 🔥 LEX " 
        speed="10s" 
        fontClass="font-londrina" 
      />
      <Suspense fallback={<LoadingSpinner />}>
        <NewArrivals />
        <BrandSection/>
        <CustomizationSection/>
        <StorieSection/>
        <MarqueeText 
        text="Los sueños son para ser perseguidos 24/7 ✨" 
        speed="14s" 
        fontClass="font-rock" 
        />
        <Collaborations/>
        <Undertake />
        <States />
      </Suspense>

      <Footer/>
    </>
  );
}