"use client"

import Image from "next/image"
import { Phone, MapPin, MessageCircle } from "lucide-react"

export default function KontakKami() {
  return (
    <section
      id="kontak"
      className="relative py-20 bg-[#F9AABB]"
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('images/patternmaps.png')",
          backgroundRepeat: "repeat",
          opacity: 0.15,
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-black mb-3">
            Kontak Kami
          </h2>
          <p className="text-black/90 max-w-xl mx-auto">
            Hubungi kami untuk informasi, pemesanan, atau pertanyaan lainnya.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="https://wa.me/6287814656714"
            target="_blank"
            className="
              flex items-center gap-2
              bg-white
              text-[#7B1A36]
              px-6 py-2.5
              rounded-full
              font-medium
              shadow
              hover:scale-105
              transition
            "
          >
            <MessageCircle size={18} />
            Chat Whatsapp
          </a>

          <a
            href="tel:087814656714"
            className="
              flex items-center gap-2
              bg-white
              text-[#7B1A36]
              px-6 py-2.5
              rounded-full
              font-medium
              shadow
              hover:scale-105
              transition
            "
          >
            <Phone size={18} />
            Telpon
          </a>

          <a
            href="https://maps.app.goo.gl/z6Y4F7ooXVqMesfo6"
            target="_blank"
            className="
              flex items-center gap-2
              bg-white
              text-[#7B1A36]
              px-6 py-2.5
              rounded-full
              font-medium
              shadow
              hover:scale-105
              transition
            "
          >
            <MapPin size={18} />
            Maps
          </a>
        </div>

        {/* Maps */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg border border-white/40">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1988.123456789!2d104.4684405!3d-5.1242215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1675112345678!5m2!1sen!2sid"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
