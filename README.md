<div align="center">

# DokterKlik
### Modern Telemedicine & Integrated Healthcare Consultation Platform

Solusi layanan kesehatan dan konsultasi medis digital terpadu dengan arsitektur modern (React 19 + Express.js + MongoDB), dilengkapi konsultasi live chat realtime via Socket.io, integrasi payment gateway otomatis Midtrans, dan penerbitan resep obat digital in-house.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646C99?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8+-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Midtrans](https://img.shields.io/badge/Midtrans-Snap_API-002B49?style=for-the-badge)](https://midtrans.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Fitur Unggulan](#-fitur-unggulan) • [Katalog Modul Layanan](#-katalog-modul-layanan) • [Arsitektur](#-arsitektur-teknologi) • [Menjalankan Lokal](#-panduan-instalasi-lokal) • [Deployment](#-panduan-deployment)

</div>

---

## 📌 Sekilas DokterKlik

**DokterKlik** dirancang untuk mendigitalisasi dan menyederhanakan alur pelayanan konsultasi medis: menghilangkan kendala antrean panjang di klinik/rumah sakit, ketidakpastian ketersediaan jadwal dokter, serta kerumitan verifikasi pembayaran manual.

DokterKlik menghubungkan **tiga entitas utama** (Pasien, Dokter, dan Administrator Layanan Medis) dalam satu ekosistem tersinkronisasi. Pasien dapat mencari dokter spesialis, memesan jadwal konsultasi, membayar secara instan, melakukan sesi konsultasi privat dua arah secara realtime, hingga menerima resep obat digital siap tebus.

---

## 🚀 Fitur Unggulan

### 1. 🏥 Multi-Role Unified Ecosystem
- **Portal Pasien (Frontend Client):** Eksplorasi dokter berdasarkan spesialisasi, pemesanan slot konsultasi tanggal & waktu, manajemen riwayat janji temu, dan pengelolaan profil pasien.
- **Portal Dokter (Doctor Space):** Dashboard statistik kunjungan, total pendapatan (*earnings*), verifikasi kehadiran, pembatalan/penyelesaian janji temu, dan ruang konsultasi langsung.
- **Portal Administrator (Admin Console):** Manajemen penuh data dokter (tambah dokter baru, verifikasi kualifikasi, biaya konsultasi, foto profil), monitoring seluruh transaksi, dan kalender janji temu terpusat.

### 2. 💬 Real-Time Live Consultation (Socket.io)
Konsultasi interaktif langsung berbasis room unik per ID janji temu (`appointmentId`). Pesan tersinkronisasi instan tanpa reload browser, dengan riwayat obrolan tersimpan terenkripsi di database MongoDB untuk referensi rekam medis pasien.

### 3. 💳 Automated Payment Gateway (Midtrans Snap & Webhook)
Penyelesaian transaksi konsultasi otomatis melalui **Midtrans Snap API** yang mendukung berbagai metode pembayaran (GoPay, QRIS, Virtual Account BCA/BNI/BRI/Mandiri, dan Kartu Kredit). Endpoint webhook `/api/webhook/midtrans` secara otomatis memvalidasi *signature key* dan memperbarui status pelunasan janji temu tanpa intervensi manual admin.

### 4. 💊 Digital Prescription Generator & Card
Dokter dapat membuat dan menerbitkan resep obat digital (*Prescription*) langsung saat sesi konsultasi berlangsung. Pasien dapat mengakses komponen **PrescriptionCard** interaktif yang mencantumkan nama obat, dosis, aturan pakai, serta instruksi khusus dari dokter.

### 5. 🌐 Multi-Language Support (i18n)
Antarmuka pasien maupun dashboard dokter/admin mendukung peralihan bahasa instan (Bahasa Indonesia dan Bahasa Inggris) menggunakan integrasi `i18next` dan `react-i18next`.

### 6. ☁️ Cloud Media Storage (Cloudinary CDN)
Pengunggahan foto dokter, gambar profil pasien, serta lampiran medis diproses melalui pipeline `multer` dan disimpan langsung di CDN global Cloudinary untuk kecepatan pemuatan data tinggi.

---

## 📂 Katalog Modul Layanan

| Modul / Domain | Deskripsi & Fungsionalitas |
| :--- | :--- |
| **Pencarian & Filter Spesialis** | Katalog dokter: Dokter Umum (*General Physician*), Dokter Kandungan (*Gynecologist*), Dokter Kulit (*Dermatologist*), Dokter Anak (*Pediatrician*), Dokter Saraf (*Neurologist*), dan Dokter Lambung (*Gastroenterologist*). |
| **Booking & Penjadwalan** | Kalender slot waktu dinamis, pencegahan *double-booking* slot waktu dokter, konfirmasi janji temu instan. |
| **Sesi Konsultasi Realtime** | Ruang obrolan chat Socket.io dua arah antara pasien dan dokter spesifik. |
| **Pembayaran & Transaksi** | Generate Snap Token, popup pembayaran Midtrans, callback webhook status lunas / kedaluwarsa. |
| **Resep Obat Digital** | Form pembuatan resep oleh dokter, penyimpanan resep per janji temu, kartu unduhan resep di sisi pasien. |
| **Autentikasi & Otorisasi** | JSON Web Token (JWT) + enkripsi kata sandi `bcrypt` berlapis untuk peran User, Doctor, dan Admin. |
| **Dashboard Analitik** | Grafik statistik janji temu, metrik total earning dokter, dan daftar pasien aktif. |

---

## 🛠️ Arsitektur Teknologi

```
DokterKlik/
├── backend/                    # Core REST API & Socket.io Server (Express 5 & Node.js)
│   ├── config/                 # Driver MongoDB, Cloudinary, Midtrans Snap Client
│   ├── controllers/            # Logic handler: Admin, Doctor, User, Chat, Prescription, Payment
│   ├── middlewares/            # JWT Guard (authUser, authDoctor, authAdmin), Multer upload
│   ├── models/                 # Skema Mongoose (user, doctor, appointment, chat, prescription)
│   ├── routes/                 # Router REST API & Webhook handler
│   └── server.js               # Entry point Express HTTP server & Socket.io WebSocket
│
├── frontend/                   # Client App Pasien (React 19 + Vite + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/         # Navbar, TopDoctors, SpecialityMenu, ChatModal, PrescriptionCard
│   │   ├── context/            # Global State (AppContext, UserContext, DoctorContext, ChatContext)
│   │   ├── i18n/               # Kamus translasi dwibahasa (id.json & en.json)
│   │   ├── pages/              # Home, Doctors, Appointment, MyAppointments, MyProfile, Login
│   │   └── socket.js           # Client socket connection handler
│   └── vite.config.js          # Konfigurasi Vite & Tailwind plugin
│
└── admin/                      # Portal Manajemen Admin & Dokter (React 19 + Vite)
    ├── src/
    │   ├── components/         # Sidebar navigation, ChatModal, PrescriptionForm, Navbar
    │   ├── context/            # AdminContext & DoctorContext state management
    │   ├── pages/
    │   │   ├── Admin/          # Dashboard ringkasan, AllAppointments, AddDoctor, DoctorsList
    │   │   └── Doctor/         # DoctorDashboard, DoctorAppointments, DoctorProfile
    │   └── socket.js           # Client socket connection handler portal admin/dokter
    └── vite.config.js          # Konfigurasi Vite & Tailwind plugin
```

---

## 💻 Panduan Instalasi Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) v20+ dan npm
- Database [MongoDB Atlas](https://www.mongodb.com/atlas) atau MongoDB lokal
- Akun [Cloudinary](https://cloudinary.com/) (untuk penyimpanan media)
- Akun Sandbox [Midtrans](https://midtrans.com/) (untuk payment gateway)

---

### 1. Menjalankan Backend (Express & Socket.io)

```bash
# Masuk ke direktori backend
cd backend

# Install dependensi
npm install

# Konfigurasi file environment
copy .env.example .env

# Isi variabel .env berikut:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dokterklik
# CLOUDINARY_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_cloudinary_key
# CLOUDINARY_SECRET_KEY=your_cloudinary_secret
# ADMIN_EMAIL=admin@dokterklik.com
# ADMIN_PASSWORD=your_admin_password
# JWT_SECRET=your_jwt_secret_key
# MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx
# MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx

# Jalankan server mode development
npm run server
```
Server berjalan di `http://localhost:4000`.

---

### 2. Menjalankan Portal Pasien (Frontend)

```bash
# Buka terminal baru, masuk ke direktori frontend
cd frontend

# Install dependensi
npm install

# Konfigurasi file environment
copy .env.example .env
# Set VITE_BACKEND_URL=http://localhost:4000

# Jalankan development server
npm run dev
```
Akses portal pasien di `http://localhost:5173`.

---

### 3. Menjalankan Portal Dokter & Admin

```bash
# Buka terminal baru, masuk ke direktori admin
cd admin

# Install dependensi
npm install

# Konfigurasi file environment
copy .env.example .env
# Set VITE_BACKEND_URL=http://localhost:4000

# Jalankan development server
npm run dev
```
Akses portal admin/dokter di `http://localhost:5174`.

---

## 🌐 Panduan Deployment

### Backend (Railway / Render)
1. Buat project baru pada [Railway.app](https://railway.app) atau [Render](https://render.com) terhubung ke repositori ini.
2. Atur **Root Directory** ke `backend`.
3. Set **Start Command** ke: `npm start` atau `node server.js`.
4. Masukkan seluruh variabel *Environment Variables* sesuai yang ada pada `backend/.env.example`.
5. Salin URL publik backend yang dihasilkan (contoh: `https://dokterklik-api.up.railway.app`).

### Portal Pasien & Admin (Vercel)
1. Import repositori di [Vercel](https://vercel.com).
2. Untuk **Frontend (Pasien)**:
   - Tetapkan **Root Directory** ke `frontend`.
   - Tambahkan Environment Variable: `VITE_BACKEND_URL` = URL backend Anda.
   - Klik **Deploy**.
3. Untuk **Admin & Dokter**:
   - Tambahkan *New Project* kedua dari repositori yang sama di Vercel.
   - Tetapkan **Root Directory** ke `admin`.
   - Tambahkan Environment Variable: `VITE_BACKEND_URL` = URL backend Anda.
   - Klik **Deploy**.

---

## 📄 Lisensi
Proyek ini didistribusikan di bawah lisensi [MIT License](LICENSE).
Platform ini ditujukan untuk mempermudah akses layanan telemedicine yang aman, andal, dan terjangkau.
