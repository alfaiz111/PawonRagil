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
}

export default function KeranjangPage() {
  const [keranjang, setKeranjang] = useState<MenuKeranjang[]>([])
  const router = useRouter()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("keranjang") || "[]")
    setKeranjang(data)
  }, [])

  const totalBayar = keranjang.reduce((acc, item) => acc + item.harga * item.jumlah, 0)

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#7B1A36]">Keranjang</h1>

      {keranjang.length === 0 && <p>Keranjang kosong</p>}

      <div className="space-y-4">
        {keranjang.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 border p-4 rounded-xl">
            <div className="w-24 h-24 relative flex-shrink-0">
              <Image
                src={item.gambar || "/images/placeholder.png"}
                alt={item.nama}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#7B1A36]">{item.nama}</h4>
              <p className="text-sm text-muted-foreground">{item.deskripsi}</p>
              <p className="font-semibold mt-1">
                Rp {item.harga.toLocaleString()} x {item.jumlah} = Rp {(item.harga * item.jumlah).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-right font-bold text-xl text-[#7B1A36]">
        Total Bayar: Rp {totalBayar.toLocaleString()}
      </p>

      <div className="flex gap-4">
        <Button className="bg-[#7B1A36] flex-1" onClick={() => router.push("/")}>
          Tambah Menu Lain
        </Button>
        <Button className="bg-[#2F6BFF] flex-1" onClick={() => router.push("/formpesanan")}>
          Bayar Sekarang
        </Button>
      </div>
    </div>
  )
}
