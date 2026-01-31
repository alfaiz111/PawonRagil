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
  const [loadingMenu, setLoadingMenu] = useState(false)
  const [jumlahMap, setJumlahMap] = useState<Record<string, number>>({})

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

  // Update jumlah menu
  const updateJumlah = (menuId: string, delta: number) => {
    setJumlahMap((prev) => ({
      ...prev,
      [menuId]: Math.max(1, (prev[menuId] || 1) + delta),
    }))
  }

  // Masukkan menu ke keranjang
  const addToCart = (menuItem: Menu) => {
    const jumlah = jumlahMap[menuItem.id] || 1
    const keranjang = JSON.parse(localStorage.getItem("keranjang") || "[]")
    keranjang.push({ ...menuItem, jumlah })
    localStorage.setItem("keranjang", JSON.stringify(keranjang))
    alert(`${menuItem.nama} berhasil ditambahkan ke keranjang!`)
  }

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
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-[#7B1A36] mb-3">
            Kategori Menu
          </h2>
          <p className="text-[#7B1A36]/80 max-w-xl mx-auto pb-0">
            Kumpulan berbagai pilihan menu makanan dan minuman yang tersedia untuk dinikmati.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 px-6 pt-0">
          {kategoris.map((kategori) => {
            const filteredMenu = menu.filter((m) => m.kategoriId === kategori.id)

            return (
              <Dialog key={kategori.id}>
                <DialogTrigger asChild>
                <div className="relative flex flex-col items-center">
                  {/* Gambar timbul di atas card */}
                  <div className="mb-[-64px] z-5 w-44 h-44">
                    <Image
                      src={kategori.gambar || "/images/placeholder.png"}
                      alt={kategori.nama}
                      width={176}
                      height={176}
                      className="object-contain"
                    />
                  </div>

                  {/* Card */}
                  <div className="w-[350px] bg-white border border-pink-200 rounded-2xl cursor-pointer hover:shadow-lg transition flex flex-col items-center pt-15 pb-16 px-4 py-0">
                    {/* Judul dan deskripsi */}
                    <h3 className="text-lg font-bold text-[#7B1A36] mt-4">{kategori.nama}</h3>
                    <p className="text-sm text-pink-700 line-clamp-2 text-center mt-1">
                      {kategori.deskripsi || "Kategori menu lezat"}
                    </p>

                    {/* Tombol */}
                    <Button className="mt-4 bg-[#2F6BFF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                      Lihat Menu
                    </Button>
                  </div>
                </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-[#7B1A36]">{kategori.nama}</DialogTitle>
                  </DialogHeader>

                  {loadingMenu ? (
                    <p>Memuat menu...</p>
                  ) : filteredMenu.length === 0 ? (
                    <p>Tidak ada menu di kategori ini.</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      {filteredMenu.map((m) => {
                        const jumlah = jumlahMap[m.id] || 1
                        const totalHarga = m.harga * jumlah
                        return (
                          <div
                            key={m.id}
                            className="border rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition"
                          >
                            <div className="relative w-full h-40 md:h-48">
                              <Image
                                src={m.gambar || "/images/placeholder.png"}
                                alt={m.nama}
                                fill
                                className="object-cover rounded-xl"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <h4 className="font-bold text-[#7B1A36] text-lg">{m.nama}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-3">{m.deskripsi}</p>
                              <p className="font-semibold text-[#7B1A36] mt-1">
                                Rp {m.harga.toLocaleString()}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <button
                                className="px-3 py-1 bg-gray-200 rounded-lg"
                                onClick={() => updateJumlah(m.id, -1)}
                              >
                                -
                              </button>
                              <span className="font-semibold">{jumlah}</span>
                              <button
                                className="px-3 py-1 bg-gray-200 rounded-lg"
                                onClick={() => updateJumlah(m.id, 1)}
                              >
                                +
                              </button>
                              <span className="ml-auto font-semibold">
                                Total: Rp {totalHarga.toLocaleString()}
                              </span>
                            </div>

                            <Button
                              className="mt-3 bg-[#7B1A36] text-white w-full"
                              onClick={() => addToCart(m)}
                            >
                              Masukkan Keranjang
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <DialogClose asChild>
                    <Button className="mt-6 bg-[#7B1A36] w-full">Tutup</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </div>
    </section>
  )
}
