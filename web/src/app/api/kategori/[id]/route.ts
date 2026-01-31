// app/api/kategori/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getKategoris, setKategoris } from "../../../data/kategori"
import { getUserFromRequest, isAdmin } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const kategori = getKategoris().find(k => k.id === params.id)
  if (!kategori) return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 })
  return NextResponse.json({ data: kategori }, { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getUserFromRequest(req)
  if (!user || !isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const body = await req.json()
  const kategoris = getKategoris()
  const index = kategoris.findIndex(k => k.id === params.id)
  if (index === -1) return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 })

  kategoris[index] = {
    ...kategoris[index],
    nama: body.nama || kategoris[index].nama,
    deskripsi: body.deskripsi ?? kategoris[index].deskripsi,
    gambar: body.gambar ?? kategoris[index].gambar,
    updatedAt: new Date(),
  }

  setKategoris(kategoris)
  return NextResponse.json({ message: "Kategori berhasil diupdate", data: kategoris[index] }, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getUserFromRequest(req)
  if (!user || !isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const kategoris = getKategoris()
  const index = kategoris.findIndex(k => k.id === params.id)
  if (index === -1) return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 })

  kategoris.splice(index, 1)
  setKategoris(kategoris)
  return NextResponse.json({ message: "Kategori berhasil dihapus" }, { status: 200 })
}
