// app/api/kategori/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getKategoris, addKategori } from "../../data/kategori"
import { getUserFromRequest, isAdmin } from "@/lib/auth"

export async function GET() {
  const data = getKategoris()
  return NextResponse.json({ data }, { status: 200 })
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user || !isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const body = await req.json()
  if (!body.nama) return NextResponse.json({ error: "Nama kategori harus diisi" }, { status: 400 })

  const newKategori = {
    id: crypto.randomUUID(),
    nama: body.nama,
    deskripsi: body.deskripsi || "",
    gambar: body.gambar || "",
    createdAt: new Date(),
  }

  addKategori(newKategori)
  return NextResponse.json({ message: "Kategori berhasil ditambahkan", data: newKategori }, { status: 201 })
}
