import { NextRequest, NextResponse } from 'next/server'
import { comparePassword, generateToken } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

// Fungsi baca user dari file JSON
function readUsers() {
  try {
    if (!fs.existsSync(usersFile)) return []
    const data = fs.readFileSync(usersFile, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      )
    }

    // Ambil semua user dari file
    const users = readUsers()

    // Cari user berdasarkan email
    const user = users.find((u: { email: any }) => u.email === email)
    if (!user) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      )
    }

    // Cek password
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      )
    }

    // Generate JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Set cookie httpOnly
    const response = NextResponse.json(
      {
        message: 'Login berhasil',
        user: {
          id: user.id,
          email: user.email,
          nama: user.nama,
          role: user.role,
        },
      },
      { status: 200 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: '/', // agar cookie tersedia di semua route
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    )
  }
}
