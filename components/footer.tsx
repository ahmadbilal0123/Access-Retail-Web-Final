"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, ChevronUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative bg-blue-950 pt-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-900/10 blur-xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-900/10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo/AR-Logo.webp"
                  alt="Access Retail Logo"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            <p className="text-blue-100 mb-6">
              We empower your retail performance with extensive reporting capability, and cutting edge insights
              befitting your information needs
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/services/transforming-market-perfomance" label="What We Offer" />
              <FooterLink href="/why-access/leadership" label="Leadership" />
              <FooterLink href="/why-access/success-story" label="Why Access Retail?" />
              <FooterLink href="/contact" label="Contact Us" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-red-400 mr-3 h-5 w-5 flex-shrink-0 mt-1" />
                <span className="text-blue-100">
                  3rd & 4th Floor, Royal Complex 34-M, Block M Commercial Area Model Town Extension, Lahore,
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-red-400 mr-3 h-5 w-5 flex-shrink-0" />
                <a href="tel:04235201852" className="text-blue-100 hover:text-white transition-colors duration-300">
                  (042) 35201852
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="text-red-400 mr-3 h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:info@accessretailpk.com"
                  className="text-blue-100 hover:text-white transition-colors duration-300"
                >
                  info@accessretailpk.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-900/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Access Retail. All rights reserved.
            </p>

            <div className="flex items-center space-x-4">
              <Link
                href="https://www.gen-tsolutions.com/"
                className="text-blue-200 hover:text-white text-sm transition-colors"
              >
                Powered By <span className="text-white hover:text-purple-400">Gen-T AI Solutions</span>
              </Link>
              {/* <Link href="/privacy-policy" className="text-blue-200 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-blue-200 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link> */}
              <button
                onClick={scrollToTop}
                className="bg-blue-800/50 hover:bg-blue-700/50 text-white p-2 rounded-full transition-colors"
                aria-label="Scroll to top"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-8 h-8 rounded-full bg-blue-900/70 hover:bg-red-600 flex items-center justify-center text-white transition-colors duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </Link>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center group"
      >
        <span className="w-0 h-0.5 bg-red-500 group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2"></span>
        {label}
      </Link>
    </li>
  )
}
