"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Kontak", href: "/kontak" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#7b1a36]/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/PAWON.png"
            alt="Pawon Logo"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "relative text-sm font-medium text-white/80 transition-all duration-300 hover:text-white",
                  active && "text-white"
                )}
              >
                {item.name}

                {/* underline animation */}
                <span
                  className={clsx(
                    "absolute -bottom-2 left-0 h-[2px] w-full bg-white transition-all duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            )
          })}
        </nav>

        {/* LOGIN BUTTON */}
        <Button
          variant="ghost"
          className="
            rounded-full 
            border border-white/20 
            px-6 
            text-sm 
            font-medium 
            text-white 
            backdrop-blur 
            transition-all 
            duration-300 
            hover:bg-white 
            hover:text-[#7b1a36]
          "
        >
          Login
        </Button>
      </div>
    </header>
  )
}
