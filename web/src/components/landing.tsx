"use client"

import Image from "next/image"

export default function Landing() {
  return (
    <main
      className="relative min-h-screen flex items-center"
      style={{
        backgroundColor: "#F9AABB",
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('images/PatternHero.png')",
          backgroundRepeat: "repeat",
          opacity: 0.02,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-[50px] grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Content */}
        <div>
          <p className="text-[#7B1A36] text-lg mb-2">
            Selamat Datang di
          </p>

          <h1 className="text-[#7B1A36] font-extrabold text-5xl mb-4">
            PAWON RAGIL
          </h1>

          <p className="text-[#7B1A36] mb-6 max-w-md">
            Makanan Dan Minuman Gen-z Terlangka Dibumi
          </p>

          <button
            className="
              bg-[#7B1A36]
              text-white
              px-6
              py-3
              rounded-lg
              font-semibold
              transition
              hover:bg-white
              hover:text-[#7B1A36]
            "
          >
            Lihat Menu
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/6.png"
            alt="Pawon Ragil"
            width={520}
            height={520}
            priority
          />
        </div>
      </div>
    </main>
  )
}
