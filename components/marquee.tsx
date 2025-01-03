"use client";

import Image from "next/image";

export function Marquee() {
  return (
    <div className="bg-red-500 overflow-hidden py-4">
      <div className="animate-marquee whitespace-nowrap">
        {[1,2,3,4].map((_, i) => (
          <span key={i} className="inline-flex items-center mx-12">
            <span className="text-sm font-medium text-white">NATURAL BEAUTY</span>
            <Image
              src="/Bloom.png"
              alt="Bloom Logo"
              width={40}
              height={20}
              className="h-5 w-auto mx-12 brightness-0 invert"
            />
            <span className="text-sm font-medium text-white">PURE INGREDIENTS</span>
            <Image
              src="/Bloom.png"
              alt="Bloom Logo"
              width={40}
              height={20}
              className="h-5 w-auto mx-12 brightness-0 invert"
            />
            <span className="text-sm font-medium text-white">HEALTHY LIFESTYLE</span>
            <Image
              src="/Bloom.png"
              alt="Bloom Logo"
              width={40}
              height={20}
              className="h-5 w-auto mx-12 brightness-0 invert"
            />
          </span>
        ))}
      </div>
    </div>
  );
}

