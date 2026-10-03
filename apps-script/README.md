# MATA HATI PWA V3 — CMS

MATA HATI V3 menggunakan GitHub Pages untuk website publik, Google Apps Script untuk CMS, Google Sheets untuk database konten, dan Google Drive untuk media.

## Instalasi
1. Buka Google Apps Script: https://script.google.com/
2. Buat project baru.
3. Tambahkan file `Code.gs` dan `Admin.html` dari folder `apps-script/` di repository ini.
4. Jalankan `setupProject()` sekali dan izinkan akses Sheets/Drive.
5. Deploy Web App PUBLIC: Execute as = Me; Who has access = Anyone. Simpan URL /exec.
6. Deploy Web App ADMIN kedua: Execute as = Me; Who has access = Only myself. Buka URL admin tersebut.
7. Isi URL PUBLIC pada `cms-config.js`.
8. Commit perubahan dan tunggu GitHub Pages selesai deploy.

## Alur
Admin → Tambah/Edit → Upload foto → Simpan → PUBLIK → website menampilkan konten.

Apps Script Web Apps memakai doGet/doPost dan dapat dipublikasikan sebagai web app. Admin menggunakan google.script.run untuk komunikasi asynchronous dengan fungsi server.
