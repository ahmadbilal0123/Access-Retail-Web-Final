import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ModernNavbar from "@/components/navbar/modern-navbar"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Access Retail",
  description: "Access Retail - Your trusted partner in retail intelligence.",
  openGraph: {
    title: 'Access Retail',
    description: 'Access Retail - Your trusted partner in retail intelligence.',
    url: 'https://accessretailpk.com',
    siteName: 'Access Retail',
    images: [
      {
        url: 'https://accessretailpk.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Access Retail',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Access Retail',
    description: 'Access Retail - Your trusted partner in retail intelligence.',
    images: ['https://accessretailpk.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo/AR-Logo.webp" type="image/png" />
        <link rel="canonical" href="https://accessretailpk.com" />
        {/* Add external script file for scroll prevention */}
        <Script src="/scroll-fix.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ModernNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'