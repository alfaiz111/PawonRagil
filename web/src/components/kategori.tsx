"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useKategori } from "@/hooks/useApi"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Menu = {
  id: string
  nama: string
  deskripsi: string
  harga: number
  gambar: string
  kategoriId: string
}

export default function KategoriMenu() {
  const { kategoris, loading, error } = useKategori()
  const [menu, setMenu] = useState<Menu[]>([])
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [loadingMenu, setLoadingMenu] = useState(false)

  // Fetch semua menu
  const fetchMenu = async () => {
    setLoadingMenu(true)
    try {
      const res = await fetch("/api/menu")
      const data = await res.json()
      setMenu(Array.isArray(data.data) ? data.data : [])
    } catch (err) {
      console.error(err)
      setMenu([])
    } finally {
      setLoadingMenu(false)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  // Filter menu berdasarkan kategori yang diklik
  const filteredMenu = selectedKategori
    ? menu.filter((m) => m.kategoriId === selectedKategori)
    : []

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
              <Dialog key={item.id} open={popupOpen && selectedKategori === item.id} onOpenChange={setPopupOpen}>
                <DialogTrigger asChild>
                  <div
                    className="
                      relative
                      w-[calc(25vw-1rem)]
                      min-w-[250px]
                      max-w-[300px]
                      bg-white
                      border
                      border-pink-200
                      rounded-2xl
                      pt-15
                      pb-6
                      px-4
                      text-center
                      hover:shadow-lg
                      transition
                      flex
                      flex-col
                      justify-between
                      cursor-pointer
                      overflow-visible
                    "
                    onClick={() => {
                      setSelectedKategori(item.id)
                      setPopupOpen(true)
                    }}
                  >
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-10 w-44 h-44">
                      <Image
                        src={item.gambar || "/images/placeholder.png"}
                        alt={item.nama}
                        width={176}
                        height={176}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 mt-16">
                      <h3 className="text-lg font-bold text-[#7B1A36] mb-2 break-words">
                        {item.nama}
                      </h3>
                      <p className="text-sm text-pink-700 mb-4 break-words line-clamp-3">
                        {item.deskripsi || "Kategori menu lezat"}
                      </p>
                    </div>
                    <Button className="bg-[#2F6BFF] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                      Lihat Kategori
                    </Button>
                  </div>
                </DialogTrigger>

                {/* Dialog Content */}
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-[#7B1A36]">
                      Menu: {item.nama}
                    </DialogTitle>
                  </DialogHeader>

                  {loadingMenu ? (
                    <p>Memuat menu...</p>
                  ) : filteredMenu.length === 0 ? (
                    <p>Tidak ada menu di kategori ini.</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      {filteredMenu.map((m) => (
                        <div
                          key={m.id}
                          className="border rounded-xl p-4 flex gap-4 items-center"
                        >
                          <div className="w-24 h-24 relative flex-shrink-0">
                            <Image
                              src={m.gambar || "/images/placeholder.png"}
                              alt={m.nama}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="font-bold text-[#7B1A36]">{m.nama}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {m.deskripsi}
                            </p>
                            <p className="font-semibold text-[#7B1A36] mt-2">
                              Rp {m.harga.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <DialogClose asChild>
                    <Button className="mt-6 bg-[#7B1A36] w-full">Tutup</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
