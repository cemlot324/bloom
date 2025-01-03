"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

export function FeaturedSection() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-red-200/30 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
            left: '10%',
            top: '20%',
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full bg-pink-200/30 blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
            right: '15%',
            top: '30%',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-purple-200/20 blur-3xl"
          style={{
            transform: `translate(${mousePosition.y}px, ${-mousePosition.x}px)`,
            transition: 'transform 0.3s ease-out',
            left: '30%',
            top: '10%',
          }}
        />
        <div 
          className="absolute w-[450px] h-[450px] rounded-full bg-yellow-200/20 blur-3xl"
          style={{
            transform: `translate(${-mousePosition.y}px, ${mousePosition.x}px)`,
            transition: 'transform 0.3s ease-out',
            right: '25%',
            bottom: '20%',
          }}
        />
        <div 
          className="absolute w-[350px] h-[350px] rounded-full bg-blue-200/20 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
            left: '40%',
            bottom: '15%',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-12 text-red-500">
              <span className="inline-block animate-slide-up opacity-0 [animation-delay:200ms] hover:scale-110 transition-transform">
                New
              </span>{' '}
              <span className="inline-block animate-slide-up opacity-0 [animation-delay:400ms] hover:scale-110 transition-transform">
                Limited
              </span>{' '}
              <span className="inline-block animate-slide-up opacity-0 [animation-delay:600ms] hover:scale-110 transition-transform">
                Fruity
              </span>{' '}
              <span className="inline-block animate-slide-up opacity-0 [animation-delay:800ms] hover:scale-110 transition-transform">
                Collection
              </span>
            </h2>
            <div className="flex gap-8 justify-center">
              {[2, 3, 4].map((index) => (
                <div 
                  key={index}
                  onClick={() => handleProductClick(products[index - 2]?._id)}
                  className="relative w-[200px] h-[300px] rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 cursor-pointer"
                  style={{
                    animation: `float ${3 + index * 0.5}s infinite ease-in-out alternate`,
                  }}
                >
                  <Image
                    src={`/product${index}.png`}
                    alt={`Product ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

