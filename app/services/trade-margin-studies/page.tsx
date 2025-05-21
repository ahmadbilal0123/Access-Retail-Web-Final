"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import LoadingScreen from "@/components/loading-screen"
import { motion } from "framer-motion"
import Footer from "@/components/footer"

// Animated background with diagonal lines pattern
const DiagonalLinesBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base background color */}
      <div className="absolute inset-0 bg-[#001333]">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 60% 70%, rgba(239, 68, 68, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Diagonal lines pattern */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-5">
        <defs>
          <pattern
            id="diagonalLines"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>

      {/* Floating particles - reduced from 80 to 20 */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              backgroundColor: ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 68, 0.6)"][
                Math.floor(Math.random() * 2)
              ],
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
                ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 68, 0.5)"][Math.floor(Math.random() * 2)]
              }`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() * 1.2 + 0.8, 1],
              opacity: [0.1, Math.random() * 0.3 + 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Animated data lines - reduced from 5 to 3 */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 3 }).map((_, i) => {
          const startX = Math.random() * 100
          const startY = Math.random() * 100
          const endX = Math.random() * 100
          const endY = Math.random() * 100
          const controlX1 = (startX + endX) / 2 + (Math.random() * 20 - 10)
          const controlY1 = (startY + endY) / 2 + (Math.random() * 20 - 10)

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
                opacity: [0, 0.4, 0.4, 0],
                strokeWidth: [1, 1.5, 1.5, 1],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1],
                delay: i * 3,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

// Simple separator line component
const SeparatorLine = () => {
  return (
    <div className="w-full py-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </div>
  )
}

export default function TradeMarginStudiesPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)

  // Scroll prevention logic
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

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}

      {/* Custom background */}
      <DiagonalLinesBackground />

      <main
        ref={mainRef}
        className="min-h-screen relative z-10"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* Navigation */}
        <div className="container mx-auto px-4 pt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          ></motion.div>
        </div>

        {/* Hero Section - Unique design with animated elements */}
        <section className="relative pt-16 pb-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            {/* Animated decorative elements */}
            <motion.div
              className="absolute top-20 right-0 w-64 h-64 rounded-full bg-red-500/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
            />

            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left side content */}
                <motion.div
                  className="lg:w-1/2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="inline-block mb-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  ></motion.div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                    Trade Margin
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                      Studies
                    </span>
                  </h1>

                  <motion.div
                    className="h-1 w-32 bg-gradient-to-r from-red-500 to-blue-500 mb-6"
                    initial={{ width: 0 }}
                    animate={{ width: 128 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />

                  <motion.p
                    className="text-lg text-white/80 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Comprehensive analysis of trade margins and pricing strategies to optimize profitability and market positioning.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  ></motion.div>
                </motion.div>

                {/* Right side - Chart Image */}
                <motion.div
                  className="lg:w-1/2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20 rounded-2xl blur-xl transform rotate-3"></div>
                    <div className="relative bg-[#001f4d]/60 backdrop-blur-sm p-2 rounded-2xl border border-white/10 shadow-2xl">
                      <Image
                        src="/trade-margin.webp"
                        alt="Trade Margin Analysis Chart"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Other Services Navigation */}
          <div className="container mx-auto px-4 mt-16">
            <h2 className="text-3xl text-white mb-8">Explore Our Other Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/services/retail-audit-studies" className="group">
                <div className="bg-[#001f4d]/60 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                  <h3 className="text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">Retail Audit Studies</h3>
                  <p className="text-white/70">Comprehensive retail audits and compliance monitoring</p>
                </div>
              </Link>
              <Link href="/services/retail-census" className="group">
                <div className="bg-[#001f4d]/60 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                  <h3 className="text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">Retail Census</h3>
                  <p className="text-white/70">Detailed mapping and profiling of retail landscape</p>
                </div>
              </Link>
              <Link href="/services/merchandizing-audits" className="group">
                <div className="bg-[#001f4d]/60 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                  <h3 className="text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">Merchandizing Audits</h3>
                  <p className="text-white/70">In-store compliance and merchandizing optimization</p>
                </div>
              </Link>
              <Link href="/services/asset-utilization-tracking" className="group">
                <div className="bg-[#001f4d]/60 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                  <h3 className="text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">Asset Utilization Tracking</h3>
                  <p className="text-white/70">Monitor and optimize asset performance</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
