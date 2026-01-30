"use client";

import dynamic from "next/dynamic";
import LandingPage from "../components/landing";
import Kategori from "../components/kategori";
import Kontak from "../components/kontak";
export default function Home() {
  return (
    <div className="relative bg-black">
      <main>
        <LandingPage />
        <Kategori />
        <Kontak />
      </main>
    </div>
  );
}