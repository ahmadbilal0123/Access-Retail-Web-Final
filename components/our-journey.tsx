"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Calendar, Award, BarChart, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Helper to render text with line breaks
function renderWithLineBreaks(text: string) {
  if (!text) return null
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ))
}

export default function OurJourney() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Add these new state variables and refs after the existing ones
  const [isTouching, setIsTouching] = useState(false)
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pageScrollPositionRef = useRef({ x: 0, y: 0 })

  // Timeline data
  const timelineData = [
    {
      id: "2009-2011",
      years: "2009 – 2011",
      title: "Retail Merchandizing Audit",
      description:
        "Initiated Retail Merchandizing Audit on HHTs, including 'Perfect Store Audit' for major FMCG company and a proprietary merchandizing audit for major beverage company with phenomenal tracking for almost a decade.",
      color: "blue",
      image: "/MerchandizingAudit.webp",
      achievements: [
        "Launched first digital audit system",
        "Partnered with major MNCs",
        "Established nationwide field operations",
      ],
      stats: {
        "Major Clients": 2,
        Reporting: "Shop Level",
        "Audits Monthly": "30,000+",
      },
    },
    {
      id: "2012-2013",
      years: "2012 – 2013",
      title: "Largest Retail Census",
      description:
        "Largest Retail Census of Pakistan – National scope & first-ever Retail Census in Afghanistan covering >80% urban market.",
      color: "red",
      image: "/Census-option.webp",
      achievements: [
        "Profiled 750,000+ retail outlets",
        "Pioneered in capturing digital coordinates of retail population",
        "First company to conduct retail census in Afghanistan",
      ],
      stats: {
        outlets: "750,000+",
        "Cities /Villages": "17,000+",
        coverage: ">85%",
      },
    },
    {
      id: "2014-2015",
      years: "2014 – 2015",
      title: "New Product Development",
      description:
        "Launched Syndicated Retail Execution Tracker for telecom industry. Also conceived & established a tracker to measure trade discounts in beverage retail.",
      color: "blue",
      image: "/product-dev.jpg",
      achievements: [
        "Initiated customized retail measurement for telecom sector",
        "Pioneered trade discount measurement for beverages",
      ],
      stats: {
        ResearchInnovations: 2,
        ClientWins: 4,
        AuditsMonthly: "45,000+",
      },
    },
    {
      id: "2016-2018",
      years: "2016 – 2018",
      title: "Spadework for Future Growth",
      description:
        "Client-Centric Census Projects for Beverages & Telecom\nRetail Establishment Survey\nRetail Audit for Nicotine Top Tier Retail",
      color: "red",
      image: "/syndicated.webp",
      achievements: [
        "Developed Specialized Retail Audit for Tobacco",
        "Established Basis for Syndicated Retail Measurement",
      ],
      stats: {
        CensusProjects: 4,
        "Baseline For NRA Design": "RES",
        "Training & Development": "DS/DP Team",
      },
    },
    {
      id: "2019-2022",
      years: "2019 – 2022",
      title: "National Retail Audit - Syndicated",
      description:
        "Launched Syndicated National Retail Audit from Jan 2019.\nUpdated Retail Universe via Retail Census 2022",
      color: "blue",
      image: "/banner-2.jpg",
      achievements: [
        "Successful Launch of NRA",
        "Sustained Operations / Seamless Tracking during COVID-19",
        "Competitive Client Wins from World's Largest Research Company",
      ],
      stats: {
        MarketCoverage: ">85%",
        "MNC ClientsSwitched": 7,
        ClientExperience: "Successful",
      },
    },
    {
      id: "2023-2025",
      years: "2023 – 2025",
      title: "Expansion & Excellence",
      description: "Inclusion of Modern Trade in NRA Scope\nDigital Retail Census – National scope",
      color: "red",
      image: "/route-plan.webp",
      achievements: [
        "Ensured IMT & LMT Coverage",
        "Profiled 700,000+ retail outlets",
        "Offering Digitization/Mapping/Route Optimization Capability",
      ],
      stats: {
        NationalRetailAudit: "Robust",
        NationalCensus: "Full Scan",
        Coverage: ">85%",
      },
    },
  ]

  // Save current page scroll position
  const saveScrollPosition = () => {
    pageScrollPositionRef.current = {
      x: window.scrollX,
      y: window.scrollY,
    }
  }

  // Restore page scroll position
  const restoreScrollPosition = () => {
    window.scrollTo(pageScrollPositionRef.current.x, pageScrollPositionRef.current.y)
  }

  // Scroll timeline marker into view without affecting page scroll
  const scrollMarkerIntoView = (index: number) => {
    if (!timelineRef.current) return

    const activeMarker = timelineRef.current.querySelector(`[data-index="${index}"]`)
    if (!activeMarker) return

    // For horizontal scrolling within the timeline container only
    if (timelineContainerRef.current) {
      saveScrollPosition()

      const container = timelineContainerRef.current
      const markerRect = (activeMarker as HTMLElement).getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      // Calculate the scroll position to center the marker
      const scrollLeft = (activeMarker as HTMLElement).offsetLeft - containerRect.width / 2 + markerRect.width / 2

      // Scroll the container horizontally
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })

      // Ensure page position doesn't change
      setTimeout(restoreScrollPosition, 50)
    }
  }

  // Navigation functions with improved event handling
  const goToNext = (e: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    saveScrollPosition()
    setActiveIndex((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1))
    setTimeout(restoreScrollPosition, 50)
  }

  const goToPrev = (e: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    saveScrollPosition()
    setActiveIndex((prev) => (prev === 0 ? timelineData.length - 1 : prev - 1))
    setTimeout(restoreScrollPosition, 50)
  }

  const goToIndex = (index: number, e: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    saveScrollPosition()
    setActiveIndex(index)
    setTimeout(restoreScrollPosition, 50)
  }

  // Update scroll when active index changes
  useEffect(() => {
    scrollMarkerIntoView(activeIndex)
  }, [activeIndex])

  // Initialize timeline on mount
  useEffect(() => {
    if (timelineRef.current) {
      setTimeout(() => {
        scrollMarkerIntoView(activeIndex)
      }, 500)
    }
  }, [])

  // Auto-scroll functionality with improved mobile handling
  useEffect(() => {
    // Function to handle auto-scrolling
    const startAutoScroll = () => {
      autoScrollTimerRef.current = setInterval(() => {
        if (!isHovering && !isTouching) {
          saveScrollPosition()
          setActiveIndex((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1))
          setTimeout(restoreScrollPosition, 50)
        }
      }, 5000) // Scroll every 5 seconds
    }

    // Start auto-scrolling
    startAutoScroll()

    // Clean up on unmount
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current)
      }
    }
  }, [isHovering, isTouching, timelineData.length])

  // Improved touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    saveScrollPosition()
    setIsTouching(true)
    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Set a timeout to resume auto-scrolling after 5 seconds
    touchTimeoutRef.current = setTimeout(() => {
      setIsTouching(false)
    }, 5000)

    // Ensure page position is restored
    setTimeout(restoreScrollPosition, 50)
  }

  // Robust key formatter: preserves all-uppercase abbreviations (like NRA)
  const formatKey = (key: string) => {
    if (key === key.toUpperCase()) return key
    return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase())
  }

  // Format stats for display
  const formatStats = (stats: Record<string, string | number>) => {
    return Object.entries(stats).map(([key, value]) => {
      // Use robust formatter for keys
      const formattedKey = formatKey(key)

      // Format the value (add + for most stats, % for percentages)
      const formattedValue =
        key.toLowerCase().includes("percentage") ||
        key.toLowerCase().includes("accuracy") ||
        key.toLowerCase().includes("coverage")
          ? `${value}`
          : `${value.toLocaleString()}`

      return { key: formattedKey, value: formattedValue }
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900"
      data-section="journey"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Journey</span>
          </motion.h2>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-blue-100 max-w-2xl mx-auto"
          >
            Explore our evolution from a specialized retail audit provider to the comprehensive retail intelligence
            leader we are today.
          </motion.p>
        </div>

        {/* Timeline Navigation */}
        <div className="mb-6 relative">
          {/* Timeline Track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-900/50 transform -translate-y-1/2 rounded-full"></div>

          {/* Timeline Gradient Progress */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-red-500 to-blue-500 transform -translate-y-1/2 rounded-full"
            style={{
              width: `${(activeIndex / (timelineData.length - 1)) * 100}%`,
              transition: "width 0.5s ease-in-out",
            }}
          ></div>

          {/* Timeline Markers Container */}
          <div
            ref={timelineContainerRef}
            className="flex overflow-x-auto py-8 hide-scrollbar relative px-4 md:px-12 lg:px-24 xl:px-32 mx-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={(e) => e.stopPropagation()}
          >
            <div ref={timelineRef} className="flex justify-between w-full min-w-max mx-auto">
              {timelineData.map((item, index) => (
                <div
                  key={item.id}
                  data-index={index}
                  className="flex-shrink-0 mx-4 first:ml-0 last:mr-0"
                  style={{ minWidth: "80px" }}
                >
                  <button
                    onClick={(e) => goToIndex(index, e)}
                    className="flex flex-col items-center relative group"
                    aria-label={`View ${item.years}`}
                  >
                    {/* Timeline Marker */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 relative",
                        index <= activeIndex
                          ? item.color === "blue"
                            ? "bg-blue-600 border-2 border-blue-400"
                            : "bg-red-600 border-2 border-red-400"
                          : "bg-blue-900/70 border-2 border-blue-800/50 group-hover:border-blue-700/70",
                      )}
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full bg-white",
                          index === activeIndex ? "scale-150" : "scale-100",
                          "transition-transform duration-300",
                        )}
                      ></div>

                      {/* Pulse effect for active marker */}
                      {index === activeIndex && (
                        <div
                          className={cn(
                            "absolute inset-0 rounded-full animate-ping opacity-30",
                            item.color === "blue" ? "bg-blue-500" : "bg-red-500",
                          )}
                        ></div>
                      )}
                    </div>

                    {/* Year Label */}
                    <div
                      className={cn(
                        "mt-3 font-medium transition-all duration-300 text-center",
                        index === activeIndex
                          ? item.color === "blue"
                            ? "text-blue-300 scale-110 text-sm md:text-base"
                            : "text-red-300 scale-110 text-sm md:text-base"
                          : "text-blue-200/70 text-xs md:text-sm group-hover:text-blue-200",
                        "whitespace-nowrap",
                      )}
                    >
                      {item.years}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Indicators */}
          <div className="flex justify-center mt-2 md:hidden">
            <div className="flex space-x-1">
              {timelineData.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-blue-500 w-4" : "bg-blue-800/70",
                  )}
                  onClick={(e) => goToIndex(index, e)}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    goToIndex(index, e)
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Slideshow */}
        <div className="relative mt-[-10px]">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-2 sm:left-0 transform -translate-y-1/2 z-20">
            <Button
              onClick={goToPrev}
              variant="outline"
              size="icon"
              className="bg-blue-900/50 border-blue-700/30 text-white hover:bg-blue-800/70 hover:text-white w-8 h-8 sm:w-10 sm:h-10"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 -right-2 sm:right-0 transform -translate-y-1/2 z-20">
            <Button
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="bg-blue-900/50 border-blue-700/30 text-white hover:bg-blue-800/70 hover:text-white w-8 h-8 sm:w-10 sm:h-10"
              aria-label="Next milestone"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Content Cards */}
          <div className="mx-8 sm:mx-12 mt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TimelineCard
                  data={timelineData[activeIndex]}
                  stats={formatStats(
                    Object.fromEntries(
                      Object.entries(timelineData[activeIndex].stats).filter(([_, v]) => v !== undefined),
                    ) as unknown as Record<string, string | number>,
                  )}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineCardProps {
  data: {
    years: string
    title: string
    description: string
    color: string
    image: string
    achievements: string[]
  }
  stats: Array<{ key: string; value: string }>
}

function TimelineCard({ data, stats }: TimelineCardProps) {
  const { years, title, description, color, image, achievements } = data

  return (
    <Card
      className={cn(
        "overflow-hidden border shadow-xl",
        color === "blue"
          ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 border-blue-800/30"
          : "bg-gradient-to-br from-red-900/80 to-red-950/90 border-red-800/30",
      )}
    >
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-48 sm:h-64 md:h-auto overflow-hidden">
            <div className="absolute inset-0">
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
              {/* Remove overlay for 2023–2025 card */}
              {title !== "Expansion & Excellence" && (
                <div
                  className={cn(
                    "absolute inset-0",
                    color === "blue"
                      ? "bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-transparent md:via-blue-900/70 md:to-transparent"
                      : "bg-gradient-to-r from-red-900/20 via-red-800/10 to-transparent md:via-red-800/10 md:to-transparent",
                  )}
                ></div>
              )}
            </div>

            {/* Year Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={cn(
                  "text-5xl sm:text-7xl md:text-8xl font-bold opacity-15",
                  color === "blue" ? "text-blue-300" : "text-red-300",
                )}
              >
                {years.split(" – ")[0]}
              </div>
            </div>

            {/* Year Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <div className="flex items-center gap-2">
                <Calendar
                  className={cn("h-4 w-4 sm:h-5 sm:w-5", color === "blue" ? "text-blue-300" : "text-red-300")}
                />
                <div
                  className={cn(
                    "px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium",
                    color === "blue"
                      ? "bg-blue-900/70 text-blue-100 border border-blue-700/50"
                      : "bg-red-900/70 text-red-100 border border-red-700/50",
                  )}
                >
                  {years}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
            <div className="w-16 h-1 mb-4 bg-gradient-to-r from-blue-500 to-red-500"></div>

            <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">{renderWithLineBreaks(description)}</p>

            {/* Key Achievements */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Award className={cn("h-4 w-4 sm:h-5 sm:w-5", color === "blue" ? "text-blue-300" : "text-red-300")} />
                <h4 className="text-white font-medium text-sm sm:text-base">Key Achievements</h4>
              </div>

              <ul className="space-y-1 sm:space-y-2 pl-6 sm:pl-7">
                {achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 relative text-xs sm:text-sm">
                    <CheckCircle2
                      className={cn(
                        "absolute -left-6 sm:-left-7 h-4 w-4 sm:h-5 sm:w-5 mt-0.5",
                        color === "blue" ? "text-blue-400" : "text-red-400",
                      )}
                    />
                    <span className="text-blue-100">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <BarChart
                  className={cn("h-4 w-4 sm:h-5 sm:w-5", color === "blue" ? "text-blue-300" : "text-red-300")}
                />
                <h4 className="text-white font-medium text-sm sm:text-base">Key Metrics</h4>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-2 sm:p-3 rounded-lg text-center",
                      color === "blue"
                        ? "bg-blue-900/50 border border-blue-800/50"
                        : "bg-red-900/50 border border-red-800/50",
                    )}
                  >
                    <div
                      className={cn(
                        "text-base sm:text-xl font-bold tracking-normal font-sans mb-0.5 sm:mb-1",
                        color === "blue" ? "text-blue-300" : "text-red-300",
                      )}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-blue-100 line-clamp-2">{stat.key}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
