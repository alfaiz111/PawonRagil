'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')

    if (!email || !password) {
      setError('Email dan password harus diisi')
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login gagal')
        return
      }

      // Jika backend set cookie httpOnly JWT, tidak perlu simpan token di localStorage
      router.push('/admin/dashboard')
    } catch (err) {
      console.error(err)
      setError('Terjadi kesalahan saat login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF0F4]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-[#7B1A36] mb-6 text-center">
          Login Admin
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

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
          onClick={handleLogin}
          className="w-full bg-[#7B1A36] text-white py-2 rounded-md hover:opacity-90 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Belum punya akun admin?{' '}
          <span
            className="text-[#7B1A36] cursor-pointer hover:underline"
            onClick={() => router.push('/auth/register')}
          >
            Register admin
          </span>
        </p>
      </div>
    </div>
  )
}
