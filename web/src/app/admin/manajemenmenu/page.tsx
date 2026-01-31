"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Menu = {
  nama: string
  deskripsi: string
  kategori: string
  harga: number
  gambar?: string
}

export default function ManajemenMenuPage() {
  const [menu, setMenu] = useState<Menu[]>([])
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const [form, setForm] = useState<Menu>({
    nama: "",
    deskripsi: "",
    kategori: "",
    harga: 0,
    gambar: "",
  })

  const resetForm = () => {
    setForm({
      nama: "",
      deskripsi: "",
      kategori: "",
      harga: 0,
      gambar: "",
    })
    setEditIndex(null)
  }

  const simpanMenu = () => {
    if (editIndex !== null) {
      // EDIT
      const updated = [...menu]
      updated[editIndex] = form
      setMenu(updated)
    } else {
      // TAMBAH
      setMenu([...menu, form])
    }

    resetForm()
    setOpen(false)
  }

  const hapusMenu = (index: number) => {
    setMenu(menu.filter((_, i) => i !== index))
  }

  const bukaEdit = (item: Menu, index: number) => {
    setForm(item)
    setEditIndex(index)
    setOpen(true)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#7B1A36]">
          Manajemen Menu
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[#7B1A36] text-white"
              onClick={resetForm}
            >
              + Tambah Menu
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editIndex !== null ? "Edit Menu" : "Tambah Menu"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* GAMBAR */}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () =>
                    setForm({ ...form, gambar: reader.result as string })
                  reader.readAsDataURL(file)
                }}
              />

              {form.gambar && (
                <img
                  src={form.gambar}
                  className="h-32 w-full object-cover rounded-md"
                />
              )}

              <Input
                placeholder="Nama menu"
                value={form.nama}
                onChange={(e) =>
                  setForm({ ...form, nama: e.target.value })
                }
              />

              <Textarea
                placeholder="Deskripsi"
                value={form.deskripsi}
                onChange={(e) =>
                  setForm({ ...form, deskripsi: e.target.value })
                }
              />

              <Select
                value={form.kategori}
                onValueChange={(value) =>
                  setForm({ ...form, kategori: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Minuman">Minuman</SelectItem>
                  <SelectItem value="Makanan">Makanan</SelectItem>
                  <SelectItem value="Snack">Snack</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Harga"
                value={form.harga}
                onChange={(e) =>
                  setForm({ ...form, harga: Number(e.target.value) })
                }
              />

              <Button
                onClick={simpanMenu}
                className="w-full bg-[#7B1A36] text-white"
              >
                {editIndex !== null ? "Update Menu" : "Simpan Menu"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* LIST MENU */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Menu</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {menu.length === 0 && (
            <p className="text-sm text-gray-500">
              Belum ada menu
            </p>
          )}

          {menu.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border rounded-lg p-4"
            >
              {item.gambar && (
                <img
                  src={item.gambar}
                  className="h-16 w-16 rounded-md object-cover"
                />
              )}

              <div className="flex-1">
                <p className="font-semibold">{item.nama}</p>
                <p className="text-sm text-gray-500">
                  {item.deskripsi}
                </p>
                <p className="text-xs text-gray-400">
                  {item.kategori}
                </p>
                <p className="font-medium text-[#7B1A36]">
                  Rp {item.harga.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => bukaEdit(item, i)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => hapusMenu(i)}
                >
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
