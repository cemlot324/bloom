"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Cart } from "@/components/cart"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/context/cart-context"

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { state } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      if (!heroSection) return;

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const currentScrollPos = window.scrollY;
      
      setIsVisible(
        currentScrollPos <= heroBottom || 
        currentScrollPos < prevScrollPos
      );

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 bg-transparent
      transition-transform duration-300 px-4
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <div className="mx-auto flex max-w-7xl items-center justify-between py-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/BloomLogo.png"
            alt="Logo"
            width={170}
            height={40}
            className="h-10"
          />
        </Link>
        
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="flex items-center gap-2 rounded-full border-2 border-red-500 bg-white/80 px-4 py-2 text-red-500 backdrop-blur-sm hover:bg-white transition-colors relative"
              >
                <ShoppingCart className="h-4 w-4" />
                Cart
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <Cart />
          </Sheet>
          <button className="rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600 transition-colors">
            HOME
          </button>
        </div>
      </div>
    </nav>
  );
}

