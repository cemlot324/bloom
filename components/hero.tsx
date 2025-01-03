import Image from "next/image"

export function Hero() {
  return (
    <section className="hero-section relative h-screen">
      <div className="grid h-screen grid-cols-1 md:grid-cols-2">
        <Image
          src="/Image1.png"
          alt="Natural beauty product 1"
          width={1080}
          height={1080}
          className="h-full w-full object-cover"
          priority
        />
        <Image
          src="/Image11.png"
          alt="Natural beauty product 2"
          width={1080}
          height={1080}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
        <h1 className="text-center text-3xl font-bold text-red-500 md:text-6xl">
          YOUR UNIQUE COMPLEX OF
          <br />
          NATURAL COMPONENTS
        </h1>
      </div>
    </section>
  )
}

