"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import VisionSection from "../vision-values/vision-section"
import OurJourney from "../our-journey"

export default function MissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <main className="overflow-x-hidden">
      <div className="pt-8 sm:pt-12 md:pt-16"></div>

      {/* Who We Are Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div ref={ref} className="max-w-4xl mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
            />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 text-center ">Who We Are</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
            />

            <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden text-base sm:text-lg text-blue-100 leading-relaxed mt-4">
              <CardContent className="p-6 sm:p-8">
                Our team of experts accumulate decades of experience in retail research, data analytics, and market
                intelligence to deliver actionable insights that drive business growth. We take pride in our project
                design capabilities, extensive operations and deep understanding of local markets.
                <br></br>
                <br></br>
                Our commitment to excellence and innovation has made us the trusted partner for leading brands seeking
                to optimize their retail strategies.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-[#001333] py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative">
        {/* Background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full border border-blue-500/20"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border border-blue-500/10"></div>
          <div className="absolute top-40 left-[60%] w-24 h-24 rounded-full border border-blue-500/15"></div>
          <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full border border-blue-500/10"></div>
        </div>

        <div className="container mx-auto max-w-3xl relative z-10">
          {/* Heading with underline */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-1 bg-gradient-to-r from-red-500 to-blue-500 w-20 mx-auto mb-4"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Our Mission</h2>
            <div className="h-1 bg-gradient-to-r from-red-500 to-blue-500 w-20 mx-auto mt-4"></div>
          </div>

          {/* Circle and mission statement in one row */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8" ref={ref}>
            {/* Circle icon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.7 }}
              className="flex-shrink-0"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <div className="absolute inset-0 rounded-full border-4 border-red-500 opacity-30"></div>
                <div className="absolute inset-[15%] rounded-full border-4 border-red-500 opacity-60"></div>
                <div className="absolute inset-[30%] rounded-full border-4 border-red-500 opacity-80"></div>
                <div className="absolute inset-[45%] rounded-full bg-red-500"></div>
              </div>
            </motion.div>

            {/* Mission statement card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-[#3d1a2d] rounded-lg p-6 sm:p-8 flex-1"
            >
              <div className="relative text-center">
                <div className="text-red-500 text-4xl sm:text-5xl md:text-6xl font-serif absolute -top-6 sm:-top-8 left-0">
                  "
                </div>
                <p className="text-white text-base sm:text-lg italic px-4 sm:px-6 md:px-8 py-2 sm:py-4">
                  Build partnership with our clients by providing enhanced value to their marketing decision making.
                </p>
                <div className="text-red-500 text-4xl sm:text-5xl md:text-6xl font-serif absolute -bottom-10 sm:-bottom-16 right-0">
                  "
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Separation Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-16"></div>
      </section>

      {/* Vision Component */}
      <VisionSection />
      <OurJourney />
      <br></br>
      {/* Our Journey Section */}
    </main>
  )
}
