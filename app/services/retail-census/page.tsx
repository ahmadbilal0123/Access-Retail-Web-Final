"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { BarChart3 } from "lucide-react"
import LoadingScreen from "@/components/loading-screen"
import { motion } from "framer-motion"

// Enhanced Full Page Animation Background
const EnhancedAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#001333]">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
              <motion.path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="0.5"
                animate={{ strokeWidth: [0.5, 1, 0.5], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              backgroundColor: [
                "rgba(59, 130, 246, 0.6)",
                "rgba(37, 99, 235, 0.6)",
                "rgba(29, 78, 216, 0.6)",
                "rgba(219, 39, 119, 0.5)",
                "rgba(239, 68, 68, 0.5)",
              ][Math.floor(Math.random() * 5)],
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
                ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 68, 0.5)"][Math.floor(Math.random() * 2)]
              }`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, Math.random() * 1.5 + 0.5, 1],
              opacity: [0.1, Math.random() * 0.5 + 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Animated data lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 8 }).map((_, i) => {
          const startX = Math.random() * 100
          const startY = Math.random() * 100
          const endX = Math.random() * 100
          const endY = Math.random() * 100
          const controlX1 = (startX + endX) / 2 + (Math.random() * 30 - 15)
          const controlY1 = (startY + endY) / 2 + (Math.random() * 30 - 15)

          return (
            <motion.path
              key={i}
              d={`M ${startX}% ${startY}% Q ${controlX1}% ${controlY1}% ${endX}% ${endY}%`}
              fill="none"
              stroke={i % 2 === 0 ? "rgba(59, 130, 246, 0.2)" : "rgba(239, 68, 68, 0.2)"}
              strokeWidth="1.5"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.6, 0.6, 0],
                strokeWidth: [1, 2, 2, 1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1],
                delay: i * 3,
              }}
            />
          )
        })}
      </svg>

      {/* Animated circles */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => {
          const size = Math.random() * 300 + 200
          return (
            <motion.div
              key={i}
              className="absolute rounded-full border opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                borderColor: i % 2 === 0 ? "rgba(59, 130, 246, 0.3)" : "rgba(239, 68, 68, 0.3)",
                borderWidth: "1px",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.05, 0.2, 0.05],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          )
        })}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {/* Triangles */}
        {Array.from({ length: 5 }).map((_, i) => {
          const size = Math.random() * 60 + 40
          const posX = Math.random() * 100
          const posY = Math.random() * 100
          const rotation = Math.random() * 360

          return (
            <motion.div
              key={`triangle-${i}`}
              className="absolute opacity-0"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              animate={{
                opacity: [0, 0.2, 0],
                y: [0, -30, 0],
                rotate: [rotation, rotation + 40, rotation],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 2,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 0L100 100H0L50 0Z"
                  fill={i % 2 === 0 ? "rgba(59, 130, 246, 0.3)" : "rgba(239, 68, 68, 0.3)"}
                />
              </svg>
            </motion.div>
          )
        })}

        {/* Squares */}
        {Array.from({ length: 5 }).map((_, i) => {
          const size = Math.random() * 50 + 30
          const posX = Math.random() * 100
          const posY = Math.random() * 100
          const rotation = Math.random() * 360

          return (
            <motion.div
              key={`square-${i}`}
              className="absolute opacity-0"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${size}px`,
                height: `${size}px`,
                border: `1px solid ${i % 2 === 0 ? "rgba(59, 130, 246, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
                transform: `rotate(${rotation}deg)`,
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 0.8],
                rotate: [rotation, rotation + 30, rotation],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 1.5 + 3,
              }}
            />
          )
        })}

        {/* Hexagons */}
        {Array.from({ length: 3 }).map((_, i) => {
          const size = Math.random() * 70 + 50
          const posX = Math.random() * 100
          const posY = Math.random() * 100

          return (
            <motion.div
              key={`hex-${i}`}
              className="absolute opacity-0"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              animate={{
                opacity: [0, 0.25, 0],
                y: [20, -20, 20],
                rotate: [0, 60, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 3 + 2,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
                  stroke={i % 2 === 0 ? "rgba(59, 130, 246, 0.4)" : "rgba(239, 68, 68, 0.4)"}
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </motion.div>
          )
        })}

        {/* Data nodes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const posX = Math.random() * 100
          const posY = Math.random() * 100

          return (
            <motion.div
              key={`node-${i}`}
              className="absolute w-3 h-3 opacity-0"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                background: i % 2 === 0 ? "rgba(59, 130, 246, 0.6)" : "rgba(239, 68, 68, 0.6)",
              }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 2 + Math.random() * 5,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function RetailCensusPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)

  // Same scroll prevention logic as your home page
  useEffect(() => {
    window.scrollTo(0, 0)

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname)
    }

    document.body.style.overflow = "hidden"

    const forceScrollTop = () => {
      window.scrollTo(0, 0)
    }

    const scrollInterval = setInterval(forceScrollTop, 50)

    setTimeout(() => {
      document.body.style.overflow = loading ? "hidden" : ""
      clearInterval(scrollInterval)
    }, 1000)

    const handlePopState = () => {
      window.scrollTo(0, 0)
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname)
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      clearInterval(scrollInterval)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [loading])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}

      {/* Enhanced animated background */}
      <EnhancedAnimatedBackground />

      <main
        ref={mainRef}
        className="min-h-screen relative z-10"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* Hero Section - Restructured with heading/text on left, images on right */}
        <section className="relative min-h-[60vh] flex items-center mt-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Heading and text */}
              <div>
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.div
                    className="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 mb-6 mx-auto md:mx-0"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                  <span className="text-white">Retail</span>{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                    Census
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Complete scanning and listing of retail stores along with GPS coordinates, providing comprehensive
                  mapping and categorization of retail outlets.
                </motion.p>

                {/* Market Measurement section moved to left side */}
                <motion.div
                  className="group relative overflow-hidden rounded-xl mt-8"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  {/* Background gradient with animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#001f4d]/90 to-[#002a66]/90 group-hover:from-[#002a66]/90 group-hover:to-[#003380]/90 transition-all duration-300"></div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 transform translate-x-10 -translate-y-10 rotate-45"></div>

                  <div className="relative p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                        <BarChart3 className="h-10 w-10 text-white" />
                      </div>
                      <div className="ml-4 h-px flex-grow bg-gradient-to-r from-white/30 to-transparent"></div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">Market Measurement</h3>
                    <p className="text-white/80 mb-6">
                      Data-driven insights to understand market dynamics and track performance against competitors.
                    </p>

                    <ul className="space-y-2 mb-6">
                      {[
                        "Market share analysis",
                        "Distribution benchmarking and expansion",
                        "Sales performance tracking",
                        "Growth opportunity identification",
                      ].map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <div className="text-red-500 mr-2">•</div>
                          <span className="text-white/80 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Images */}
              <div className="space-y-8">
                {/* Main image */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-red-500/20 rounded-2xl blur-xl transform -rotate-3"></div>
                  <div className="relative bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-sm p-1 rounded-2xl border border-blue-700/30 shadow-xl">
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
                    <Image
                      src="https://amrc-y.com/wp-content/uploads/2019/11/bio.png"
                      alt="Retail Census Visualization"
                      width={600}
                      height={400}
                      className="rounded-xl w-full h-auto object-cover"
                    />
                  </div>
                </motion.div>

                {/* Additional image */}
                
              </div>
            </div>
          </div>
        </section>

        <br></br>
        <br></br>
        

      </main>
    </>
  )
}
