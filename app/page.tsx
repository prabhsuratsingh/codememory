"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { DemoSection } from "@/components/demo-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { IntroAnimation } from "@/components/intro-animation"
import { ShaderBackground } from "@/components/shader-background"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      {!showIntro && <ShaderBackground />}
      <main className={`min-h-screen transition-opacity duration-500 ${showIntro ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <DemoSection />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
