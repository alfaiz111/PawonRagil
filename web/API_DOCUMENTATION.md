# API Documentation - PawonRagil

## Base URL
```
http://localhost:3000/api
```

## Authentication

### Register
**POST** `/auth/register`

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "nama": "Nama User"
}
```

Response:
```json
{
  "message": "Registrasi berhasil",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nama": "Nama User",
    "role": "user"
  }
}
```

### Login
**POST** `/auth/login`

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login berhasil",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nama": "Nama User",
    "role": "user"
  }
}
```

### Logout
**POST** `/auth/logout`

Response:
```json
{
  "message": "Logout berhasil"
}
```

### Get Current User
**GET** `/auth/me`

Response:
```json
{
  "user": {
    "userId": "uuid",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

## Kategori

### Get All Kategori
**GET** `/kategori`

Response:
```json
{
  "data": [
    {
      "id": "1",
      "nama": "Makanan",
      "deskripsi": "Berbagai macam makanan lezat",
      "gambar": "/images/kategori-makanan.jpg"
    }
  ]
}
```

### Create Kategori (Admin Only)
**POST** `/kategori`

Request Body:
```json
{
  "nama": "Kategori Baru",
  "deskripsi": "Deskripsi kategori",
  "gambar": "/images/kategori.jpg"
}
```

### Get Kategori by ID
**GET** `/kategori/:id`

### Update Kategori (Admin Only)
**PUT** `/kategori/:id`

Request Body:
```json
{
  "nama": "Kategori Updated",
  "deskripsi": "Deskripsi baru"
}
```

### Delete Kategori (Admin Only)
**DELETE** `/kategori/:id`

---

## Menu

### Get All Menu
**GET** `/menu`

Query Parameters:
- `kategoriId` (optional): Filter by kategori ID

Response:
```json
{
  "data": [
    {
      "id": "1",
      "nama": "Nasi Goreng",
      "deskripsi": "Nasi goreng spesial",
      "harga": 15000,
      "gambar": "/images/nasi-goreng.jpg",
      "tersedia": true,
      "kategoriId": "1"
    }
  ]
}
```

### Create Menu (Admin Only)
**POST** `/menu`

Request Body:
```json
{
  "nama": "Menu Baru",
  "deskripsi": "Deskripsi menu",
  "harga": 20000,
  "gambar": "/images/menu.jpg",
  "kategoriId": "1",
  "tersedia": true
}
```

### Get Menu by ID
**GET** `/menu/:id`

### Update Menu (Admin Only)
**PUT** `/menu/:id`

### Delete Menu (Admin Only)
**DELETE** `/menu/:id`

---

## Pesanan

### Get All Pesanan
**GET** `/pesanan`

- Admin: Mendapatkan semua pesanan
- User: Hanya pesanan milik sendiri

Response:
```json
{
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "namaPelanggan": "John Doe",
      "nomorMeja": "5",
      "totalHarga": 50000,
      "status": "pending",
      "items": [
        {
          "id": "uuid",
          "menuId": "1",
          "nama": "Nasi Goreng",
          "jumlah": 2,
          "harga": 15000
        }
      ]
    }
  ]
}
```

### Create Pesanan
**POST** `/pesanan`

Request Body:
```json
{
  "namaPelanggan": "John Doe",
  "nomorMeja": "5",
  "catatan": "Pedas sedang",
  "items": [
    {
      "menuId": "1",
      "nama": "Nasi Goreng",
      "jumlah": 2,
      "harga": 15000
    }
  ]
}
```

### Get Pesanan by ID
**GET** `/pesanan/:id`

### Update Pesanan Status (Admin Only)
**PUT** `/pesanan/:id`

Request Body:
```json
{
  "status": "diproses"
}
```

Status options: `pending`, `diproses`, `selesai`, `dibatalkan`

### Cancel Pesanan
**DELETE** `/pesanan/:id`

---

## Error Responses

All endpoints may return these error responses:

```json
{
  "error": "Error message"
}
```

Common status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Notes

- Authentication menggunakan JWT token yang disimpan dalam HTTP-only cookie
- Admin endpoints memerlukan role "admin"
- Data saat ini menggunakan in-memory storage (akan hilang saat server restart)
- Untuk production, ganti dengan database menggunakan Prisma
