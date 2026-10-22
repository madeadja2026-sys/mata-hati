# CERITAKU Studio

PWA statis berbahasa Indonesia untuk menulis ide cerita, sinopsis, karakter, skenario per adegan, dan paket publikasi media sosial.

## Fitur versi 1
- Proyek cerita dengan beberapa format dan genre.
- Penyimpanan lokal di browser melalui localStorage.
- Pengelolaan adegan: lokasi, waktu, aksi visual, dialog, kamera/storyboard, dan suara.
- Ekspor naskah TXT, paket publikasi TXT, semua naskah, dan cadangan JSON.
- Pulihkan/merge cadangan JSON.
- Checklist sebelum publikasi, cetak browser / Simpan sebagai PDF.
- Manifest dan service worker untuk pengalaman PWA/offline.

## Publikasi GitHub Pages
1. Pastikan GitHub Pages aktif untuk repositori ini dengan sumber branch `main` dan folder `/ (root)`.
2. Buka `https://madeadja2026-sys.github.io/mata-hati/ceritaku/`.
3. Di Chrome Android, gunakan menu ⋮ lalu pilih **Instal aplikasi** atau **Tambahkan ke layar utama** (nama menu bergantung versi Chrome).
4. Buka aplikasi sekali saat online sebelum menggunakannya offline.

## Batasan penting
- Data proyek hanya tersimpan di browser/perangkat yang digunakan. Ekspor JSON secara berkala; menghapus data browser dapat menghapus proyek.
- Tidak ada akun pengguna, sinkronisasi cloud, atau AI online di versi ini.
- Fitur publikasi menyiapkan materi teks saja; tidak mengunggah video otomatis ke platform.
- Ikon SVG disertakan. Jika perangkat menolak instalasi atau menampilkan ikon generik, tambahkan ikon PNG 192×192 dan 512×512 sebagai penyempurnaan berikutnya.

## Pengujian yang disarankan
1. Buat proyek, isi premis, simpan, muat ulang, lalu pastikan data masih ada.
2. Tambahkan dua adegan, simpan, lalu ekspor TXT.
3. Unduh cadangan JSON, uji pemulihan pada data percobaan.
4. Uji cetak / Simpan sebagai PDF.
5. Buka ulang saat offline setelah kunjungan online pertama.
