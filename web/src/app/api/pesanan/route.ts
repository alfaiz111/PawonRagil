import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest, isAdmin } from '@/lib/auth'

// In-memory pesanan storage (temporary)
const pesanans: any[] = []

export async function GET(request: NextRequest) {
    try {
        const user = getUserFromRequest(request)

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        let filteredPesanans = pesanans

        // If not admin, only show user's own orders
        if (!isAdmin(user)) {
            filteredPesanans = pesanans.filter(p => p.userId === user.userId)
        }

        return NextResponse.json({ data: filteredPesanans }, { status: 200 })
    } catch (error) {
        console.error('Get pesanans error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = getUserFromRequest(request)

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { namaPelanggan, nomorMeja, items, catatan } = body

        if (!namaPelanggan || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'Nama pelanggan dan items harus diisi' },
                { status: 400 }
            )
        }

        // Calculate total
        const totalHarga = items.reduce((sum: number, item: any) => {
            return sum + (item.harga * item.jumlah)
        }, 0)

        const newPesanan = {
            id: crypto.randomUUID(),
            userId: user.userId,
            namaPelanggan,
            nomorMeja: nomorMeja || '',
            totalHarga,
            status: 'pending',
            catatan: catatan || '',
            items: items.map((item: any) => ({
                id: crypto.randomUUID(),
                menuId: item.menuId,
                nama: item.nama,
                jumlah: item.jumlah,
                harga: item.harga,
            })),
            createdAt: new Date(),
        }

        pesanans.push(newPesanan)

        return NextResponse.json(
            { message: 'Pesanan berhasil dibuat', data: newPesanan },
            { status: 201 }
        )
    } catch (error) {
        console.error('Create pesanan error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan' },
            { status: 500 }
        )
    }
}

export { pesanans }
