'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nama, setNama] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setError('')

    if (!email || !password || !nama) {
      setError('Email, password, dan nama harus diisi')
      return
    }

    setLoading(true)
    try {
      // Panggil API register
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nama, role: 'admin' }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registrasi gagal')
        setLoading(false)
        return
      }

      // Setelah register berhasil, otomatis login
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!loginRes.ok) {
        const loginData = await loginRes.json()
        setError(loginData.error || 'Login gagal setelah registrasi')
        setLoading(false)
        return
      }

      // Redirect ke dashboard admin
      router.push('/admin/dashboard')
    } catch (err) {
      console.error(err)
      setError('Terjadi kesalahan saat registrasi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF0F4]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-[#7B1A36] mb-6 text-center">
          Register Admin
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B1A36]"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B1A36]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B1A36]"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-[#7B1A36] text-white py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Mendaftarkan...' : 'Register'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Sudah punya akun?{' '}
          <span
            className="text-[#7B1A36] cursor-pointer hover:underline"
            onClick={() => router.push('/auth/login')}
          >
            Login di sini
          </span>
        </p>
      </div>
    </div>
  )
}
