"use client"

import Image from "next/image"
import Link from "next/link"
import AuthModal from "./authmodal"

const navItems = [
  { name: "Beranda", href: "#beranda" },
  { name: "Daftar Menu", href: "#kategori" },
  { name: "Kontak", href: "#kontak" },
]

export default function Navbar() {
  return (
    <header className="w-full bg-[#7B1A36] sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="#beranda" className="flex items-center gap-3">
          <Image
            src="/images/1.png"
            alt="Pawon Ragil"
            width={42}
            height={42}
            priority
          />
          <span className="text-white font-extrabold text-lg tracking-wide">
            PAWON RAGIL
          </span>
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-white text-sm font-medium transition hover:opacity-80"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth */}
        <AuthModal />

      </nav>
    </header>
  )
}
