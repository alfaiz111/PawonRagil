import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "menu.json")

function readMenuFile(): any[] {
  if (!fs.existsSync(filePath)) return []
  const data = fs.readFileSync(filePath, "utf-8")
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeMenuFile(menus: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(menus, null, 2), "utf-8")
}

// GET semua menu
export function getMenu() {
  return readMenuFile()
}

// GET menu by ID
export function getMenuById(id: string) {
  return readMenuFile().find((m) => m.id === id)
}

// ADD menu
export function addMenu(menu: any) {
  const menus = readMenuFile()
  menus.push(menu)
  writeMenuFile(menus)   // ⚠ harus ada ini agar data tersimpan
  return menu
}

// UPDATE menu by ID
export function updateMenuById(id: string, updated: any) {
  const menus = readMenuFile()
  const index = menus.findIndex((m) => m.id === id)
  if (index === -1) return null
  menus[index] = { ...menus[index], ...updated, updatedAt: new Date() }
  writeMenuFile(menus)
  return menus[index]
}

// DELETE menu by ID
export function deleteMenuById(id: string) {
  const menus = readMenuFile()
  const index = menus.findIndex((m) => m.id === id)
  if (index === -1) return false
  menus.splice(index, 1)
  writeMenuFile(menus)
  return true
}
