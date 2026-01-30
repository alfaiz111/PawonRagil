"use client"

import Image from "next/image"

const categories = [
  {
    title: "Aneka Nasi",
    description:
      "Beragam pilihan hidangan berbahan dasar nasi dengan cita rasa khas Nusantara, disajikan lengkap dengan lauk dan sambal pilihan.",
    image: "/images/2.png",
  },
  {
    title: "Aneka Mie",
    description:
      "Olahan mie dengan berbagai varian rasa, mulai dari gurih, pedas, hingga manis, cocok untuk dinikmati kapan saja.",
    image: "/images/3.png",
  },
  {
    title: "Aneka Sate",
    description:
      "Sajian sate lezat dari pilihan daging terbaik yang dibakar sempurna dan disajikan dengan bumbu khas yang menggugah selera.",
    image: "/images/4.png",
  },
  {
    title: "Aneka Minuman",
    description:
      "Pilihan minuman segar dan hangat yang pas untuk menemani hidangan utama, dari minuman tradisional hingga kekinian.",
    image: "/images/5.png",
  },
]

export default function KategoriMenu() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-[#7B1A36] mb-3">
            Kategori Menu
          </h2>
          <p className="text-[#7B1A36]/80 max-w-xl mx-auto">
            Kumpulan berbagai pilihan menu makanan dan minuman yang tersedia
            untuk dinikmati.
          </p>
        </div>

        {/* Cards Slider */}
        <div className="relative overflow-x-auto overflow-y-visible pb-6 scroll-smooth">
        <div className="flex gap-8 pt-10">
        {categories.map((item, index) => (
        <div
            key={index}
            className="
            relative
            min-w-[280px]
            bg-white
            border
            border-pink-200
            rounded-2xl
            pt-20
            px-6
            pb-8
            text-center
            hover:shadow-lg
            transition
            "
        >
            {/* Image Overlap (NO background) */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2">
            <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className="object-contain"
            />
            </div>

            <h3 className="text-xl font-bold text-[#7B1A36] mb-3">
            {item.title}
            </h3>

            <p className="text-sm text-pink-700 mb-6">
            {item.description}
            </p>

            <button
            className="
                bg-[#2F6BFF]
                text-white
                px-5
                py-2.5
                rounded-lg
                text-sm
                font-semibold
                hover:opacity-90
                transition
            "
            >
            Lihat Kategori
            </button>
        </div>
        ))}
        </div>
        </div>
      </div>
    </section>
  )
}
