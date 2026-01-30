"use client"

import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#7B1A36] py-8 text-white">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6">
        {/* Gambar sejajar */}
        <div className="flex items-center gap-10">
          <Image src="/images/1.png" alt="Logo 1" width={80} height={80} />
          <Image src="/images/ezz.png" alt="Logo 2" width={80} height={80} />
        </div>

        {/* Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Pawon Ragil. All rights reserved.</p>
      </div>
    </footer>
  )
}
