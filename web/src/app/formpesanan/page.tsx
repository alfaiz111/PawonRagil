"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
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

export default function FormPesananPage() {
  const router = useRouter()
  const [keranjang, setKeranjang] = useState<MenuKeranjang[]>([])
  const [nama, setNama] = useState("")
  const [telp, setTelp] = useState("")
  const [metode, setMetode] = useState<"antar" | "ambil">("antar")
  const [loading, setLoading] = useState(false)

  // Load keranjang dari localStorage
  useEffect(() => {
    const data: MenuKeranjang[] = JSON.parse(localStorage.getItem("keranjang") || "[]")
    // Ambil hanya yang dicentang
    setKeranjang(data.filter(item => item.checked))
  }, [])

  const totalBayar = keranjang.reduce((acc, item) => acc + item.harga * item.jumlah, 0)

  const handlePesan = async () => {
    if (!nama || !telp) {
      alert("Nama dan nomor telepon wajib diisi!")
      return
    }

    const payload = {
      nama,
      telp,
      metode,
      total: totalBayar,
      menu: keranjang.map(item => ({
        id: item.id,
        nama: item.nama,
        jumlah: item.jumlah,
        harga: item.harga,
      })),
      pembayaran: "COD",
      tanggal: new Date().toISOString(),
    }

    try {
      setLoading(true)
      const res = await fetch("/api/pesanan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Gagal menyimpan pesanan")
      }

      alert("Pesanan berhasil dibuat!")
      // Kosongkan keranjang
      localStorage.removeItem("keranjang")
      router.push("/")
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan saat membuat pesanan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#7B1A36]">Form Pesanan</h1>

      {keranjang.length === 0 ? (
        <p>Keranjang kosong. Silakan pilih menu terlebih dahulu.</p>
      ) : (
        <>
          {/* Detail Pesanan */}
          <div className="space-y-4 border p-4 rounded-xl bg-white shadow-sm">
            <h2 className="font-bold text-lg text-[#7B1A36] mb-2">Detail Pesanan</h2>
            {keranjang.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-2 last:border-b-0">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src={item.gambar || "/images/placeholder.png"}
                    alt={item.nama}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#7B1A36]">{item.nama}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.jumlah} x Rp {item.harga.toLocaleString()} = Rp {(item.jumlah * item.harga).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            <p className="text-right font-bold text-lg mt-2">
              Total Bayar: Rp {totalBayar.toLocaleString()}
            </p>
          </div>

          {/* Form Pembeli */}
          <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-bold text-lg text-[#7B1A36]">Data Pembeli</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="border rounded-lg p-2 w-full"
                value={nama}
                onChange={e => setNama(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Nomor Telepon"
                className="border rounded-lg p-2 w-full"
                value={telp}
                onChange={e => setTelp(e.target.value)}
              />

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="metode"
                    value="antar"
                    checked={metode === "antar"}
                    onChange={() => setMetode("antar")}
                  />
                  Antar
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="metode"
                    value="ambil"
                    checked={metode === "ambil"}
                    onChange={() => setMetode("ambil")}
                  />
                  Ambil
                </label>
              </div>

              <p>Pembayaran: COD</p>

              <Button
                className="bg-[#2F6BFF] w-full"
                onClick={handlePesan}
                disabled={loading || keranjang.length === 0}
              >
                {loading ? "Memproses..." : "Pesan"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
