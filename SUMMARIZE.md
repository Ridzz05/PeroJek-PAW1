# Ringkasan Menyeluruh Smart Rental System

Dokumen ini merangkum kondisi proyek `smart-rental-system` berdasarkan isi workspace saat ini. Analisis mencakup backend Laravel, frontend React, database, alur bisnis, konfigurasi runtime, dokumentasi yang sudah ada, serta area teknis yang perlu diperhatikan untuk pengembangan berikutnya.

## 1. Gambaran Umum Proyek

`Smart Rental System` adalah aplikasi manajemen rental kendaraan berbasis web. Aplikasi ini dirancang sebagai sistem operasional untuk mengelola armada kendaraan, data pelanggan, transaksi penyewaan, pengembalian kendaraan, dan ringkasan performa bisnis melalui dashboard.

Secara produk, aplikasi memiliki dua wajah utama:

- Landing page publik untuk menampilkan brand, daftar kendaraan, kategori kendaraan, testimoni, dan ajakan booking.
- Dashboard internal untuk staf/admin yang menangani data master, armada, pelanggan, booking, return, dan statistik.

Secara teknis, aplikasi adalah Laravel app yang menyajikan React SPA melalui Blade fallback. Endpoint API didefinisikan di `routes/web.php` dengan prefix `/api`, sedangkan React menangani navigasi halaman internal melalui state, bukan React Router.

## 2. Stack Teknologi Aktual

Stack yang benar-benar terlihat dari workspace saat ini:

- Backend: Laravel Framework 13.11.2
- Runtime lokal PHP: PHP 8.3.6
- Frontend: React 19
- UI library: Material UI 6.4, MUI Icons, Emotion
- Styling: Tailwind CSS 4 melalui plugin Vite, plus theme override MUI
- Bundler: Vite 7 dengan `laravel-vite-plugin`
- Database default: SQLite
- Database lokal: `database/database.sqlite`
- Auth: Laravel session guard `web`
- Testing: PHPUnit 12
- Build scripts: `npm run dev`, `npm run build`, `composer dev`, `composer test`

Catatan dokumentasi:

- `README.md` masih menyebut Laravel 11 dan MySQL.
- `IMPLEMENT.md` menyebut Laravel 12 dan SQLite.
- Kode aktual memakai Laravel 13 dan default SQLite. Bagian dokumentasi lama sebaiknya diselaraskan agar tidak membingungkan saat setup atau presentasi proyek.

## 3. Struktur Folder Penting

Struktur utama proyek:

- `app/Http/Controllers`: controller API untuk auth, dashboard, kategori, kendaraan, pelanggan, dan rental.
- `app/Models`: model Eloquent `User`, `Category`, `Vehicle`, `Customer`, dan `Rental`.
- `database/migrations`: schema users, session/cache/jobs, tabel rental utama, dan tambahan profil user.
- `database/seeders`: `DatabaseSeeder` saat ini kosong.
- `resources/js`: aplikasi React SPA.
- `resources/js/pages`: halaman utama dashboard, rental desk, fleet, customers, rentals, master data, landing.
- `resources/js/auth`: auth context, login, register, settings modal.
- `resources/js/components`: layout shell dan dialog konfirmasi reusable.
- `resources/js/i18n`: provider bahasa dan file translasi English/Indonesia.
- `resources/views/app.blade.php`: root HTML untuk React SPA dan CSRF meta tag.
- `public/assets`: gambar kendaraan dan video BMW M3 untuk auth background.
- `routes/web.php`: seluruh route API dan SPA fallback.

## 4. Arsitektur Aplikasi

Arsitektur aplikasi berjalan dengan pola berikut:

1. Laravel melayani request web.
2. Route fallback mengembalikan `resources/views/app.blade.php`.
3. Blade memuat CSRF token dan bundle Vite: `resources/css/app.css` dan `resources/js/app.jsx`.
4. React membuat SPA di elemen `#root`.
5. React melakukan fetch ke endpoint `/api/*`.
6. Laravel controller memvalidasi request, menjalankan query Eloquent, dan mengembalikan JSON.
7. Database SQLite menyimpan user, session, cache, jobs, kategori, kendaraan, pelanggan, dan rental.

Tidak ada React Router. Navigasi internal disimpan di state `currentPage` dan `localStorage`. Halaman aktif dirender melalui switch di `resources/js/app.jsx`.

## 5. Routing dan Endpoint

Semua endpoint API berada di `routes/web.php` dalam group `Route::prefix('api')`.

Endpoint utama:

| Method | Endpoint | Controller | Fungsi |
| --- | --- | --- | --- |
| GET | `/api/dashboard/stats` | `DashboardController@getStats` | Statistik dashboard |
| GET | `/api/categories` | `CategoryController@index` | List kategori |
| POST | `/api/categories` | `CategoryController@store` | Tambah kategori |
| PUT/PATCH | `/api/categories/{category}` | `CategoryController@update` | Update kategori |
| DELETE | `/api/categories/{category}` | `CategoryController@destroy` | Hapus kategori |
| GET | `/api/vehicles` | `VehicleController@index` | List kendaraan |
| POST | `/api/vehicles` | `VehicleController@store` | Tambah kendaraan |
| PUT/PATCH | `/api/vehicles/{vehicle}` | `VehicleController@update` | Update kendaraan |
| DELETE | `/api/vehicles/{vehicle}` | `VehicleController@destroy` | Hapus kendaraan |
| PATCH | `/api/vehicles/{vehicle}/status` | `VehicleController@updateStatus` | Ubah status kendaraan |
| GET | `/api/customers` | `CustomerController@index` | List pelanggan |
| POST | `/api/customers` | `CustomerController@store` | Tambah pelanggan |
| PUT/PATCH | `/api/customers/{customer}` | `CustomerController@update` | Update pelanggan |
| DELETE | `/api/customers/{customer}` | `CustomerController@destroy` | Hapus pelanggan |
| GET | `/api/rentals` | `RentalController@index` | List transaksi rental |
| POST | `/api/rentals/book` | `RentalController@book` | Booking kendaraan |
| POST | `/api/rentals/{id}/return` | `RentalController@returnVehicle` | Proses pengembalian |
| POST | `/api/login` | `AuthController@login` | Login session |
| POST | `/api/register` | `AuthController@register` | Register user staff |
| POST | `/api/logout` | `AuthController@logout` | Logout session |
| GET | `/api/me` | `AuthController@me` | Ambil user aktif |
| PUT | `/api/me` | `AuthController@updateProfile` | Update nama/profile picture |

Catatan route:

- `Route::apiResource('vehicles', VehicleController::class)` dan `Route::apiResource('customers', CustomerController::class)` membuat route `show`.
- `VehicleController` dan `CustomerController` belum memiliki method `show`.
- Jika endpoint `GET /api/vehicles/{vehicle}` atau `GET /api/customers/{customer}` dipanggil, berpotensi error karena method controller tidak tersedia.
- `CategoryController` sudah memakai `except(['show'])`, sehingga tidak memiliki mismatch yang sama.

## 6. Backend Laravel

### 6.1 AuthController

Fitur autentikasi:

- `GET /api/me`: mengembalikan user aktif jika session login valid, atau `401 Unauthenticated`.
- `POST /api/login`: validasi email/password, login via `Auth::attempt`, regenerate session, return user.
- `POST /api/register`: membuat user baru dengan role default `staff`, password di-hash, lalu otomatis login.
- `POST /api/logout`: logout, invalidate session, regenerate token.
- `PUT /api/me`: update `name` dan `profile_picture`.

Validasi penting:

- Email register harus unik.
- Password register minimal 6 karakter dan harus confirmed.
- `profile_picture` harus URL valid jika diisi.

### 6.2 DashboardController

Endpoint dashboard menghitung:

- Total revenue dari rental status `Ongoing` dan `Completed`.
- Jumlah kendaraan status `Rented`.
- Jumlah kendaraan status `Available`.
- Total pelanggan.
- Upcoming returns dari rental `Ongoing`, urut `end_date`, maksimal 5.
- Distribusi kategori berdasarkan jumlah kendaraan.
- Monthly revenue 6 bulan terakhir.

Catatan penting:

- Jika monthly revenue kosong, controller mengisi fallback angka random/dummy untuk chart.
- Ini bagus untuk tampilan awal, tetapi kurang ideal untuk analytics produksi karena angka chart bisa berubah antar request dan tidak sepenuhnya mencerminkan data real.

### 6.3 CategoryController

Mengelola kategori kendaraan:

- List kategori dengan `vehicles_count`.
- Tambah kategori dengan `name`, `slug`, `icon`.
- Update kategori dengan validasi slug unik.
- Hapus kategori hanya jika kategori belum dipakai kendaraan.

Validasi:

- `slug` wajib `alpha_dash` dan unik.
- `icon` menyimpan nama icon MUI dalam string.

### 6.4 VehicleController

Mengelola armada kendaraan:

- List kendaraan dengan relasi kategori.
- Tambah kendaraan.
- Update kendaraan.
- Hapus kendaraan.
- Ubah status kendaraan melalui endpoint khusus.

Field kendaraan:

- `category_id`
- `brand`
- `model`
- `license_plate`
- `daily_rate`
- `status`
- `image_url`

Status valid:

- `Available`
- `Rented`
- `Maintenance`

Catatan:

- `image_url` divalidasi sebagai URL, bukan path lokal.
- Delete kendaraan belum mengecek apakah kendaraan punya histori rental. Karena foreign key rental ke kendaraan menggunakan cascade, penghapusan kendaraan dapat ikut menghapus data rental terkait.

### 6.5 CustomerController

Mengelola pelanggan:

- List pelanggan urut nama.
- Tambah pelanggan.
- Update pelanggan.
- Hapus pelanggan.

Field pelanggan:

- `name`
- `phone`
- `identity_number`
- `address`

Validasi:

- `identity_number` wajib unik.
- `address` boleh kosong.

Catatan:

- Delete pelanggan belum mengecek apakah pelanggan punya histori rental. Karena foreign key rental ke pelanggan menggunakan cascade, penghapusan pelanggan dapat ikut menghapus data rental terkait.

### 6.6 RentalController

Mengelola transaksi rental:

- `index`: list semua rental dengan relasi `vehicle.category` dan `customer`.
- `book`: membuat transaksi rental baru.
- `returnVehicle`: menyelesaikan rental dan mengembalikan status kendaraan menjadi `Available`.

Alur booking:

1. Validasi `vehicle_id`, `customer_id`, `start_date`, `end_date`, dan `payment_method`.
2. Pastikan kendaraan berstatus `Available`.
3. Hitung durasi hari dari `start_date` ke `end_date`.
4. Jika durasi 0, minimal 1 hari.
5. Hitung total: `total_days * daily_rate`.
6. Generate kode rental format `TRX-YYYYMMDD-0001`.
7. Jalankan database transaction.
8. Insert rental status `Ongoing`.
9. Update kendaraan menjadi `Rented`.
10. Commit dan return rental dengan relasi.

Alur return:

1. Ambil rental berdasarkan ID.
2. Pastikan status masih `Ongoing`.
3. Jalankan database transaction.
4. Update rental menjadi `Completed`.
5. Update kendaraan menjadi `Available`.
6. Commit dan return rental dengan relasi.

Payment method valid:

- `Cash`
- `QRIS`
- `Card`

Catatan:

- Transaksi database sudah digunakan pada booking dan return, ini keputusan teknis yang baik.
- Generate sequence rental code belum memakai lock khusus. Pada traffic paralel tinggi, masih ada risiko collision pada unique `rental_code`.
- Status `Cancelled` ada di komentar/schema, tetapi belum ada endpoint pembatalan.

## 7. Model dan Relasi Data

Model utama:

- `User`
- `Category`
- `Vehicle`
- `Customer`
- `Rental`

Relasi:

- `Category` has many `Vehicle`.
- `Vehicle` belongs to `Category`.
- `Vehicle` has many `Rental`.
- `Customer` has many `Rental`.
- `Rental` belongs to `Vehicle`.
- `Rental` belongs to `Customer`.

Mass assignment:

- Project memakai PHP attributes Laravel seperti `#[Fillable(...)]` dan `#[Hidden(...)]`.
- `User` menyembunyikan `password` dan `remember_token`.
- `Rental` melakukan cast:
  - `start_date`: date
  - `end_date`: date
  - `total_days`: integer
  - `total_amount`: decimal 2

Catatan:

- Tabel `rentals` punya kolom `payment_status`.
- Model `Rental` belum memasukkan `payment_status` di fillable.
- Controller dan frontend juga belum memakai `payment_status`.

## 8. Database

### 8.1 Schema Utama

Tabel rental utama dibuat oleh `2026_05_21_000001_create_rental_tables.php`.

Tabel `categories`:

- `id`
- `name`
- `slug` unique
- `icon`
- timestamps

Tabel `customers`:

- `id`
- `name`
- `phone`
- `identity_number` unique
- `address` nullable
- timestamps

Tabel `vehicles`:

- `id`
- `category_id`
- `brand`
- `model`
- `license_plate` unique
- `daily_rate` decimal 12,2
- `status` default `Available`
- `image_url` nullable
- timestamps

Tabel `rentals`:

- `id`
- `rental_code` unique
- `vehicle_id`
- `customer_id`
- `start_date`
- `end_date`
- `total_days`
- `total_amount` decimal 12,2
- `status` default `Ongoing`
- `payment_method`
- `payment_status` default `Pending`
- timestamps

Tabel auth/session:

- `users`
- `password_reset_tokens`
- `sessions`

Tambahan user:

- `profile_picture`
- `role` default `staff`

### 8.2 Kondisi Database Lokal Saat Dianalisis

Database lokal aktif:

- Driver: SQLite
- File: `database/database.sqlite`
- SQLite version: 3.45.1
- Total tabel: 13
- Semua migration yang ada sudah `Ran`.

Jumlah row lokal saat dianalisis:

- `categories`: 5
- `users`: 2
- `sessions`: 3
- `customers`: 0
- `vehicles`: 0
- `rentals`: 0
- `cache`: 0
- `jobs`: 0
- `failed_jobs`: 0

Catatan:

- `DatabaseSeeder` saat ini kosong, jadi data tersebut bukan berasal dari seeder default saat ini.
- README/IMPLEMENT masih menyarankan migrate/seed, tetapi seeder tidak membuat data awal.

## 9. Frontend React

### 9.1 Entry Point dan Theme

Entrypoint React ada di `resources/js/app.jsx`.

Fungsi utama:

- Membuat MUI theme custom.
- Mendukung light/dark mode.
- Menyimpan `theme-mode` ke `localStorage`.
- Menyimpan halaman aktif ke `localStorage` sebagai `current-page`.
- Lazy load semua halaman utama dengan `React.lazy`.
- Membungkus aplikasi dengan:
  - `LanguageProvider`
  - `ThemeProvider`
  - `AuthProvider`

Theme:

- Palet dominan hitam/putih/minimalis.
- Banyak override MUI untuk button, card, app bar, drawer, paper, table, text field, menu, chip, dialog.
- Card memakai efek glass/backdrop blur.

Catatan teknis:

- Typography override memakai `Google Sans`.
- CSS global di `resources/css/app.css` mengatur Tailwind source scanning dan scrollbar.
- File CSS mendefinisikan `--font-sans` sebagai `Outfit`/`Plus Jakarta Sans`, sedangkan Blade memuat Google Sans. Ini bukan error langsung, tetapi ada perbedaan arah typography antara CSS dan MUI theme.

### 9.2 AuthGate dan Halaman Guest

`AuthGate` di `app.jsx` menentukan tampilan berdasarkan state auth:

- Saat loading: tampil spinner.
- Jika guest:
  - Default tampil `Landing`.
  - Bisa masuk ke `LoginPage` atau `RegisterPage`.
  - Login/register memakai video background `/assets/mp4/bmw-m3.mp4`.
  - Ada tombol mute/unmute video.
- Jika user login:
  - Jika `currentPage` adalah `landing`, landing tetap tampil.
  - Selain itu halaman internal dibungkus `Layout`.

Auth frontend:

- `AuthContext` melakukan boot request ke `/api/me`.
- `login`, `register`, `logout`, dan `updateUser` memakai fetch dengan `credentials: same-origin`.
- CSRF token diambil dari meta tag Blade.

### 9.3 Layout

`resources/js/components/Layout.jsx` adalah shell internal aplikasi.

Fitur layout:

- Sidebar desktop permanen.
- Bottom navigation mobile.
- App bar dengan judul halaman aktif.
- Toggle bahasa English/Indonesia.
- Toggle light/dark mode.
- Avatar user.
- Dropdown profile:
  - View website
  - Settings
  - Logout
  - Shortcut dashboard/master data di mobile
- Settings modal lazy-loaded.

Menu utama:

- Dashboard
- Rental Desk
- Rentals
- Fleet
- Customers
- Master Data

### 9.4 i18n

Provider bahasa ada di `resources/js/i18n/i18n.jsx`.

Fitur:

- Bahasa tersedia: `eng` dan `id`.
- Bahasa aktif disimpan di `localStorage` sebagai `app-language`.
- Fungsi `t(key)` membaca nested key dari JSON translation.
- Jika key tidak ditemukan, fungsi mengembalikan key mentah.

### 9.5 Landing Page

`resources/js/pages/Landing.jsx` adalah halaman publik.

Fitur utama:

- Hero dengan rotasi gambar.
- CTA login/register atau dashboard jika user sudah login.
- Toggle tema dan bahasa.
- Fetch kendaraan dari `/api/vehicles`.
- Filter kendaraan berdasarkan kategori.
- Search kendaraan berdasarkan brand/model.
- Kartu kendaraan dengan status availability.
- Section fitur, katalog, testimoni, dan footer.

Catatan:

- Landing mengambil data kendaraan dari API yang sama dengan dashboard.
- Jika database kendaraan kosong, katalog akan kosong atau menampilkan state kosong.

### 9.6 Dashboard

`resources/js/pages/Dashboard.jsx`.

Fitur:

- Fetch `/api/dashboard/stats`.
- Menampilkan total revenue, kendaraan on road, kendaraan available, dan total pelanggan.
- Chart sederhana monthly revenue.
- List upcoming returns.
- CTA menuju rental desk.

Format uang:

- Menggunakan `Intl.NumberFormat('id-ID', { currency: 'IDR' })`.

### 9.7 Rental Desk

`resources/js/pages/RentalDesk.jsx`.

Fitur:

- Fetch kendaraan dan pelanggan.
- Filter kendaraan berdasarkan kategori.
- Search kendaraan.
- Pilih kendaraan available.
- Form booking:
  - customer
  - start date
  - end date
  - payment method
- Kalkulasi hari dan total biaya di frontend.
- Submit ke `/api/rentals/book`.
- Mapping payment method UI:
  - `Cash` -> `Cash`
  - `QRIS` -> `QRIS`
  - `Credit Card` -> `Card`

Catatan:

- Backend tetap menghitung ulang total amount, jadi kalkulasi frontend hanya untuk preview.
- Booking hanya bisa berhasil jika kendaraan masih `Available` di backend.

### 9.8 Fleet

`resources/js/pages/Fleet.jsx`.

Fitur:

- Fetch kendaraan dan kategori.
- Menampilkan kendaraan dalam grid card.
- Tambah kendaraan.
- Hapus kendaraan.
- Toggle status maintenance:
  - `Maintenance` -> `Available`
  - status lain -> `Maintenance`
- Snackbar untuk feedback.
- Confirm dialog untuk delete.

Catatan:

- Halaman Fleet fokus pada tambah, hapus, dan status maintenance.
- Editing detail kendaraan lebih lengkap tersedia di Master Data.

### 9.9 Customers

`resources/js/pages/Customers.jsx`.

Fitur:

- Fetch pelanggan.
- Search pelanggan.
- Tambah pelanggan.
- Edit pelanggan.
- Hapus pelanggan dengan confirm dialog.
- Tampilan responsif: mobile card/list dan desktop table.
- Snackbar untuk feedback.

### 9.10 Rentals

`resources/js/pages/Rentals.jsx`.

Fitur:

- Fetch `/api/rentals`.
- Filter status rental.
- Tabel/log transaksi.
- Menampilkan customer, kendaraan, tanggal, payment method, total, status.
- Proses return melalui `/api/rentals/{id}/return`.
- Responsive mobile/desktop view.

Status label:

- `Ongoing`
- `Completed`
- `Cancelled`

Catatan:

- UI mengenal `Cancelled`, tetapi backend belum menyediakan endpoint cancel.

### 9.11 Master Data

`resources/js/pages/MasterData.jsx`.

Fitur:

- Tab untuk `categories`, `vehicles`, dan `customers`.
- Fetch ketiga dataset sekaligus.
- Search lintas entity aktif.
- Create/edit/delete entity aktif.
- Form dinamis berdasarkan tab.
- Slugify otomatis untuk kategori.
- Confirm dialog delete.

Peran halaman:

- Master Data adalah pusat administrasi yang lebih menyeluruh daripada Fleet/Customers individual.
- Fleet dan Customers juga menyediakan workflow operasional cepat masing-masing.

### 9.12 Auth Pages dan Settings

`LoginPage.jsx`:

- Login email/password.
- Toggle show password.
- Error handling dari backend.
- Navigasi ke register atau kembali ke landing.

`RegisterPage.jsx`:

- Register name/email/password/password confirmation.
- Toggle show password.
- Error field dari validasi backend.

`SettingsModal.jsx`:

- Edit nama.
- Edit profile picture URL.
- Preview avatar.
- Simpan melalui `updateUser` ke `/api/me`.

## 10. Alur Bisnis Utama

Alur operasional yang didukung aplikasi:

1. User membuka landing page.
2. User register/login sebagai staff.
3. Staff masuk dashboard internal.
4. Staff menyiapkan data master:
   - kategori kendaraan
   - kendaraan
   - pelanggan
5. Staff memilih kendaraan available di Rental Desk.
6. Staff memilih pelanggan dan tanggal rental.
7. Sistem menghitung durasi dan total biaya.
8. Booking dibuat.
9. Rental masuk status `Ongoing`.
10. Kendaraan berubah status menjadi `Rented`.
11. Dashboard memperbarui revenue/on road/upcoming returns.
12. Saat kendaraan kembali, staff proses return di halaman Rentals.
13. Rental berubah menjadi `Completed`.
14. Kendaraan berubah kembali menjadi `Available`.

## 11. Aturan Validasi dan Business Rules

Aturan yang sudah ada:

- Kategori tidak bisa dihapus jika masih digunakan kendaraan.
- Slug kategori unik.
- License plate kendaraan unik.
- Identity number pelanggan unik.
- Kendaraan hanya bisa dibooking jika status `Available`.
- Start date booking wajib hari ini atau setelah hari ini.
- End date wajib sama atau setelah start date.
- Minimal durasi rental 1 hari.
- Payment method hanya `Cash`, `QRIS`, atau `Card`.
- Rental return hanya bisa dilakukan jika status rental masih `Ongoing`.
- Register user otomatis role `staff`.

Aturan yang belum lengkap:

- Belum ada role-based authorization.
- Belum ada endpoint cancel rental.
- Belum ada proteksi agar kendaraan/pelanggan yang punya histori rental tidak dihapus.
- Belum ada pengecekan overlap jadwal booking di masa depan untuk kendaraan yang sama.
- Belum ada payment status workflow walaupun schema punya kolom `payment_status`.

## 12. Keamanan dan Akses

Poin yang sudah ada:

- Auth memakai Laravel session guard.
- Password di-hash.
- Session di-regenerate saat login/register.
- Logout invalidate session dan regenerate token.
- Frontend melakukan `credentials: same-origin`.
- Endpoint `/api/me` dan update profile memeriksa `Auth::check()`.

Poin yang perlu diperhatikan:

- Route API operasional belum dibungkus middleware `auth`.
- `bootstrap/app.php` mengecualikan `api/*` dari CSRF validation.
- Frontend memang mengirim `X-CSRF-TOKEN`, tetapi backend mengecualikan endpoint API dari validasi CSRF.
- Endpoint mutasi seperti create/update/delete kendaraan, pelanggan, kategori, booking, dan return dapat berisiko jika tidak diproteksi.
- Role `staff` ada di user, tetapi belum dipakai untuk authorization.

Rekomendasi keamanan:

- Bungkus endpoint internal dengan middleware `auth`.
- Pisahkan endpoint publik, misalnya hanya katalog kendaraan tertentu untuk landing.
- Aktifkan policy/gate atau role middleware untuk operasi admin.
- Pertimbangkan mengaktifkan CSRF untuk route web berbasis session, atau pindahkan API ke auth mechanism yang konsisten.

## 13. Kualitas Data dan Konsistensi

Temuan konsistensi:

- `README.md`, `IMPLEMENT.md`, dan kode aktual berbeda versi stack.
- `DatabaseSeeder` kosong, tetapi dokumentasi masih menyiratkan ada seed data.
- Local database memiliki 5 kategori dan 2 user, tetapi kendaraan/pelanggan/rental kosong.
- `payment_status` ada di migration tetapi tidak dipakai model/controller/frontend.
- `apiResource` membuat route `show` untuk vehicles/customers, tetapi controller tidak punya method `show`.
- Dashboard monthly revenue memakai dummy/random fallback saat data kosong.
- Delete kendaraan/pelanggan dapat menghapus histori rental karena cascade.
- Tidak ada pagination untuk list kendaraan, pelanggan, rental, atau master data.

## 14. Testing

Setup testing:

- PHPUnit dikonfigurasi di `phpunit.xml`.
- Testing memakai SQLite in-memory.
- Cache/session/queue testing dibuat ringan:
  - `CACHE_STORE=array`
  - `SESSION_DRIVER=array`
  - `QUEUE_CONNECTION=sync`

Test saat ini:

- `tests/Feature/ExampleTest.php`: hanya memastikan `/` status 200.
- `tests/Unit/ExampleTest.php`: hanya assert true.

Kesimpulan testing:

- Cakupan test masih default skeleton.
- Belum ada test untuk auth, CRUD, booking, return, validasi, relasi, dan dashboard stats.

Prioritas test yang disarankan:

- Register/login/logout/me.
- CRUD kategori dengan validasi slug dan proteksi delete jika dipakai.
- CRUD kendaraan dengan unique license plate.
- CRUD pelanggan dengan unique identity number.
- Booking sukses mengubah kendaraan menjadi `Rented`.
- Booking gagal saat kendaraan tidak `Available`.
- Return sukses mengubah rental menjadi `Completed` dan kendaraan menjadi `Available`.
- Return gagal untuk rental non-ongoing.
- Dashboard stats menghitung revenue dan status kendaraan dengan benar.

## 15. Setup dan Command Penting

Install dependency:

```bash
composer install
npm install
```

Setup environment:

```bash
cp .env.example .env
php artisan key:generate
php artisan migrate
```

Menjalankan aplikasi:

```bash
php artisan serve
npm run dev
```

Alternatif menjalankan beberapa proses sekaligus:

```bash
composer dev
```

Build frontend:

```bash
npm run build
```

Test:

```bash
composer test
```

Reset database lokal:

```bash
php artisan migrate:fresh
```

Jika nanti seeder diisi:

```bash
php artisan migrate:fresh --seed
```

## 16. Aset Visual

Aset yang tersedia:

- `public/assets/img/1.jpg`
- `public/assets/img/2.jpg`
- `public/assets/img/3.jpg`
- `public/assets/img/4.jpg`
- `public/assets/img/bmw-m4-competition-mobil123.jpeg`
- `public/assets/mp4/bmw-m3.mp4`

Penggunaan:

- Video BMW M3 dipakai sebagai background login/register.
- Landing page memakai hero images dan katalog kendaraan.
- Vehicle card memakai `image_url` dari database jika tersedia.

Catatan:

- Karena validasi backend untuk `image_url` adalah `url`, input path lokal seperti `/assets/img/1.jpg` tidak akan lolos saat create/update kendaraan lewat API.

## 17. Kekuatan Proyek Saat Ini

Kekuatan teknis dan produk:

- Struktur modul cukup jelas: dashboard, rental desk, fleet, customers, rentals, master data.
- Backend sudah memisahkan controller dan model sesuai domain.
- Relasi Eloquent utama sudah didefinisikan.
- Booking dan return memakai database transaction.
- UI internal sudah responsif dengan desktop sidebar dan mobile bottom navigation.
- Ada i18n English/Indonesia.
- Ada dark/light mode persistent.
- Auth session sudah terintegrasi dengan React context.
- UI cukup lengkap untuk demo operasional rental kendaraan.
- Dashboard sudah menggabungkan data statistik, chart, dan upcoming returns.

## 18. Risiko dan Area Perbaikan Prioritas

Prioritas tinggi:

1. Proteksi semua endpoint internal dengan auth middleware.
2. Perbaiki route `show` vehicles/customers atau tambahkan method `show`.
3. Selaraskan README/IMPLEMENT dengan stack aktual Laravel 13 dan SQLite default.
4. Isi `DatabaseSeeder` dengan data demo konsisten.
5. Sinkronkan `payment_status`: dipakai penuh atau dihapus dari schema.
6. Tambahkan test untuk booking dan return karena ini inti business logic.

Prioritas menengah:

1. Cegah delete kendaraan/pelanggan jika punya rental history.
2. Tambahkan pagination/search server-side untuk data besar.
3. Hilangkan random revenue fallback dari dashboard produksi.
4. Tambahkan cancel rental workflow.
5. Tambahkan pengecekan overlap jadwal kendaraan.
6. Tambahkan role/permission jika ada admin dan staff berbeda.

Prioritas rendah:

1. Rapikan konsistensi typography antara CSS global dan MUI theme.
2. Konsolidasikan Fleet dan Master Data agar tidak terasa duplikatif.
3. Buat error boundary frontend.
4. Tambahkan loading/empty state yang lebih konsisten di semua halaman.

## 19. Kesimpulan

Project ini sudah membentuk sistem rental kendaraan yang fungsional secara end-to-end: user dapat login, mengelola master data, membuat booking, memproses return, dan melihat ringkasan bisnis. Arsitektur Laravel + React SPA sudah berjalan dan struktur domainnya mudah dipahami.

Bagian yang paling kuat adalah alur operasional rental: kendaraan available dipilih, rental dibuat dalam transaction, status kendaraan berubah menjadi rented, lalu return mengembalikan status kendaraan. Bagian frontend juga sudah cukup matang untuk demo karena memiliki landing page, dashboard internal, responsive layout, dark mode, i18n, dan modal/profile handling.

Namun, untuk menjadi lebih siap produksi, proyek perlu memperkuat keamanan API, memperbaiki mismatch route/controller, menyelaraskan dokumentasi, mengisi seeder, menambah test untuk business logic inti, dan memastikan schema seperti `payment_status` benar-benar dipakai atau dirapikan. Setelah area tersebut diperbaiki, aplikasi ini akan jauh lebih stabil, aman, dan mudah dikembangkan.
