"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, DollarSign, BarChart3, TrendingUp, PieChart, Percent, LineChart } from "lucide-react"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import { motion } from "framer-motion"

// Enhanced Animated Background from Retail Census
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
                "rgba(239, 68, 68, 0.5)",
                "rgba(219, 39, 119, 0.5)",
              ][Math.floor(Math.random() * 4)],
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
              }}
            />
          )
        })}
      </div>
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
    }, 100)

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

  return (
    <>
      {loading && (
        <LoadingScreen
          finishLoading={() => setLoading(false)}
          skipDelay={true} // Add this to skip any delay
        />
      )}

      {/* Enhanced animated background */}
      <EnhancedAnimatedBackground />

      <main
        ref={mainRef}
        className="min-h-screen relative z-10"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.2s ease-in-out" }}
      >
        {/* Navigation */}
        

        {/* Hero Section - Updated to match Retail Census */}
        <section className="relative pt-32 pb-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div
                className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 mb-6 mx-auto md:mx-0"
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Trade{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
                    Margin
                  </span>{" "}
                  Studies
                </h1>
                <p className="text-lg text-gray-300 max-w-xl">
                  Comprehensive analysis of pricing strategies, discount patterns, and margin structures to optimize your pricing and promotional strategies.
                </p>

                <motion.div
                  className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="#features"
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-red-500/20"
                  >
                    Explore Features
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="md:w-1/2 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-2xl blur-xl transform -rotate-3"></div>
                  <div className="relative bg-[#001f4d]/60 backdrop-blur-sm p-2 rounded-2xl border border-white/10 shadow-2xl">
                    <Image
                      src="/trade-margin.jpg"
                      alt="Trade Margin Studies"
                      width={600}
                      height={400}
                      className="rounded-lg w-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section - Hexagonal grid - KEEPING THE ORIGINAL KEY OFFERINGS SECTION */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  className="h-1 w-16 bg-gradient-to-r from-red-500 to-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
                Key<span className=" text-white"> - Offerings</span>
              </h2>

              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <br></br>
              <p className="text-white/80 max-w-2xl mx-auto">
                Our trade margin studies provide comprehensive insights into pricing strategies and market dynamics
              </p>
            </motion.div>

            {/* KEEPING THE ORIGINAL KEY OFFERINGS GRID */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: <BarChart3 className="h-10 w-10 text-red-500" />,
                  title: "Numeric Availability of Products",
                  description:
                    "We measure the availability of your products across retail channels to identify distribution gaps and opportunities.",
                },
                {
                  icon: <Percent className="h-10 w-10 text-red-500" />,
                  title: "Discount Incidence & Level",
                  description:
                    "We analyze the frequency and depth of discounts to help you optimize promotional strategies.",
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-red-500" />,
                  title: "In-Market Discounting & Patterns",
                  description:
                    "We track market-wide discounting patterns to help you stay competitive and responsive to market dynamics.",
                },
                {
                  icon: <DollarSign className="h-10 w-10 text-red-500" />,
                  title: "Net Trade Price",
                  description:
                    "We analyze the actual prices paid by retailers after all discounts and promotions to understand true pricing dynamics.",
                },
                {
                  icon: <PieChart className="h-10 w-10 text-red-500" />,
                  title: "Retail Price to Consumer",
                  description:
                    "We track the final prices paid by consumers to understand price positioning and value perception.",
                },
                {
                  icon: <LineChart className="h-10 w-10 text-red-500" />,
                  title: "Retailer's Margins",
                  description:
                    "We analyze retailer margins to help you develop pricing strategies that balance profitability with market competitiveness.",
                },
                {
                  icon: <LineChart className="h-10 w-10 text-red-500" />,
                  title: "Trade/ Consumer Promo",
                  description:
                    " Trade promotions are discounts offered by manufacturers to retailers, encouraging retailers to buy more and potentially pass on savings to consumers.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="w-full md:w-[30%] bg-[#001f4d]/70 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 p-6 text-center"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <br></br>
        <br></br>
        <br></br>

        <Footer />
      </main>
    </>
  )
}
