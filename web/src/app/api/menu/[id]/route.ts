import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest, isAdmin } from '@/lib/auth'

// Import menus from main route (temporary)
let menus: any[] = []

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const menu = menus.find(m => m.id === id)

        if (!menu) {
            return NextResponse.json(
                { error: 'Menu tidak ditemukan' },
                { status: 404 }
            )
        }

        return NextResponse.json({ data: menu }, { status: 200 })
    } catch (error) {
        console.error('Get menu error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = getUserFromRequest(request)

        if (!user || !isAdmin(user)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            )
        }

        const { id } = await params
        const body = await request.json()
        const { nama, deskripsi, harga, gambar, kategoriId, tersedia } = body

        const menuIndex = menus.findIndex(m => m.id === id)

        if (menuIndex === -1) {
            return NextResponse.json(
                { error: 'Menu tidak ditemukan' },
                { status: 404 }
            )
        }

        menus[menuIndex] = {
            ...menus[menuIndex],
            nama: nama || menus[menuIndex].nama,
            deskripsi: deskripsi !== undefined ? deskripsi : menus[menuIndex].deskripsi,
            harga: harga !== undefined ? parseInt(harga) : menus[menuIndex].harga,
            gambar: gambar !== undefined ? gambar : menus[menuIndex].gambar,
            kategoriId: kategoriId || menus[menuIndex].kategoriId,
            tersedia: tersedia !== undefined ? tersedia : menus[menuIndex].tersedia,
            updatedAt: new Date(),
        }

        return NextResponse.json(
            { message: 'Menu berhasil diupdate', data: menus[menuIndex] },
            { status: 200 }
        )
    } catch (error) {
        console.error('Update menu error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = getUserFromRequest(request)

        if (!user || !isAdmin(user)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            )
        }

        const { id } = await params
        const menuIndex = menus.findIndex(m => m.id === id)

        if (menuIndex === -1) {
            return NextResponse.json(
                { error: 'Menu tidak ditemukan' },
                { status: 404 }
            )
        }

        menus.splice(menuIndex, 1)

        return NextResponse.json(
            { message: 'Menu berhasil dihapus' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Delete menu error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan' },
            { status: 500 }
        )
    }
}
