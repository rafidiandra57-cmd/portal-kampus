# 🎓 SIAKAD Cakrawala - Portal Kampus Fiktif

Portal Akademik Terpadu **Universitas Cakrawala Nusantara (UCN)** yang dirancang untuk keperluan latihan, simulasi perkuliahan, dan pengujian alur peran akademik (*role-based workflow*).

Seluruh akun pengguna, NIM, NIP, nilai, tugas, dan rekam jejak akademik dibuat secara **100% sintetis dan unik** (*tidak ada yang sama*).

---

## 🚀 Fitur Utama Berdasarkan Peran

### 1. 🧑‍🎓 Peran Mahasiswa
- **Dashboard Akademik**: Ringkasan IPK berjalan, total SKS lulus, jadwal kelas semester aktif, dan pengumuman kampus.
- **Kartu Hasil Studi (KHS) & Transkrip Nilai**: Melihat rincian nilai per mata kuliah (komponen Tugas 30%, UTS 30%, UAS 40%), huruf mutu (A, A-, B+, dst.), status kelulusan, serta cetak KHS.
- **Tugas & Praktikum Kuliah**: 
  - Filter status tugas (Semua, Belum Dikumpulkan, Menunggu Penilaian, Sudah Dinilai).
  - Mengunggah berkas tugas mandiri/kelompok (simulasi upload dokumen PDF/ZIP beserta catatan mahasiswa).
  - Melihat hasil koreksi, skor angka (0–100), huruf mutu, dan umpan balik (*feedback*) dari dosen pengampu.
- **Forum Diskusi Kampus**: Membuat topik diskusi baru, mengajukan pertanyaan materi, memberikan tanda suka (*like*), dan membalas tanggapan rekan mahasiswa/dosen.

### 2. 👨‍🏫 Peran Dosen Pengampu
- **Dashboard Dosen**: Pantauan kelas yang diampu, antrean tugas yang perlu dinilai, dan statistik mahasiswa bimbingan.
- **Modul Penilaian & Evaluasi Tugas**:
  - Filter submisi per mata kuliah dan status penilaian.
  - Memeriksa berkas yang diunggah dan membaca catatan mahasiswa.
  - Memberikan skor angka (0–100) dengan konversi otomatis ke huruf mutu (A, B, C, D, E).
  - Memberikan catatan evaluasi/umpan balik konstruktif.
  - Nilai yang disimpan otomatis tersinkronisasi ke KHS dan transkrip mahasiswa secara *real-time*.
- **Kelas & Roster Mahasiswa**: Rekapitulasi daftar seluruh mahasiswa yang terdaftar pada mata kuliah yang diampu.
- **Forum Diskusi**: Membalas pertanyaan mahasiswa dengan lencana resmi *"Jawaban Terverifikasi Dosen"*.

### 3. 🛡️ Peran Administrator
- **Dashboard Kontrol**: Statistik jumlah mahasiswa, dosen aktif, mata kuliah terdaftar, dan kapasitas berkas submisi.
- **Manajemen Akun Pengguna (CRUD Lengkap)**:
  - Pencarian akun berbasis Nama, NIM, NIP, atau Email.
  - Filter daftar pengguna berdasarkan peran (*Mahasiswa, Dosen, Admin*).
  - **Tambah Akun Baru**: Formulir pembuatan akun dengan validasi ketat keunikan NIM/NIP dan email (*Tidak boleh sama*).
  - **Edit Akun**: Memperbarui nama, unit prodi, dan status aktif.
  - **Reset Password**: Menghasilkan kata sandi acak baru untuk pengguna.
  - **Hapus Akun**: Menghapus akun pengguna beserta relasi data tugas/nilai.
  - **Ekspor Data**: Mengunduh seluruh basis data akun dalam format JSON.
- **Manajemen Kurikulum & Mata Kuliah**: Menampilkan rincian alokasi dosen pengampu, bobot SKS, dan jadwal.

---

## 🔑 Daftar Akun Demo Sintetis (1-Klik Login Tersedia)

Seluruh akun menggunakan kata sandi default: `password123`

| Peran | Nama Lengkap | Identitas Unik (NIM / NIP / ID) | Email Resmi | Catatan / Spesialisasi |
|---|---|---|---|---|
| **Mahasiswa** | Dimas Arya Pratama | `2201010145` | `dimas.arya@mhs.cakrawala.ac.id` | Teknik Informatika - Smt 5 (IPK 3.82) |
| **Mahasiswa** | Anindya Putri Rahayu | `2201010198` | `anindya.putri@mhs.cakrawala.ac.id` | Teknik Informatika - Smt 5 (IPK 3.74) |
| **Mahasiswa** | Fajar Gilang Ramadhan | `2201010210` | `fajar.gilang@mhs.cakrawala.ac.id` | Teknik Informatika - Smt 5 (IPK 3.58) |
| **Mahasiswa** | Siti Nurhaliza Azzahra | `2301020088` | `siti.nurhaliza@mhs.cakrawala.ac.id` | Sains Data - Smt 3 (IPK 3.91) |
| **Mahasiswa** | Kevin Julio Sanjaya | `2301030142` | `kevin.julio@mhs.cakrawala.ac.id` | Sistem Informasi - Smt 3 (IPK 3.42) |
| **Dosen** | Dr. Ir. Budi Hartono, M.Sc. | `197805122003121001` | `budi.hartono@cakrawala.ac.id` | Keamanan Siber & Kriptografi |
| **Dosen** | Prof. Dr. Ratna Kusuma Dewi, Ph.D. | `198203152008012002` | `ratna.kusuma@cakrawala.ac.id` | Kecerdasan Buatan & ML |
| **Dosen** | Agung Wicaksono, S.Kom., M.Kom. | `198909242015041003` | `agung.wicaksono@cakrawala.ac.id` | Pemrograman Web Lanjut & Basis Data |
| **Admin** | Rendra Mahendra, S.Kom., M.T. | `ADM-9001202` | `rendra.mahendra@cakrawala.ac.id` | Pusat Teknologi & Informasi |
| **Admin** | Sarah Lestari Wulandari, S.T. | `ADM-9002305` | `sarah.lestari@cakrawala.ac.id` | Registrasi & Kemahasiswaan |

> 💡 **Fitur Ganti Peran Cepat:** Di bagian atas navigasi (*Top Header*), terdapat tombol **"Ganti Peran Latihan"** yang memungkinkan Anda berpindah antar peran (Mahasiswa ↔ Dosen ↔ Admin) secara instan tanpa perlu mengetik ulang login.

---

## 🛠️ Cara Menjalankan Aplikasi

1. Buka berkas [index.html](file:///d:/LATIHAN/index.html) langsung di browser modern Anda (Google Chrome, Microsoft Edge, Mozilla Firefox), **ATAU**
2. Jalankan server lokal:
   ```bash
   python -m http.server 8080
   ```
   Lalu buka tautan: `http://localhost:8080/index.html`

---

## 🎨 Teknologi & Arsitektur
- **Struktur**: Semantik HTML5 dengan aksesibilitas dan SEO optimal.
- **Gaya Tampilan**: Vanilla CSS murni dengan palet warna modern (*Glassmorphism*, Slate Navy & Electric Indigo), tipografi *Plus Jakarta Sans*, tata letak responsif (*Mobile & Desktop*), dan dukungan mode Gelap/Terang (*Dark/Light Mode*).
- **Logika & State**: JavaScript modular dengan persistensi data otomatis menggunakan `localStorage`, kalkulasi IPK dinamis, modal dialog interaktif, dan notifikasi toast.
