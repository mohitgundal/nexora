import React from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import WebsiteTypes from "../components/landing/WebsiteTypes";
import PromptToWebsite from "../components/landing/PromptToWebsite";
import FinalCTA from "../components/landing/FinalCTA";

import ShowcaseSection from "../components/landing/showcase/ShowcaseSection";

const Landing = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <HowItWorks />

      <ShowcaseSection />

      <WebsiteTypes />

      <PromptToWebsite />

      <Features />

      <FinalCTA />

      <Footer />
    </main>
  );
};

export default Landing;