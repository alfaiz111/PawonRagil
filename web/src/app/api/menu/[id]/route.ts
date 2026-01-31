import { NextRequest, NextResponse } from "next/server"
import { getMenuById, updateMenuById, deleteMenuById } from "../../../data/menu"
import { getUserFromRequest, isAdmin } from "@/lib/auth"

// GET menu by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const menu = getMenuById(params.id)
    if (!menu)
      return NextResponse.json(
        { error: "Menu tidak ditemukan" },
        { status: 404 }
      )

    return NextResponse.json({ data: menu }, { status: 200 })
  } catch (err) {
    console.error("GET menu error:", err)
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}

// UPDATE menu by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(req)
    if (!user || !isAdmin(user))
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

    const body = await req.json()
    const updated = updateMenuById(params.id, body)
    if (!updated)
      return NextResponse.json(
        { error: "Menu tidak ditemukan" },
        { status: 404 }
      )

    return NextResponse.json(
      { message: "Menu berhasil diupdate", data: updated },
      { status: 200 }
    )
  } catch (err) {
    console.error("PUT menu error:", err)
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}

// DELETE menu by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(req)
    if (!user || !isAdmin(user))
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

    const deleted = deleteMenuById(params.id)
    if (!deleted)
      return NextResponse.json(
        { error: "Menu tidak ditemukan" },
        { status: 404 }
      )

    return NextResponse.json(
      { message: "Menu berhasil dihapus" },
      { status: 200 }
    )
  } catch (err) {
    console.error("DELETE menu error:", err)
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}
