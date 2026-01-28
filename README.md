# Kombinatorik - Website Pembelajaran Interaktif

Website satu halaman yang interaktif, responsif, dan modern untuk belajar kombinatorik. Dibangun dengan HTML5, Tailwind CSS (via CDN), dan Vanilla JavaScript.

## 🎯 Fitur

- **Desain Responsif**: Pendekatan mobile-first yang bekerja sempurna di semua perangkat
- **Kalkulator Interaktif**: 
  - Kalkulator permutasi (P(n,r))
  - Kalkulator kombinasi (C(n,r))
- **Konten Edukatif**:
  - Penjelasan jelas tentang konsep kombinatorik
  - Referensi rumus dengan deskripsi detail
  - Contoh-contoh dunia nyata
- **UI Modern**: Desain bersih dan profesional menggunakan Tailwind CSS
- **Tanpa Dependensi**: Vanilla JavaScript murni - tidak memerlukan framework

## 🚀 Memulai

### Prasyarat

- Browser web modern (Chrome, Firefox, Safari, Edge)
- Tidak perlu instalasi atau proses build!

### Menjalankan Website

1. Clone repositori ini:
   ```bash
   git clone https://github.com/Khaerulmamu/kombinatorik.git
   cd kombinatorik
   ```

2. Buka `index.html` di browser web Anda:
   - Klik dua kali file tersebut, atau
   - Klik kanan dan pilih "Buka dengan" browser pilihan Anda, atau
   - Gunakan server lokal (opsional):
     ```bash
     # Menggunakan Python 3
     python -m http.server 8000
     
     # Menggunakan PHP
     php -S localhost:8000
     
     # Menggunakan Node.js http-server
     npx http-server
     ```

3. Buka `http://localhost:8000` jika menggunakan server lokal

## 📚 Apa itu Kombinatorik?

Kombinatorik adalah cabang matematika yang mempelajari struktur diskrit yang terbatas atau dapat dihitung. Website ini berfokus pada dua konsep fundamental:

### Permutasi
- **Definisi**: Susunan objek di mana urutan penting
- **Rumus**: P(n, r) = n! / (n - r)!
- **Contoh**: Berapa banyak cara menyusun 3 buku dari 5? Jawaban: 60 cara

### Kombinasi
- **Definisi**: Pemilihan objek di mana urutan tidak penting
- **Rumus**: C(n, r) = n! / (r! × (n - r)!)
- **Contoh**: Berapa banyak cara memilih 3 buku dari 5? Jawaban: 10 cara

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Markup semantik untuk struktur
- **Tailwind CSS**: Framework CSS utility-first (dimuat via CDN)
- **Vanilla JavaScript**: Tidak ada framework, JS murni untuk interaktivitas

## 💡 Cara Menggunakan

### Kalkulator Permutasi
1. Navigasi ke bagian Permutasi
2. Masukkan jumlah total item (n)
3. Masukkan jumlah item yang akan disusun (r)
4. Klik "Hitung Permutasi" atau tekan Enter
5. Lihat hasil dengan penjelasan

### Kalkulator Kombinasi
1. Navigasi ke bagian Kombinasi
2. Masukkan jumlah total item (n)
3. Masukkan jumlah item yang akan dipilih (r)
4. Klik "Hitung Kombinasi" atau tekan Enter
5. Lihat hasil dengan penjelasan

## ✨ Kemampuan Utama

- ✅ Menu navigasi responsif
- ✅ Smooth scrolling antar bagian
- ✅ Kalkulator interaktif dengan validasi real-time
- ✅ Feedback visual yang jelas untuk hasil
- ✅ Contoh edukatif untuk setiap konsep
- ✅ Bagian referensi rumus
- ✅ Layout yang dioptimalkan untuk mobile
- ✅ Desain aksesibel dengan HTML semantik

## 📱 Dukungan Browser

- Chrome (terbaru)
- Firefox (terbaru)
- Safari (terbaru)
- Edge (terbaru)

## 🤝 Kontribusi

Kontribusi sangat diterima! Jangan ragu untuk:
- Melaporkan bug
- Menyarankan fitur baru
- Mengirim pull request

## 📄 Lisensi

Proyek ini adalah open source dan tersedia untuk tujuan edukatif.

## 👨‍💻 Pembuat

Dibangun sebagai sumber edukatif untuk belajar kombinatorik melalui contoh-contoh interaktif.

---

**Catatan**: Ini adalah website statis tanpa backend. Semua perhitungan dilakukan di sisi klien menggunakan JavaScript.
