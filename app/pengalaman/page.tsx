"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLanguage } from "@/components/shared/LanguageContext"; // <- Import Context Bahasa
import {
    Briefcase,
    Calendar,
    MapPin,
    Building2,
    Users
} from "lucide-react";

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    tags: string[];
    category: string;
    icon: React.ReactNode;
    image: string;
}

const tagColors: Record<string, string> = {
    "Flutter": "bg-sky-500/15 text-sky-700 dark:text-sky-400",
    "Dart": "bg-teal-500/15 text-teal-700 dark:text-teal-400",
    "React": "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    "Tailwind": "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
    "ROS": "bg-green-500/15 text-green-700 dark:text-green-400",
    "C++": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
    "Leadership": "bg-purple-500/15 text-purple-700 dark:text-purple-400",
    "UI/UX": "bg-rose-500/15 text-rose-700 dark:text-rose-400",
    "Public Speaking": "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    "Algoritma": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
};

const getTagColor = (tag: string) => {
    return tagColors[tag] || "bg-secondary text-secondary-foreground";
};

// Kamus Terjemahan Halaman Pengalaman
const translations = {
    ID: {
        title: "Pengalaman & Jejak Karir",
        subtitle: "Riwayat perjalanan profesional, kontribusi organisasi, serta dedikasi dalam membimbing siswa olimpiade dan pengembangan teknologi.",
        categories: ["Semua", "Kerja", "Organisasi", "Pendidikan"],
        emptyText: "Belum ada data di kategori ini.",
        experiences: [
            {
                id: "mentor-gabungan-sidoarjo",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "SMAN 1 Sidoarjo (Gabungan 7 SMA) · Kontrak",
                location: "Sidoarjo, Jawa Timur · Di lokasi",
                period: "Mar 2026 - Mei 2026 (3 Bulan)",
                description: [
                    "Menjadi pemateri dan pembimbing persiapan Olimpiade Sains Nasional (OSN-K) Informatika untuk 7 SMA Negeri di Sidoarjo (SMAN 1, SMAN 2, SMAN 4, dll).",
                    "Membekali siswa dengan pemahaman mendalam terkait algoritma pemrograman, logika matematika, dan struktur data menggunakan bahasa C++.",
                    "Membimbing siswa memecahkan soal-soal olimpiade tahun-tahun sebelumnya melalui latihan intensif dan simulasi."
                ]
            },
            {
                id: "study-jump-2",
                title: "Pemateri Study Jump #2 (Public Speaking & UX)",
                company: "Study Jump · Pekerja Lepas",
                location: "Remote / Jarak jauh",
                period: "Jan 2026 - Sekarang (7 Bulan)",
                description: [
                    "Menjadi pembicara dalam sesi peningkatan wawasan terkait Public Speaking dan User Experience (UX).",
                    "Membagikan strategi efektif mengkomunikasikan ide desain kepada tim pengembang dan klien.",
                    "Berbagi pengalaman praktis seputar alur kerja perancangan antarmuka digital yang berpusat pada pengguna."
                ]
            },
            {
                id: "gdsc-core-uiux",
                title: "Core Team UI/UX Designer",
                company: "Google Developer Student Clubs (GDSC)",
                location: "Surabaya, Jawa Timur · Di lokasi",
                period: "Des 2025 - Sekarang (8 Bulan)",
                description: [
                    "Bertanggung jawab merancang antarmuka (UI/UX) untuk berbagai produk digital dan materi publikasi resmi acara GDSC.",
                    "Berkoordinasi dengan divisi pemrograman (Web/Mobile) untuk memastikan desain UI dapat diimplementasikan dengan sempurna.",
                    "Mengadakan workshop dan membagikan ilmu seputar prinsip desain UI/UX kepada anggota komunitas."
                ]
            },
            {
                id: "emosver-ros-research",
                title: "Robot Research Team (ROS & Computer Vision)",
                company: "Tim Robotika EMOSVER · Kontrak",
                location: "Surabaya, Jawa Timur · Di lokasi",
                period: "Des 2025 - Sekarang (8 Bulan)",
                description: [
                    "Membangun dan mengintegrasikan sistem Robot Operating System (ROS) untuk pengembangan wahana robotika.",
                    "Mengembangkan algoritma pembacaan sensor dan integrasi Computer Vision untuk navigasi robot otonom.",
                    "Melakukan riset mendalam untuk pengujian performa mekanik dan pemrograman sistem kontrol robot."
                ]
            },
            {
                id: "mentor-diklat-guru",
                title: "Mentor & Trainer Diklat Guru Informatika",
                company: "Belajar Ambis · Kontrak",
                location: "Surabaya, Jawa Timur · Jarak jauh",
                period: "Agu 2025 (1 Bulan)",
                description: [
                    "Memfasilitasi pelatihan intensif untuk memberdayakan dan meningkatkan kompetensi guru-guru SMA dalam pengajaran mata pelajaran Informatika.",
                    "Menggabungkan konsep teoritis dengan praktik langsung (hands-on coding) menggunakan bahasa C++.",
                    "Membantu guru memahami kurikulum olimpiade sains agar dapat membimbing siswa di sekolah masing-masing."
                ]
            },
            {
                id: "mentor-debat-tapaktuan",
                title: "High School Debate Mentor – Indonesian Language",
                company: "SMAN Unggul Tapaktuan · Kontrak",
                location: "Aceh Selatan, Aceh · Jarak jauh",
                period: "Jul 2025 (1 Bulan)",
                description: [
                    "Melatih dan membimbing tim debat SMA untuk persiapan Lomba Debat Bahasa Indonesia (LDBI) tingkat kabupaten/provinsi.",
                    "Memberikan materi isu-isu terkini, memperkuat teknik argumentasi, retorika, serta melakukan simulasi debat rutin.",
                    "Fokus pelatihan mencakup penguasaan materi, pemikiran kritis (critical thinking), dan kerjasama tim yang solid."
                ]
            },
            {
                id: "mentor-osn-gedangan",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "SMAN 1 Gedangan · Kontrak",
                location: "Gedangan, Jawa Timur · Di lokasi",
                period: "Mei 2025 (1 Bulan)",
                description: [
                    "Menjadi instruktur OSN-K Informatika di SMAN 1 Gedangan untuk mempersiapkan siswa menghadapi seleksi tingkat kabupaten.",
                    "Memberikan materi dasar algoritma, logika pemrograman, dan pembahasan soal-soal OSN tahun sebelumnya.",
                    "Melakukan evaluasi berkala dan latihan koding interaktif untuk meningkatkan kemampuan analitis siswa."
                ]
            },
            {
                id: "mentor-osn-jombang",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "Belajar Ambis (SMA Darul Ulum Jombang) · Kontrak",
                location: "Jombang, Jawa Timur · Jarak jauh",
                period: "Apr 2025 (1 Bulan)",
                description: [
                    "Memberikan bimbingan intensif persiapan Olimpiade Sains Nasional (OSN) Informatika untuk siswa-siswi SMA Darul Ulum Jombang.",
                    "Membimbing pemahaman konsep pemrograman terstruktur dan pemecahan masalah algoritma secara online (Zoom).",
                    "Mengevaluasi perkembangan siswa melalui tes harian dan pembahasan live coding."
                ]
            },
            {
                id: "mentor-osn-sman2-sidoarjo",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "SMAN 2 Sidoarjo · Kontrak",
                location: "Sidoarjo, Jawa Timur · Di lokasi",
                period: "Mar 2025 (1 Bulan)",
                description: [
                    "Melaksanakan mentoring pembelajaran dan pembekalan tatap muka untuk persiapan OSN Informatika tingkat Kabupaten/Kota.",
                    "Melatih siswa memecahkan masalah komputasional dengan bahasa pemrograman C++ dalam waktu terbatas.",
                    "Membangun kepercayaan diri siswa melalui simulasi tes olimpiade yang kompetitif."
                ]
            },
            {
                id: "mentor-osn-tapaktuan-2024",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "SMAN Unggul Tapaktuan · Kontrak",
                location: "Indonesia · Di lokasi / Hybrid",
                period: "Feb 2024 - Apr 2024 (3 Bulan)",
                description: [
                    "Berperan aktif dalam mempersiapkan siswa SMAN Unggul Tapaktuan menghadapi seleksi OSN dari tingkat kabupaten hingga ke jenjang yang lebih tinggi.",
                    "Menyusun kurikulum pembekalan algoritma yang terstruktur dan disesuaikan dengan kemampuan awal masing-masing siswa.",
                    "Memberikan pendampingan intensif selama masa karantina olimpiade sekolah."
                ]
            },
            {
                id: "freelance-mobile",
                title: "Mobile App Developer (Freelance)",
                company: "Proyek Klien & Mandiri",
                location: "Remote / Indonesia",
                period: "2023 - Sekarang",
                description: [
                    "Mengembangkan aplikasi mobile lintas platform (iOS & Android) menggunakan Flutter dan Dart.",
                    "Membangun aplikasi manajemen keuangan pribadi (FinPlan) dan integrasi sistem HRIS (Payro).",
                    "Berkoordinasi langsung dengan klien untuk mengubah kebutuhan bisnis menjadi desain antarmuka (UI/UX) yang intuitif."
                ]
            },
            {
                id: "web-intern",
                title: "Web Developer Intern",
                company: "Agile Teknik / Studio IT",
                location: "Hybrid",
                period: "2022 (6 Bulan)",
                description: [
                    "Membantu pengembangan frontend dashboard administrasi menggunakan React dan Tailwind CSS.",
                    "Melakukan perbaikan bug (bug fixing) dan optimasi kecepatan muat halaman web.",
                    "Belajar bekerja dalam tim menggunakan metodologi Agile dan Git version control."
                ]
            }
        ]
    },
    US: {
        title: "Experience & Career Path",
        subtitle: "Professional journey, organizational contributions, and dedication to mentoring olympiad students and technology development.",
        categories: ["All", "Work", "Organization", "Education"],
        emptyText: "No data found in this category.",
        experiences: [
            {
                id: "mentor-gabungan-sidoarjo",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "SMAN 1 Sidoarjo (7 State High Schools Coalition) · Contract",
                location: "Sidoarjo, East Java · On-site",
                period: "Mar 2026 - May 2026 (3 Months)",
                description: [
                    "Served as a speaker and coach for the National Science Olympiad (OSN-K) Informatics preparation across 7 State High Schools in Sidoarjo.",
                    "Equipped students with deep understanding of programming algorithms, mathematical logic, and data structures using C++.",
                    "Guided students in solving previous years' olympiad problems through intensive practice and simulations."
                ]
            },
            {
                id: "study-jump-2",
                title: "Study Jump #2 Speaker (Public Speaking & UX)",
                company: "Study Jump · Freelance",
                location: "Remote",
                period: "Jan 2026 - Present (7 Months)",
                description: [
                    "Spoke in insight-enhancement sessions regarding Public Speaking and User Experience (UX).",
                    "Shared effective strategies for communicating design ideas to development teams and clients.",
                    "Shared practical experiences surrounding user-centered digital interface design workflows."
                ]
            },
            {
                id: "gdsc-core-uiux",
                title: "Core Team UI/UX Designer",
                company: "Google Developer Student Clubs (GDSC)",
                location: "Surabaya, East Java · On-site",
                period: "Dec 2025 - Present (8 Months)",
                description: [
                    "Responsible for designing UI/UX for various digital products and official publication materials of GDSC events.",
                    "Coordinated with the programming division (Web/Mobile) to ensure UI designs were implemented perfectly.",
                    "Conducted workshops and shared knowledge on UI/UX design principles with community members."
                ]
            },
            {
                id: "emosver-ros-research",
                title: "Robot Research Team (ROS & Computer Vision)",
                company: "EMOSVER Robotics Team · Contract",
                location: "Surabaya, East Java · On-site",
                period: "Dec 2025 - Present (8 Months)",
                description: [
                    "Built and integrated Robot Operating System (ROS) for robotics vehicle development.",
                    "Developed sensor reading algorithms and Computer Vision integration for autonomous robot navigation.",
                    "Conducted deep research for mechanical performance testing and robot control system programming."
                ]
            },
            {
                id: "mentor-diklat-guru",
                title: "Informatics Teacher Training Mentor & Trainer",
                company: "Belajar Ambis · Contract",
                location: "Surabaya, East Java · Remote",
                period: "Aug 2025 (1 Month)",
                description: [
                    "Facilitated intensive training to empower and improve high school teachers' competencies in teaching Informatics.",
                    "Combined theoretical concepts with hands-on coding practice using C++.",
                    "Helped teachers understand the science olympiad curriculum to coach students in their respective schools."
                ]
            },
            {
                id: "mentor-debat-tapaktuan",
                title: "High School Debate Mentor – Indonesian Language",
                company: "SMAN Unggul Tapaktuan · Contract",
                location: "South Aceh, Aceh · Remote",
                period: "Jul 2025 (1 Month)",
                description: [
                    "Trained and coached high school debate teams in preparation for the Indonesian Language Debate Competition (LDBI).",
                    "Delivered sessions on current issues, strengthened argumentation techniques, rhetoric, and ran routine debate simulations.",
                    "Focused training on content mastery, critical thinking, and solid teamwork."
                ]
            },
            {
                id: "mentor-osn-gedangan",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "SMAN 1 Gedangan · Contract",
                location: "Gedangan, East Java · On-site",
                period: "May 2025 (1 Month)",
                description: [
                    "Served as OSN-K Informatics instructor at SMAN 1 Gedangan to prepare students for district selection.",
                    "Provided basic algorithmic materials, programming logic, and previous years' OSN problem discussions.",
                    "Conducted regular evaluations and interactive coding exercises to enhance students' analytical skills."
                ]
            },
            {
                id: "mentor-osn-jombang",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "Belajar Ambis (SMA Darul Ulum Jombang) · Contract",
                location: "Jombang, East Java · Remote",
                period: "Apr 2025 (1 Month)",
                description: [
                    "Provided intensive mentoring for National Science Olympiad (OSN) Informatics preparation for SMA Darul Ulum Jombang students.",
                    "Guided structured programming concepts and algorithmic problem-solving online via Zoom.",
                    "Evaluated student progress through daily tests and live coding discussions."
                ]
            },
            {
                id: "mentor-osn-sman2-sidoarjo",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "SMAN 2 Sidoarjo · Contract",
                location: "Sidoarjo, East Java · On-site",
                period: "Mar 2025 (1 Month)",
                description: [
                    "Executed in-person learning mentoring and briefings for district/city-level OSN Informatics preparation.",
                    "Trained students to solve computational problems using C++ under strict time limits.",
                    "Built students' confidence through competitive olympiad test simulations."
                ]
            },
            {
                id: "mentor-osn-tapaktuan-2024",
                title: "Mentor & Trainer | High School Science Olympiad (Informatics)",
                company: "SMAN Unggul Tapaktuan · Contract",
                location: "Indonesia · On-site / Hybrid",
                period: "Feb 2024 - Apr 2024 (3 Months)",
                description: [
                    "Played an active role in preparing SMAN Unggul Tapaktuan students for OSN selections from district to higher levels.",
                    "Designed structured algorithm briefing curricula tailored to each student's baseline ability.",
                    "Provided intensive support during school olympiad quarantine periods."
                ]
            },
            {
                id: "freelance-mobile",
                title: "Mobile App Developer (Freelance)",
                company: "Client & Independent Projects",
                location: "Remote / Indonesia",
                period: "2023 - Present",
                description: [
                    "Developed cross-platform mobile apps (iOS & Android) using Flutter and Dart.",
                    "Built personal finance management apps (FinPlan) and integrated HRIS systems (Payro).",
                    "Coordinated directly with clients to translate business requirements into intuitive UI/UX designs."
                ]
            },
            {
                id: "web-intern",
                title: "Web Developer Intern",
                company: "Agile Teknik / IT Studio",
                location: "Hybrid",
                period: "2022 (6 Months)",
                description: [
                    "Assisted frontend development of admin dashboards using React and Tailwind CSS.",
                    "Performed bug fixing and web page loading speed optimization.",
                    "Learned to work in teams using Agile methodology and Git version control."
                ]
            }
        ]
    }
};

// Data dasar tetap membawa icon, category dasar, image, dan tags
const baseExperiences: Omit<Experience, 'title' | 'company' | 'location' | 'period' | 'description'>[] = [
    {
        id: "mentor-gabungan-sidoarjo",
        tags: ["C++", "Public Speaking", "Algoritma"],
        category: "Kerja",
        icon: <Briefcase size={18} />,
        image: "/assets/images/pengalaman/smanGabungan.jpg"
    },
    {
        id: "study-jump-2",
        tags: ["Public Speaking", "UI/UX", "Leadership"],
        category: "Organisasi",
        icon: <Briefcase size={18} />,
        image: "/assets/images/pengalaman/speakerr.jpg"
    },
    {
        id: "gdsc-core-uiux",
        tags: ["UI/UX", "Leadership"],
        category: "Organisasi",
        icon: <Users size={18} />,
        image: "/assets/images/pengalaman/gdgoc.jpg"
    },
    {
        id: "emosver-ros-research",
        tags: ["ROS", "C++", "Leadership"],
        category: "Organisasi",
        icon: <Users size={18} />,
        image: "/assets/images/krbai/gambar1.png"
    },
    {
        id: "mentor-diklat-guru",
        tags: ["C++", "Public Speaking", "Algoritma"],
        category: "Kerja",
        icon: <Briefcase size={18} />,
        image: "/assets/images/pengalaman/mentordiklat.jpg"
    },
    {
        id: "mentor-debat-tapaktuan",
        tags: ["Public Speaking", "Leadership"],
        category: "Kerja",
        icon: <Briefcase size={18} />,
        image: "/assets/images/pengalaman/mentorDebate.jpg"
    },
    {
        id: "mentor-osn-gedangan",
        tags: ["C++", "Public Speaking", "Algoritma"],
        category: "Kerja",
        icon: <Briefcase size={18} />,
        image: "/assets/images/pengalaman/smanUnggulOlimpiade.jpg"
    },
    {
        id: "mentor-osn-jombang",
        tags: ["C++", "Algoritma"],
        category: "Kerja",
        icon: <Briefcase size={18} />,
        image: "/assets/images/pengalaman/darulUlumJombang.jpg"
    },
    {
        id: "mentor-osn-sman2-sidoarjo",
        tags: ["C++", "Public Speaking", "Algoritma"],
        category: "Kerja",
        icon: <Briefcase size={18} />,
        image: "/assets/images/pengalaman/sman2sidoarjo.jpg"
    },
    {
        id: "mentor-osn-tapaktuan-2024",
        tags: ["C++", "Algoritma"],
        category: "Kerja",
        icon: <Briefcase size={18} />,
        image: "/assets/images/pengalaman/smanUnggulOlimpiade.jpg"
    },
    {
        id: "freelance-mobile",
        tags: ["Flutter", "Dart", "UI/UX"],
        category: "Kerja",
        icon: <Briefcase size={18} />,
        image: "/assets/images/payro/gambar1.png"
    },
    {
        id: "web-intern",
        tags: ["React", "Tailwind"],
        category: "Kerja",
        icon: <Building2 size={18} />,
        image: "/assets/images/seo-dash/gambar1.png"
    }
];

export default function PengalamanPage() {
    const container = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const { language } = useLanguage(); // Mengambil bahasa aktif (ID / US)

    const t = translations[language] || translations.ID;

    // Menggabungkan data dasar dengan teks terjemahan berdasarkan bahasa
    const experiencesData: Experience[] = baseExperiences.map(be => {
        const translated = t.experiences.find(e => e.id === be.id);
        return {
            ...be,
            title: translated ? translated.title : "No Title",
            company: translated ? translated.company : "Unknown Company",
            location: translated ? translated.location : "Location",
            period: translated ? translated.period : "Period",
            description: translated ? translated.description : [],
        };
    });

    const filteredExperiences = experiencesData.filter(exp => {
        if (activeFilter === "Semua" || activeFilter === "All") return true;
        // Mapping kategori filter jika bahasa Inggris
        if (language === "US") {
            const categoryMap: Record<string, string> = {
                "Work": "Kerja",
                "Organization": "Organisasi",
                "Education": "Pendidikan"
            };
            return exp.category === categoryMap[activeFilter];
        }
        return exp.category === activeFilter;
    });

    useGSAP(() => {
        gsap.from(".header-anim", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" });
    }, { scope: container });

    useGSAP(() => {
        if (filteredExperiences.length > 0) {
            gsap.fromTo(".exp-card",
                { y: 30, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.1)", clearProps: "all" }
            );
        }
    }, { scope: container, dependencies: [activeFilter, language] });

    return (
        <div ref={container} className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 header-anim text-foreground">
                    {t.title}
                </h1>
                <p className="text-base text-muted-foreground max-w-xl header-anim leading-relaxed">
                    {t.subtitle}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mb-12 header-anim bg-secondary/30 p-2 rounded-2xl w-fit border border-border/50">
                {t.categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ease-out active:scale-95 select-none ${activeFilter === category ? "bg-foreground text-background shadow-md scale-105" : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div key={activeFilter + language} className="relative border-l-2 border-border/60 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-10 min-h-[300px]">
                {filteredExperiences.length > 0 ? (
                    filteredExperiences.map((exp) => (
                        <div key={exp.id} className="exp-card relative group">
                            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-md group-hover:scale-125 group-hover:bg-primary transition-all duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-primary-foreground" />
                            </div>

                            <div className="max-w-2xl bg-card border border-border/60 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-foreground/30 transition-all duration-300">

                                <div className="mb-5 relative w-full h-[200px] sm:h-[230px] flex items-center justify-center rounded-2xl bg-zinc-900/50 border border-border/40 overflow-hidden">
                                    <Image
                                        src={exp.image}
                                        alt={exp.company}
                                        fill
                                        className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 672px"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                                            {exp.icon}
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-primary">{exp.category}</span>
                                            <h3 className="text-xl font-bold text-foreground mt-0.5">{exp.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-muted-foreground bg-secondary/40 px-3.5 py-1.5 rounded-xl w-fit">
                                        <span className="flex items-center gap-1.5"><Calendar size={13} />{exp.period}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1.5"><MapPin size={13} />{exp.location}</span>
                                    </div>
                                </div>

                                <h4 className="text-base font-bold text-foreground/80 mb-4 flex items-center gap-2">
                                    <Building2 size={16} className="text-muted-foreground" />
                                    {exp.company}
                                </h4>

                                <ul className="space-y-2 mb-6 text-sm text-muted-foreground leading-relaxed">
                                    {exp.description.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2.5">
                                            <span className="text-primary font-bold mt-1">▹</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                                    {exp.tags.map((tag) => (
                                        <span key={tag} className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-lg ${getTagColor(tag)}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground bg-secondary/20 rounded-3xl border border-dashed border-border max-w-2xl">
                        <p className="font-medium text-lg">{t.emptyText}</p>
                    </div>
                )}
            </div>
        </div>
    );
}