'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, LogIn } from "lucide-react"
import { useEffect, useState } from "react"

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Manajemen Kategori", href: "/admin/manajemenkategori" },
  { label: "Manajemen Menu", href: "/admin/manajemenmenu" },
  { label: "Manajemen Pesanan", href: "/admin/manajemenpesanan" },
]

interface User {
  id: string
  email: string
  nama: string
  role: string
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("../auth/login")
    } catch (err) {
      console.error("Logout error:", err)
      router.push("../auth/login")
    }
  }

  const handleLogin = () => {
    router.push("../auth/login")
  }

  return (
    <aside className="w-64 bg-[#7B1A36] text-white flex flex-col px-6 py-8">
      <h1 className="text-xl font-bold mb-10 tracking-wide">
        Admin Pawon Ragil
      </h1>

      <nav className="flex flex-col gap-2 text-sm mb-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-4 py-2 rounded-md transition
                ${isActive
                  ? "bg-white text-[#7B1A36] font-semibold"
                  : "text-white/80 hover:bg-white/20 hover:text-white"
                }
              `}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* LOGIN / LOGOUT */}
      {!loading && (
        <button
          className="mt-auto flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
          onClick={user ? handleLogout : handleLogin}
        >
          {user ? <LogOut size={16} /> : <LogIn size={16} />}
          {user ? "Logout" : "Login"}
        </button>
      )}
    </aside>
  )
}
