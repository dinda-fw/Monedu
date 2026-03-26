// Learning Materials Data
export interface Material {
  id: string
  title: string
  description: string
  category: "pengelolaan-uang" | "menabung" | "investasi"
  icon: string
  image: string
  lessons: Lesson[]
  xpReward: number
  coinReward: number
}

export interface Lesson {
  id: string
  title: string
  content: string
  duration: string
}

export const materials: Material[] = [
  {
    id: "pengelolaan-uang",
    title: "Pengelolaan Uang",
    description: "Pelajari cara mengelola keuangan pribadi dengan bijak, mulai dari membuat anggaran hingga memahami perbedaan antara kebutuhan dan keinginan.",
    category: "pengelolaan-uang",
    icon: "wallet",
    image: "/Icon-pengelolaan.png",
    xpReward: 100,
    coinReward: 10,
    lessons: [
      {
        id: "pengelolaan-1",
        title: "Membuat Anggaran Harian",
        duration: "10 menit",
        content: `
# Membuat Anggaran Harian

Anggaran adalah rencana keuangan yang membantu kamu mengatur uang dengan lebih baik. Dengan anggaran, kamu bisa tahu ke mana uangmu pergi setiap hari.

## Langkah-langkah Membuat Anggaran

### 1. Catat Semua Pemasukan
Tulis semua uang yang kamu terima:
- Uang saku dari orang tua
- Uang dari pekerjaan paruh waktu
- Hadiah atau bonus

### 2. Kategorikan Pengeluaran
Bagi pengeluaranmu menjadi beberapa kategori:
- **Kebutuhan**: Makan, transportasi, alat sekolah
- **Keinginan**: Jajan, hiburan, belanja online
- **Tabungan**: Sisihkan minimal 20%

### 3. Aturan 50/30/20
Metode sederhana untuk mengatur uang:
- **50%** untuk kebutuhan pokok
- **30%** untuk keinginan
- **20%** untuk tabungan

## Tips Praktis
1. Gunakan aplikasi atau buku catatan
2. Review anggaran setiap minggu
3. Sesuaikan jika ada perubahan
4. Jangan lupa reward diri sendiri!

## Contoh Anggaran Harian
Jika uang saku Rp 50.000/hari:
- Makan: Rp 25.000 (50%)
- Jajan/Hiburan: Rp 15.000 (30%)
- Tabungan: Rp 10.000 (20%)
        `
      },
      {
        id: "pengelolaan-2",
        title: "Memahami Uang vs Kredit",
        duration: "8 menit",
        content: `
# Memahami Uang vs Kredit

Memahami perbedaan antara uang tunai dan kredit sangat penting untuk kesehatan keuanganmu.

## Apa itu Uang Tunai?
Uang tunai adalah uang yang benar-benar kamu miliki:
- Uang di dompet
- Saldo di rekening bank
- Uang yang sudah kamu kumpulkan

**Kelebihan:**
- Tidak ada hutang
- Mudah mengontrol pengeluaran
- Tidak ada bunga

## Apa itu Kredit?
Kredit adalah meminjam uang untuk digunakan sekarang dan dibayar nanti:
- Kartu kredit
- Paylater
- Pinjaman online

**Risiko:**
- Bisa menumpuk hutang
- Ada bunga yang harus dibayar
- Sulit mengontrol pengeluaran

## Kapan Menggunakan Kredit?
Kredit bisa berguna untuk:
- Keadaan darurat
- Investasi pendidikan
- Pembelian besar yang terencana

**INGAT:** Hanya gunakan kredit jika yakin bisa membayar!

## Tips Bijak
1. Prioritaskan uang tunai
2. Hindari paylater untuk barang tidak penting
3. Jika pakai kredit, bayar tepat waktu
4. Jangan pinjam untuk gaya hidup
        `
      }
    ]
  },
  {
    id: "menabung",
    title: "Menabung",
    description: "Kuasai seni menabung! Pelajari berbagai strategi dana darurat, memilih jenis tabungan yang tepat, dan cara konsisten menabung.",
    category: "menabung",
    icon: "piggy-bank",
    image: "/Icon-menabung.png",
    xpReward: 100,
    coinReward: 10,
    lessons: [
      {
        id: "menabung-1",
        title: "Strategi Dana Darurat",
        duration: "12 menit",
        content: `
# Strategi Dana Darurat

Dana darurat adalah uang yang disisihkan untuk keadaan tidak terduga. Ini adalah fondasi penting dalam keuangan pribadi.

## Mengapa Dana Darurat Penting?
- Keamanan finansial saat ada masalah
- Tidak perlu berhutang saat darurat
- Ketenangan pikiran
- Fleksibilitas dalam mengambil keputusan

## Berapa Banyak yang Dibutuhkan?
**Untuk pelajar/mahasiswa:**
- Minimal 3x pengeluaran bulanan
- Idealnya 6x pengeluaran bulanan

**Contoh:**
Jika pengeluaran Rp 1.500.000/bulan
- Minimal: Rp 4.500.000
- Ideal: Rp 9.000.000

## Cara Membangun Dana Darurat

### 1. Mulai dari Kecil
- Sisihkan Rp 10.000-50.000 per hari
- Konsistensi lebih penting dari jumlah

### 2. Otomatiskan Tabungan
- Auto-debit setelah terima uang
- Pisahkan rekening khusus

### 3. Simpan Uang "Tak Terduga"
- THR atau bonus
- Cashback belanja
- Uang kembalian

## Tips Menjaga Dana Darurat
1. Jangan sentuh kecuali darurat
2. Simpan di tempat yang mudah diakses
3. Isi kembali setelah digunakan
        `
      },
      {
        id: "menabung-2",
        title: "Memilih Jenis Tabungan",
        duration: "10 menit",
        content: `
# Memilih Jenis Tabungan yang Tepat

Ada berbagai jenis tabungan dengan karakteristik berbeda. Pilih yang sesuai dengan tujuanmu!

## Jenis-jenis Tabungan

### 1. Tabungan Reguler
**Cocok untuk:** Kebutuhan sehari-hari
- Bebas setor dan tarik
- Bunga kecil (0.5-1% per tahun)
- Ada biaya admin bulanan

### 2. Tabungan Rencana
**Cocok untuk:** Tujuan jangka menengah
- Setoran rutin setiap bulan
- Bunga lebih tinggi (2-4%)
- Ada penalti jika ditarik sebelum jatuh tempo

### 3. Deposito
**Cocok untuk:** Simpanan jangka panjang
- Uang dikunci selama periode tertentu
- Bunga paling tinggi (3-6%)
- Tidak bisa ditarik sewaktu-waktu

### 4. Tabungan Pelajar/Mahasiswa
**Cocok untuk:** Kamu!
- Tanpa biaya admin
- Setoran awal rendah
- Fitur edukasi keuangan

## Cara Memilih
1. **Tentukan tujuan** - Untuk apa menabung?
2. **Cek biaya** - Admin, transfer, tarik tunai
3. **Bandingkan bunga** - Semakin tinggi semakin baik
4. **Kemudahan akses** - Mobile banking, ATM

## Tips
- Punya minimal 2 tabungan: harian & darurat
- Manfaatkan promo pembukaan rekening
- Baca syarat dan ketentuan dengan teliti
        `
      }
    ]
  },
  {
    id: "investasi",
    title: "Investasi Dasar",
    description: "Kenali dunia investasi! Pelajari apa itu saham, risiko investasi, dan cara menghitung potensi keuntungan sebagai investor pemula.",
    category: "investasi",
    icon: "trending-up",
    image: "/Icon-investasi.png",
    xpReward: 150,
    coinReward: 15,
    lessons: [
      {
        id: "investasi-1",
        title: "Apa itu Saham & Risiko Investasi",
        duration: "15 menit",
        content: `
# Apa itu Saham & Risiko Investasi

Investasi adalah cara membuat uangmu bekerja untukmu. Mari pelajari dasar-dasarnya!

## Apa itu Saham?
Saham adalah bukti kepemilikan sebagian kecil dari sebuah perusahaan.

**Contoh sederhana:**
Bayangkan sebuah warung bakso dibagi jadi 100 bagian.
Jika kamu punya 1 bagian = kamu punya 1% warung bakso tersebut!

## Keuntungan dari Saham

### 1. Capital Gain
Selisih harga jual - harga beli
- Beli saham Rp 1.000
- Jual di Rp 1.500
- Keuntungan: Rp 500 (50%)

### 2. Dividen
Pembagian keuntungan perusahaan ke pemegang saham
- Dibayar biasanya setahun sekali
- Tidak semua perusahaan bagi dividen

## Risiko Investasi

### 1. Risiko Pasar
Harga saham bisa turun karena:
- Kondisi ekonomi buruk
- Berita negatif
- Sentimen investor

### 2. Risiko Likuiditas
Kesulitan menjual investasi dengan cepat

### 3. Risiko Perusahaan
Perusahaan bisa rugi atau bangkrut

## Prinsip Penting
- **High Risk, High Return** - Potensi untung besar = risiko besar
- **Diversifikasi** - Jangan taruh semua telur di satu keranjang
- **Investasi jangka panjang** - Waktu adalah temanmu
        `
      },
      {
        id: "investasi-2",
        title: "Menghitung Risiko & Keuntungan",
        duration: "12 menit",
        content: `
# Menghitung Risiko & Keuntungan

Belajar menghitung potensi investasimu agar bisa membuat keputusan yang tepat.

## Return (Keuntungan)

### Rumus Dasar
**Return = ((Nilai Akhir - Nilai Awal) / Nilai Awal) x 100%**

**Contoh:**
- Investasi awal: Rp 1.000.000
- Nilai sekarang: Rp 1.200.000
- Return = ((1.200.000 - 1.000.000) / 1.000.000) x 100%
- Return = 20%

## Compound Interest (Bunga Majemuk)
Ini adalah "keajaiban" investasi - bunga dari bunga!

**Rumus:**
A = P (1 + r)^n

- A = Nilai akhir
- P = Modal awal
- r = Return per periode
- n = Jumlah periode

**Contoh:**
Rp 1.000.000 dengan return 10% per tahun selama 5 tahun:
- Tahun 1: Rp 1.100.000
- Tahun 2: Rp 1.210.000
- Tahun 3: Rp 1.331.000
- Tahun 4: Rp 1.464.100
- Tahun 5: Rp 1.610.510

## Risk-Reward Ratio
Perbandingan potensi rugi vs potensi untung

**Contoh:**
- Potensi rugi: Rp 100.000
- Potensi untung: Rp 300.000
- Risk-Reward = 1:3 (Bagus!)

**Aturan umum:** Minimal 1:2

## Tips untuk Pemula
1. Mulai dengan modal kecil
2. Pelajari sebelum investasi
3. Jangan investasi uang darurat
4. Sabar dan konsisten
        `
      }
    ]
  }
]

// Quiz Data
export interface Quiz {
  id: string
  title: string
  description: string
  category: "pengelolaan-uang" | "menabung" | "investasi"
  questions: QuizQuestion[]
  xpReward: number
  coinReward: number
  timeLimit: number // in seconds
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export const quizzes: Quiz[] = [
  {
    id: "quiz-pengelolaan",
    title: "Kuis Pengelolaan Uang",
    description: "Uji pemahamanmu tentang pengelolaan uang dengan kuis interaktif ini!",
    category: "pengelolaan-uang",
    xpReward: 50,
    coinReward: 5,
    timeLimit: 300,
    questions: [
      {
        id: "q1",
        question: "Menurut aturan 50/30/20, berapa persen yang sebaiknya dialokasikan untuk tabungan?",
        options: ["10%", "20%", "30%", "50%"],
        correctAnswer: 1,
        explanation: "Aturan 50/30/20 menyarankan 50% untuk kebutuhan, 30% untuk keinginan, dan 20% untuk tabungan."
      },
      {
        id: "q2",
        question: "Apa perbedaan utama antara kebutuhan dan keinginan?",
        options: [
          "Kebutuhan lebih mahal dari keinginan",
          "Kebutuhan adalah hal yang harus dipenuhi untuk hidup, keinginan adalah hal yang diinginkan tapi tidak wajib",
          "Tidak ada perbedaan",
          "Keinginan lebih penting dari kebutuhan"
        ],
        correctAnswer: 1,
        explanation: "Kebutuhan adalah hal-hal esensial seperti makan dan transportasi, sedangkan keinginan adalah hal yang membuat hidup lebih nyaman tapi tidak wajib."
      },
      {
        id: "q3",
        question: "Apa risiko utama menggunakan paylater atau kartu kredit?",
        options: [
          "Tidak ada risiko",
          "Lebih mudah berbelanja",
          "Bisa menumpuk hutang dan ada bunga yang harus dibayar",
          "Uang lebih cepat habis"
        ],
        correctAnswer: 2,
        explanation: "Kredit bisa menumpuk hutang jika tidak dikelola dengan baik, dan ada bunga yang harus dibayar jika telat."
      },
      {
        id: "q4",
        question: "Langkah pertama dalam membuat anggaran adalah?",
        options: [
          "Langsung menabung",
          "Mencatat semua pemasukan",
          "Belanja kebutuhan",
          "Membayar hutang"
        ],
        correctAnswer: 1,
        explanation: "Langkah pertama adalah mengetahui berapa banyak uang yang kamu miliki dengan mencatat semua pemasukan."
      },
      {
        id: "q5",
        question: "Seberapa sering sebaiknya kamu mereview anggaranmu?",
        options: [
          "Setiap tahun",
          "Setiap bulan",
          "Setiap minggu",
          "Tidak perlu direview"
        ],
        correctAnswer: 2,
        explanation: "Review mingguan membantu kamu tetap on track dan bisa menyesuaikan jika ada perubahan."
      }
    ]
  },
  {
    id: "quiz-menabung",
    title: "Kuis Menabung",
    description: "Uji pengetahuanmu tentang strategi menabung dan jenis tabungan!",
    category: "menabung",
    xpReward: 50,
    coinReward: 5,
    timeLimit: 300,
    questions: [
      {
        id: "q1",
        question: "Berapa minimal dana darurat yang direkomendasikan untuk pelajar/mahasiswa?",
        options: [
          "1x pengeluaran bulanan",
          "3x pengeluaran bulanan",
          "12x pengeluaran bulanan",
          "Tidak perlu dana darurat"
        ],
        correctAnswer: 1,
        explanation: "Minimal 3x pengeluaran bulanan, idealnya 6x untuk keamanan finansial yang lebih baik."
      },
      {
        id: "q2",
        question: "Jenis tabungan mana yang memberikan bunga paling tinggi?",
        options: [
          "Tabungan reguler",
          "Tabungan pelajar",
          "Deposito",
          "Tabungan rencana"
        ],
        correctAnswer: 2,
        explanation: "Deposito biasanya memberikan bunga tertinggi karena uang dikunci untuk periode tertentu."
      },
      {
        id: "q3",
        question: "Apa yang dimaksud dengan 'otomatiskan tabungan'?",
        options: [
          "Menabung saat ingat",
          "Auto-debit ke rekening tabungan setelah terima uang",
          "Menyimpan uang di bawah kasur",
          "Meminjam untuk menabung"
        ],
        correctAnswer: 1,
        explanation: "Otomatisasi tabungan berarti mengatur auto-debit agar tabungan dilakukan secara rutin tanpa perlu diingat-ingat."
      },
      {
        id: "q4",
        question: "Kapan dana darurat boleh digunakan?",
        options: [
          "Untuk beli gadget baru",
          "Saat ada diskon besar",
          "Hanya untuk keadaan darurat yang tidak terduga",
          "Untuk liburan"
        ],
        correctAnswer: 2,
        explanation: "Dana darurat hanya untuk keadaan darurat seperti sakit, kehilangan penghasilan, atau kebutuhan mendesak lainnya."
      },
      {
        id: "q5",
        question: "Keuntungan utama tabungan pelajar/mahasiswa adalah?",
        options: [
          "Bunga paling tinggi",
          "Bisa investasi saham",
          "Tanpa biaya admin dan setoran awal rendah",
          "Bisa kredit tanpa bunga"
        ],
        correctAnswer: 2,
        explanation: "Tabungan pelajar dirancang khusus dengan tanpa biaya admin dan setoran awal yang rendah agar mudah diakses."
      }
    ]
  },
  {
    id: "quiz-investasi",
    title: "Kuis Investasi Dasar",
    description: "Uji pemahamanmu tentang dasar-dasar investasi!",
    category: "investasi",
    xpReward: 75,
    coinReward: 8,
    timeLimit: 360,
    questions: [
      {
        id: "q1",
        question: "Apa yang dimaksud dengan saham?",
        options: [
          "Pinjaman ke perusahaan",
          "Bukti kepemilikan sebagian dari perusahaan",
          "Tabungan di bank",
          "Uang tunai"
        ],
        correctAnswer: 1,
        explanation: "Saham adalah bukti kepemilikan sebagian kecil dari sebuah perusahaan."
      },
      {
        id: "q2",
        question: "Apa arti 'High Risk, High Return'?",
        options: [
          "Investasi aman selalu untung besar",
          "Semakin tinggi risiko, semakin besar potensi keuntungan",
          "Investasi tidak ada risikonya",
          "Hanya orang kaya yang bisa investasi"
        ],
        correctAnswer: 1,
        explanation: "Prinsip ini berarti investasi dengan potensi keuntungan besar biasanya memiliki risiko yang besar juga."
      },
      {
        id: "q3",
        question: "Apa itu diversifikasi dalam investasi?",
        options: [
          "Menaruh semua uang di satu saham",
          "Menyebar investasi ke berbagai instrumen untuk mengurangi risiko",
          "Investasi hanya di deposito",
          "Tidak berinvestasi sama sekali"
        ],
        correctAnswer: 1,
        explanation: "Diversifikasi adalah strategi menyebar investasi ke berbagai instrumen agar risiko tidak terkonsentrasi di satu tempat."
      },
      {
        id: "q4",
        question: "Jika kamu beli saham Rp 1.000 dan jual Rp 1.500, berapa persen returnnya?",
        options: ["25%", "50%", "75%", "100%"],
        correctAnswer: 1,
        explanation: "Return = ((1.500 - 1.000) / 1.000) x 100% = 50%"
      },
      {
        id: "q5",
        question: "Apa itu dividen?",
        options: [
          "Biaya membeli saham",
          "Pembagian keuntungan perusahaan ke pemegang saham",
          "Kerugian investasi",
          "Pajak investasi"
        ],
        correctAnswer: 1,
        explanation: "Dividen adalah pembagian sebagian keuntungan perusahaan kepada para pemegang saham."
      },
      {
        id: "q6",
        question: "Berapa risk-reward ratio minimum yang disarankan?",
        options: ["1:1", "1:2", "2:1", "3:1"],
        correctAnswer: 1,
        explanation: "Risk-reward ratio minimal 1:2 berarti potensi keuntungan setidaknya 2x lipat dari potensi kerugian."
      }
    ]
  }
]

// Challenge Data
export interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly" | "special"
  tasks: ChallengeTask[]
  xpReward: number
  coinReward: number
  deadline: string
  requirement: number
}

export interface ChallengeTask {
  id: string
  title: string
  completed: boolean
}

export const challenges: Challenge[] = [
  {
    id: "challenge-daily-1",
    title: "Catat Pengeluaran Hari Ini",
    description: "Catat semua pengeluaranmu hari ini untuk membangun kebiasaan tracking keuangan.",
    type: "daily",
    xpReward: 25,
    coinReward: 3,
    requirement: 50,
    deadline: "24 jam",
    tasks: [
      { id: "t1", title: "Catat minimal 3 pengeluaran", completed: false },
      { id: "t2", title: "Kategorikan setiap pengeluaran", completed: false },
      { id: "t3", title: "Hitung total pengeluaran", completed: false }
    ]
  },
  {
    id: "challenge-weekly-1",
    title: "Tantangan Menabung Mingguan",
    description: "Sisihkan uang setiap hari selama seminggu untuk membangun kebiasaan menabung.",
    type: "weekly",
    xpReward: 100,
    coinReward: 15,
    requirement: 150,
    deadline: "7 hari",
    tasks: [
      { id: "t1", title: "Tentukan target tabungan mingguan", completed: false },
      { id: "t2", title: "Sisihkan uang di hari ke-1", completed: false },
      { id: "t3", title: "Sisihkan uang di hari ke-3", completed: false },
      { id: "t4", title: "Sisihkan uang di hari ke-5", completed: false },
      { id: "t5", title: "Sisihkan uang di hari ke-7", completed: false },
      { id: "t6", title: "Review dan hitung total", completed: false }
    ]
  },
  {
    id: "challenge-monthly-1",
    title: "Buat Anggaran Bulanan",
    description: "Buat anggaran lengkap untuk bulan ini dan pantau pengeluaranmu.",
    type: "monthly",
    xpReward: 250,
    coinReward: 30,
    requirement: 300,
    deadline: "30 hari",
    tasks: [
      { id: "t1", title: "Hitung total pemasukan bulanan", completed: false },
      { id: "t2", title: "Buat kategori pengeluaran", completed: false },
      { id: "t3", title: "Alokasikan budget per kategori", completed: false },
      { id: "t4", title: "Catat pengeluaran minggu 1", completed: false },
      { id: "t5", title: "Catat pengeluaran minggu 2", completed: false },
      { id: "t6", title: "Review tengah bulan", completed: false },
      { id: "t7", title: "Catat pengeluaran minggu 3-4", completed: false },
      { id: "t8", title: "Evaluasi akhir bulan", completed: false }
    ]
  },
  {
    id: "challenge-special-1",
    title: "Tantangan Spesial: Jadikan Tabungan Otomatis",
    description: "Atur tabungan otomatis hari ini, dan kumpulkan +20 koin serta +100 XP.",
    type: "special",
    xpReward: 100,
    coinReward: 20,
    requirement: 100,
    deadline: "7 hari",
    tasks: [
      { id: "t1", title: "Buat target tabungan harian", completed: false },
      { id: "t2", title: "Atur transfer otomatis", completed: false },
      { id: "t3", title: "Cek hasil tabungan", completed: false }
    ]
  }
]

// Leaderboard Data
export interface LeaderboardEntry {
  id: string
  name: string
  avatar?: string
  points: number
  coins: number
  level: number
  rank: number
}

export const leaderboardData: LeaderboardEntry[] = [
  { id: "1", name: "Pengguna Demo", points: 2500, coins: 250, level: 5, rank: 1 },
  { id: "2", name: "Umi Listyaningsih", points: 2200, coins: 220, level: 5, rank: 2 },
  { id: "3", name: "Dinda Fajarwati", points: 2000, coins: 200, level: 4, rank: 3 },
  { id: "4", name: "Ahmad Wijaya", points: 1800, coins: 180, level: 4, rank: 4 },
  { id: "5", name: "Cak Hasan", points: 1600, coins: 160, level: 4, rank: 5 },
  { id: "6", name: "Rizky Pratama", points: 1400, coins: 140, level: 3, rank: 6 },
  { id: "7", name: "Rifandi", points: 1200, coins: 120, level: 3, rank: 7 },
  { id: "8", name: "Andi Firmansyah", points: 1000, coins: 100, level: 2, rank: 8 },
  { id: "9", name: "Bambang Sujatmiko", points: 800, coins: 80, level: 2, rank: 9 },
  { id: "10", name: "Fajar Nugroho", points: 600, coins: 60, level: 2, rank: 10 }
]

// Achievements Data
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  requirement: string
}

export const achievements: Achievement[] = [
  { id: "first-login", title: "Selamat Datang!", description: "Login pertama kali ke Monedu", icon: "star", requirement: "Login pertama" },
  { id: "first-material", title: "Pembelajar", description: "Selesaikan materi pertamamu", icon: "book-open", requirement: "1 materi selesai" },
  { id: "first-quiz", title: "Penguji", description: "Selesaikan kuis pertamamu", icon: "help-circle", requirement: "1 kuis selesai" },
  { id: "streak-7", title: "Konsisten", description: "Login 7 hari berturut-turut", icon: "flame", requirement: "7 hari streak" },
  { id: "saver-100", title: "Penabung Pemula", description: "Kumpulkan 100 koin", icon: "coins", requirement: "100 koin" },
  { id: "master-quiz", title: "Ahli Kuis", description: "Dapatkan skor sempurna di kuis", icon: "trophy", requirement: "100% di kuis" }
]
