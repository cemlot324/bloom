import Image from "next/image"
import { ArrowDown } from "lucide-react"

export function BannerImage() {
  return (
    <section className="py-12">
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/bannerimage.png"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-center px-4 text-red-500">
            Discover Our Story
          </h2>
          <div className="flex flex-col items-center gap-1 group cursor-pointer">
            <span className="text-sm font-medium text-red-500 group-hover:text-red-400 transition-colors">
              Find Out More
            </span>
            <ArrowDown 
              className="w-6 h-6 animate-bounce text-red-500 group-hover:text-red-400 transition-colors" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

