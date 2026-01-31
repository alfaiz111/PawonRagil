"use client"

import { useState } from "react"
import Image from "next/image"
import { useMenu } from "@/hooks/useApi"

export default function MenuList() {
    const [selectedKategori, setSelectedKategori] = useState<string | undefined>(undefined)
    const { menus, loading, error } = useMenu(selectedKategori)

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center">
                        <p className="text-[#7B1A36]">Memuat menu...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center">
                        <p className="text-red-600">Error: {error}</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-extrabold text-[#7B1A36] mb-3">
                        Menu Populer
                    </h2>
                    <p className="text-[#7B1A36]/80 max-w-xl mx-auto">
                        Pilihan menu terbaik dan terpopuler dari Pawon Ragil
                    </p>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menus.map((menu) => (
                        <div
                            key={menu.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-pink-100">
                                <Image
                                    src={menu.gambar || "/images/placeholder.png"}
                                    alt={menu.nama}
                                    fill
                                    className="object-cover"
                                />
                                {!menu.tersedia && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white font-bold">Tidak Tersedia</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#7B1A36] mb-2">
                                    {menu.nama}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {menu.deskripsi || "Menu lezat dari Pawon Ragil"}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-[#2F6BFF]">
                                        Rp {menu.harga.toLocaleString('id-ID')}
                                    </span>
                                    <button
                                        disabled={!menu.tersedia}
                                        className={`
                      px-4 py-2 rounded-lg font-semibold transition
                      ${menu.tersedia
                                                ? 'bg-[#7B1A36] text-white hover:bg-[#7B1A36]/90'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }
                    `}
                                    >
                                        Pesan
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {menus.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada menu tersedia</p>
                    </div>
                )}
            </div>
        </section>
    )
}
