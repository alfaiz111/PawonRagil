"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (

        <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#7B1A36]">4</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#7B1A36]">24</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#7B1A36]">128</p>
            </CardContent>
          </Card>
        </main>
  )
}
