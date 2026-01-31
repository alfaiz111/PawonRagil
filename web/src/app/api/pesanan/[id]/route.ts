import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest, isAdmin } from '@/lib/auth'

// Import pesanans from main route (temporary)
let pesanans: any[] = []

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = getUserFromRequest(request)

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { id } = await params
        const pesanan = pesanans.find(p => p.id === id)

        if (!pesanan) {
            return NextResponse.json(
                { error: 'Pesanan tidak ditemukan' },
                { status: 404 }
            )
        }

        // Check authorization
        if (!isAdmin(user) && pesanan.userId !== user.userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            )
        }

        return NextResponse.json({ data: pesanan }, { status: 200 })
    } catch (error) {
        console.error('Get pesanan error:', error)
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
        const { status } = body

        const pesananIndex = pesanans.findIndex(p => p.id === id)

        if (pesananIndex === -1) {
            return NextResponse.json(
                { error: 'Pesanan tidak ditemukan' },
                { status: 404 }
            )
        }

        if (status) {
            pesanans[pesananIndex].status = status
            pesanans[pesananIndex].updatedAt = new Date()
        }

        return NextResponse.json(
            { message: 'Pesanan berhasil diupdate', data: pesanans[pesananIndex] },
            { status: 200 }
        )
    } catch (error) {
        console.error('Update pesanan error:', error)
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

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { id } = await params
        const pesananIndex = pesanans.findIndex(p => p.id === id)

        if (pesananIndex === -1) {
            return NextResponse.json(
                { error: 'Pesanan tidak ditemukan' },
                { status: 404 }
            )
        }

        // Check authorization
        if (!isAdmin(user) && pesanans[pesananIndex].userId !== user.userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            )
        }

        pesanans.splice(pesananIndex, 1)

        return NextResponse.json(
            { message: 'Pesanan berhasil dibatalkan' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Delete pesanan error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan' },
            { status: 500 }
        )
    }
}
