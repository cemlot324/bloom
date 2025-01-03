import { NextResponse } from 'next/server'

export default function manifest() {
  return {
    name: "Natural Beauty",
    short_name: "Beauty",
    description: "Your unique complex of natural components",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ef4444",
    icons: [
      {
        src: "/icon1.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon1.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }
}

export async function GET() {
  return NextResponse.json(manifest())
}