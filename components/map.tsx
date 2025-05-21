'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { MapContainerProps, TileLayerProps } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ExternalLink } from 'lucide-react'

// Custom icon using AR logo
const CustomIcon = L.icon({
  iconUrl: '/logo/AR-Logo.webp',
  iconSize: [40, 40], // Adjust size as needed
  iconAnchor: [20, 40], // Center the icon horizontally and align bottom with the point
  popupAnchor: [0, -40], // Popup appears above the icon
})

export default function Map() {
  const position: [number, number] = [31.4814217, 74.3080872]
  const googleMapsUrl = `https://www.google.com/maps?q=${position[0]},${position[1]}`

  const mapProps: MapContainerProps = {
    center: position,
    zoom: 15,
    scrollWheelZoom: false,
    style: { height: '100%', width: '100%' },
    className: "z-0"
  }

  const tileLayerProps: TileLayerProps = {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div style={{ height: '400px', width: '100%' }} className="relative rounded-lg overflow-hidden">
        <MapContainer {...mapProps} style={{ height: '100%', width: '100%' }}>
          <TileLayer {...tileLayerProps} />
          <Marker position={position} icon={CustomIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-blue-900 mb-2">Access Retail</h3>
                <p className="text-sm text-gray-700">
                  3rd & 4th Floor, Royal Complex 34-M,<br />
                  Block M Commercial Area Model Town Extension,<br />
                  Lahore, 54700
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
      >
        Open in Google Maps
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  )
} 