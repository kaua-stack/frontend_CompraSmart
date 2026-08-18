// src/pages/LandingPage.jsx

import React from "react";
import { Navbar } from "@/components/Navbar";
import HeroSection from "./landing/HeroSection";
import SolucaoSection from "./landing/SolucaoSection";
import ReceitasSection from "./landing/ReceitasSection";
import PlanosSection from "./landing/PlanosSection";
import FaqSection from "./landing/FaqSection";
import Footer from "./landing/Footer";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SolucaoSection />
      <ReceitasSection />
      <PlanosSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
