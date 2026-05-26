import React, { Suspense } from "react";
import HeroSection from "../components/HeroSection";
import MarqueeText from "../components/MarqueeText";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

// Importación dinámica
const NewArrivals = React.lazy(() => import("../components/NewArrivals"));
const BrandSection = React.lazy(() => import("../components/BrandSection"));
const CustomizationSection = React.lazy(() => import("../components/CustomizationSection"));
const StorieSection = React.lazy(() => import("../components/StorieSection"));
const Undertake = React.lazy(() => import("../components/Undertake"));
const Collaborations = React.lazy(() => import("../components/Collaborations"));
const States = React.lazy(() => import("../components/States"));

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