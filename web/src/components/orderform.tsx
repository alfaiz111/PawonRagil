"use client"

import { useState } from "react"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { pesananAPI, type PesananItem } from "@/lib/api"

interface OrderFormProps {
    open: boolean
    onClose: () => void
    initialItems?: PesananItem[]
}

export default function OrderForm({ open, onClose, initialItems = [] }: OrderFormProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        namaPelanggan: "",
        nomorMeja: "",
        catatan: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.namaPelanggan) {
            setError("Nama pelanggan harus diisi")
            return
        }

        if (initialItems.length === 0) {
            setError("Belum ada item yang dipilih")
            return
        }

        try {
            setLoading(true)
            setError(null)

            await pesananAPI.create({
                namaPelanggan: formData.namaPelanggan,
                nomorMeja: formData.nomorMeja,
                items: initialItems,
                catatan: formData.catatan,
            })

            // Reset form
            setFormData({
                namaPelanggan: "",
                nomorMeja: "",
                catatan: "",
            })

            alert("Pesanan berhasil dibuat!")
            onClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan")
        } finally {
            setLoading(false)
        }
    }

    const totalHarga = initialItems.reduce((sum, item) => sum + (item.harga * item.jumlah), 0)

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-[#7B1A36] mb-4">Buat Pesanan</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Order Items */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Item Pesanan
                            </label>
                            <div className="space-y-2">
                                {initialItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                        <div>
                                            <p className="font-medium">{item.nama}</p>
                                            <p className="text-sm text-gray-600">
                                                {item.jumlah} x Rp {item.harga.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <p className="font-bold text-[#2F6BFF]">
                                            Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 pt-3 border-t flex justify-between items-center">
                                <span className="font-bold">Total:</span>
                                <span className="text-xl font-bold text-[#7B1A36]">
                                    Rp {totalHarga.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        {/* Customer Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Pelanggan *
                            </label>
                            <Input
                                type="text"
                                value={formData.namaPelanggan}
                                onChange={(e) => setFormData({ ...formData, namaPelanggan: e.target.value })}
                                placeholder="Masukkan nama Anda"
                                required
                            />
                        </div>

                        {/* Table Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nomor Meja (Opsional)
                            </label>
                            <Input
                                type="text"
                                value={formData.nomorMeja}
                                onChange={(e) => setFormData({ ...formData, nomorMeja: e.target.value })}
                                placeholder="Contoh: 5"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Catatan (Opsional)
                            </label>
                            <Textarea
                                value={formData.catatan}
                                onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                                placeholder="Tambahkan catatan untuk pesanan Anda"
                                rows={3}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                onClick={onClose}
                                variant="outline"
                                className="flex-1"
                                disabled={loading}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-[#7B1A36] hover:bg-[#7B1A36]/90"
                                disabled={loading}
                            >
                                {loading ? "Memproses..." : "Buat Pesanan"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    )
}
