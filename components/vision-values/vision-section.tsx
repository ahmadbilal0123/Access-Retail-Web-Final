"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Eye } from "lucide-react"
import Image from "next/image"

// Animated Background Component with Circles
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base background color is already set in the main section */}

      {/* Smaller animated circles */}
      {Array.from({ length: 25 }).map((_, i) => {
        // Generate random properties for each circle - SMALLER SIZES
        const size = Math.random() * 120 + 40 // Smaller size range
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        const duration = Math.random() * 20 + 15
        const delay = Math.random() * 5
        const isRed = Math.random() > 0.5
        const opacity = Math.random() * 0.08 + 0.02

        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${isRed ? "bg-red-500" : "bg-blue-500"}`}
            style={{
              width: size,
              height: size,
              left: `${posX}%`,
              top: `${posY}%`,
              opacity: opacity,
              filter: "blur(20px)", // Less blur for smaller circles
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, 0], // Smaller movement range
              y: [0, Math.random() * 60 - 30, 0],
              scale: [1, Math.random() * 0.3 + 0.8, 1],
            }}
            transition={{
              duration: duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        )
      })}

      {/* Small circle outlines - MORE OF THEM */}
      {Array.from({ length: 15 }).map((_, i) => {
        // Generate random properties for each circle outline - SMALLER SIZES
        const size = Math.random() * 80 + 30 // Smaller size range
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        const duration = Math.random() * 25 + 20
        const delay = Math.random() * 5
        const isRed = Math.random() > 0.5
        const borderWidth = Math.random() * 1.5 + 0.5 // Thinner borders

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${posX}%`,
              top: `${posY}%`,
              border: `${borderWidth}px solid ${isRed ? "rgba(239, 68, 68, 0.15)" : "rgba(59, 130, 246, 0.15)"}`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0], // Smaller movement range
              y: [0, Math.random() * 50 - 25, 0],
              scale: [1, Math.random() * 0.3 + 0.8, 1],
              rotate: [0, Math.random() * 180, 0],
            }}
            transition={{
              duration: duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        )
      })}

      {/* Add icons scattered throughout the background */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 16 + 8 // Small icon size
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        const duration = Math.random() * 30 + 20
        const delay = Math.random() * 8
        const opacity = Math.random() * 0.12 + 0.03

        // Choose an icon type
        const iconType = Math.floor(Math.random() * 5)
        let iconPath = ""

        switch (iconType) {
          case 0:
            // Chart icon
            iconPath = "M3 3v18h18M9 9l3-3 4 4 5-5M9 13l3-3 4 4 5-5"
            break
          case 1:
            // Data icon
            iconPath = "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 8v8 M8 12h8"
            break
          case 2:
            // Analytics icon
            iconPath = "M7 16V8M12 16V4M17 16v-4"
            break
          case 3:
            // Target icon
            iconPath =
              "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0 M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
            break
          default:
            // Nodes icon
            iconPath =
              "M4 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M4 20m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M20 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M20 20m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M4 4l16 16 M4 20L20 4"
        }

        return (
          <motion.div
            key={`icon-${i}`}
            className="absolute"
            style={{
              left: `${posX}%`,
              top: `${posY}%`,
              width: size,
              height: size,
              opacity: opacity,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360],
              opacity: [opacity, opacity * 1.5, opacity],
            }}
            transition={{
              duration: duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: delay,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              stroke={Math.random() > 0.5 ? "rgba(239, 68, 68, 0.3)" : "rgba(59, 130, 246, 0.3)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={iconPath}></path>
            </svg>
          </motion.div>
        )
      })}

      {/* Add small dots */}
      {Array.from({ length: 40 }).map((_, i) => {
        const size = Math.random() * 3 + 1
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        const duration = Math.random() * 15 + 10
        const delay = Math.random() * 5
        const isRed = Math.random() > 0.5

        return (
          <motion.div
            key={`dot-${i}`}
            className={`absolute rounded-full ${isRed ? "bg-red-400" : "bg-blue-400"}`}
            style={{
              width: size,
              height: size,
              left: `${posX}%`,
              top: `${posY}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              x: [0, Math.random() * 30 - 15, 0],
              y: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        )
      })}

      {/* Add connecting lines between random points */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
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
              stroke={i % 2 === 0 ? "rgba(59, 130, 246, 0.3)" : "rgba(239, 68, 68, 0.3)"}
              strokeWidth="1"
              strokeDasharray="3,3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.3, 0.3, 0],
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

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  )
}

export default function VisionSection() {
  const ref = useRef(null)
  const valuesRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 })
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)

      // Add specific handling for the values diagram on mobile
      const valuesDiagram = document.querySelector(".values-diagram-container")
      if (valuesDiagram) {
        if (window.innerWidth < 640) {
          valuesDiagram.style.transform = "scale(2)"
          valuesDiagram.style.marginTop = "8rem"
          valuesDiagram.style.marginBottom = "8rem"
        } else {
          valuesDiagram.style.transform = "scale(1)"
          valuesDiagram.style.marginTop = "0"
          valuesDiagram.style.marginBottom = "0"
        }
      }
    }

    // Set initial values
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Vision Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="container mx-auto max-w-3xl">
          {/* Heading with underline */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-1 bg-gradient-to-r from-red-500 to-blue-500 w-20 mx-auto mb-4"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Our Vision</h2>
            <div className="h-1 bg-gradient-to-r from-red-500 to-blue-500 w-20 mx-auto mt-4"></div>
            {/* Paragraph - centered on mobile, right on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 0 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center sm:text-left"
            >
              <br></br>
              <p className="text-white text-base sm:text-lg leading-relaxed text-center mx-auto w-full max-w-md">
                Visualisation of our client relationships
              </p>
            </motion.div>
          </div>

          {/* Circle and vision statement in one row */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8" ref={ref}>
            {/* Circle icon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.7 }}
              className="flex-shrink-0"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-30"></div>
                <div className="absolute inset-[15%] rounded-full border-4 border-blue-500 opacity-60"></div>
                <div className="absolute inset-[25%] rounded-full border-4 border-blue-500 opacity-60"></div>
                <div className="absolute inset-[40%] rounded-full border-4 border-blue-500 opacity-80"></div>
                <div className="absolute inset-[45%] rounded-full bg-blue-500"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Vision statement card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-[#1a2d3d]/90 backdrop-blur-sm rounded-lg p-6 sm:p-8 flex-1"
            >
              <div className="relative text-center">
                <div className="text-blue-500 text-4xl sm:text-5xl md:text-6xl font-serif absolute -top-6 sm:-top-8 left-0">
                  "
                </div>
                <p className="text-white text-base sm:text-med italic px-4 sm:px-6 md:px-1 py-2 sm:py-4">
                  To deliver most innovative methodologies & research solutions and superior client servicing in
                  customized research, to ensure enduring relationships with our clients.
                </p>
                <div className="text-blue-500 text-4xl sm:text-5xl md:text-6xl font-serif absolute -bottom-10 sm:-bottom-16 right-0">
                  "
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Separation Line with animation */}
      <div className="w-full h-px relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Values Section with PNG Images and Rounded Connections */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 border-t border-blue-900/30 relative z-10">
        <div className="container mx-auto max-w-3xl">
          {/* Heading with underline */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-1 bg-gradient-to-r from-red-500 to-blue-500 w-20 mx-auto mb-4"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Our Values</h2>
            <div className="h-1 bg-gradient-to-r from-red-500 to-blue-500 w-20 mx-auto mt-4"></div>
<br></br>
             {/* Circle and values statement in one row */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8 " ref={valuesRef}>
            {/* Circle icon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.7 }}
              className="flex-shrink-0"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <div className="absolute inset-0 rounded-full border-4 border-red-500 opacity-40"></div>
                <div className="absolute inset-[8%] rounded-full border-4 border-red-500 opacity-60"></div>
                <div className="absolute inset-[20%] rounded-full border-4 border-red-500 opacity-60"></div>
                <div className="absolute inset-[14%] rounded-full border-4 border-red-500 opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/values.png"
                    alt="Values"
                    width={40}
                    height={40}
                    className="h-8 w-8 sm:h-8 sm:w-8 text-white"
                  />
                </div>
              </div>
            </motion.div>

            {/* Values statement */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className=""
            >
              <p className="text-white text-base sm:text-lg leading-relaxed ">
                The principles that define our connection – within & outside
              </p>
            </motion.div>
          </div>
          </div>
          {/* Values Diagram with PNG Images and Rounded Connections */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={valuesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="relative w-full values-diagram-container mt-10"
            style={{
              paddingBottom: "100%", // Square aspect ratio
              transformOrigin: "center center",
            }}
          >
            {/* Animated background for the diagram */}

            {/* The rest of the SVG code remains unchanged */}
            <svg
              viewBox="0 0 600 600"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Define gradients for the stroke */}
              <defs>
                {/* Gradient for the outer ring */}
                <linearGradient id="redBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#1e3a8a" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#7f1d1d" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#1e3a8a" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.8" />
                </linearGradient>

                {/* Animated gradient */}
                <motion.linearGradient
                  id="animatedGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                  animate={{
                    x1: ["0%", "100%", "0%"],
                    x2: ["100%", "0%", "100%"],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#1e3a8a" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.8" />
                </motion.linearGradient>
              </defs>

              {/* Center Circle */}
              <circle cx="300" cy="300" r="60" fill="transparent" stroke="#0076CE" strokeWidth="2" />
              <text
                x="300"
                y="295"
                textAnchor="middle"
                fill="white"
                fontSize="20"
                fontWeight="500"
                className="values-text"
              >
                Our
              </text>
              <text
                x="300"
                y="320"
                textAnchor="middle"
                fill="white"
                fontSize="20"
                fontWeight="500"
                className="values-text"
              >
                Values
              </text>

              {/* Outer Ring with Multi-Color Gradient */}
              <path
                d="M300,150 A150,150 0 0,1 450,300 A150,150 0 0,1 300,450 A150,150 0 0,1 150,300 A150,150 0 0,1 300,150"
                fill="none"
                stroke="url(#redBlueGradient)"
                strokeWidth="20"
              />

              {/* Integrity - Top */}
              <text
                x="300"
                y="90"
                textAnchor="middle"
                fill="white"
                fontSize="18"
                fontWeight="500"
                className="values-label"
              >
                Integrity
              </text>
              <circle cx="300" cy="150" r="40" fill="#7f1d1d" fillOpacity="0.8" />

              {/* Teamwork - Right */}
              <text
                x="550"
                y="300"
                textAnchor="middle"
                fill="white"
                fontSize="18"
                fontWeight="500"
                className="values-label"
              >
                Teamwork
              </text>
              <circle cx="450" cy="300" r="40" fill="#1e3a8a" fillOpacity="0.7" />

              {/* Innovation - Bottom */}
              <text
                x="300"
                y="520"
                textAnchor="middle"
                fill="white"
                fontSize="18"
                fontWeight="500"
                className="values-label"
              >
                Innovation
              </text>
              <circle cx="300" cy="450" r="40" fill="#7f1d1d" fillOpacity="0.8" />

              {/* Kaizen - Left */}
              <text
                x="60"
                y="300"
                textAnchor="middle"
                fill="white"
                fontSize="18"
                fontWeight="500"
                className="values-label"
              >
                Kaizen
              </text>
              <circle cx="150" cy="300" r="40" fill="#1e3a8a" fillOpacity="0.7" />
            </svg>

            {/* PNG Images positioned over the circles - Using relative positioning with CIRCULAR CONTAINERS */}
            <div className="absolute top-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[18%] h-0 pb-[18%] rounded-full overflow-hidden flex items-center justify-center bg-red-900/900 shadow-lg icon-circle sm:w-[12%] sm:pb-[12%]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[60%] h-[60%]">
                  <Image
                    src="/honesty.png"
                    alt="Integrity"
                    fill
                    sizes="(max-width: 640px) 24px, (max-width: 1024px) 36px, 48px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Teamwork - Right - ADJUSTED POSITION */}
            <div className="absolute top-[50%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 w-[18%] h-0 pb-[18%] rounded-full overflow-hidden flex items-center justify-center bg-blue-900/900 shadow-lg icon-circle sm:w-[12%] sm:pb-[12%]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[60%] h-[60%]">
                  <Image
                    src="/teemwork.png"
                    alt="Teamwork"
                    fill
                    sizes="(max-width: 640px) 24px, (max-width: 1024px) 36px, 48px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="absolute top-[75%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[18%] h-0 pb-[18%] rounded-full overflow-hidden flex items-center justify-center bg-red-900/900 shadow-lg icon-circle sm:w-[12%] sm:pb-[12%]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[60%] h-[60%]">
                  <Image
                    src="/innovation.png"
                    alt="Innovation"
                    fill
                    sizes="(max-width: 640px) 24px, (max-width: 1024px) 36px, 48px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Kaizen - Left - ADJUSTED POSITION */}
            <div className="absolute top-[50%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 w-[18%] h-0 pb-[18%] rounded-full overflow-hidden flex items-center justify-center bg-blue-900/900 shadow-lg icon-circle sm:w-[12%] sm:pb-[12%]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[60%] h-[60%]">
                  <Image
                    src="/kaizen.png"
                    alt="Kaizen"
                    fill
                    sizes="(max-width: 640px) 24px, (max-width: 1024px) 36px, 48px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Separation Line with animation */}
      <div className="w-full h-px relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          animate={{
            x: ["100%", "-100%"],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Add CSS for responsive SVG text - LARGER FONT SIZES */}
      <style jsx global>{`
        .values-text {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .values-label {
          font-size: 1.0rem;
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        
        /* Responsive text scaling */
        @media (max-width: 768px) {
          .values-text {
            font-size: 1.25rem;
          }
          .values-label {
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          .values-text {
            font-size: 1.5rem !important;
            font-weight: 700 !important;
          }
          .values-label {
            font-size: 1.25rem !important;
            font-weight: 600 !important;
          }
        }
        
        /* Fix for SVG rendering */
        svg {
          overflow: visible;
        }
        svg circle {
          vector-effect: non-scaling-stroke;
        }
        
        /* Ensure icons scale properly */
        .icon-circle img {  
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          object-position: center !important;
        }
        
        /* Grid pattern for background */
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
.values-diagram-container {
  transform: scale(1.2) !important;
  margin: -4rem 0 2rem 0 !important; /* Moves it up */
}

        /* Make values diagram larger on mobile */
        @media (max-width: 640px) {
          .values-diagram-container {
            transform: scale(1.3) !important;
            margin: 2rem 0 !important;
          }
          
          .values-text {
            font-size: 1.4rem !important;
            font-weight: 700 !important;
          }
          
          .values-label {
            font-size: 1.0rem !important;
            font-weight: 600 !important;
          }
          
          .icon-circle {
            width: 18% !important;
            padding-bottom: 18% !important;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3) !important;
          }
        }

        /* Ensure the diagram is centered and visible on mobile */
        .values-diagram-container {
          transform-origin: center center;
        }
      `}</style>
    </>
  )
}
