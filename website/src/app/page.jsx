'use client'

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import ReviewsCarousel from "@/components/reviews-carousel"
import FeedbackForm from "@/components/feedback-form"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Loader from "@/components/loader/Loader"
import MetaMaskGate from "@/components/MetaMaskGate"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ReviewsCarousel />
      <FeedbackForm />
      <ContactSection />
      <Footer />
    </main>
  )
}
