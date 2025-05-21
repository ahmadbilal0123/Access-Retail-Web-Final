"use client"

import { X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Client {
  name: string
  industry: string
  logo: string
}

interface ClientDetailModalProps {
  client: Client
  onClose: () => void
}

export function ClientDetailModal({ client, onClose }: ClientDetailModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Client info - simplified */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-4 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={client.logo || "/placeholder.svg"}
              alt={client.name}
              fill
              className="object-contain"
              crossOrigin="anonymous"
            />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">{client.name}</h3>
            {client.industry && <div className="text-sm text-gray-600">{client.industry}</div>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
