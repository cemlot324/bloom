import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import "@uploadthing/react/styles.css";
import { CartProvider } from "@/lib/context/cart-context"
import { Toaster } from "sonner"
import { Assistant } from "@/components/assistant"
import './pwa'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Natural Beauty',
  description: 'Your unique complex of natural components',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bloom" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        
        {/* iPhone Splash Screens */}
        <link rel="apple-touch-startup-image" 
              href="/splash/apple-splash-2048-2732.png" 
              media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" />
        {/* Add other splash screen sizes as needed */}
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster />
          <Assistant />
        </CartProvider>
      </body>
    </html>
  )
}

