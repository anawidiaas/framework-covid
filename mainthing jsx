import { useState } from "react";

const data = [
  {
    negara: "Vietnam", flag: "🇻🇳",
    historis: { skor: 4, label: "Kuat", sub: "Organik" },
    ketimpangan: { skor: 4, label: "Rendah", sub: "Gini ~35" },
    socialMobility: { skor: 3, label: "Menengah", sub: "WEF ~53.1/100" },
    strukturKerja: { skor: 4, label: "Formal", sub: "Dominan" },
    infrastruktur: { skor: 3, label: "Menengah", sub: "Sistem komunitas" },
    healthSpending: { skor: 2, label: "Rendah", sub: "~$171/kapita" },
    sars: { kena: true, label: "Ya", sub: "2003 — 1st bebas" },
    nakes: { skor: 3, label: "Menengah", sub: "~8/1.000 pddk" },
    bedRatio: { skor: 3, label: "Menengah", sub: "~2.6/1.000" },
    medianUsia: { skor: 4, label: "Muda", sub: "~31 tahun" },
    covid: { skor: 5, label: "Sangat Baik", anomali: false },
    catatan: "Berhasil bukan karena spending tinggi ($171/kapita) — tapi modal sosial komunitas organik. tổ dân phố jadi tulang punggung tracing. Social mobility menengah tapi civic memory anti-kolonial sangat kuat. Bukti paling jelas bahwa kepercayaan kolektif > anggaran.",
  },
  {
    negara: "Korea Selatan", flag: "🇰🇷",
    historis: { skor: 5, label: "Sangat Kuat", sub: "Organik — Gwangju" },
    ketimpangan: { skor: 3, label: "Menengah", sub: "Gini ~31" },
    socialMobility: { skor: 4, label: "Tinggi", sub: "WEF ~74.1/100" },
    strukturKerja: { skor: 4, label: "Formal", sub: "Dominan" },
    infrastruktur: { skor: 4, label: "Kuat", sub: "Universal coverage" },
    healthSpending: { skor: 4, label: "Tinggi", sub: "~$3.405/kapita" },
    sars: { kena: true, label: "Ya", sub: "2003 — traumatik" },
    nakes: { skor: 5, label: "Sangat Tinggi", sub: "~23/1.000 pddk" },
    bedRatio: { skor: 5, label: "Tertinggi OECD", sub: "~12.4/1.000" },
    medianUsia: { skor: 3, label: "Menengah", sub: "~44 tahun" },
    covid: { skor: 5, label: "Sangat Baik", anomali: false },
    catatan: "SARS 2003 mempermalukan Korea — CDC diperkuat drastis pasca itu. Civic memory Gwangju + PSPD + KCTU = organisasi sipil matang yang tidak bisa dibeli. Social mobility tinggi sejalan dengan ketimpangan yang terkendali. Satu-satunya negara kuat di hampir semua kolom sekaligus.",
  },
  {
    negara: "Taiwan", flag: "🇹🇼",
    historis: { skor: 4, label: "Kuat", sub: "Organik" },
    ketimpangan: { skor: 4, label: "Rendah", sub: "Gini ~34" },
    socialMobility: { skor: 4, label: "Tinggi", sub: "WEF ~70/100 (est.)" },
    strukturKerja: { skor: 4, label: "Formal", sub: "Dominan" },
    infrastruktur: { skor: 5, label: "Sangat Kuat", sub: "NHI universal" },
    healthSpending: { skor: 4, label: "Tinggi", sub: "~$1.810/kapita" },
    sars: { kena: true, label: "Ya", sub: "2003 — 73 meninggal" },
    nakes: { skor: 5, label: "Sangat Tinggi", sub: "~21/1.000 pddk" },
    bedRatio: { skor: 5, label: "Sangat Tinggi", sub: "~7.0/1.000" },
    medianUsia: { skor: 3, label: "Menengah", sub: "~42 tahun" },
    covid: { skor: 5, label: "Sangat Baik", anomali: false },
    catatan: "NHI terintegrasi dengan data perjalanan real-time — kartu NHI langsung terhubung riwayat perjalanan saat COVID. SARS trauma menghasilkan SOP yang diaktifkan tanpa debat. Social mobility tinggi + ketimpangan rendah = kepatuhan yang merata.",
  },
  {
    negara: "Jepang", flag: "🇯🇵",
    historis: { skor: 4, label: "Kuat", sub: "Konformitas tinggi" },
    ketimpangan: { skor: 4, label: "Rendah", sub: "Gini ~32" },
    socialMobility: { skor: 5, label: "Sangat Tinggi", sub: "WEF ~76.1/100" },
    strukturKerja: { skor: 4, label: "Formal", sub: "Dominan" },
    infrastruktur: { skor: 5, label: "Sangat Kuat", sub: "Universal" },
    healthSpending: { skor: 5, label: "Sangat Tinggi", sub: "~$4.360/kapita" },
    sars: { kena: false, label: "Tidak", sub: "0 kasus SARS" },
    nakes: { skor: 5, label: "Sangat Tinggi", sub: "~25/1.000 pddk" },
    bedRatio: { skor: 5, label: "Tertinggi Dunia", sub: "~13.1/1.000" },
    medianUsia: { skor: 1, label: "Sangat Tua", sub: "~49 tahun" },
    covid: { skor: 4, label: "Baik", anomali: false },
    catatan: "Bed ratio tertinggi dunia tapi banyak di RS kecil tidak siap COVID. Populasi paling tua di tabel (49 tahun) tapi berhasil karena semua variabel lain sangat kuat + norma masker sudah ada sebelum pandemi. Social mobility tertinggi Asia.",
  },
  {
    negara: "Jerman", flag: "🇩🇪",
    historis: { skor: 3, label: "Menengah", sub: "Post-reunifikasi" },
    ketimpangan: { skor: 4, label: "Rendah", sub: "Gini ~31" },
    socialMobility: { skor: 5, label: "Sangat Tinggi", sub: "WEF ~78.8/100" },
    strukturKerja: { skor: 5, label: "Formal", sub: "Sangat kuat" },
    infrastruktur: { skor: 5, label: "Sangat Kuat", sub: "Universal" },
    healthSpending: { skor: 5, label: "Sangat Tinggi", sub: "~$6.731/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 5, label: "Tertinggi Tabel", sub: "~44/1.000 pddk" },
    bedRatio: { skor: 5, label: "Sangat Tinggi", sub: "~8.0/1.000" },
    medianUsia: { skor: 2, label: "Tua", sub: "~47 tahun" },
    covid: { skor: 4, label: "Baik", anomali: false },
    catatan: "Merkel (latar sains) komunikasi transparan. Kurzarbeit (subsidi kerja pendek) = pekerja bisa isolasi tanpa kehilangan pendapatan. Social mobility tertinggi Eropa Barat bersama Skandinavia. Nakes tertinggi di antara semua negara di tabel ini.",
  },
  {
    negara: "New Zealand", flag: "🇳🇿",
    historis: { skor: 3, label: "Menengah", sub: "Post-colonial" },
    ketimpangan: { skor: 3, label: "Menengah", sub: "Gini ~33" },
    socialMobility: { skor: 4, label: "Tinggi", sub: "WEF ~74.4/100" },
    strukturKerja: { skor: 4, label: "Formal", sub: "Dominan" },
    infrastruktur: { skor: 4, label: "Kuat", sub: "Universal" },
    healthSpending: { skor: 4, label: "Tinggi", sub: "~$4.028/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 4, label: "Tinggi", sub: "~32/1.000 pddk" },
    bedRatio: { skor: 3, label: "Menengah", sub: "~2.6/1.000" },
    medianUsia: { skor: 3, label: "Menengah", sub: "~38 tahun" },
    covid: { skor: 4, label: "Baik", anomali: false },
    catatan: "Ardern 'team of 5 million' — kepemimpinan moral mengkompensasi civic memory yang tidak sekuat Asia Timur. Bed ratio rendah tapi tidak pernah kewalahan karena strategi eliminasi berhasil di fase awal.",
  },
  {
    negara: "Kuba", flag: "🇨🇺",
    historis: { skor: 3, label: "Kuat→Retak", sub: "Generasi tua kuat" },
    ketimpangan: { skor: 4, label: "Rendah", sub: "Gini ~38" },
    socialMobility: { skor: 4, label: "Tinggi (est.)", sub: "Tidak diukur WEF ~68" },
    strukturKerja: { skor: 5, label: "Formal", sub: "Dominan negara" },
    infrastruktur: { skor: 5, label: "Sangat Kuat", sub: "Médico de familia" },
    healthSpending: { skor: 2, label: "Rendah Absolut", sub: "~$971/kapita (merata)" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 5, label: "Tertinggi Dunia", sub: "~84/1.000 pddk" },
    bedRatio: { skor: 4, label: "Tinggi", sub: "~5.3/1.000" },
    medianUsia: { skor: 3, label: "Menengah", sub: "~42 tahun" },
    covid: { skor: 4, label: "Baik", anomali: false },
    catatan: "Antitesis sempurna dari AS: spending $971/kapita tapi nakes tertinggi dunia. Médico de familia = dokter tinggal di komunitas yang dilayani. Kembangkan 5 vaksin sendiri meski diembargo 60 tahun. Social mobility tinggi karena akses pendidikan dan kesehatan merata — bukan karena pasar bebas.",
  },
  {
    negara: "Singapura", flag: "🇸🇬",
    historis: { skor: 2, label: "Dikonstruksi", sub: "Top-down" },
    ketimpangan: { skor: 2, label: "Tinggi (dual)", sub: "Gini ~45 pre-transfer" },
    socialMobility: { skor: 5, label: "Sangat Tinggi", sub: "WEF ~82.4/100" },
    strukturKerja: { skor: 2, label: "Dual", sub: "Formal utk warga" },
    infrastruktur: { skor: 2, label: "Dual", sub: "Kuat utk warga" },
    healthSpending: { skor: 4, label: "Tinggi", sub: "~$2.835/kapita" },
    sars: { kena: true, label: "Ya", sub: "2003 — 33 meninggal" },
    nakes: { skor: 4, label: "Tinggi", sub: "~23/1.000 pddk" },
    bedRatio: { skor: 3, label: "Menengah", sub: "~2.5/1.000" },
    medianUsia: { skor: 3, label: "Menengah", sub: "~42 tahun" },
    covid: { skor: 3, label: "Campuran", anomali: false },
    catatan: "Social mobility TERTINGGI di tabel (82.4) tapi outcome campuran. Karena WEF mengukur mobility untuk warga penuh — bukan 300.000 pekerja migran yang dieksklusi. Paradoks Singapura membuktikan bahwa social mobility tinggi tidak berarti jika ada kelas yang sistematis dikecualikan.",
  },
  {
    negara: "China", flag: "🇨🇳",
    historis: { skor: 2, label: "Dikonstruksi", sub: "Propaganda negara" },
    ketimpangan: { skor: 2, label: "Menengah-Tinggi", sub: "Gini ~38-46" },
    socialMobility: { skor: 3, label: "Menengah", sub: "WEF ~54.5/100" },
    strukturKerja: { skor: 2, label: "Campuran", sub: "Informal besar" },
    infrastruktur: { skor: 3, label: "Menengah", sub: "Variatif kota-desa" },
    healthSpending: { skor: 3, label: "Menengah", sub: "~$535/kapita" },
    sars: { kena: true, label: "Ya", sub: "Episentrum awal" },
    nakes: { skor: 3, label: "Menengah", sub: "~20/1.000 pddk" },
    bedRatio: { skor: 4, label: "Tinggi", sub: "~4.3/1.000" },
    medianUsia: { skor: 3, label: "Menengah", sub: "~39 tahun" },
    covid: { skor: 3, label: "Campuran", anomali: false },
    catatan: "Li Wenliang ditangkap saat peringatkan COVID — informasi tidak mengalir ke atas. Paradoks otoritarianisme: mobilisasi cepat setelah keputusan, tapi early warning tersumbat. Zero COVID dipertahankan terlalu lama, pembukaan mendadak 2022 = estimasi 1+ juta kematian.",
  },
  {
    negara: "Rusia", flag: "🇷🇺",
    historis: { skor: 2, label: "Dikonstruksi", sub: "Narasi top-down WW2" },
    ketimpangan: { skor: 2, label: "Tinggi", sub: "Gini ~36 (oligarki)" },
    socialMobility: { skor: 4, label: "Tinggi (warisan)", sub: "WEF ~64.3/100" },
    strukturKerja: { skor: 2, label: "Campuran", sub: "Formal tapi rapuh" },
    infrastruktur: { skor: 2, label: "Warisan Soviet→Lapuk", sub: "Semashko terbengkalai" },
    healthSpending: { skor: 2, label: "Rendah-Menengah", sub: "~$524/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 4, label: "Tinggi (warisan)", sub: "~4.0/1.000 pddk" },
    bedRatio: { skor: 5, label: "Sangat Tinggi (warisan)", sub: "~8.0/1.000" },
    medianUsia: { skor: 2, label: "Menengah-Tua", sub: "~40 tahun" },
    covid: { skor: 1, label: "Sangat Buruk", anomali: false },
    catatan: "PARADOKS SOVIET: Bed ratio + nakes tinggi warisan Semashko — tapi lapuk dan terdegradasi pasca-privatisasi 1991. Social mobility 64.3 (tinggi) tapi ini warisan kapital manusia Soviet, bukan kepercayaan horizontal. IRONI TERBESAR: Sputnik V dikembangkan lebih awal dari Pfizer, tapi vaksinasi domestik hanya ~50% — rakyat tidak percaya vaksin buatan pemerintahnya sendiri. Konfirmasi bahwa kepercayaan top-down sangat rapuh saat benar-benar dibutuhkan.",
  },
  {
    negara: "UK", flag: "🇬🇧",
    historis: { skor: 2, label: "Terfragmentasi", sub: "Post-Brexit" },
    ketimpangan: { skor: 2, label: "Menengah-Tinggi", sub: "Gini ~35" },
    socialMobility: { skor: 5, label: "Sangat Tinggi", sub: "WEF ~75.4/100" },
    strukturKerja: { skor: 2, label: "Gig Besar", sub: "Uber, Deliveroo, dll" },
    infrastruktur: { skor: 3, label: "Menengah", sub: "NHS underfunded" },
    healthSpending: { skor: 4, label: "Tinggi", sub: "~$4.653/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 4, label: "Tinggi", sub: "~29/1.000 pddk" },
    bedRatio: { skor: 2, label: "Rendah", sub: "~2.5/1.000" },
    medianUsia: { skor: 3, label: "Menengah", sub: "~40 tahun" },
    covid: { skor: 2, label: "Buruk", anomali: false },
    catatan: "PARADOKS MOBILITY: Social mobility 75.4 (sangat tinggi) tapi COVID outcome buruk. Karena WEF mengukur peluang struktural — bukan kepercayaan horizontal antar warga. Partygate hancurkan legitimasi moral. Brexit belah kepercayaan publik. Gig economy = jutaan tidak bisa isolasi.",
  },
  {
    negara: "Amerika Serikat", flag: "🇺🇸",
    historis: { skor: 1, label: "Sangat Terfragmentasi", sub: "Polarisasi ekstrem" },
    ketimpangan: { skor: 1, label: "Sangat Tinggi", sub: "Gini ~41" },
    socialMobility: { skor: 4, label: "Tinggi", sub: "WEF ~70.4/100" },
    strukturKerja: { skor: 1, label: "Gig Masif", sub: "Tanpa jaminan" },
    infrastruktur: { skor: 1, label: "Tidak Universal", sub: "Tergantung asuransi" },
    healthSpending: { skor: 5, label: "Tertinggi Dunia", sub: "~$11.072/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 4, label: "Tinggi", sub: "~26/1.000 pddk" },
    bedRatio: { skor: 2, label: "Rendah", sub: "~2.8/1.000" },
    medianUsia: { skor: 3, label: "Menengah", sub: "~38 tahun" },
    covid: { skor: 1, label: "Sangat Buruk", anomali: false },
    catatan: "Bukti definitif: spending $11.072/kapita TERTINGGI DUNIA + social mobility 70.4 (tinggi) tapi outcome terburuk di antara negara maju. Social mobility di AS nyata untuk sebagian orang tapi tidak merata — dan tidak membangun kepercayaan kolektif. Masker jadi simbol identitas kultural. 1 juta+ kematian.",
  },
  {
    negara: "Brasil", flag: "🇧🇷",
    historis: { skor: 1, label: "Lemah", sub: "Terfragmentasi" },
    ketimpangan: { skor: 1, label: "Sangat Tinggi", sub: "Gini ~53" },
    socialMobility: { skor: 3, label: "Menengah-Rendah", sub: "WEF ~52.1/100" },
    strukturKerja: { skor: 1, label: "Informal Masif", sub: ">40% informal" },
    infrastruktur: { skor: 2, label: "Lemah-Menengah", sub: "SUS underfunded" },
    healthSpending: { skor: 2, label: "Menengah-Rendah", sub: "~$858/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 2, label: "Rendah-Menengah", sub: "~23/1.000 (timpang)" },
    bedRatio: { skor: 3, label: "Menengah", sub: "~2.1/1.000" },
    medianUsia: { skor: 3, label: "Menengah-Muda", sub: "~34 tahun" },
    covid: { skor: 1, label: "Sangat Buruk", anomali: false },
    catatan: "Bolsonaro aktif merusak respons — sebut COVID 'gripezinha'. Favela: kepadatan ekstrem membuat social distancing tidak mungkin secara fisik. Gini 53 = salah satu tertinggi dunia. Social mobility menengah tapi terkonsentrasi di kota kaya.",
  },
  {
    negara: "India", flag: "🇮🇳",
    historis: { skor: 1, label: "Sangat Terfragmentasi", sub: "Kasta + agama + etnis" },
    ketimpangan: { skor: 1, label: "Sangat Tinggi", sub: "Gini ~35 (undercount)" },
    socialMobility: { skor: 2, label: "Rendah", sub: "WEF ~45.9/100" },
    strukturKerja: { skor: 1, label: "Informal Masif", sub: ">80% informal" },
    infrastruktur: { skor: 1, label: "Sangat Timpang", sub: "Kota vs desa ekstrem" },
    healthSpending: { skor: 1, label: "Sangat Rendah", sub: "~$73/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 1, label: "Sangat Rendah", sub: "~5/1.000 pddk" },
    bedRatio: { skor: 1, label: "Sangat Rendah", sub: "~0.5/1.000" },
    medianUsia: { skor: 4, label: "Muda", sub: "~28 tahun" },
    covid: { skor: 1, label: "Sangat Buruk", anomali: false },
    catatan: "Delta 2021: oksigen habis, RS kolaps, kremasi di jalan. Sistem kasta secara struktural mencegah solidaritas horizontal. Social mobility 45.9 rendah — kasta adalah antitesis mobilitas. Lockdown tanpa jaring pengaman = jutaan pekerja migran jalan kaki ratusan km.",
  },
  {
    negara: "Indonesia", flag: "🇮🇩",
    historis: { skor: 1, label: "Lemah", sub: "Trauma tak terselesaikan" },
    ketimpangan: { skor: 2, label: "Tinggi", sub: "Gini ~38" },
    socialMobility: { skor: 2, label: "Rendah", sub: "WEF ~44.7/100" },
    strukturKerja: { skor: 1, label: "Informal Masif", sub: ">55% informal" },
    infrastruktur: { skor: 2, label: "Lemah", sub: "Puskesmas underfunded" },
    healthSpending: { skor: 2, label: "Rendah", sub: "~$115/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 1, label: "Rendah", sub: "~0.4 dokter/1.000" },
    bedRatio: { skor: 2, label: "Rendah", sub: "~1.0/1.000" },
    medianUsia: { skor: 4, label: "Muda", sub: "~30 tahun" },
    covid: { skor: 2, label: "Buruk", anomali: false },
    catatan: "Social mobility 44.7 rendah — modal sosial vertikal (patron-klien) tidak berfungsi dalam krisis horizontal. RS Jakarta kolaps saat Delta Juli 2021. Nakes dan bed terkonsentrasi di Jawa. JKN ada tapi kualitas timpang ekstrem.",
  },
  {
    negara: "Filipina", flag: "🇵🇭",
    historis: { skor: 1, label: "Lemah", sub: "Fragmentasi tinggi" },
    ketimpangan: { skor: 1, label: "Tinggi", sub: "Gini ~42" },
    socialMobility: { skor: 2, label: "Rendah", sub: "WEF ~46.0/100" },
    strukturKerja: { skor: 1, label: "Informal Masif", sub: "OFW dependent" },
    infrastruktur: { skor: 1, label: "Lemah", sub: "Tidak merata" },
    healthSpending: { skor: 1, label: "Rendah", sub: "~$160/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 2, label: "Rendah", sub: "~6/1.000 pddk" },
    bedRatio: { skor: 2, label: "Rendah", sub: "~1.0/1.000" },
    medianUsia: { skor: 4, label: "Muda", sub: "~24 tahun" },
    covid: { skor: 1, label: "Sangat Buruk", anomali: false },
    catatan: "Ironi terbesar: eksportir nakes terbesar di dunia tapi kekurangan nakes di dalam negeri sendiri. RS Manila kolaps saat Delta. Duterte respons militeristik tanpa fondasi sosial. OFW remitansi berhenti = ekonomi informal kolaps seketika.",
  },
  {
    negara: "Afrika Selatan", flag: "🇿🇦",
    historis: { skor: 1, label: "Terfragmentasi", sub: "Warisan apartheid" },
    ketimpangan: { skor: 1, label: "Tertinggi Dunia", sub: "Gini ~63" },
    socialMobility: { skor: 2, label: "Rendah", sub: "WEF ~43.5/100" },
    strukturKerja: { skor: 1, label: "Informal Masif", sub: "Pengangguran >30%" },
    infrastruktur: { skor: 1, label: "Timpang Ekstrem", sub: "Dua sistem paralel" },
    healthSpending: { skor: 2, label: "Menengah-Rendah", sub: "~$499/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 2, label: "Timpang", sub: "~9/1.000 (kota vs township)" },
    bedRatio: { skor: 2, label: "Timpang", sub: "~2.3/1.000" },
    medianUsia: { skor: 4, label: "Muda", sub: "~28 tahun" },
    covid: { skor: 2, label: "Buruk", anomali: false },
    catatan: "Apartheid mewariskan segregasi spasial — social distancing tidak mungkin di township padat. Dua sistem kesehatan: privat untuk kaya vs publik kolaps untuk mayoritas. Social mobility 43.5 rendah = warisan apartheid yang struktural. Varian Beta & Omicron pertama terdeteksi di sini.",
  },
  {
    negara: "Pakistan", flag: "🇵🇰",
    historis: { skor: 1, label: "Sangat Lemah", sub: "Fragmentasi etnis+agama" },
    ketimpangan: { skor: 2, label: "Tinggi", sub: "Gini ~29-33" },
    socialMobility: { skor: 1, label: "Sangat Rendah", sub: "WEF ~38.8/100" },
    strukturKerja: { skor: 1, label: "Informal Masif", sub: ">70% informal" },
    infrastruktur: { skor: 1, label: "Sangat Lemah", sub: "Feodal + urban-rural gap" },
    healthSpending: { skor: 1, label: "Sangat Rendah", sub: "~$44/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 1, label: "Sangat Rendah", sub: "~1.0/1.000 pddk" },
    bedRatio: { skor: 1, label: "Sangat Rendah", sub: "~0.6/1.000" },
    medianUsia: { skor: 5, label: "Sangat Muda", sub: "~22 tahun" },
    covid: { skor: 3, label: "Lebih baik dari prediksi", anomali: true },
    catatan: "ANOMALI DEMOGRAFIS: Social mobility 38.8 terendah kedua di tabel, spending $44/kapita, semua variabel merah. Seharusnya bencana. Yang terjadi: lebih baik dari India dan Brasil. Penjelasan terkuat: (1) median usia 22 tahun — IFR usia muda mendekati nol, (2) underreporting masif karena sistem pencatatan kematian sangat lemah.",
  },
  {
    negara: "Bangladesh", flag: "🇧🇩",
    historis: { skor: 2, label: "Lemah-Menengah", sub: "Kemerdekaan 1971" },
    ketimpangan: { skor: 2, label: "Tinggi", sub: "Gini ~32-33" },
    socialMobility: { skor: 2, label: "Rendah", sub: "WEF ~44.5/100" },
    strukturKerja: { skor: 1, label: "Informal Masif", sub: "Garmen + pertanian" },
    infrastruktur: { skor: 1, label: "Sangat Lemah", sub: "Kepadatan 1.300/km²" },
    healthSpending: { skor: 1, label: "Sangat Rendah", sub: "~$88/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 1, label: "Sangat Rendah", sub: "~0.6/1.000 pddk" },
    bedRatio: { skor: 1, label: "Sangat Rendah", sub: "~0.8/1.000" },
    medianUsia: { skor: 4, label: "Muda", sub: "~28 tahun" },
    covid: { skor: 3, label: "Lebih baik dari prediksi", anomali: true },
    catatan: "ANOMALI TERBESAR: Kepadatan 1.300 orang/km² tertinggi dunia, spending $88/kapita, bed ratio 0.8 — seharusnya bencana kemanusiaan terbesar pandemi. Penjelasan: (1) Populasi muda, (2) program BCG universal — hipotesis proteksi silang, (3) underreporting masif karena sistem pencatatan hampir tidak ada di rural.",
  },
  {
    negara: "Nigeria", flag: "🇳🇬",
    historis: { skor: 1, label: "Sangat Lemah", sub: "250+ etnis" },
    ketimpangan: { skor: 1, label: "Sangat Tinggi", sub: "Gini ~43" },
    socialMobility: { skor: 1, label: "Sangat Rendah", sub: "WEF ~36.5/100" },
    strukturKerja: { skor: 1, label: "Informal Masif", sub: ">80% informal" },
    infrastruktur: { skor: 1, label: "Hampir Tidak Ada", sub: "1 dokter/6.000 pddk" },
    healthSpending: { skor: 1, label: "Sangat Rendah", sub: "~$71/kapita" },
    sars: { kena: false, label: "Tidak", sub: "Tidak terdampak" },
    nakes: { skor: 1, label: "Sangat Rendah", sub: "~0.4/1.000 pddk" },
    bedRatio: { skor: 1, label: "Sangat Rendah", sub: "~0.5/1.000" },
    medianUsia: { skor: 5, label: "Termuda", sub: "~18 tahun" },
    covid: { skor: 3, label: "African Paradox", anomali: true },
    catatan: "AFRICAN PARADOX: WHO prediksi Afrika hancur — tidak terjadi. Social mobility terendah di tabel (36.5), 250+ etnis, sistem kesehatan hampir tidak ada. Penjelasan: (1) Median usia 18 tahun = IFR mendekati nol, (2) kehidupan outdoor ekstensif = ventilasi alami, (3) underreporting sangat masif — kapasitas testing ribuan per hari untuk 220 juta orang.",
  },
];

const COLS = [
  { key: "historis", label: "Historis Kolektif" },
  { key: "ketimpangan", label: "Ketimpangan" },
  { key: "socialMobility", label: "Social Mobility" },
  { key: "strukturKerja", label: "Struktur Kerja" },
  { key: "infrastruktur", label: "Infra. Primer" },
  { key: "healthSpending", label: "Health Spending" },
  { key: "sars", label: "SARS?" },
  { key: "nakes", label: "Nakes" },
  { key: "bedRatio", label: "Bed Ratio" },
  { key: "medianUsia", label: "Median Usia" },
  { key: "covid", label: "COVID Outcome" },
];

const sc = (s) => {
  if (s >= 5) return { bg: "#dcfce7", tx: "#14532d", bd: "#86efac" };
  if (s >= 4) return { bg: "#d1fae5", tx: "#065f46", bd: "#6ee7b7" };
  if (s >= 3) return { bg: "#fef9c3", tx: "#713f12", bd: "#fde047" };
  if (s >= 2) return { bg: "#fee2e2", tx: "#7f1d1d", bd: "#fca5a5" };
  return { bg: "#fecaca", tx: "#450a0a", bd: "#f87171" };
};

const mc = (s) => {
  if (s >= 5) return { bg: "#ccfbf1", tx: "#134e4a", bd: "#5eead4" };
  if (s >= 4) return { bg: "#d1fae5", tx: "#065f46", bd: "#6ee7b7" };
  if (s >= 3) return { bg: "#fef9c3", tx: "#713f12", bd: "#fde047" };
  if (s >= 2) return { bg: "#fee2e2", tx: "#7f1d1d", bd: "#fca5a5" };
  return { bg: "#fecaca", tx: "#450a0a", bd: "#f87171" };
};

const ac = (s) => {
  if (s >= 5) return { bg: "#ede9fe", tx: "#4c1d95", bd: "#c4b5fd" };
  if (s >= 4) return { bg: "#f5f3ff", tx: "#5b21b6", bd: "#ddd6fe" };
  if (s >= 3) return { bg: "#f8fafc", tx: "#475569", bd: "#e2e8f0" };
  if (s >= 2) return { bg: "#fef3c7", tx: "#78350f", bd: "#fde68a" };
  return { bg: "#fee2e2", tx: "#7f1d1d", bd: "#fca5a5" };
};

const cc = (skor, anomali) => {
  if (anomali) return { bg: "#e0f2fe", tx: "#0c4a6e", dot: "#0284c7" };
  if (skor >= 5) return { bg: "#bbf7d0", tx: "#14532d", dot: "#16a34a" };
  if (skor >= 4) return { bg: "#d1fae5", tx: "#065f46", dot: "#22c55e" };
  if (skor >= 3) return { bg: "#fef08a", tx: "#713f12", dot: "#ca8a04" };
  if (skor >= 2) return { bg: "#fecaca", tx: "#7f1d1d", dot: "#dc2626" };
  return { bg: "#fca5a5", tx: "#450a0a", dot: "#b91c1c" };
};

const Chip = ({ d, type }) => {
  const c = type === "mob" ? mc(d.skor) : type === "age" ? ac(d.skor) : sc(d.skor);
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 6, padding: "5px 8px", minWidth: 95 }}>
      <div style={{ color: c.tx, fontSize: 11, fontWeight: 700, lineHeight: 1.3 }}>{d.label}</div>
      <div style={{ color: c.tx, fontSize: 10, opacity: 0.65, marginTop: 2 }}>{d.sub}</div>
    </div>
  );
};

const SarsChip = ({ d }) => (
  <div style={{ background: d.kena ? "#dbeafe" : "#f8fafc", border: `1px solid ${d.kena ? "#93c5fd" : "#e2e8f0"}`, borderRadius: 6, padding: "5px 8px", minWidth: 80 }}>
    <div style={{ color: d.kena ? "#1e40af" : "#94a3b8", fontSize: 11, fontWeight: 700 }}>{d.kena ? "✓ Ya" : "— Tidak"}</div>
    <div style={{ color: d.kena ? "#1e40af" : "#94a3b8", fontSize: 10, opacity: 0.75, marginTop: 2 }}>{d.sub}</div>
  </div>
);

const CovidChip = ({ d }) => {
  const c = cc(d.skor, d.anomali);
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.dot}50`, borderRadius: 6, padding: "5px 10px", minWidth: 110 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
        <span style={{ color: c.tx, fontSize: 11, fontWeight: 700 }}>{d.label}</span>
      </div>
      {d.anomali && <div style={{ color: "#0369a1", fontSize: 9, marginTop: 3, fontWeight: 600 }}>⚠️ Anomali demografis</div>}
    </div>
  );
};

export default function App() {
  const [expanded, setExpanded] = useState(null);
  const [sortBy, setSortBy] = useState("covid");
  const [sortDir, setSortDir] = useState("desc");

  const handleSort = (key) => {
    if (sortBy === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortBy(key); setSortDir("desc"); }
  };

  const getVal = (row, key) => {
    if (key === "sars") return row.sars.kena ? 1 : 0;
    return row[key] ? row[key].skor : 0;
  };

  const sorted = [...data].sort((a, b) => {
    const diff = getVal(b, sortBy) - getVal(a, sortBy);
    return sortDir === "desc" ? diff : -diff;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, sans-serif", padding: "28px 20px", color: "#1e293b" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
        .rtr { cursor: pointer; }
        .rtr:hover td { background: #e0e7ff !important; }
        .sth { cursor: pointer; user-select: none; }
        .sth:hover { color: #4f46e5 !important; }
      `}</style>

      <div style={{ maxWidth: 1800, margin: "0 auto" }}>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#6366f1", fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>Framework Analisis COVID-19</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 700, margin: "0 0 6px", color: "#0f172a", lineHeight: 1.2 }}>
            Kenapa Negara Berhasil atau Gagal<br /><span style={{ color: "#4f46e5" }}>Menangani COVID-19</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: 12, margin: 0, lineHeight: 1.7 }}>
            20 negara · 11 variabel · Klik header untuk mengurutkan · Klik baris untuk analisis
            <span style={{ color: "#0284c7", marginLeft: 8 }}>⚠️ = anomali demografis</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14, padding: "8px 14px", background: "#fff", borderRadius: 8, border: "1px solid #e2e8f0", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: 1 }}>SKALA:</span>
          {[{s:5,l:"Sangat Kuat"},{s:4,l:"Kuat"},{s:3,l:"Menengah"},{s:2,l:"Lemah"},{s:1,l:"Sangat Lemah"}].map(i => {
            const c = sc(i.s);
            return (
              <div key={i.s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: c.bg, border: `1px solid ${c.bd}` }} />
                <span style={{ fontSize: 10, color: "#64748b" }}>{i.l}</span>
              </div>
            );
          })}
          <div style={{ width: 1, height: 12, background: "#e2e8f0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "#ccfbf1", border: "1px solid #5eead4" }} />
            <span style={{ fontSize: 10, color: "#64748b" }}>Social mobility (teal)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "#ede9fe", border: "1px solid #c4b5fd" }} />
            <span style={{ fontSize: 10, color: "#64748b" }}>Usia muda (ungu)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "#dbeafe", border: "1px solid #93c5fd" }} />
            <span style={{ fontSize: 10, color: "#64748b" }}>Pernah kena SARS</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "#e0f2fe", border: "1px solid #7dd3fc" }} />
            <span style={{ fontSize: 10, color: "#64748b" }}>⚠️ Anomali</span>
          </div>
        </div>

        <div style={{ overflowX: "auto", background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, letterSpacing: 1, color: "#64748b", fontWeight: 700, position: "sticky", left: 0, background: "#f8fafc", zIndex: 2, minWidth: 140, borderRight: "1px solid #f1f5f9" }}>NEGARA</th>
                {COLS.map(col => (
                  <th key={col.key} className="sth"
                    onClick={() => handleSort(col.key)}
                    style={{ padding: "10px 8px", textAlign: "left", fontSize: 10, whiteSpace: "nowrap", minWidth: 110, fontWeight: sortBy === col.key ? 700 : 600, color: sortBy === col.key ? "#4f46e5" : "#64748b", borderBottom: sortBy === col.key ? "2px solid #4f46e5" : "none" }}>
                    {col.label} {sortBy === col.key ? (sortDir === "desc" ? "↓" : "↑") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => {
                const isExp = expanded === row.negara;
                const bg = isExp ? "#f0f4ff" : i % 2 === 0 ? "#fff" : "#fafafa";
                const dotColor = cc(row.covid.skor, row.covid.anomali).dot;
                return (
                  <>
                    <tr key={row.negara} className="rtr" onClick={() => setExpanded(isExp ? null : row.negara)} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "9px 14px", position: "sticky", left: 0, zIndex: 1, background: bg, borderRight: "1px solid #f1f5f9", borderLeft: `3px solid ${dotColor}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <span style={{ fontSize: 18 }}>{row.flag}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap" }}>{row.negara}</span>
                          <span style={{ color: "#cbd5e1", fontSize: 9 }}>{isExp ? "▲" : "▼"}</span>
                        </div>
                      </td>
                      <td style={{ padding: "8px", background: bg }}><Chip d={row.historis} type="score" /></td>
                      <td style={{ padding: "8px", background: bg }}><Chip d={row.ketimpangan} type="score" /></td>
                      <td style={{ padding: "8px", background: bg }}><Chip d={row.socialMobility} type="mob" /></td>
                      <td style={{ padding: "8px", background: bg }}><Chip d={row.strukturKerja} type="score" /></td>
                      <td style={{ padding: "8px", background: bg }}><Chip d={row.infrastruktur} type="score" /></td>
                      <td style={{ padding: "8px", background: bg }}><Chip d={row.healthSpending} type="score" /></td>
                      <td style={{ padding: "8px", background: bg }}><SarsChip d={row.sars} /></td>
                      <td style={{ padding: "8px", background: bg }}><Chip d={row.nakes} type="score" /></td>
                      <td style={{ padding: "8px", background: bg }}><Chip d={row.bedRatio} type="score" /></td>
                      <td style={{ padding: "8px", background: bg }}><Chip d={row.medianUsia} type="age" /></td>
                      <td style={{ padding: "8px", background: bg }}><CovidChip d={row.covid} /></td>
                    </tr>
                    {isExp && (
                      <tr key={row.negara + "-exp"}>
                        <td colSpan={12} style={{ padding: "0 14px 12px", background: "#f0f4ff" }}>
                          <div style={{ padding: "12px 16px", background: "#fff", border: "1px solid #e2e8f0", borderLeft: `4px solid ${dotColor}`, borderRadius: "0 8px 8px 0", fontSize: 12, color: "#475569", lineHeight: 1.8 }}>
                            <span style={{ color: "#4f46e5", fontWeight: 700, fontSize: 10, letterSpacing: 1.5, marginRight: 10 }}>ANALISIS</span>
                            {row.catatan}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12 }}>
          {[
            { icon: "🪜", color: "#0d9488", title: "Social Mobility: Paradoks UK & AS", desc: "UK (75.4), AS (70.4), Rusia (64.3) punya social mobility tinggi tapi COVID outcome buruk. WEF mengukur peluang struktural — bukan kepercayaan horizontal antar warga. Mobility tinggi tapi trust rendah tidak membantu saat pandemi." },
            { icon: "💰", color: "#4f46e5", title: "Spending ≠ Outcome", desc: "AS spending $11.072/kapita (tertinggi dunia) + social mobility tinggi tapi outcome terburuk di antara negara maju. Kuba $971/kapita tapi outcome baik. Rusia bed ratio tinggi + mobility 64.3 tapi sangat buruk." },
            { icon: "⚠️", color: "#0284c7", title: "Anomali Demografis", desc: "Pakistan (social mobility 38.8 terendah), Bangladesh, Nigeria: semua variabel merah tapi outcome lebih baik dari prediksi. Penjelasan terkuat: median usia 18-28 tahun + underreporting masif." },
            { icon: "🔑", color: "#d97706", title: "Variabel Terkuat", desc: "Historis kolektif organik + ketimpangan rendah + struktur kerja formal = fondasi yang tidak bisa dibeli. Social mobility adalah hasil dari ketiga variabel ini — bukan penyebabnya. Singapura (82.4) buktikan: mobility tinggi tidak berlaku jika ada kelas yang dieksklusi." },
          ].map(item => (
            <div key={item.title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 18, marginBottom: 5 }}>{item.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", marginBottom: 5 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, fontSize: 10, color: "#94a3b8", textAlign: "center" }}>
          Data: World Bank 2019 · WHO Health Workforce · OECD/WHO bed ratio · UN Population Division · WEF Global Social Mobility Index 2020 · The Economist excess mortality model
        </div>
      </div>
    </div>
  );
}
