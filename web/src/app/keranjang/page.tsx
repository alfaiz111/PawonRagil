"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type MenuKeranjang = {
  id: string
  nama: string
  deskripsi: string
  harga: number
  gambar: string
  jumlah: number
  checked: boolean
}

export default function KeranjangPage() {
  const [keranjang, setKeranjang] = useState<MenuKeranjang[]>([])
  const router = useRouter()

  // Load keranjang dari localStorage
  useEffect(() => {
    const data: MenuKeranjang[] = JSON.parse(localStorage.getItem("keranjang") || "[]")
    setKeranjang(data.map(item => ({ ...item, checked: true })))
  }, [])

  // Simpan keranjang ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem("keranjang", JSON.stringify(keranjang))
  }, [keranjang])

  // Toggle checkbox
  const toggleChecked = (id: string) => {
    setKeranjang(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  // Update jumlah
  const updateJumlah = (id: string, delta: number) => {
    setKeranjang(prev =>
      prev.map(item =>
        item.id === id ? { ...item, jumlah: Math.max(1, item.jumlah + delta) } : item
      )
    )
  }

  // Hapus item
  const hapusItem = (id: string) => {
    setKeranjang(prev => prev.filter(item => item.id !== id))
  }

  // Total hanya untuk yang dicentang
  const totalBayar = keranjang
    .filter(item => item.checked)
    .reduce((acc, item) => acc + item.harga * item.jumlah, 0)

  // Saat klik bayar, simpan keranjang yang dicentang ke localStorage
  const handleBayarSekarang = () => {
    const keranjangCheckout = keranjang.filter(item => item.checked)
    if (keranjangCheckout.length === 0) {
      alert("Silakan pilih menu terlebih dahulu")
      return
    }
    localStorage.setItem("keranjangCheckout", JSON.stringify(keranjangCheckout))
    router.push("/formpesanan")
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#7B1A36]">Keranjang</h1>

      {keranjang.length === 0 && <p>Keranjang kosong</p>}

      <div className="space-y-4">
        {keranjang.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded-xl"
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={item.checked}
              onChange={() => toggleChecked(item.id)}
            />

            {/* Gambar */}
            <div className="w-24 h-24 relative flex-shrink-0">
              <Image
                src={item.gambar || "/images/placeholder.png"}
                alt={item.nama}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Info menu */}
            <div className="flex-1">
              <h4 className="font-bold text-[#7B1A36]">{item.nama}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.deskripsi}</p>

              <div className="flex items-center gap-2 mt-1">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                  onClick={() => updateJumlah(item.id, -1)}
                >
                  -
                </button>
                <span className="font-semibold">{item.jumlah}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                  onClick={() => updateJumlah(item.id, 1)}
                >
                  +
                </button>
              </div>

              <p className="font-semibold mt-1">
                Rp {(item.harga * item.jumlah).toLocaleString()}
              </p>
            </div>

            {/* Hapus */}
            <button
              className="px-3 py-1 bg-red-600 text-white rounded-lg"
              onClick={() => hapusItem(item.id)}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <p className="text-right font-bold text-xl text-[#7B1A36]">
        Total Bayar: Rp {totalBayar.toLocaleString()}
      </p>

      {/* Tombol aksi */}
      <div className="flex gap-4">
        <Button className="bg-[#7B1A36] flex-1" onClick={() => router.push("/")}>
          Tambah Menu Lain
        </Button>
        <Button
          className="bg-[#2F6BFF] flex-1"
          onClick={handleBayarSekarang}
          disabled={totalBayar === 0}
        >
          Bayar Sekarang
        </Button>
      </div>
    </div>
  )
}
