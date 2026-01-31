import { NextRequest, NextResponse } from "next/server"
import { getMenu, addMenu } from "../../data/menu"
import { getUserFromRequest, isAdmin } from "@/lib/auth"

// GET semua menu
export async function GET() {
  const data = getMenu()
  return NextResponse.json({ data }, { status: 200 })
}

// POST menu baru
export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user || !isAdmin(user))
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const body = await req.json()
  if (!body.nama || !body.harga || !body.kategoriId)
    return NextResponse.json(
      { error: "Nama, harga, kategori harus diisi" },
      { status: 400 }
    )

  const newMenu = {
    id: crypto.randomUUID(),
    nama: body.nama,
    deskripsi: body.deskripsi || "",
    harga: Number(body.harga),
    gambar: body.gambar || "",
    kategoriId: body.kategoriId,
    createdAt: new Date(),
  }

  addMenu(newMenu)
  return NextResponse.json(
    { message: "Menu berhasil ditambahkan", data: newMenu },
    { status: 201 }
  )
}
