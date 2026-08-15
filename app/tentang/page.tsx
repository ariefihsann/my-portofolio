"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/shared/LanguageContext"; // <- Import Context Bahasa
import {
    GraduationCap,
    Users,
    BookOpen,
    Compass,
    Code2,
    Cpu,
    Sparkles,
    Terminal,
    MapPin,
    HeartHandshake
} from "lucide-react";

// Kamus Terjemahan untuk Halaman Tentang
const translations = {
    ID: {
        getToIntro: "Kenali Saya Lebih Dekat",
        title: "Tentang Saya",
        description: "Saya adalah seorang pengembang perangkat lunak, peneliti antarmuka pengguna (UI/UX), dan penggiat robotika bawah air. Saya percaya bahwa rekayasa sistem yang solid berawal dari pemahaman empati terhadap kebutuhan nyata manusia, yang dieksekusi secara iteratif dan adaptif melalui prinsip-prinsip agile development.",
        location: "Surabaya, Jawa Timur, Indonesia",
        education: "D4 Teknik Informatika - PENS",

        // Filosofi
        philosophyTitle: "Filosofi Rekayasa",
        quote: "\"Jangan menulis baris kode pertama sebelum kamu benar-benar memahami masalah siapa yang sedang kamu selesaikan.\"",
        philosophyDesc: "Pendekatan saya dalam perancangan arsitektur perangkat lunak menggabungkan ketepatan fitur dan algoritma dengan melakukan riset pengguna yang mendalam. Baik saat mengembangkan sistem berskala besar maupun kecil, fokus utama saya adalah efisiensi, skalabilitas, dan pengalaman penggunaan yang intuitif.",

        // Core Stack
        coreStackTitle: "Core Stack",
        coreStackDesc: "Fondasi teknologi yang saya gunakan setiap hari untuk mengubah ide abstrak menjadi produk digital nyata:",

        // Highlights
        appDevLabel: "Pengembangan Aplikasi",
        payroTitle: "Payro - HRIS & Payroll System",
        payroDesc: "Pengembangan aplikasi berbasis web dan mobile untuk sistem manajemen SDM (HRIS) dan penggajian (Payroll) menggunakan Flutter, .net, dan React.js. Aplikasi ini dirancang untuk meningkatkan efisiensi proses administrasi karyawan, termasuk absensi, cuti, dan penghitungan gaji secara otomatis.",

        roboticsLabel: "Riset Robotika",
        emosverTitle: "Tim Robotika EMOSVER (ROS & AUV/ROV)",
        emosverDesc: "Sebagai anggota inti divisi riset sistem kontrol EMOSVER, saya mengembangkan arsitektur pemrograman menggunakan Robot Operating System (ROS) dan bahasa C++. Riset ini berfokus pada pembacaan sensor IMU untuk kestabilan navigasi wahana bawah air tanpa awak (ROV/AUV) yang dipersiapkan untuk laga internasional TEKNOFEST Turkey.",

        // Leadership
        leadershipTitle: "Kepemimpinan & Dedikasi Organisasi",
        leadershipSub: "Memupuk keahlian komunikasi, manajemen tim, dan kolaborasi profesional di bangku perkuliahan.",

        komjurTitle: "Komandan Jurusan (Komjur)",
        komjurSub: "Teknik Informatika 2024 · PENS",
        komjurDesc: "Dipercaya memimpin, mengkoordinasi, dan menjadi jembatan aspirasi bagi seluruh mahasiswa Teknik Informatika angkatan 2024, serta aktif sebagai panitia inti suksesi HIMIT.",

        gdscTitle: "Core Team UI/UX",
        gdscSub: "GDGOC PENS",
        gdscDesc: "Aktif sebagai Core Team UI/UX di Google Developer Groups on Campus (GDGOC) PENS.",

        osnTitle: "OSN Mentor",
        osnSub: "Mentoring SMA",
        osnDesc: "Mendedikasikan waktu membimbing siswa SMA persiapan Olimpiade Sains Nasional (OSNK) Informatika.",

        // Life Balance
        lifeTitle: "Di Luar Layar Monitor",
        lifeSub: "Work-Life Balance",
        lifeDesc1: "Kegiatan saya tidak hanya berhadapan dengan layar laptop. Saya percaya bahwa keseimbangan antara pekerjaan dan kehidupan pribadi sangat penting untuk pertumbuhan pribadi dan profesional. Di luar dunia digital, saya menikmati berbagai kegiatan yang memperkaya pengalaman hidup saya.",
        lifeDesc2: "Untuk menyegarkan pikiran dan mencari inspirasi baru, saya senang menjelajahi keindahan alam terbuka, seperti menaklukkan puncak gunung ataupun melakukan kegiatan olahraga di luar rumah.",
        hobby1: "Pendaki Gunung",
        hobby2: "Mentor & Public Speaker"
    },
    US: {
        getToIntro: "Get To Know Me",
        title: "About Me",
        description: "I am a software engineer, UI/UX researcher, and underwater robotics enthusiast. I believe that solid system engineering stems from an empathetic understanding of real human needs, executed iteratively and adaptively through agile development principles.",
        location: "Surabaya, East Java, Indonesia",
        education: "D4 Informatics Engineering - PENS",

        // Philosophy
        philosophyTitle: "Engineering Philosophy",
        quote: "\"Don't write the first line of code until you truly understand whose problem you are solving.\"",
        philosophyDesc: "My approach to software architecture design combines feature precision and algorithms with deep user research. Whether developing large-scale or small-scale systems, my main focus is efficiency, scalability, and an intuitive user experience.",

        // Core Stack
        coreStackTitle: "Core Stack",
        coreStackDesc: "The technological foundation I use daily to turn abstract ideas into real digital products:",

        // Highlights
        appDevLabel: "Application Development",
        payroTitle: "Payro - HRIS & Payroll System",
        payroDesc: "Web and mobile-based application development for HR management (HRIS) and payroll systems using Flutter, .net, and React.js. This application is designed to increase the efficiency of employee administrative processes, including attendance, leave, and automated salary calculation.",

        roboticsLabel: "Robotics Research",
        emosverTitle: "EMOSVER Robotics Team (ROS & AUV/ROV)",
        emosverDesc: "As a core member of the EMOSVER control system research division, I develop programming architecture using Robot Operating System (ROS) and C++. This research focuses on IMU sensor reading for the navigation stability of unmanned underwater vehicles (ROV/AUV) prepared for the international TEKNOFEST Turkey competition.",

        // Leadership
        leadershipTitle: "Leadership & Organizational Dedication",
        leadershipSub: "Fostering communication skills, team management, and professional collaboration during college.",

        komjurTitle: "Major Commander (Komjur)",
        komjurSub: "Informatics Engineering 2024 · PENS",
        komjurDesc: "Trusted to lead, coordinate, and act as a bridge of aspiration for all Informatics Engineering students of the 2024 cohort, as well as active as core committee for HIMIT succession.",

        gdscTitle: "Core Team UI/UX",
        gdscSub: "GDGOC PENS",
        gdscDesc: "Active as a Core Team UI/UX member in Google Developer Groups on Campus (GDGOC) PENS.",

        osnTitle: "OSN Mentor",
        osnSub: "High School Mentoring",
        osnDesc: "Dedicated time to guiding high school students in preparing for the National Science Olympiad (OSN-K) in Informatics.",

        // Life Balance
        lifeTitle: "Beyond the Monitor Screen",
        lifeSub: "Work-Life Balance",
        lifeDesc1: "My activities aren't just limited to facing a laptop screen. I believe that work-life balance is crucial for personal and professional growth. Outside the digital world, I enjoy various activities that enrich my life experiences.",
        lifeDesc2: "To refresh my mind and seek new inspiration, I love exploring the beauty of the great outdoors, such as conquering mountain peaks or engaging in outdoor sports.",
        hobby1: "Mountain Climber",
        hobby2: "Mentor & Public Speaker"
    }
};

export default function AboutPage() {
    const container = useRef<HTMLDivElement>(null);
    const { language } = useLanguage(); // Mengambil status bahasa aktif (ID / US)
    const t = translations[language] || translations.ID;

    useGSAP(() => {
        const tl = gsap.timeline();

        // Animasi Header
        tl.from(".about-header", {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });

        // Animasi Kartu secara bertahap (Stagger)
        tl.from(".about-card", {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.1)",
            clearProps: "all"
        }, "-=0.4");
    }, { scope: container, dependencies: [language] });

    return (
        <div ref={container} className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pb-24 text-foreground">

            {/* ══════════════════════════════════════
                1. HEADER & INTRO
            ══════════════════════════════════════ */}
            <div className="about-header mb-14 border-b border-white/10 pb-10">
                <div className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-wider mb-3">
                    <Sparkles size={16} />
                    <span>{t.getToIntro}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    {t.title}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light max-w-3xl">
                    {t.description}
                </p>

                {/* Status Badge Ringkas */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 text-xs font-medium text-zinc-400">
                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
                        <MapPin size={14} className="text-primary" />
                        <span>{t.location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
                        <GraduationCap size={14} className="text-blue-400" />
                        <span>{t.education}</span>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
                2. FILOSOFI & FOCUS (BENTO GRID - FULL WIDTH)
            ══════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                {/* Kartu Filosofi - Memakan 2 Kolom */}
                <div className="about-card md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-white/10 relative overflow-hidden group hover:border-primary/40 transition-all duration-500 shadow-lg">
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                    <div className="flex items-center gap-3 text-primary mb-4">
                        <Terminal size={22} />
                        <h2 className="text-lg font-bold tracking-wide uppercase font-mono">{t.philosophyTitle}</h2>
                    </div>
                    <blockquote className="text-xl sm:text-2xl font-medium text-zinc-100 leading-snug mb-4">
                        {t.quote}
                    </blockquote>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t.philosophyDesc}
                    </p>
                </div>

                {/* Kartu Ekosistem Utama - Memakan 1 Kolom */}
                <div className="about-card p-8 rounded-3xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                    <div>
                        <div className="flex items-center gap-3 text-blue-400 mb-4">
                            <Code2 size={22} />
                            <h2 className="text-lg font-bold tracking-wide uppercase font-mono">{t.coreStackTitle}</h2>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">
                            {t.coreStackDesc}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["Flutter & Dart", "React.js", "Next.js", "Tailwind CSS", "Laravel", "C++ (ROS)", "Figma", "Git & AWS"].map((tech, i) => (
                            <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-200">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

            </div>

            {/* ══════════════════════════════════════
                3. HIGHLIGHT KARYA & RISET (2 KOLOM SETARA)
            ══════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

                {/* Kartu Payro */}
                <div className="about-card p-8 rounded-3xl bg-zinc-900/40 border border-white/10 relative group hover:border-purple-500/50 transition-all duration-500 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                <BookOpen size={24} />
                            </div>
                            <span className="text-xs font-bold font-mono uppercase px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                {t.appDevLabel}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-purple-400 transition-colors">
                            {t.payroTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {t.payroDesc}
                        </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-zinc-400">
                        <span>🎯 User-Centric Methodology</span>
                    </div>
                </div>

                {/* Kartu Robotika EMOSVER */}
                <div className="about-card p-8 rounded-3xl bg-zinc-900/40 border border-white/10 relative group hover:border-emerald-500/50 transition-all duration-500 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <Cpu size={24} />
                            </div>
                            <span className="text-xs font-bold font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                {t.roboticsLabel}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-emerald-400 transition-colors">
                            {t.emosverTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {t.emosverDesc}
                        </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-zinc-400">
                        <span>🤖 Autonomous Control System</span>
                        <span>🌊 TEKNOFEST Turkey Prep</span>
                    </div>
                </div>

            </div>

            {/* ══════════════════════════════════════
                4. KEPEMIMPINAN & AKADEMIK (GRID 3 KOLOM)
            ══════════════════════════════════════ */}
            <div className="mb-14">
                <div className="about-card mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Users className="text-primary" size={24} />
                        {t.leadershipTitle}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {t.leadershipSub}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Kartu Komjur */}
                    <div className="about-card p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:bg-zinc-900/60 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold mb-4 border border-blue-500/20">
                            KJ
                        </div>
                        <h3 className="text-base font-bold text-foreground">{t.komjurTitle}</h3>
                        <p className="text-xs font-mono text-primary mb-3">{t.komjurSub}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {t.komjurDesc}
                        </p>
                    </div>

                    {/* Kartu GDGOC */}
                    <div className="about-card p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:bg-zinc-900/60 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold mb-4 border border-amber-500/20">
                            GD
                        </div>
                        <h3 className="text-base font-bold text-foreground">{t.gdscTitle}</h3>
                        <p className="text-xs font-mono text-amber-400 mb-3">{t.gdscSub}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {t.gdscDesc}
                        </p>
                    </div>

                    {/* Kartu OSN Mentor */}
                    <div className="about-card p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:bg-zinc-900/60 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold mb-4 border border-rose-500/20">
                            OSN
                        </div>
                        <h3 className="text-base font-bold text-foreground">{t.osnTitle}</h3>
                        <p className="text-xs font-mono text-rose-400 mb-3">{t.osnSub}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {t.osnDesc}
                        </p>
                    </div>

                </div>
            </div>

            {/* ══════════════════════════════════════
                5. DI LUAR LAYAR (LIFE BALANCE)
            ══════════════════════════════════════ */}
            <div className="about-card p-8 rounded-3xl bg-gradient-to-r from-zinc-900/60 to-zinc-900/30 border border-white/10 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider mb-2">
                            <Compass size={16} />
                            <span>{t.lifeSub}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-3">
                            {t.lifeTitle}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t.lifeDesc1}
                            <br /><br />
                            {t.lifeDesc2}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 shrink-0">
                        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-semibold text-zinc-200">
                            <Compass className="text-emerald-400 shrink-0" size={18} />
                            <span>{t.hobby1}</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-semibold text-zinc-200">
                            <HeartHandshake className="text-blue-400 shrink-0" size={18} />
                            <span>{t.hobby2}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}