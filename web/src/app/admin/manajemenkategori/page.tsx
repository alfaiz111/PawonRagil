"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Kategori = {
  id: string
  nama: string
  deskripsi: string
  gambar: string
}

export default function ManajemenKategoriPage() {
  const [kategori, setKategori] = useState<Kategori[]>([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ nama: "", deskripsi: "", gambar: "" })
  const [loading, setLoading] = useState(false)

  // === Fetch semua kategori ===
  const fetchKategoris = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/kategori")
      const data = await res.json()
      // Pastikan data.data adalah array dan unik
      if (Array.isArray(data.data)) setKategori(data.data)
      else setKategori([])
    } catch (err) {
      console.error("Fetch kategori error:", err)
      setKategori([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKategoris()
  }, [])

  // === Reset form ===
  const resetForm = () => {
    setForm({ nama: "", deskripsi: "", gambar: "" })
    setEditId(null)
  }

  // === Simpan kategori (POST / PUT) ===
  const simpanKategori = async () => {
    if (!form.nama) {
      alert("Nama kategori harus diisi")
      return
    }

    try {
      let res
      if (editId) {
        // UPDATE
        res = await fetch(`/api/kategori/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      } else {
        // CREATE
        res = await fetch("/api/kategori", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      }

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan")

      // Refresh list kategori
      fetchKategoris()
      resetForm()
      setOpen(false)
    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  // === Hapus kategori ===
  const hapusKategori = async (id: string) => {
    if (!confirm("Apakah yakin ingin menghapus kategori ini?")) return

    try {
      const res = await fetch(`/api/kategori/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan")
      fetchKategoris()
    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  // === Buka edit form ===
  const bukaEdit = (item: Kategori) => {
    setForm({ nama: item.nama, deskripsi: item.deskripsi, gambar: item.gambar })
    setEditId(item.id)
    setOpen(true)
  }

  // === Handle upload gambar (base64) ===
  const handleUpload = (file?: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () =>
      setForm({ ...form, gambar: reader.result as string })
    reader.readAsDataURL(file)
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#7B1A36]">Manajemen Kategori</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#7B1A36]" onClick={resetForm}>
              + Tambah Kategori
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files?.[0])}
              />
              {form.gambar ? (
                <img
                  src={form.gambar}
                  className="h-32 w-full object-cover rounded-md"
                  alt="Preview"
                />
              ) : null}

              <Input
                placeholder="Nama kategori"
                value={form.nama}
                onChange={(e) =>
                  setForm({ ...form, nama: e.target.value })
                }
              />
              <Textarea
                placeholder="Deskripsi kategori"
                value={form.deskripsi}
                onChange={(e) =>
                  setForm({ ...form, deskripsi: e.target.value })
                }
              />

              <Button onClick={simpanKategori} className="w-full bg-[#7B1A36]">
                {editId ? "Update Kategori" : "Simpan Kategori"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* LIST KATEGORI */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kategori.length === 0 && (
            <p className="text-sm text-muted-foreground">Belum ada kategori</p>
          )}

          {kategori.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                {item.gambar ? (
                  <Image
                    src={item.gambar}
                    alt={item.nama}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                    Tidak ada gambar
                  </div>
                )}
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{item.nama}</h3>
                <p className="text-sm text-muted-foreground">{item.deskripsi}</p>
                <div className="flex gap-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => bukaEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => hapusKategori(item.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
