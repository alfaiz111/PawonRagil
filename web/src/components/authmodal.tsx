"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useApi"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AuthModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user, login, register, logout } = useAuth()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        nama: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            if (mode === 'login') {
                await login(formData.email, formData.password)
            } else {
                await register(formData.email, formData.password, formData.nama)
                // Auto login after register
                await login(formData.email, formData.password)
            }
            setIsOpen(false)
            setFormData({ email: "", password: "", nama: "" })
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan")
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
        } catch (err) {
            console.error("Logout error:", err)
        }
    }

    return (
        <>
            {/* Trigger Button */}
            {user ? (
                <div className="flex items-center gap-3">
                    <span className="text-white">Halo, {user.nama}</span>
                    <Button onClick={handleLogout} variant="outline" size="sm">
                        Logout
                    </Button>
                </div>
            ) : (
                <Button onClick={() => setIsOpen(true)} className="bg-[#7B1A36] hover:bg-[#7B1A36]/90">
                    Login / Register
                </Button>
            )}

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-[#7B1A36] mb-4">
                            {mode === 'login' ? 'Login' : 'Register'}
                        </h2>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'register' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Lengkap
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.nama}
                                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Masukkan password"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    variant="outline"
                                    className="flex-1"
                                    disabled={loading}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-[#7B1A36] hover:bg-[#7B1A36]/90"
                                    disabled={loading}
                                >
                                    {loading ? "Memproses..." : mode === 'login' ? 'Login' : 'Register'}
                                </Button>
                            </div>
                        </form>

                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode(mode === 'login' ? 'register' : 'login')
                                    setError(null)
                                }}
                                className="text-[#2F6BFF] hover:underline text-sm"
                            >
                                {mode === 'login'
                                    ? 'Belum punya akun? Register'
                                    : 'Sudah punya akun? Login'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
