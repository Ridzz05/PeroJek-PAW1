# 🚗 Smart Rental System

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Material UI](https://img.shields.io/badge/MUI-6.x-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)

Aplikasi manajemen rental kendaraan berbasis web dengan **landing page publik** dan **dashboard internal** untuk staf/admin. Sistem mencakup manajemen armada, data pelanggan, transaksi penyewaan, pengembalian kendaraan, dan ringkasan performa bisnis secara real-time.

---

## ✨ Fitur Utama

### 🌐 Landing Page Publik
- Hero section dengan rotasi gambar otomatis
- Katalog kendaraan dengan filter kategori dan pencarian
- Testimonial dan CTA booking
- Toggle bahasa (English/Indonesia) dan tema (light/dark)

### 📊 Dashboard Internal
- **Dynamic Dashboard** — ringkasan revenue, kendaraan on road/available, total pelanggan, dan grafik revenue 6 bulan, dengan auto-refresh setiap 15 detik
- **Rental Desk** — antarmuka booking cepat dengan pemilihan kendaraan, pelanggan, date picker, dan kalkulasi biaya otomatis
- **Fleet Management** — kelola armada, ubah status (Available/Rented/Maintenance), tambah/hapus kendaraan
- **Customer CRM** — registrasi dan pencarian pelanggan
- **Rentals** — daftar transaksi dengan filter status dan proses pengembalian
- **Master Data** — pusat administrasi kategori, kendaraan, dan pelanggan

### 🎨 UI/UX
- Responsif: sidebar desktop + bottom navigation mobile
- Dark mode & light mode (persistent ke localStorage)
- i18n: English & Indonesia
- Komponen reusable (PageLoader, ConfirmDialog, Toast)
- Lazy loading halaman

---

## 🛠️ Tech Stack

- **Backend**: Laravel 13.x (PHP 8.3+)
- **Frontend**: React 19 + Material UI 6 + Tailwind CSS 4
- **Bundler**: Vite 7 + laravel-vite-plugin
- **Database**: SQLite (default), support MySQL via konfigurasi `.env`
- **Auth**: Laravel session guard

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **PHP** (8.2+)
- **Composer**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Ridzz05/smart-rental-system.git
cd smart-rental-system

# Install PHP dependencies
composer install

# Install JS dependencies
npm install

# Copy environment file and configure database
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate
```

### 3. Running Locally

**Opsi A — Terminal terpisah:**
```bash
# Start Laravel development server
php artisan serve

# Run Vite dev server
npm run dev
```

**Opsi B — Satu perintah (menjalankan server, Vite, dan log secara paralel):**
```bash
composer dev
```

### 4. Build Frontend
```bash
npm run build
```

### 5. Testing
```bash
composer test
```

---

## 📖 Dokumentasi Lengkap

Lihat [SUMMARIZE.md](./SUMMARIZE.md) untuk ringkasan menyeluruh proyek, termasuk arsitektur, routing, struktur database, alur bisnis, validasi, dan area perbaikan.
