"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

// Data lengkap proyek
const projectsData: Record<string, any> = {
    "sistem-vote-osis": {
        title: "Sistem Voting OSIS Realtime",
        category: "Web Development",
        shortDesc: "Aplikasi e-voting sekolah dengan live update hasil pemungutan suara.",
        fullDesc: "Sistem pemungutan suara digital yang dibangun untuk mencegah kecurangan dan mempermudah penghitungan suara OSIS secara realtime menggunakan chart interaktif. Dilengkapi dengan manajemen role keamanan tinggi untuk Admin dan Siswa. aplikasi ini digunakan oleh siswa siswi Pondok Pesantren Darul Ulum Banda Aceh",
        tags: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Chart.js"],
        githubUrl: "https://github.com/ariefihsann/sistem-voting-osis   ",
        screenshots: [
            "/assets/images/sistem-vote-osis/gambar1.png",
            "/assets/images/sistem-vote-osis/gambar2.png",
            "/assets/images/sistem-vote-osis/gambar3.png",
            "/assets/images/sistem-vote-osis/gambar4.png",
            "/assets/images/sistem-vote-osis/gambar5.png",
            "/assets/images/sistem-vote-osis/gambar6.png",
        ]
    },
    "payro-hris": {
        title: "Pencatatan Keuangan",
        category: "Web Development",
        shortDesc: "Aplikasi pencatatan pemasukan dan pengeluaran keuangan berbasis web.",
        fullDesc: "Aplikasi pencatatan pemasukan dan pengeluaran keuangan yang dirancang untuk membantu pengguna mengelola keuangan pribadi mereka dengan mudah. Dilengkapi dengan fitur laporan keuangan dan analisis pengeluaran.",
        tags: ["React", "Tailwind CSS", "HRIS"],
        githubUrl: "https://github.com/ariefihsann",
        screenshots: [

            "/assets/images/pencatatan-keuangan/gambar2.png",
            "/assets/images/pencatatan-keuangan/gambar3.png",
            "/assets/images/pencatatan-keuangan/gambar4.png",
            "/assets/images/pencatatan-keuangan/gambar5.png",
            "/assets/images/pencatatan-keuangan/gambar6.png",
        ]
    },
    "finplan-tracker": {
        title: "FinPlan - Tracker App",
        category: "Mobile App",
        shortDesc: "Aplikasi mobile pencatatan keuangan pribadi dengan grafik interaktif.",
        fullDesc: "Aplikasi manajemen keuangan berbasis mobile yang memberikan analisis pengeluaran harian dan bulanan secara intuitif. Dilengkapi fitur target tabungan, pengingat tagihan, dan ekspor laporan keuangan ke format PDF.",
        tags: ["Flutter", "Dart", "UI/UX"],
        githubUrl: "https://github.com/ariefihsann/finance-tracker",
        screenshots: [
            "/assets/images/finance-tracker/gambar1.png",
            "/assets/images/finance-tracker/gambar2.png",
            "/assets/images/finance-tracker/gambar3.png",
            "/assets/images/finance-tracker/gambar4.png",
        ]
    },
    "seo-dash": {
        title: "SEO Dash - CRUD Data Kuliah",
        category: "Web Development",
        shortDesc: "Dashboard manajemen data akademik mahasiswa dan mata kuliah.",
        fullDesc: "Sistem informasi akademik berbasis web untuk mengelola data perkuliahan, jadwal matkul, dan nilai mahasiswa. Dibuat dengan antarmuka dashboard yang terpusat untuk memudahkan admin dalam melakukan pembaruan data secara cepat.",
        tags: ["PHP", "Tailwind CSS", "MySQL"],
        githubUrl: "https://github.com/ariefihsann/seo-dash",
        screenshots: [
            "/assets/images/seo-dash/gambar1.png",
            "/assets/images/seo-dash/gambar2.png",
            "/assets/images/seo-dash/gambar3.png",
            "/assets/images/seo-dash/gambar4.png",
            "/assets/images/seo-dash/gambar5.png",
        ]
    },
    "emosver-robotics": {
        title: "EMOSVER - Robotics",
        category: "Robotics & AI",
        shortDesc: "Riset wahana bawah air (AUV/ROV) untuk kompetisi TEKNOFEST.",
        fullDesc: "Pengembangan sistem kontrol navigasi dan kestabilan robot bawah air (Autonomous Underwater Vehicle) menggunakan Robot Operating System (ROS). Fokus utama pada pemrograman sensor IMU MPU-6000 untuk menjaga keseimbangan di arus air yang dinamis.",
        tags: ["ROS", "Robotics", "C++"],
        githubUrl: "https://github.com/ariefihsann",
        screenshots: [
            "/assets/images/krbai/gambar1.png",
            "/assets/images/krbai/gambar2.png",
            "/assets/images/krbai/gambar3.png",
            "/assets/images/krbai/gambar4.png",
            "/assets/images/krbai/gambar5.png",

        ]
    },
    "buku-validasi-ide": {
        title: "Buku: Validasi Ide",
        category: "UI/UX Research",
        shortDesc: "Buku 130 halaman membahas riset pengguna dan validasi prototipe.",
        fullDesc: "Panduan praktis bagi developer dan desainer untuk memahami kebutuhan asli pengguna sebelum menulis baris kode pertama. Membahas teknik interview, wireframing, usability testing, dan memangkas biaya pengembangan produk yang sia-sia.",
        tags: ["UI/UX", "PHP", "Laravel", "Tailwind CSS"],
        githubUrl: "https://github.com/ariefihsann",
        screenshots: [
            "/assets/images/bimbel-c/gambar1.png",
            "/assets/images/bimbel-c/gambar2.png",
            "/assets/images/bimbel-c/gambar3.png",
            "/assets/images/bimbel-c/gambar4.png",
            "/assets/images/bimbel-c/gambar5.png",
            "/assets/images/bimbel-c/gambar6.png",
            "/assets/images/bimbel-c/gambar7.png",
        ]
    },

    "tbChecker": {
        title: "tbChecker - Aplikasi Reminder TBC ",
        category: "Mobile App",
        shortDesc: "Aplikasi reminder untuk pasien TBC dengan fitur notifikasi dan pencatatan.",
        fullDesc: "Aplikasi web berbasis Laravel dan Tailwind CSS yang dirancang untuk membantu pasien TBC dalam mengingat jadwal pengobatan dan memantau progres penyembuhan mereka.",
        tags: ["Figma", "Flutter", "Dart", "Supabase"],
        githubUrl: "https://github.com/ariefihsann/app_tbc",
        figmaUrl: "https://www.figma.com/design/XLCr3rLsZd7UlJ6ebK2dvX/TBC-Project?node-id=124-1011&t=uXEdYzKYIYsaIC6f-1",
        screenshots: [
            "/assets/images/tbChecker/gambar1.png",
            "/assets/images/tbChecker/gambar2.png",
            "/assets/images/tbChecker/gambar3.png",
            "/assets/images/tbChecker/gambar4.png",
            "/assets/images/tbChecker/gambar5.png",
            "/assets/images/tbChecker/gambar6.png",
            "/assets/images/tbChecker/gambar7.png",
        ]
    },

    "Rebite": {
        title: "Rebite - Aplikasi Kulkas Pintar untuk pengurangan limbah makanan",
        category: "Mobile App",
        shortDesc: "Aplikasi untuk mengelola dan meminimalkan limbah makanan melalui pengingat dan notifikasi serta penggunaan redeem voucher",
        fullDesc: "Aplikasi mobile berbasis Flutter yang dirancang untuk membantu pengguna mengelola stok makanan di kulkas mereka, memberikan pengingat sebelum makanan kadaluarsa, dan menawarkan sistem redeem voucher untuk mengurangi limbah makanan serta menggunakan metoder circular economic untuk meminimalkan dampak lingkungan.",
        tags: ["Figma"],
        figmaUrl: "https://www.figma.com/design/RlVLM5DgCIrUErZeYW6961/Rebite?node-id=282-3170&t=zTX1uHvZHINyBO7W-1",
        screenshots: [
            "/assets/images/Rebite/gambar1.png",
            "/assets/images/Rebite/gambar2.png",
            "/assets/images/Rebite/gambar3.png",
            "/assets/images/Rebite/gambar4.png",
            "/assets/images/Rebite/gambar5.png",
            "/assets/images/Rebite/gambar6.png",
            "/assets/images/Rebite/gambar7.png",
            "/assets/images/Rebite/gambar8.png",
            "/assets/images/Rebite/gambar9.png",
            "/assets/images/Rebite/gambar10.png",
            "/assets/images/Rebite/gambar11.png",
            "/assets/images/Rebite/gambar12.png",
            "/assets/images/Rebite/gambar13.png",
            "/assets/images/Rebite/gambar14.png",
        ]
    },

    "Barier": {
        title: "Barier - Aplikasi Memetakan bakat dan minat ",
        category: "Mobile App",
        shortDesc: "Aplikasi untuk memetakan bakat dan minat pengguna melalui tes psikologi berbasis mobile.",
        fullDesc: "Aplikasi mobile berbasis Flutter yang dirancang untuk membantu pengguna memahami bakat dan minat mereka melalui serangkaian tes psikologi. Aplikasi ini memberikan rekomendasi karir dan pengembangan diri berdasarkan hasil tes, serta menyediakan fitur pelacakan kemajuan dan saran personalisasi.",
        tags: ["Figma"],
        figmaUrl: "https://www.figma.com/design/RlVLM5DgCIrUErZeYW6961/Rebite?node-id=282-3170&t=zTX1uHvZHINyBO7W-1",
        screenshots: [
            "/assets/images/barier/gambar1.png",
            "/assets/images/barier/gambar2.png",
            "/assets/images/barier/gambar3.png",
            "/assets/images/barier/gambar4.png",
            "/assets/images/barier/gambar5.png",
            "/assets/images/barier/gambar6.png",
            "/assets/images/barier/gambar7.png",
            "/assets/images/barier/gambar8.png",
            "/assets/images/barier/gambar9.png",
            "/assets/images/barier/gambar10.png",
            "/assets/images/barier/gambar11.png",
            "/assets/images/barier/gambar12.png",
            "/assets/images/barier/gambar13.png",
            "/assets/images/barier/gambar14.png",
        ]
    },

    "Payro": {
        title: "Payro (mobile) - Aplikasi HRIS & Payroll",
        category: "Mobile App",
        shortDesc: "Aplikasi HRIS & Payroll untuk mempermudah pengelolaan data karyawan, absensi, dan penggajian.",
        fullDesc: "Aplikasi mobile berbasis Flutter yang dirancang untuk membantu pengelolaan data karyawan, absensi, dan penggajian. Aplikasi ini menyediakan fitur pelacakan kehadiran, perhitungan gaji, dan laporan keuangan.",
        tags: ["Figma", "Flutter", "Dart"],
        figmaUrl: "https://www.figma.com/design/G1C6HeGE24UlFqbxGQNwNU/Lean-Canvas?node-id=1194-5768&t=mBkTPfekc0eVvAVn-1",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.agileteknik.payro&pcampaignid=web_share",
        screenshots: [
            "/assets/images/payro/gambar1.png",
            "/assets/images/payro/gambar2.png",
            "/assets/images/payro/gambar3.png",
            "/assets/images/payro/gambar4.png",
            "/assets/images/payro/gambar5.png",
            "/assets/images/payro/gambar6.png",
            "/assets/images/payro/gambar7.png",
            "/assets/images/payro/gambar8.png",
            "/assets/images/payro/gambar9.png",
            "/assets/images/payro/gambar10.png",
        ]

    },

    "Payro-web": {
        title: "Payro (web) - Aplikasi HRIS & Payroll",
        category: "Web App",
        shortDesc: "Aplikasi HRIS & Payroll untuk mempermudah pengelolaan data karyawan, absensi, dan penggajian.",
        fullDesc: "Aplikasi web berbasis React dan Node.js yang dirancang untuk membantu pengelolaan data karyawan, absensi, dan penggajian. Aplikasi ini menyediakan fitur pelacakan kehadiran, perhitungan gaji, dan laporan keuangan.",
        tags: ["Figma", "React", "Node.js", "Express", "MongoDB"],
        figmaUrl: "https://www.figma.com/design/G1C6HeGE24UlFqbxGQNwNU/Lean-Canvas?node-id=1194-5768&t=mBkTPfekc0eVvAVn-1",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.agileteknik.payro&pcampaignid=web_share",
        screenshots: [
            "/assets/images/payro-web/gambar1.png",
            "/assets/images/payro-web/gambar2.png",
            "/assets/images/payro-web/gambar3.png",
            "/assets/images/payro-web/gambar4.png",
            "/assets/images/payro-web/gambar5.png",
            "/assets/images/payro-web/gambar6.png",
            "/assets/images/payro-web/gambar7.png",
            "/assets/images/payro-web/gambar8.png",
            "/assets/images/payro-web/gambar9.png",
        ]

    }
};

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();

    const projectId = typeof params.id === 'string' ? params.id : '';
    const project = projectsData[projectId];

    if (!project) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold mb-2 text-foreground">Proyek Tidak Ditemukan</h2>
                <p className="text-muted-foreground mb-6">Halaman proyek yang kamu cari tidak tersedia.</p>
                <button
                    onClick={() => router.push('/proyek')}
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm"
                >
                    Kembali ke Daftar Proyek
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

            {/* Tombol Kembali */}
            <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-8 transition-colors group bg-secondary/50 hover:bg-secondary px-4 py-2 rounded-xl border border-border/50"
            >
                <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                Kembali ke Daftar Proyek
            </button>

            {/* Header Halaman Detail */}
            <div className="mb-8 border-b border-border/60 pb-8">
                <span className="text-xs font-extrabold bg-primary/15 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                    {project.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black mt-4 mb-3 text-foreground tracking-tight">
                    {project.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                    {project.shortDesc}
                </p>
            </div>

            {/* =========================================================================
          GALERI GAMBAR (UKURAN LEBIH KECIL & HORIZONTAL / LANDSCAPE 16:9)
      ========================================================================= */}
            <div className="mb-12">


                {project.screenshots && project.screenshots.length > 0 ? (
                    <div className="mb-12">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                            Pratinjau Layar (Geser ke Kanan &rarr;)
                        </h3>

                        {project.screenshots && project.screenshots.length > 0 ? (
                            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-border">
                                {project.screenshots.map((imgUrl: string, idx: number) => {

                                    /* PENGECEKAN OTOMATIS: Apakah ini aplikasi Mobile/HP? */
                                    const isMobileApp = project.category.toLowerCase().includes("mobile") || project.isPortrait;

                                    return (
                                        <div
                                            key={idx}
                                            className={`flex-shrink-0 snap-center rounded-2xl overflow-hidden border border-border/80 bg-muted/30 shadow-lg hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center ${isMobileApp
                                                ? "w-[180px] sm:w-[200px] md:w-[220px] h-[360px] sm:h-[400px] md:h-[440px]" // -> UKURAN HP LEBIH KECIL & RAMPING (1:2)
                                                : "w-[280px] sm:w-[340px] md:w-[380px] h-[160px] sm:h-[190px] md:h-[215px]" // -> UKURAN WEB
                                                }`}
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={`${project.title} screenshot ${idx + 1}`}
                                                /* KUNCI ANTI-KEPOTONG: 
                                                   Menggunakan 'object-contain' untuk Mobile App agar seluruh bingkai HP tampil utuh! */
                                                className={`w-full h-full ${isMobileApp ? "object-contain p-1.5" : "object-cover object-center"}`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="w-full h-48 bg-secondary/20 rounded-3xl border border-dashed border-border flex items-center justify-center text-muted-foreground">
                                Belum ada gambar pratinjau untuk proyek ini.
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-48 bg-secondary/20 rounded-3xl border border-dashed border-border flex items-center justify-center text-muted-foreground">
                        Belum ada gambar pratinjau untuk proyek ini.
                    </div>
                )}
            </div>

            {/* Bagian Penjelasan & Tombol GitHub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 border-t border-border/60 pt-10">

                {/* Kiri: Tentang Proyek */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-foreground">
                        Tentang Proyek Ini
                    </h3>
                    <p className="text-foreground/90 leading-relaxed text-base whitespace-pre-line text-justify sm:text-left font-light">
                        {project.fullDesc}
                    </p>
                </div>

                {/* Kanan: Teknologi & Tombol GitHub */}
                <div className="space-y-6 bg-secondary/20 p-6 sm:p-8 rounded-3xl border border-border/50 h-fit">
                    <div>
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                            Teknologi yang Digunakan
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-background border border-border text-foreground shadow-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                            Kode Sumber
                        </h3>
                        {/* Bungkus dengan flex-col dan gap-4 (jarak vertikal 16px antar tombol) */}
                        <div className="flex flex-col gap-4 my-2">

                            {/* 1. TOMBOL GOOGLE PLAY STORE (BARU!) */}
                            {project.playStoreUrl && (
                                <a
                                    href={project.playStoreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    /* Menggunakan warna Hijau khas Google Play Store (#01875F) */
                                    className="w-full flex items-center justify-center gap-2.5 bg-[#01875F] hover:bg-[#01875F]/90 text-white py-3.5 px-5 rounded-2xl font-bold transition duration-300 text-sm shadow-md"
                                >
                                    {/* Ikon Google Play Store Native SVG */}
                                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.21-.786V2.6a1.5 1.5 0 0 1 .209-.786zm11.244 11.243l3.119 3.118-10.375 5.952 7.256-9.07zM20.258 10.74l-1.503-.86-2.457 2.457 2.457 2.458 1.503-.861c.963-.55 .963-1.644 0-2.194zM7.598 1.874l10.375 5.952-3.119 3.118-7.256-9.07z" />
                                    </svg>
                                    <span>Unduh di Google Play Store</span>
                                </a>
                            )}

                            {/* 2. TOMBOL GITHUB */}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2.5 bg-foreground hover:bg-foreground/90 text-background py-3.5 px-5 rounded-2xl font-bold transition duration-200 text-sm shadow-md"
                                >
                                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                    <span>Lihat Kode di GitHub</span>
                                </a>
                            )}

                            {/* 3. TOMBOL FIGMA */}
                            {project.figmaUrl && (
                                <a
                                    href={project.figmaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2.5 bg-[#F24E1E]/10 hover:bg-[#F24E1E] text-[#F24E1E] hover:text-white border border-[#F24E1E]/30 py-3.5 px-5 rounded-2xl font-bold transition duration-300 text-sm shadow-sm"
                                >
                                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 12a3 3 0 1 0 3 3V9a3 3 0 1 0-3 3z" /><path d="M12 6a3 3 0 1 0-3 3h3V6z" /><path d="M6 12a3 3 0 1 0 3 3H6v-3z" /><path d="M6 6a3 3 0 1 0 3 3H6V6z" /><path d="M18 6a3 3 0 1 0-3 3h-3V6h3z" /></svg>
                                    <span>Lihat Desain di Figma</span>
                                </a>
                            )}

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}