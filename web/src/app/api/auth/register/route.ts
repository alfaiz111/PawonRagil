import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

// Fungsi baca user dari file
function readUsers() {
  try {
    if (!fs.existsSync(usersFile)) return []
    const data = fs.readFileSync(usersFile, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Fungsi simpan user ke file
function saveUsers(users: any[]) {
  fs.mkdirSync(path.dirname(usersFile), { recursive: true })
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, nama, role } = await request.json()

    // Validasi input
    if (!email || !password || !nama) {
      return NextResponse.json(
        { error: 'Email, password, dan nama harus diisi' },
        { status: 400 }
      )
    }

    // Ambil semua user
    const users = readUsers()

    // Cek apakah user sudah ada
    if (users.find((u: { email: any }) => u.email === email)) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Buat user baru
    const newUser = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      nama,
      role: role || 'user',
      createdAt: new Date(),
    }

    // Simpan user baru
    users.push(newUser)
    saveUsers(users)

    // Return tanpa password
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(
      { message: 'Registrasi berhasil', user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    )
  }
}
