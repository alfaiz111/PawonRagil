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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type Menu = {
  id: string
  nama: string
  deskripsi: string
  harga: number
  gambar: string
  kategoriId: string
}

type Kategori = {
  id: string
  nama: string
}

export default function ManajemenMenuPage() {
  const [menu, setMenu] = useState<Menu[]>([])
  const [kategori, setKategori] = useState<Kategori[]>([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    harga: 0,
    gambar: "",
    kategoriId: "",
  })
  const [loading, setLoading] = useState(false)

  // === Fetch menu ===
  const fetchMenu = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/menu")
      const data = await res.json()
      setMenu(Array.isArray(data.data) ? data.data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // === Fetch kategori untuk select ===
  const fetchKategori = async () => {
    try {
      const res = await fetch("/api/kategori")
      const data = await res.json()
      setKategori(Array.isArray(data.data) ? data.data : [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchMenu()
    fetchKategori()
  }, [])

  const resetForm = () => {
    setForm({ nama: "", deskripsi: "", harga: 0, gambar: "", kategoriId: "" })
    setEditId(null)
  }

  // === Upload gambar base64 ===
  const handleUpload = (file?: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm({ ...form, gambar: reader.result as string })
    reader.readAsDataURL(file)
  }

  // === Simpan menu ===
  const simpanMenu = async () => {
    if (!form.nama || !form.harga || !form.kategoriId) {
      alert("Nama, harga, dan kategori harus diisi")
      return
    }

    try {
      let res
      if (editId) {
        res = await fetch(`/api/menu/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      } else {
        res = await fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      }

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan")

      fetchMenu()
      resetForm()
      setOpen(false)
    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  // === Hapus menu ===
  const hapusMenu = async (id: string) => {
    if (!confirm("Apakah yakin ingin menghapus menu ini?")) return
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan")
      fetchMenu()
    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  // === Edit menu ===
  const bukaEdit = (item: Menu) => {
    setForm({
      nama: item.nama,
      deskripsi: item.deskripsi,
      harga: item.harga,
      gambar: item.gambar,
      kategoriId: item.kategoriId,
    })
    setEditId(item.id)
    setOpen(true)
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#7B1A36]">Manajemen Menu</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#7B1A36]" onClick={resetForm}>
              + Tambah Menu
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Menu" : "Tambah Menu"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files?.[0])}
              />
              {form.gambar && (
                <img
                  src={form.gambar}
                  className="h-32 w-full object-cover rounded-md"
                  alt="Preview"
                />
              )}

              <Input
                placeholder="Nama menu"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
              <Textarea
                placeholder="Deskripsi menu"
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              />

              <Select
                value={form.kategoriId}
                onValueChange={(val) => setForm({ ...form, kategoriId: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {kategori.map((k) => (
                    <SelectItem key={k.id} value={k.id}>
                      {k.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Harga"
                value={form.harga}
                onChange={(e) => setForm({ ...form, harga: Number(e.target.value) })}
              />

              <Button onClick={simpanMenu} className="w-full bg-[#7B1A36]">
                {editId ? "Update Menu" : "Simpan Menu"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.length === 0 && <p className="text-sm text-muted-foreground">Belum ada menu</p>}

          {menu.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                {item.gambar ? (
                  <Image src={item.gambar} alt={item.nama} fill className="object-cover" />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                    Tidak ada gambar
                  </div>
                )}
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{item.nama}</h3>
                <p className="text-sm text-muted-foreground">{item.deskripsi}</p>
                <p className="font-medium text-[#7B1A36]">Rp {item.harga.toLocaleString()}</p>
                <div className="flex gap-2 pt-3">
                  <Button variant="outline" size="sm" onClick={() => bukaEdit(item)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => hapusMenu(item.id)}>
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
