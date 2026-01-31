"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  menu: { id: string; nama: string; harga: number }
}

export default function PesananActions({ menu }: Props) {
  const router = useRouter()
  const [jumlah, setJumlah] = useState(1)
  const totalHarga = menu.harga * jumlah

  const tambahMenuLain = () => {
    const keranjang = JSON.parse(localStorage.getItem("keranjang") || "[]")
    keranjang.push({ ...menu, jumlah })
    localStorage.setItem("keranjang", JSON.stringify(keranjang))
    router.push("/#kategori")
  }

  const bayarSekarang = () => {
    const keranjang = JSON.parse(localStorage.getItem("keranjang") || "[]")
    keranjang.push({ ...menu, jumlah })
    localStorage.setItem("keranjang", JSON.stringify(keranjang))
    router.push("/formpesanan")
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-lg" onClick={() => setJumlah(j => Math.max(1, j-1))}>-</button>
        <span className="text-lg font-semibold">{jumlah}</span>
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-lg" onClick={() => setJumlah(j => j+1)}>+</button>
        <p className="ml-auto font-semibold text-[#7B1A36]">Total: Rp {totalHarga.toLocaleString()}</p>
      </div>
      <button className="w-full md:w-1/2 bg-[#2F6BFF] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition" onClick={tambahMenuLain}>Tambah Menu Lain</button>
      <button className="w-full md:w-1/2 bg-[#7B1A36] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition" onClick={bayarSekarang}>Bayar Sekarang</button>
    </div>
  )
}
