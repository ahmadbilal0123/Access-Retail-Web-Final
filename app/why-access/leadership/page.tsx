"use client"

import { useEffect, useRef, useState } from "react"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import { Clock, Briefcase, ChevronDown } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Simplified background with minimal animations
const SimplifiedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#001333]">
      {/* Simple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-red-900/20" />

      {/* Static network pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  )
}

// Leadership profile card component with simplified animations
const LeadershipCard = ({ leader, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isFirstCard = index === 0
  const cardColor = isFirstCard ? "bg-blue-900/20" : "bg-red-900/20"
  const textColor = isFirstCard ? "text-blue-300" : "text-red-300"
  const buttonBg = isFirstCard ? "bg-blue-800/50 hover:bg-blue-700/50" : "bg-red-800/50 hover:bg-red-700/50"
  const borderColor = isFirstCard ? "border-blue-700" : "border-red-700"
  const hoverBg = isFirstCard ? "hover:bg-blue-800/30" : "hover:bg-red-800/30"

  // Simplified animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.3,
      },
    },
  }

  const expandVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: "easeOut" },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.2 + custom * 0.1,
      },
    }),
  }

  // Function to render text with line breaks
  const renderWithLineBreaks = (text) => {
    if (!text) return null
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`overflow-hidden rounded-xl shadow-xl border-2 ${borderColor} w-full max-w-md mx-auto transition-all duration-300 ${hoverBg}`}
    >
      {/* Image section with static gradient overlay */}
      <div className="relative h-64 sm:h-72 md:h-80 w-full bg-gradient-to-b from-white to-gray-300 overflow-hidden">
        {leader.image && (
          <div className="absolute inset-0 overflow-hidden group">
            <Image
              src={leader.image || "/placeholder.svg"}
              alt={leader.name}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 40vw, 33vw"
              priority={index === 0}
            />
          </div>
        )}

        {/* Static gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Name and title positioned at bottom of image */}
        <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
          <motion.h3 className="text-xl sm:text-2xl font-bold text-white mb-1" custom={0} variants={textVariants}>
            {leader.name}
          </motion.h3>
          <motion.p className={`text-base sm:text-lg ${textColor}`} custom={1} variants={textVariants}>
            {leader.position}
          </motion.p>
        </div>
      </div>

      {/* Details section */}
      <div className={`p-4 sm:p-6 ${cardColor} relative`}>
        <div className="space-y-3 sm:space-y-4 relative">
          <motion.div className="flex items-center" custom={2} variants={textVariants}>
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white/60 mr-2 flex-shrink-0" />
            <p className="text-sm sm:text-base text-white/80">Experience: {leader.experience || "20+ years"}</p>
          </motion.div>

          <motion.div className="flex items-center" custom={3} variants={textVariants}>
            <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-white/60 mr-2 flex-shrink-0" />
            <p className="text-sm sm:text-base text-white/80">Expertise</p>
          </motion.div>

          <motion.p className="text-sm sm:text-base text-white/80 pl-6 sm:pl-7" custom={4} variants={textVariants}>
            {leader.expertise}
          </motion.p>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center justify-between w-full ${buttonBg} text-white p-2 sm:p-3 rounded transition-colors mt-2 text-sm sm:text-base`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            custom={5}
            variants={textVariants}
          >
            <span>{isExpanded ? "Read Less" : "Read More"}</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80 space-y-3 sm:space-y-4"
                variants={expandVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <p className="mb-2 sm:mb-3">{renderWithLineBreaks(leader.description)}</p>
                {leader.additionalInfo && <p className="mb-2 sm:mb-3">{renderWithLineBreaks(leader.additionalInfo)}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// Leadership team data
const leadershipTeam = [
  {
    id: 1,
    name: "Haroon Ahmed",
    position: "Chief Executive Officer",
    experience: "30+ years",
    expertise: "Design, Insights and Commercial Lead",
    description:
      "Over the last three decades, Mr. Haroon Ahmad has remained instrumental in developing retail market measurement in Pakistan. Prior to coming into entrepreneurial role in 2009, he headed Retail Measurement Services division of global leader in Retail Research.\n\nHaving travelled to countries across North America, Europe, and Asia, he has got exposure to international best practices. With demonstrated capability to blend research expertise with insightful analysis, he has contributed to success stories of some of the key FMCG brands in the country. His passion for research, vision and strategic thinking make him an exemplary Leader.",
    image: "/haroon.jpg",
    color: "blue",
  },
  {
    id: 2,
    name: "Muhammad Irfan Butt",
    position: "Executive Director",
    experience: "28+ years",
    expertise: "Operations Design & Leadership, Insights",
    description:
      "Mr. Muhammad Irfan Butt carries to his credit extensive experience of managing large scale operations (in research & sales) inside and outside Pakistan.\n\nHe co-founded Access Retail in 2009 that later became market leader in its domain. Earlier he has handled retail audit and census operations for global leader in retail research covering Middle East, North Africa & Pakistan region. Also headed regional Sales & Marketing function of a key beverage player, where he won Performance Excellence Award for 2 years consecutively. He is a go-getter and a strong leader habitual of pushing boundaries for continuous rise in performance. ",
    image: "/irfan.JPG",
    color: "red",
  },
]

// Simplified section title component
const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-10 sm:mb-16 md:mb-20">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="w-24 sm:w-32 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4 sm:mb-8"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "8rem", opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <motion.p
        className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {subtitle}
      </motion.p>
    </div>
  )
}

export default function LeadershipPage() {
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

  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}

      {/* Simplified background */}
      <SimplifiedBackground />

      <main
        ref={mainRef}
        className="min-h-screen relative z-10"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* Leadership Section with increased top margin */}
        <section className="pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-20 relative z-10">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionTitle title="Meet Our Leadership" subtitle="Passionate About Excellence In Research" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto">
              {leadershipTeam.map((leader, index) => (
                <LeadershipCard key={leader.id} leader={leader} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Simple separator */}
        <div className="w-full h-px bg-blue-500/30 my-8" />

        <br></br>
        <br></br>

        <Footer />
      </main>
    </>
  )
}
