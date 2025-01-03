"use client"

import Image from "next/image"

export function BottomBanner() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Images container */}
          <div className="flex gap-4">
            <div className="relative aspect-square w-1/2">
              <Image
                src="/Image12.png"
                alt="Banner 1"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative aspect-square w-1/2">
              <Image
                src="/Image5.png"
                alt="Banner 2"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Marquee section - positioned absolutely over the images */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden py-12">
            <div className="flex animate-marquee whitespace-nowrap">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center gap-24 mx-24">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-red-500">NATURAL BEAUTY *</span>
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-red-500">PURE INGREDIENTS *</span>
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-red-500">HEALTHY LIFESTYLE *</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 