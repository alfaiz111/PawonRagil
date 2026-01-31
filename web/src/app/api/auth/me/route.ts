import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
    try {
        const user = getUserFromRequest(request)

        if (!user) {
            return NextResponse.json(
                { error: 'Tidak terautentikasi' },
                { status: 401 }
            )
        }

        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan' },
            { status: 500 }
        )
    }
}
