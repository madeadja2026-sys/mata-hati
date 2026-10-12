# Dashboard Kinerja Pegawai — PWA

Aplikasi web statis dengan desain responsif, service worker, manifest PWA, penyimpanan lokal, CRUD data pegawai dan penilaian, filter, perhitungan nilai, ekspor CSV, cadangan/pemulihan JSON, dan cetak PDF melalui browser.

## Status penting
Versi ini adalah **prototipe lokal untuk uji coba**, bukan sistem penilaian terpusat siap operasional. Data hanya tersimpan pada browser/perangkat yang digunakan. GitHub Pages tidak menyediakan database bersama, autentikasi, atau otorisasi. Jangan masukkan data kepegawaian rahasia sebelum backend dan kontrol akses yang layak diterapkan.

## Model skor contoh
- Target kerja 60%
- Kualitas 20%
- Disiplin dan ketepatan waktu 10%
- Kerja sama dan tanggung jawab 10%

Predikat contoh: >=90 Sangat Baik; >=80 Baik; >=70 Cukup; selain itu Perlu Pembinaan. Sesuaikan dengan regulasi dan kebijakan resmi instansi sebelum digunakan untuk keputusan kepegawaian.

## Berkas
- `index.html`: aplikasi
- `manifest.webmanifest`: metadata instalasi PWA
- `sw.js`: cache aplikasi untuk pembukaan offline setelah kunjungan online pertama
- `icon.svg`: ikon

## Penerbitan
Folder ini berada pada repositori `madeadja2026-sys/mata-hati`. Jika GitHub Pages sudah aktif pada root repositori, target URL subfolder adalah:
`https://madeadja2026-sys.github.io/mata-hati/kinerja-pegawai/`

Periksa URL tersebut setelah workflow Pages selesai. Jika tidak aktif, aktifkan Pages pada Settings → Pages, branch `main`, folder `/(root)`.

## Instalasi Android
1. Buka URL publik melalui Chrome saat online.
2. Tunggu halaman selesai dimuat.
3. Buka menu ⋮ → **Tambahkan ke layar utama** atau **Instal aplikasi**.
4. Buka ikon Kinerja dari layar utama.
5. Buka online setidaknya sekali agar cache offline terbentuk.

## Untuk produksi
Sebelum dipakai oleh banyak pegawai, siapkan backend terautentikasi, hak akses per peran, database bersama, audit trail, backup terjadwal, kebijakan retensi, dan uji sinkronisasi serta keamanan. Jangan menyimpan rahasia API di frontend publik.