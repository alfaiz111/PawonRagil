'use client'

import { useState, useEffect } from 'react'
import { kategoriAPI, menuAPI, pesananAPI, authAPI } from '@/lib/api'
import type { Kategori, Menu, Pesanan, User } from '@/lib/api'

// Hook untuk fetch kategori
export function useKategori() {
    const [kategoris, setKategoris] = useState<Kategori[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchKategoris()
    }, [])

    const fetchKategoris = async () => {
        try {
            setLoading(true)
            const data = await kategoriAPI.getAll()
            setKategoris(data)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
        } finally {
            setLoading(false)
        }
    }

    return { kategoris, loading, error, refetch: fetchKategoris }
}

// Hook untuk fetch menu
export function useMenu(kategoriId?: string) {
    const [menus, setMenus] = useState<Menu[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchMenus()
    }, [kategoriId])

    const fetchMenus = async () => {
        try {
            setLoading(true)
            const data = await menuAPI.getAll(kategoriId)
            setMenus(data)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
        } finally {
            setLoading(false)
        }
    }

    return { menus, loading, error, refetch: fetchMenus }
}

// Hook untuk fetch pesanan
export function usePesanan() {
    const [pesanans, setPesanans] = useState<Pesanan[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchPesanans()
    }, [])

    const fetchPesanans = async () => {
        try {
            setLoading(true)
            const data = await pesananAPI.getAll()
            setPesanans(data)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
        } finally {
            setLoading(false)
        }
    }

    return { pesanans, loading, error, refetch: fetchPesanans }
}

// Hook untuk authentication
export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const currentUser = await authAPI.getCurrentUser()
            setUser(currentUser)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        const result = await authAPI.login({ email, password })
        await checkAuth()
        return result
    }

    const register = async (email: string, password: string, nama: string) => {
        const result = await authAPI.register({ email, password, nama })
        return result
    }

    const logout = async () => {
        await authAPI.logout()
        setUser(null)
    }

    return { user, loading, login, register, logout, refetch: checkAuth }
}
