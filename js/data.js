/**
 * SINTESIS DATA KAMPUS FIKTIF - UNIVERSITAS CAKRAWALA NUSANTARA (UCN)
 * Seluruh akun, identitas (NIM, NIP, Nama, Email), dan rekaman akademik adalah unik & sintetis.
 */

const INITIAL_CAMPUS_DATA = {
  university: {
    name: "Universitas Cakrawala Nusantara",
    acronym: "UCN",
    faculty: "Fakultas Ilmu Komputer dan Teknologi Digital",
    academicYear: "2026/2027 Ganjil",
    address: "Jl. Cakrawala Digital No. 45, Kota Siber Cyberjaya, Nusantara",
    logoText: "UCN"
  },

  // Pengumuman Kampus
  announcements: [
    {
      id: "ANN-001",
      title: "Jadwal Ujian Tengah Semester (UTS) Semester Ganjil 2026/2027",
      date: "2026-10-14",
      author: "Biro Akademik UCN",
      category: "Akademik",
      content: "Pelaksanaan UTS akan diselenggarakan secara hybrid mulai tanggal 3 November 2026. Mahasiswa diwajibkan memastikan seluruh tugas sebelum batas tanggal tersebut sudah terunggah."
    },
    {
      id: "ANN-002",
      title: "Pendaftaran Workshop: Artificial Intelligence & Cloud Architecture 2026",
      date: "2026-10-12",
      author: "Himpunan Mahasiswa Informatika",
      category: "Workshop",
      content: "Workshop intensif bersama praktisi industri teknologi nasional. Terbuka gratis bagi mahasiswa aktif UCN semester 3 ke atas. Kuota terbatas 100 peserta."
    },
    {
      id: "ANN-003",
      title: "Pemeliharaan Server Portal SIAKAD Terjadwal",
      date: "2026-10-10",
      author: "Unit Pelaksana Teknis TI",
      category: "Sistem",
      content: "Pemeliharaan rutin basis data portal akademik akan dilaksanakan pada hari Minggu, 20 Oktober 2026 pukul 01.00 - 05.00 WIB."
    }
  ],

  // Akun Pengguna Fiktif (Data Unik & Beragam)
  users: [
    // ADMIN (2 Akun Unik)
    {
      id: "usr-admin-1",
      role: "admin",
      username: "admin.rendra",
      password: "password123",
      name: "Rendra Mahendra, S.Kom., M.T.",
      identifier: "ADM-9001202",
      email: "rendra.mahendra@cakrawala.ac.id",
      department: "Pusat Teknologi & Informasi Akademik",
      status: "Aktif",
      avatarBg: "#4f46e5",
      joinedDate: "2022-01-10"
    },
    {
      id: "usr-admin-2",
      role: "admin",
      username: "admin.sarah",
      password: "password123",
      name: "Sarah Lestari Wulandari, S.T.",
      identifier: "ADM-9002305",
      email: "sarah.lestari@cakrawala.ac.id",
      department: "Sub-Bagian Registrasi & Kemahasiswaan",
      status: "Aktif",
      avatarBg: "#0d9488",
      joinedDate: "2023-04-15"
    },

    // DOSEN (3 Dosen Unik Berbeda Mata Kuliah & NIP)
    {
      id: "usr-dosen-1",
      role: "dosen",
      username: "dosen.budi",
      password: "password123",
      name: "Dr. Ir. Budi Hartono, M.Sc.",
      identifier: "197805122003121001", // NIP unik
      email: "budi.hartono@cakrawala.ac.id",
      department: "Teknik Informatika",
      expertise: "Keamanan Siber & Kriptografi",
      status: "Aktif",
      avatarBg: "#0284c7",
      coursesTaught: ["MK-CS-301", "MK-JK-201"],
      joinedDate: "2015-08-01"
    },
    {
      id: "usr-dosen-2",
      role: "dosen",
      username: "dosen.ratna",
      password: "password123",
      name: "Prof. Dr. Ratna Kusuma Dewi, Ph.D.",
      identifier: "198203152008012002", // NIP unik
      email: "ratna.kusuma@cakrawala.ac.id",
      department: "Sains Data & Kecerdasan Buatan",
      expertise: "Machine Learning & Big Data Analytics",
      status: "Aktif",
      avatarBg: "#7c3aed",
      coursesTaught: ["MK-AI-401"],
      joinedDate: "2012-03-10"
    },
    {
      id: "usr-dosen-3",
      role: "dosen",
      username: "dosen.agung",
      password: "password123",
      name: "Agung Wicaksono, S.Kom., M.Kom.",
      identifier: "198909242015041003", // NIP unik
      email: "agung.wicaksono@cakrawala.ac.id",
      department: "Sistem Informasi",
      expertise: "Rekayasa Perangkat Lunak & Web Lanjut",
      status: "Aktif",
      avatarBg: "#ea580c",
      coursesTaught: ["MK-PW-302", "MK-BD-202"],
      joinedDate: "2018-02-15"
    },

    // MAHASISWA (5 Mahasiswa Unik dengan NIM, Prodi, Semester Berbeda)
    {
      id: "usr-mhs-1",
      role: "mahasiswa",
      username: "mhs.dimas",
      password: "password123",
      name: "Dimas Arya Pratama",
      identifier: "2201010145", // NIM unik
      email: "dimas.arya@mhs.cakrawala.ac.id",
      department: "Teknik Informatika",
      semester: 5,
      classGroup: "TI-5A",
      gpa: 3.82,
      totalCredits: 96,
      status: "Aktif",
      avatarBg: "#2563eb",
      academicAdvisor: "Dr. Ir. Budi Hartono, M.Sc.",
      enrolledCourses: ["MK-CS-301", "MK-PW-302", "MK-AI-401", "MK-BD-202"],
      joinedDate: "2022-09-01"
    },
    {
      id: "usr-mhs-2",
      role: "mahasiswa",
      username: "mhs.anindya",
      password: "password123",
      name: "Anindya Putri Rahayu",
      identifier: "2201010198", // NIM unik
      email: "anindya.putri@mhs.cakrawala.ac.id",
      department: "Teknik Informatika",
      semester: 5,
      classGroup: "TI-5A",
      gpa: 3.74,
      totalCredits: 96,
      status: "Aktif",
      academicAdvisor: "Dr. Ir. Budi Hartono, M.Sc.",
      enrolledCourses: ["MK-CS-301", "MK-PW-302", "MK-AI-401"],
      joinedDate: "2022-09-01"
    },
    {
      id: "usr-mhs-3",
      role: "mahasiswa",
      username: "mhs.fajar",
      password: "password123",
      name: "Fajar Gilang Ramadhan",
      identifier: "2201010210", // NIM unik
      email: "fajar.gilang@mhs.cakrawala.ac.id",
      department: "Teknik Informatika",
      semester: 5,
      classGroup: "TI-5B",
      gpa: 3.58,
      totalCredits: 94,
      status: "Aktif",
      academicAdvisor: "Prof. Dr. Ratna Kusuma Dewi, Ph.D.",
      enrolledCourses: ["MK-PW-302", "MK-AI-401", "MK-BD-202"],
      joinedDate: "2022-09-01"
    },
    {
      id: "usr-mhs-4",
      role: "mahasiswa",
      username: "mhs.siti",
      password: "password123",
      name: "Siti Nurhaliza Azzahra",
      identifier: "2301020088", // NIM unik
      email: "siti.nurhaliza@mhs.cakrawala.ac.id",
      department: "Sains Data",
      semester: 3,
      classGroup: "SD-3A",
      gpa: 3.91,
      totalCredits: 54,
      status: "Aktif",
      academicAdvisor: "Prof. Dr. Ratna Kusuma Dewi, Ph.D.",
      enrolledCourses: ["MK-AI-401", "MK-BD-202", "MK-JK-201"],
      joinedDate: "2023-09-01"
    },
    {
      id: "usr-mhs-5",
      role: "mahasiswa",
      username: "mhs.kevin",
      password: "password123",
      name: "Kevin Julio Sanjaya",
      identifier: "2301030142", // NIM unik
      email: "kevin.julio@mhs.cakrawala.ac.id",
      department: "Sistem Informasi",
      semester: 3,
      classGroup: "SI-3B",
      gpa: 3.42,
      totalCredits: 52,
      status: "Aktif",
      academicAdvisor: "Agung Wicaksono, S.Kom., M.Kom.",
      enrolledCourses: ["MK-PW-302", "MK-BD-202", "MK-JK-201"],
      joinedDate: "2023-09-01"
    }
  ],

  // Mata Kuliah Fiktif
  courses: [
    {
      id: "MK-CS-301",
      code: "IF3105",
      name: "Keamanan Siber & Kriptografi",
      credits: 3,
      lecturerId: "usr-dosen-1",
      lecturerName: "Dr. Ir. Budi Hartono, M.Sc.",
      schedule: "Senin, 08.00 - 10.30 WIB (Lab Komputasi A3)",
      color: "#0284c7"
    },
    {
      id: "MK-PW-302",
      code: "IF3201",
      name: "Pemrograman Web Lanjut (Fullstack)",
      credits: 4,
      lecturerId: "usr-dosen-3",
      lecturerName: "Agung Wicaksono, S.Kom., M.Kom.",
      schedule: "Selasa, 13.00 - 16.20 WIB (Lab Multimedia D2)",
      color: "#ea580c"
    },
    {
      id: "MK-AI-401",
      code: "AI4102",
      name: "Kecerdasan Buatan & Pembelajaran Mesin",
      credits: 3,
      lecturerId: "usr-dosen-2",
      lecturerName: "Prof. Dr. Ratna Kusuma Dewi, Ph.D.",
      schedule: "Rabu, 09.30 - 12.00 WIB (Ruang Teori C-204)",
      color: "#7c3aed"
    },
    {
      id: "MK-BD-202",
      code: "SI2203",
      name: "Sistem Basis Data Terdistribusi",
      credits: 3,
      lecturerId: "usr-dosen-3",
      lecturerName: "Agung Wicaksono, S.Kom., M.Kom.",
      schedule: "Kamis, 10.00 - 12.30 WIB (Ruang B-102)",
      color: "#059669"
    },
    {
      id: "MK-JK-201",
      code: "TK2104",
      name: "Infrastruktur Jaringan & Cloud Computing",
      credits: 3,
      lecturerId: "usr-dosen-1",
      lecturerName: "Dr. Ir. Budi Hartono, M.Sc.",
      schedule: "Jumat, 13.30 - 16.00 WIB (Lab Jaringan F1)",
      color: "#0891b2"
    }
  ],

  // Daftar Nilai / Transkrip Mahasiswa (Data Akademik Realistis)
  grades: [
    // Dimas Arya (usr-mhs-1)
    {
      id: "GRD-001",
      studentId: "usr-mhs-1",
      courseId: "MK-CS-301",
      assignmentScore: 88,
      midtermScore: 85,
      finalScore: 90,
      totalScore: 87.8,
      letterGrade: "A",
      gradePoint: 4.0,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-1",
      updatedAt: "2026-10-15 14:20"
    },
    {
      id: "GRD-002",
      studentId: "usr-mhs-1",
      courseId: "MK-PW-302",
      assignmentScore: 92,
      midtermScore: 88,
      finalScore: 89,
      totalScore: 89.7,
      letterGrade: "A",
      gradePoint: 4.0,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-3",
      updatedAt: "2026-10-14 11:30"
    },
    {
      id: "GRD-003",
      studentId: "usr-mhs-1",
      courseId: "MK-AI-401",
      assignmentScore: 80,
      midtermScore: 78,
      finalScore: 82,
      totalScore: 80.2,
      letterGrade: "A-",
      gradePoint: 3.7,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-2",
      updatedAt: "2026-10-11 16:45"
    },
    {
      id: "GRD-004",
      studentId: "usr-mhs-1",
      courseId: "MK-BD-202",
      assignmentScore: 85,
      midtermScore: 83,
      finalScore: 84,
      totalScore: 84.0,
      letterGrade: "A-",
      gradePoint: 3.7,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-3",
      updatedAt: "2026-10-12 09:10"
    },

    // Anindya Putri (usr-mhs-2)
    {
      id: "GRD-005",
      studentId: "usr-mhs-2",
      courseId: "MK-CS-301",
      assignmentScore: 86,
      midtermScore: 82,
      finalScore: 87,
      totalScore: 85.1,
      letterGrade: "A",
      gradePoint: 4.0,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-1",
      updatedAt: "2026-10-15 14:22"
    },
    {
      id: "GRD-006",
      studentId: "usr-mhs-2",
      courseId: "MK-PW-302",
      assignmentScore: 84,
      midtermScore: 80,
      finalScore: 85,
      totalScore: 83.2,
      letterGrade: "A-",
      gradePoint: 3.7,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-3",
      updatedAt: "2026-10-14 11:32"
    },
    {
      id: "GRD-007",
      studentId: "usr-mhs-2",
      courseId: "MK-AI-401",
      assignmentScore: 78,
      midtermScore: 75,
      finalScore: 79,
      totalScore: 77.4,
      letterGrade: "B+",
      gradePoint: 3.3,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-2",
      updatedAt: "2026-10-11 16:47"
    },

    // Fajar Gilang (usr-mhs-3)
    {
      id: "GRD-008",
      studentId: "usr-mhs-3",
      courseId: "MK-PW-302",
      assignmentScore: 76,
      midtermScore: 74,
      finalScore: 80,
      totalScore: 76.8,
      letterGrade: "B+",
      gradePoint: 3.3,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-3",
      updatedAt: "2026-10-14 11:35"
    },
    {
      id: "GRD-009",
      studentId: "usr-mhs-3",
      courseId: "MK-AI-401",
      assignmentScore: 82,
      midtermScore: 79,
      finalScore: 81,
      totalScore: 80.7,
      letterGrade: "A-",
      gradePoint: 3.7,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-2",
      updatedAt: "2026-10-11 16:50"
    },
    {
      id: "GRD-010",
      studentId: "usr-mhs-3",
      courseId: "MK-BD-202",
      assignmentScore: 74,
      midtermScore: 70,
      finalScore: 75,
      totalScore: 73.1,
      letterGrade: "B",
      gradePoint: 3.0,
      semester: "5",
      status: "Lulus",
      updatedBy: "usr-dosen-3",
      updatedAt: "2026-10-12 09:12"
    },

    // Siti Nurhaliza (usr-mhs-4)
    {
      id: "GRD-011",
      studentId: "usr-mhs-4",
      courseId: "MK-AI-401",
      assignmentScore: 95,
      midtermScore: 92,
      finalScore: 94,
      totalScore: 93.7,
      letterGrade: "A",
      gradePoint: 4.0,
      semester: "3",
      status: "Lulus",
      updatedBy: "usr-dosen-2",
      updatedAt: "2026-10-11 16:52"
    },
    {
      id: "GRD-012",
      studentId: "usr-mhs-4",
      courseId: "MK-BD-202",
      assignmentScore: 90,
      midtermScore: 89,
      finalScore: 91,
      totalScore: 90.1,
      letterGrade: "A",
      gradePoint: 4.0,
      semester: "3",
      status: "Lulus",
      updatedBy: "usr-dosen-3",
      updatedAt: "2026-10-12 09:14"
    },
    {
      id: "GRD-013",
      studentId: "usr-mhs-4",
      courseId: "MK-JK-201",
      assignmentScore: 88,
      midtermScore: 86,
      finalScore: 89,
      totalScore: 87.8,
      letterGrade: "A",
      gradePoint: 4.0,
      semester: "3",
      status: "Lulus",
      updatedBy: "usr-dosen-1",
      updatedAt: "2026-10-15 14:25"
    },

    // Kevin Julio (usr-mhs-5)
    {
      id: "GRD-014",
      studentId: "usr-mhs-5",
      courseId: "MK-PW-302",
      assignmentScore: 72,
      midtermScore: 70,
      finalScore: 75,
      totalScore: 72.5,
      letterGrade: "B",
      gradePoint: 3.0,
      semester: "3",
      status: "Lulus",
      updatedBy: "usr-dosen-3",
      updatedAt: "2026-10-14 11:38"
    },
    {
      id: "GRD-015",
      studentId: "usr-mhs-5",
      courseId: "MK-BD-202",
      assignmentScore: 76,
      midtermScore: 74,
      finalScore: 78,
      totalScore: 76.2,
      letterGrade: "B+",
      gradePoint: 3.3,
      semester: "3",
      status: "Lulus",
      updatedBy: "usr-dosen-3",
      updatedAt: "2026-10-12 09:16"
    },
    {
      id: "GRD-016",
      studentId: "usr-mhs-5",
      courseId: "MK-JK-201",
      assignmentScore: 70,
      midtermScore: 68,
      finalScore: 72,
      totalScore: 70.1,
      letterGrade: "B",
      gradePoint: 3.0,
      semester: "3",
      status: "Lulus",
      updatedBy: "usr-dosen-1",
      updatedAt: "2026-10-15 14:27"
    }
  ],

  // Tugas Kuliah (Dibuat oleh Dosen)
  assignments: [
    {
      id: "TSK-001",
      courseId: "MK-CS-301",
      title: "Tugas 1: Analisis Kerentanan Web & Enkripsi RSA",
      description: "Lakukan demonstrasi implementasi kriptografi asimetris RSA pada pertukaran kunci rahasia. Sertakan skema diagram, source code (Python / Node.js), dan penjelasan keamanan.",
      deadline: "2026-10-24 23:59",
      maxScore: 100,
      createdBy: "usr-dosen-1",
      createdAt: "2026-10-10 09:00",
      allowedFileTypes: ".pdf, .zip, .tar.gz",
      maxFileSizeMb: 25
    },
    {
      id: "TSK-002",
      courseId: "MK-PW-302",
      title: "Tugas 2: Pembangunan REST API & Arsitektur Microservices",
      description: "Buat arsitektur backend REST API dengan JWT Authentication, caching Redis, dan database ORM. Kumpulkan laporan dokumentasi API (Swagger/Postman) beserta link repository GitHub.",
      deadline: "2026-10-28 23:59",
      maxScore: 100,
      createdBy: "usr-dosen-3",
      createdAt: "2026-10-12 11:00",
      allowedFileTypes: ".pdf, .zip",
      maxFileSizeMb: 30
    },
    {
      id: "TSK-003",
      courseId: "MK-AI-401",
      title: "Tugas 3: Fine-Tuning Transformer & Sentimen Analysis NLP",
      description: "Implementasikan model klasifikasi teks sentimen bahasa Indonesia menggunakan IndoBERT atau model transformer lainnya. Jelaskan metriks F1-score, precision, and confusion matrix.",
      deadline: "2026-11-02 23:59",
      maxScore: 100,
      createdBy: "usr-dosen-2",
      createdAt: "2026-10-13 14:00",
      allowedFileTypes: ".ipynb, .pdf, .zip",
      maxFileSizeMb: 50
    },
    {
      id: "TSK-004",
      courseId: "MK-BD-202",
      title: "Tugas 1: Perancangan Sharding & Replikasi MongoDB Cluster",
      description: "Simulasikan replika set dan sharding database dengan 3 node virtual. Ukur latensi query sebelum dan sesudah sharding.",
      deadline: "2026-10-22 23:59",
      maxScore: 100,
      createdBy: "usr-dosen-3",
      createdAt: "2026-10-08 10:00",
      allowedFileTypes: ".pdf",
      maxFileSizeMb: 15
    }
  ],

  // Pengumpulan Tugas (Submissions) Mahasiswa
  submissions: [
    {
      id: "SUB-001",
      assignmentId: "TSK-001",
      studentId: "usr-mhs-1", // Dimas Arya
      submittedAt: "2026-10-14 19:42",
      fileName: "Tugas1_Kripto_RSA_DimasArya_2201010145.pdf",
      fileSize: "3.4 MB",
      notes: "Pak Budi, berikut implementasi RSA menggunakan modul Python Cryptography dengan pengujian key size 2048-bit dan benchmark timing attack mitigasi.",
      fileUrl: "#mock-download",
      status: "graded", // 'submitted' | 'graded'
      grade: 92,
      letterGrade: "A",
      feedback: "Implementasi sangat terstruktur dan detail. Analisis mitigasi timing attack dijelaskan dengan sangat baik. Pertahankan!",
      gradedBy: "usr-dosen-1",
      gradedAt: "2026-10-15 14:15"
    },
    {
      id: "SUB-002",
      assignmentId: "TSK-001",
      studentId: "usr-mhs-2", // Anindya Putri
      submittedAt: "2026-10-15 08:30",
      fileName: "RSA_Implementation_Anindya_2201010198.zip",
      fileSize: "8.1 MB",
      notes: "Sudah menyertakan video demonstrasi eksekusi terminal dan laporan evaluasi format IEEE.",
      fileUrl: "#mock-download",
      status: "graded",
      grade: 88,
      letterGrade: "A",
      feedback: "Hasil rapi, implementasi modul matematis mod-inverse berjalan baik. Saran: tambahkan penjelasan entropy random seed.",
      gradedBy: "usr-dosen-1",
      gradedAt: "2026-10-15 15:00"
    },
    {
      id: "SUB-003",
      assignmentId: "TSK-002",
      studentId: "usr-mhs-1", // Dimas Arya
      submittedAt: "2026-10-16 10:15",
      fileName: "Backend_Microservice_Dimas_2201010145.zip",
      fileSize: "12.3 MB",
      notes: "Pak Agung, tugas API sudah dilengkapi Docker Compose dan Postman collection lengkap dengan automated test.",
      fileUrl: "#mock-download",
      status: "submitted", // Belum dinilai dosen (bisa dinilai oleh dosen saat demo)
      grade: null,
      letterGrade: null,
      feedback: null,
      gradedBy: null,
      gradedAt: null
    },
    {
      id: "SUB-004",
      assignmentId: "TSK-002",
      studentId: "usr-mhs-3", // Fajar Gilang
      submittedAt: "2026-10-16 14:20",
      fileName: "Tugas2_REST_API_FajarGilang_2201010210.pdf",
      fileSize: "4.2 MB",
      notes: "Implementasi JWT dan Express.js sudah selesai, mohon koreksinya jika ada kekurangan pada struktur middleware.",
      fileUrl: "#mock-download",
      status: "submitted", // Belum dinilai
      grade: null,
      letterGrade: null,
      feedback: null,
      gradedBy: null,
      gradedAt: null
    },
    {
      id: "SUB-005",
      assignmentId: "TSK-004",
      studentId: "usr-mhs-4", // Siti Nurhaliza
      submittedAt: "2026-10-13 16:50",
      fileName: "Sharding_MongoDB_Cluster_Siti_2301020088.pdf",
      fileSize: "2.8 MB",
      notes: "Konfigurasi sharding pada 3 mongos router berhasil dan latensi menurun hingga 35%. Laporan telah mencakup grafik performa.",
      fileUrl: "#mock-download",
      status: "graded",
      grade: 95,
      letterGrade: "A",
      feedback: "Eksperimen sangat mendalam dengan visualisasi latensi yang komprehensif. Kerja luar biasa!",
      gradedBy: "usr-dosen-3",
      gradedAt: "2026-10-14 10:30"
    }
  ],

  // Forum Diskusi Kampus (Threads & Balasan)
  discussions: [
    {
      id: "FORUM-001",
      title: "Solusi Error OpenSSL saat Generate Key RSA 4096-bit pada Tugas 1?",
      category: "Keamanan Siber & Kriptografi",
      courseId: "MK-CS-301",
      authorId: "usr-mhs-2", // Anindya
      authorName: "Anindya Putri Rahayu",
      authorRole: "mahasiswa",
      authorAvatarBg: "#4338ca",
      createdAt: "2026-10-13 15:30",
      content: "Halo teman-teman dan Pak Budi, saya mencoba generate pair key RSA 4096-bit di environment Ubuntu WSL, tapi sering muncul error `OpenSSL error: EVP_PKEY_keygen`. Apakah ada pengaturan memory limit tertentu yang perlu disesuaikan?",
      likes: 6,
      likedBy: ["usr-mhs-1", "usr-mhs-3", "usr-dosen-1"],
      replies: [
        {
          id: "REP-001",
          authorId: "usr-mhs-1",
          authorName: "Dimas Arya Pratama",
          authorRole: "mahasiswa",
          authorAvatarBg: "#2563eb",
          createdAt: "2026-10-13 16:15",
          content: "Halo Anin, kemarin saya juga sempat mengalami ini. Ternyata masalahnya ada di parameter `BN_new()` jika kita memodifikasi library C-nya langsung. Kalau lewat Python module `cryptography`, pastikan versi rust compiler sudah update.",
          likes: 3,
          isVerifiedAnswer: false
        },
        {
          id: "REP-002",
          authorId: "usr-dosen-1",
          authorName: "Dr. Ir. Budi Hartono, M.Sc.",
          authorRole: "dosen",
          authorAvatarBg: "#0284c7",
          createdAt: "2026-10-13 18:00",
          content: "Penjelasan Dimas sudah tepat. Tambahan dari saya: jika menggunakan WSL 2, pastikan alokasi `.wslconfig` minimal 4GB RAM karena proses komputasi prime generator 4096-bit membutuhkan iterasi Miller-Rabin yang cukup intensif.",
          likes: 8,
          isVerifiedAnswer: true // Verified by lecturer
        }
      ]
    },
    {
      id: "FORUM-002",
      title: "Rekomendasi Hyperparameter Batch Size untuk Fine-Tuning IndoBERT?",
      category: "Kecerdasan Buatan & ML",
      courseId: "MK-AI-401",
      authorId: "usr-mhs-1", // Dimas
      authorName: "Dimas Arya Pratama",
      authorRole: "mahasiswa",
      authorAvatarBg: "#2563eb",
      createdAt: "2026-10-14 11:20",
      content: "Untuk tugas sentimen analisis NLP, saya mencoba batch size 16 vs 32 di GPU T4 Google Colab. Dengan batch size 32 sering terjadi CUDA Out of Memory. Apakah penggunaan Gradient Accumulation steps = 2 bisa menyamai efek batch size 32 tanpa OOM?",
      likes: 5,
      likedBy: ["usr-mhs-4", "usr-dosen-2"],
      replies: [
        {
          id: "REP-003",
          authorId: "usr-dosen-2",
          authorName: "Prof. Dr. Ratna Kusuma Dewi, Ph.D.",
          authorRole: "dosen",
          authorAvatarBg: "#7c3aed",
          createdAt: "2026-10-14 13:45",
          content: "Benar sekali, Dimas. Gradient Accumulation adalah teknik standar industri saat memory GPU terbatas. Anda bisa gunakan batch size 16 dengan `gradient_accumulation_steps=2` atau `4`. Jangan lupa gunakan optimizer `AdamW` dengan learning rate warmup 10%.",
          likes: 7,
          isVerifiedAnswer: true
        },
        {
          id: "REP-004",
          authorId: "usr-mhs-4",
          authorName: "Siti Nurhaliza Azzahra",
          authorRole: "mahasiswa",
          authorAvatarBg: "#059669",
          createdAt: "2026-10-14 14:10",
          content: "Terima kasih banyak Bu Ratna dan Kak Dimas! Saya juga sedang eksperimen dengan fp16 (mixed precision training), hasilnya proses training jadi 2x lebih cepat di Colab.",
          likes: 4,
          isVerifiedAnswer: false
        }
      ]
    },
    {
      id: "FORUM-003",
      title: "Tips Pembagian Struktur Folder Clean Architecture di Node.js Express",
      category: "Pemrograman Web Lanjut",
      courseId: "MK-PW-302",
      authorId: "usr-mhs-3", // Fajar
      authorName: "Fajar Gilang Ramadhan",
      authorRole: "mahasiswa",
      authorAvatarBg: "#d97706",
      createdAt: "2026-10-15 09:15",
      content: "Pak Agung dan rekan-rekan, untuk Tugas 2 REST API, apakah controller sebaiknya hanya mengurus HTTP request/response saja, sedangkan business logic seluruhnya ditarik ke Service Layer? Bagaimana dengan Repository Pattern?",
      likes: 4,
      likedBy: ["usr-mhs-1", "usr-dosen-3"],
      replies: [
        {
          id: "REP-005",
          authorId: "usr-dosen-3",
          authorName: "Agung Wicaksono, S.Kom., M.Kom.",
          authorRole: "dosen",
          authorAvatarBg: "#ea580c",
          createdAt: "2026-10-15 10:40",
          content: "Tepat sekali, Fajar. Pisahkan menjadi 3 layer utama: Controller (validasi input & HTTP status), Service (aturan bisnis/kalkulasi), dan Repository (query database/ORM). Pola ini akan sangat mempermudah Anda saat membuat Unit Test.",
          likes: 6,
          isVerifiedAnswer: true
        }
      ]
    }
  ]
};

// Ekspor ke window global untuk diakses oleh app.js
window.INITIAL_CAMPUS_DATA = INITIAL_CAMPUS_DATA;
