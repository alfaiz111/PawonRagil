"use client"

import Image from "next/image"
import { useKategori } from "@/hooks/useApi"

export default function KategoriMenu() {
  const { kategoris, loading, error } = useKategori()

  if (loading) {
    return (
      <section id="kategori" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#7B1A36]">Memuat kategori...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="kategori" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="kategori" className="py-20 bg-white">
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
          <div className="flex gap-6 pt-10 min-w-max">
            {kategoris.map((item) => (
              <div
                key={item.id}
                className="
                  relative
                  w-[calc(25vw-1rem)]
                  min-w-[250px]
                  max-w-[300px]
                  bg-white
                  border
                  border-pink-200
                  rounded-2xl
                  pt-15  /* tambah padding atas untuk gambar lebih besar */
                  pb-6
                  px-4
                  text-center
                  hover:shadow-lg
                  transition
                  flex
                  flex-col
                  justify-between
                  overflow-visible
                "
              >
                {/* Gambar timbul lebih besar */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-10 w-44 h-44">
                  <Image
                    src={item.gambar || "/images/placeholder.png"}
                    alt={item.nama}
                    width={176}
                    height={176}
                    className="object-contain"
                  />
                </div>

                {/* Konten kartu */}
                <div className="flex-1 mt-16">
                  <h3 className="text-lg font-bold text-[#7B1A36] mb-2 break-words">
                    {item.nama}
                  </h3>
                  <p className="text-sm text-pink-700 mb-4 break-words line-clamp-3">
                    {item.deskripsi || "Kategori menu lezat"}
                  </p>
                </div>

                {/* Tombol */}
                <button
                  className="
                    bg-[#2F6BFF]
                    text-white
                    px-5
                    py-2
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
