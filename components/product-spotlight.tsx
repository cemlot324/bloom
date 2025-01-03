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

const gradientColors = [
  'from-white to-pink-100',
  'from-white to-blue-100',
  'from-white to-purple-100',
  'from-white to-green-100',
  'from-white to-yellow-100',
  'from-white to-orange-100',
];

export function ProductSpotlight() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError('Error loading products');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[160px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[160px] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="px-4">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 pb-4 min-w-min">
            {products.map((product, index) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className={`
                  rounded-lg overflow-hidden
                  bg-gradient-to-b ${gradientColors[index % gradientColors.length]}
                  flex h-[160px] w-[320px] flex-shrink-0
                  cursor-pointer
                  hover:scale-[1.02] transition-transform duration-300
                `}
              >
                {product.images[0] && (
                  <div className="w-[40%] relative">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover rounded-l-xl"
                    />
                  </div>
                )}
                <div className="w-[60%] p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold line-clamp-2">{product.title}</h3>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">
                      {product.category}
                    </p>
                    <p className="text-base font-bold text-red-500">
                      £{product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

