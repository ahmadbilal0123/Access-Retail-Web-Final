"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BarChart3, PieChart, ShoppingBag, DollarSign, Percent, ChevronRight, AlertCircle, Tag } from "lucide-react"
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
    </div>
  )
}

// Animated section divider component
const SectionDivider = ({ className = "" }) => (
  <div className={`relative h-24 ${className}`}>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full border-t border-gray-800/30"></div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-red-500 p-[2px]"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <div className="w-full h-full rounded-full bg-[#001333] flex items-center justify-center">
          <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-red-500"></div>
        </div>
      </motion.div>
    </div>
  </div>
)

// Animated metric card component
const MetricCard = ({ icon: Icon, title, value, description, delay = 0 }) => (
  <motion.div
    className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#001f4d]/80 to-[#00264d]/80 backdrop-blur-sm p-6 border border-blue-900/30"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 38, 77, 0.5)",
      transition: { duration: 0.2 },
    }}
  >
    <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 bg-gradient-to-br from-blue-500/10 to-red-500/10 rounded-full blur-xl"></div>
    <div className="flex items-start">
      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg mr-4">
        <Icon className="h-6 w-6 text-red-500" />
      </div>
      <div>
        <div className="flex items-baseline">
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {title && <p className="ml-2 text-sm text-gray-400">{title}</p>}
        </div>
        <p className="mt-2 text-sm text-gray-300">{description}</p>
      </div>
    </div>
  </motion.div>
)

export default function RetailAuditStudiesPage() {
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
    hidden: { opacity: 0, scale: 0.9 },
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
        {/* Hero Section - Modern and Impactful */}
        <section className="relative min-h-[60vh] flex items-center mt-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
                    Audit Studies
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Comprehensive analysis of product performance and market share in retail environments, delivering
                  actionable insights for strategic growth.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Link
                    href="#overview"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/20"
                  >
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>

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
                    src="/retail-audit.jpg"
                    alt="Retail Audit Studies"
                    width={600}
                    height={400}
                    className="rounded-xl w-full h-auto object-cover"
                  />

                  
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <motion.div
              className="animate-bounce"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <Link
                href="#overview"
                className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
              ></Link>
            </motion.div>
          </div>
        </section>

        {/* Overview Section - Clean and Modern */}
        <section id="overview" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4 text-center">
                Key<span className="text-white"> - Offerings</span>
              </h2>

              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-500/10 rounded-full blur-xl"></div>

                  <div className="relative bg-gradient-to-br from-[#001f4d]/80 to-[#00264d]/80 backdrop-blur-sm p-8 rounded-xl border border-blue-900/30">
                    <h3 className="text-2xl font-bold text-white mb-6">Key Metrics We Measure</h3>

                    <motion.ul
                      className="space-y-6"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.li className="flex items-start" variants={itemFadeIn}>
                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg mr-4">
                          <PieChart className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Volume Share</h4>
                          <p className="text-gray-300 text-sm">
                            Measurement of your product's share of total category volume across retail channels
                          </p>
                        </div>
                      </motion.li>

                      <motion.li className="flex items-start" variants={itemFadeIn}>
                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg mr-4">
                          <DollarSign className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Value Share</h4>
                          <p className="text-gray-300 text-sm">
                            Analysis of your product's share of total category value and pricing position
                          </p>
                        </div>
                      </motion.li>

                      <motion.li className="flex items-start" variants={itemFadeIn}>
                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg mr-4">
                          <ShoppingBag className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Numeric & Weighted Handling</h4>
                          <p className="text-gray-300 text-sm">
                            Measurement of product availability and shelf presence across different store types
                          </p>
                        </div>
                      </motion.li>

                      <motion.li className="flex items-start" variants={itemFadeIn}>
                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg mr-4">
                          <Percent className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Share in Shop Handling</h4>
                          <p className="text-gray-300 text-sm">
                            Analysis of your product's presence relative to competitors in the retail environment
                          </p>
                        </div>
                      </motion.li>

                      <motion.li className="flex items-start" variants={itemFadeIn}>
                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg mr-4">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Out of Stock</h4>
                          <p className="text-gray-300 text-sm">
                            Tracking of product availability issues and stock-out frequency across retail locations
                          </p>
                        </div>
                      </motion.li>

                      <motion.li className="flex items-start" variants={itemFadeIn}>
                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg mr-4">
                          <Tag className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Retail Selling Price</h4>
                          <p className="text-gray-300 text-sm">
                            Analysis of your product's pricing strategy and competitive positioning in the market
                          </p>
                        </div>
                      </motion.li>
                    </motion.ul>
                  </div>
                </div>
              </motion.div>

              <div>
                <motion.div
                  className="relative mb-8"
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-red-500/10 rounded-xl blur-lg transform rotate-1"></div>
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Data Analysis"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001333]/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-white font-medium">Data-Driven Insights</div>
                      <p className="text-sm text-gray-300">Transforming retail data into actionable strategies</p>
                    </div>
                  </div>
                </motion.div>
              </div>
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
