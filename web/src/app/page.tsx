"use client";

import dynamic from "next/dynamic";
import LandingPage from "../components/landing";
import Kategori from "../components/kategori";
import Kontak from "../components/kontak";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function Home() {
  return (
    <div className="relative bg-black">
      <main>
        <Navbar />
        <LandingPage />
        <Kategori />
        {/* <MenuList /> */}
        <Kontak />
        <Footer />
      </main>
    </div>
  );
}