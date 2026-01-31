// app/pesanan/[id]/page.tsx
import Image from "next/image"
import PesananActions from "./PesananAction"
import { getMenuById } from "../../data/menu"

type Props = {
  params: { id: string }
}

export default async function PesananPage({ params }: Props) {
  const menu = await getMenuById(params.id) // ✅ bisa langsung await

  if (!menu) {
    return <p className="p-8 text-red-600 text-center">Menu tidak ditemukan</p>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-extrabold text-[#7B1A36] mb-8">
          Pesan Menu
        </h2>

        <div className="border rounded-xl p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 h-56 relative">
            <Image
              src={menu.gambar || "/images/placeholder.png"}
              alt={menu.nama}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#7B1A36]">{menu.nama}</h3>
              <p className="text-sm text-muted-foreground mt-2">{menu.deskripsi}</p>
              <p className="font-semibold text-[#7B1A36] mt-4 text-lg">
                Rp {menu.harga.toLocaleString()}
              </p>
            </div>

            {/* Interaksi user */}
            <PesananActions menu={menu} />
          </div>
        </div>
      </div>
    </section>
  )
}
