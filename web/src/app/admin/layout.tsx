import Sidebar from "./sidebar"
import Header from "./header"
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

      <div className="min-h-screen flex bg-[#FDE7ED]">
            <Sidebar />
      
            <div className="flex-1 flex flex-col">
              <Header />
              {children}
            </div>
          </div>
  )
}
