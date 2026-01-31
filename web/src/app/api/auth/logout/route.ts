import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json(
        { message: 'Logout berhasil' },
        { status: 200 }
    )

    // Clear token cookie
    response.cookies.delete('token')

    return response
}
