"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ClientCarousel } from "./prestigious-clients/client-carousel"

export default function PrestigiousClients() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  // Client logos data with industry categories
  const clients = [
    { name: "", logo: "/logo/img1.png"},
    { name: "", logo: "/logo/img2.png"},
    { name: "", logo: "/logo/img3.webp"},
    { name: "", logo: "/logo/img4.png"},
    { name: "", logo: "/logo/img5.webp"},
    { name: "", logo: "/logo/img6.webp"},
    { name: "", logo: "/logo/img7.png"},
    { name: "", logo: "/logo/img8.png"},
    { name: "", logo: "/logo/img9.png"},
    { name: "", logo: "/logo/img10.png"},
    { name: "", logo: "/logo/img11.png"},
    { name: "", logo: "/logo/img12.png"},
    { name: "", logo: "/logo/img13.png"},
    { name: "", logo: "/logo/img14.png"},
    { name: "", logo: "/logo/img15.png"},
    { name: "", logo: "/logo/img17.png"},
    { name: "", logo: "/logo/img18.png"},
    { name: "", logo: "/logo/img19.png"},
    { name: "", logo: "/logo/img20.webp"},
    { name: "", logo: "/logo/Picture7.png"},
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      id="clients"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Prestigious</span>{" "}
            Clients
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-blue-100 max-w-2xl mx-auto"
          >
            Trusted by blue chip multinational and local companies to deliver actionable retail intelligence &
            consulting
          </motion.p>
        </div>

        {/* Client Carousel */}
        {
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative"
          >
            <ClientCarousel clients={clients} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="text-center mt-6 text-blue-200"
            >
              <p className="italic text-sm text-white">And many more valued partners...</p>
            </motion.div>
          </motion.div>
        }
      </div>
    </section>
  )
}
