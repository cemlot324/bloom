import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { ProductSpotlight } from "@/components/product-spotlight"
import { CollectionLinks } from "@/components/collection-links"
import { FeaturedSection } from "@/components/featured-section"
import { BannerImage } from "@/components/banner-image"
import { ProductGrid } from "@/components/product-grid"
import { Newsletter } from "@/components/newsletter"
import { BottomBanner } from "@/components/bottom-banner"
import Footer from "@/components/footer"
import { Notification } from "@/components/notification"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Marquee />
      <ProductSpotlight />
      <CollectionLinks />
      <FeaturedSection />
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-black" />
      </div>
      <BannerImage />
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-black" />
      </div>
      <ProductGrid />
      <BottomBanner />
      <Newsletter />
      <Footer />
      <Notification />
    </main>
  )
}

