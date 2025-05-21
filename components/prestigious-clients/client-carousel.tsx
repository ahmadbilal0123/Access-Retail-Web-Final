"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ClientDetailModal } from "./client-detail-modal"

interface Client {
  name: string
  industry: string
  logo: string
}

interface ClientCarouselProps {
  clients: Client[]
}

export function ClientCarousel({ clients }: ClientCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const totalPages = Math.ceil(clients.length / itemsPerPage)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Determine items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 640) {
        setItemsPerPage(2)
      } else if (window.innerWidth < 768) {
        setItemsPerPage(3)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4)
      } else {
        setItemsPerPage(5) // Show 5 items on larger screens
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    if (autoplay && !isPaused) {
      autoplayRef.current = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages)
      }, 3000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, totalPages, itemsPerPage, isPaused])

  // Get industry color scheme
  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "FMCG":
        return {
          border: "border-blue-700/30",
          glow: "bg-blue-500/30",
          text: "text-blue-300",
        }
      case "Beverages":
        return {
          border: "border-red-700/30",
          glow: "bg-red-500/30",
          text: "text-red-300",
        }
      case "Telecom":
        return {
          border: "border-purple-700/30",
          glow: "bg-purple-500/30",
          text: "text-purple-300",
        }
      case "Food":
        return {
          border: "border-green-700/30",
          glow: "bg-green-500/30",
          text: "text-green-300",
        }
      case "Conglomerate":
        return {
          border: "border-amber-700/30",
          glow: "bg-amber-500/30",
          text: "text-amber-300",
        }
      default:
        return {
          border: "border-blue-700/30",
          glow: "bg-blue-500/30",
          text: "text-blue-300",
        }
    }
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    setAutoplay(false)
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => setAutoplay(true), 5000)
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
    setAutoplay(false)
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => setAutoplay(true), 5000)
  }

  // Get current page of clients
  const getCurrentPageClients = () => {
    const start = currentPage * itemsPerPage
    return clients.slice(start, start + itemsPerPage)
  }

  // Ensure we always have exactly itemsPerPage items, padding with null if necessary
  const getDisplayClients = () => {
    const currentClients = getCurrentPageClients()
    const paddingNeeded = itemsPerPage - currentClients.length

    if (paddingNeeded > 0) {
      // Add null placeholders to maintain layout
      return [...currentClients, ...Array(paddingNeeded).fill(null)]
    }

    return currentClients
  }

  return (
    <div
      className="relative px-4 py-8 bg-black/20 backdrop-blur-sm rounded-xl border border-blue-900/30 p-8 shadow-xl"
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation buttons */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={handlePrev}
          className="bg-blue-900/70 hover:bg-blue-700/90 text-white p-2.5 rounded-full shadow-xl transition-all duration-200 border border-blue-500/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Previous clients"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={handleNext}
          className="bg-blue-900/70 hover:bg-blue-700/90 text-white p-2.5 rounded-full shadow-xl transition-all duration-200 border border-blue-500/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Next clients"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden mx-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-4 ${
              itemsPerPage === 1
                ? "grid-cols-1"
                : itemsPerPage === 2
                  ? "grid-cols-2"
                  : itemsPerPage === 3
                    ? "grid-cols-3"
                    : itemsPerPage === 4
                      ? "grid-cols-4"
                      : "grid-cols-5"
            }`}
          >
            {getDisplayClients().map((client, index) => {
              if (!client) return <div key={`empty-${index}`} className="w-full" />

              const colors = getIndustryColor(client.industry)
              return (
                <motion.div
                  key={`${currentPage}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group cursor-pointer w-full"
                  whileHover={{ scale: 1.06, boxShadow: '0 6px 24px 0 rgba(31, 38, 135, 0.30)' }}
                  onClick={() => {
                    setSelectedClient(client)
                    setAutoplay(false)
                  }}
                >
                  {/* Colored glow on hover */}
                  <div
                    className={`absolute -inset-1.5 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-xl ${colors.glow}`}
                  ></div>
                  {/* Glassmorphism card */}
                  <div
                    className={`relative bg-white/10 backdrop-blur-lg ${colors.border} border border-blue-500/20 rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300 shadow-xl h-44 sm:h-44`}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="relative w-24 h-24 sm:w-24 bg-white/90 backdrop-blur rounded-xl p-3 flex items-center justify-center shadow-md">
                        <Image
                          src={client.logo || "/placeholder.svg"}
                          alt={`${client.name} logo`}
                          width={80}
                          height={80}
                          className="object-contain max-h-full max-w-full drop-shadow"
                          style={{ width: "auto", height: "auto" }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <h3 className="font-bold text-base sm:text-lg bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent drop-shadow">
                        {client.name || ' '}
                      </h3>
                      <p className={`text-sm mt-1 tracking-wide font-light text-blue-100 ${colors.text}`}>{client.industry}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination indicators */}
      <div className="flex justify-center mt-5 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentPage(index)
              setAutoplay(false)
              setTimeout(() => setAutoplay(true), 5000)
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 border border-blue-500/30",
              currentPage === index ? "bg-gradient-to-r from-red-500 to-blue-500 w-6 scale-110 shadow" : "bg-blue-800/70 hover:bg-blue-700/70 hover:scale-110"
            )}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay progress bar */}
      {autoplay && !isPaused && (
        <div className="w-full max-w-md mx-auto mt-4 h-0.5 bg-blue-900/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-red-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Client detail modal */}
      <AnimatePresence>
        {selectedClient && (
          <ClientDetailModal
            client={selectedClient}
            onClose={() => {
              setSelectedClient(null)
              setTimeout(() => setAutoplay(true), 1000)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
