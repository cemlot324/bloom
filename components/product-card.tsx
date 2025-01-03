import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  image: string
  title: string
  price: string
  collection: string
  variant?: 'default' | 'grid'
}

export function ProductCard({ image, title, price, collection, variant = 'default' }: ProductCardProps) {
  if (variant === 'grid') {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="h-[300px] w-full object-cover"
          />
          <div className="p-4 text-right">
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="mb-1 text-sm text-gray-500">{collection}</p>
            <p className="text-red-500">{price}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-[300px] shrink-0">
      <CardContent className="p-4">
        <Image
          src={image}
          alt={title}
          width={280}
          height={280}
          className="mb-4 h-[280px] w-[280px] object-cover"
        />
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-1 text-red-500">{price}</p>
        <p className="text-sm text-gray-500">{collection}</p>
      </CardContent>
    </Card>
  )
}

