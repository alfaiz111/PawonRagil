export let kategoris: any[] = []

export function getKategoris() {
  return kategoris
}

export function setKategoris(newKategoris: any[]) {
  kategoris = newKategoris
}

export function addKategori(kategori: any) {
  kategoris.push(kategori)
}
