"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Pesanan = {
  nama: string
  menu: string
  status: "menunggu" | "diterima" | "ditolak"
}

export default function ManajemenPesananPage() {
  const [pesanan, setPesanan] = useState<Pesanan[]>([
    { nama: "Andi", menu: "Es Kopi", status: "menunggu" },
    { nama: "Budi", menu: "Nasi Goreng", status: "menunggu" },
  ])

  const updateStatus = (index: number, status: Pesanan["status"]) => {
    const data = [...pesanan]
    data[index].status = status
    setPesanan(data)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#7B1A36] mb-6">
        Manajemen Pesanan
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pesanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pesanan.map((item, i) => (
            <div
              key={i}
              className="border rounded-md p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.nama}</p>
                <p className="text-sm text-gray-500">{item.menu}</p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span className="font-medium capitalize">
                    {item.status}
                  </span>
                </p>
              </div>

              {item.status === "menunggu" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(i, "diterima")}
                    className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Konfirmasi
                  </button>
                  <button
                    onClick={() => updateStatus(i, "ditolak")}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Tolak
                  </button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
