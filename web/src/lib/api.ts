// API Base URL
const API_BASE_URL = '/api'

// Types
export interface Kategori {
    id: string
    nama: string
    deskripsi?: string
    gambar?: string
    createdAt?: Date
}

export interface Menu {
    id: string
    nama: string
    deskripsi?: string
    harga: number
    gambar?: string
    tersedia: boolean
    kategoriId: string
    createdAt?: Date
}

export interface PesananItem {
    id?: string
    menuId: string
    nama: string
    jumlah: number
    harga: number
}

export interface Pesanan {
    id: string
    userId: string
    namaPelanggan: string
    nomorMeja?: string
    totalHarga: number
    status: 'pending' | 'diproses' | 'selesai' | 'dibatalkan'
    catatan?: string
    items: PesananItem[]
    createdAt?: Date
}

export interface User {
    id: string
    email: string
    nama: string
    role: string
}

// Kategori API
export const kategoriAPI = {
    getAll: async (): Promise<Kategori[]> => {
        const res = await fetch(`${API_BASE_URL}/kategori`)
        const data = await res.json()
        return data.data
    },

    getById: async (id: string): Promise<Kategori> => {
        const res = await fetch(`${API_BASE_URL}/kategori/${id}`)
        const data = await res.json()
        return data.data
    },

    create: async (kategori: Partial<Kategori>): Promise<Kategori> => {
        const res = await fetch(`${API_BASE_URL}/kategori`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(kategori),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.data
    },

    update: async (id: string, kategori: Partial<Kategori>): Promise<Kategori> => {
        const res = await fetch(`${API_BASE_URL}/kategori/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(kategori),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.data
    },

    delete: async (id: string): Promise<void> => {
        const res = await fetch(`${API_BASE_URL}/kategori/${id}`, {
            method: 'DELETE',
        })
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)
        }
    },
}

// Menu API
export const menuAPI = {
    getAll: async (kategoriId?: string): Promise<Menu[]> => {
        const url = kategoriId
            ? `${API_BASE_URL}/menu?kategoriId=${kategoriId}`
            : `${API_BASE_URL}/menu`
        const res = await fetch(url)
        const data = await res.json()
        return data.data
    },

    getById: async (id: string): Promise<Menu> => {
        const res = await fetch(`${API_BASE_URL}/menu/${id}`)
        const data = await res.json()
        return data.data
    },

    create: async (menu: Partial<Menu>): Promise<Menu> => {
        const res = await fetch(`${API_BASE_URL}/menu`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(menu),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.data
    },

    update: async (id: string, menu: Partial<Menu>): Promise<Menu> => {
        const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(menu),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.data
    },

    delete: async (id: string): Promise<void> => {
        const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
            method: 'DELETE',
        })
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)
        }
    },
}

// Pesanan API
export const pesananAPI = {
    getAll: async (): Promise<Pesanan[]> => {
        const res = await fetch(`${API_BASE_URL}/pesanan`)
        const data = await res.json()
        return data.data
    },

    getById: async (id: string): Promise<Pesanan> => {
        const res = await fetch(`${API_BASE_URL}/pesanan/${id}`)
        const data = await res.json()
        return data.data
    },

    create: async (pesanan: {
        namaPelanggan: string
        nomorMeja?: string
        items: PesananItem[]
        catatan?: string
    }): Promise<Pesanan> => {
        const res = await fetch(`${API_BASE_URL}/pesanan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pesanan),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.data
    },

    updateStatus: async (id: string, status: string): Promise<Pesanan> => {
        const res = await fetch(`${API_BASE_URL}/pesanan/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        return data.data
    },

    cancel: async (id: string): Promise<void> => {
        const res = await fetch(`${API_BASE_URL}/pesanan/${id}`, {
            method: 'DELETE',
        })
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error)
        }
    },
}

// Auth API
export const authAPI = {
    register: async (data: { email: string; password: string; nama: string }) => {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        const result = await res.json()
        if (!res.ok) throw new Error(result.error)
        return result
    },

    login: async (data: { email: string; password: string }) => {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        const result = await res.json()
        if (!res.ok) throw new Error(result.error)
        return result
    },

    logout: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
        })
        const result = await res.json()
        if (!res.ok) throw new Error(result.error)
        return result
    },

    getCurrentUser: async (): Promise<User | null> => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/me`)
            if (!res.ok) return null
            const data = await res.json()
            return data.user
        } catch {
            return null
        }
    },
}
