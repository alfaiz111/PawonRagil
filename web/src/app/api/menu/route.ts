import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest, isAdmin } from '@/lib/auth'

// In-memory menu storage (temporary)
const menus: any[] = [
    {
        id: '1',
        nama: 'Nasi Goreng',
        deskripsi: 'Nasi goreng spesial dengan telur',
        harga: 15000,
        gambar: '/images/nasi-goreng.jpg',
        tersedia: true,
        kategoriId: '1',
        createdAt: new Date(),
    },
    {
        id: '2',
        nama: 'Es Teh Manis',
        deskripsi: 'Teh manis dingin segar',
        harga: 5000,
        gambar: '/images/es-teh.jpg',
        tersedia: true,
        kategoriId: '2',
        createdAt: new Date(),
    },
]

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const kategoriId = searchParams.get('kategoriId')

        let filteredMenus = menus

        if (kategoriId) {
            filteredMenus = menus.filter(m => m.kategoriId === kategoriId)
        }

        return NextResponse.json({ data: filteredMenus }, { status: 200 })
    } catch (error) {
        console.error('Get menus error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = getUserFromRequest(request)

        if (!user || !isAdmin(user)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            )
        }

        const body = await request.json()
        const { nama, deskripsi, harga, gambar, kategoriId, tersedia } = body

        if (!nama || !harga || !kategoriId) {
            return NextResponse.json(
                { error: 'Nama, harga, dan kategori harus diisi' },
                { status: 400 }
            )
        }

        const newMenu = {
            id: crypto.randomUUID(),
            nama,
            deskripsi: deskripsi || '',
            harga: parseInt(harga),
            gambar: gambar || '',
            kategoriId,
            tersedia: tersedia !== undefined ? tersedia : true,
            createdAt: new Date(),
        }

        menus.push(newMenu)

        return NextResponse.json(
            { message: 'Menu berhasil ditambahkan', data: newMenu },
            { status: 201 }
        )
    } catch (error) {
        console.error('Create menu error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan' },
            { status: 500 }
        )
    }
}

export { menus }
