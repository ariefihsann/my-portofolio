"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLanguage } from "@/components/shared/LanguageContext"; // <- Import Language Context
import {
    Award,
    ExternalLink,
    Calendar,
    Trophy,
    CheckCircle
} from "lucide-react";

interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    category: string;
    image: string;
    credentialUrl?: string;
    tags: string[];
}

const tagColors: Record<string, string> = {
    "Robotics": "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    "Flutter": "bg-sky-500/15 text-sky-700 dark:text-sky-400",
    "UI/UX": "bg-rose-500/15 text-rose-700 dark:text-rose-400",
    "Web Dev": "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    "Kompetisi": "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    "Webinar": "bg-teal-500/15 text-teal-700 dark:text-teal-400",
    "Kepanitiaan": "bg-purple-500/15 text-purple-700 dark:text-purple-400",
    "AI": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
};

const getTagColor = (tag: string) => {
    return tagColors[tag] || "bg-secondary text-secondary-foreground";
};

// Kamus Terjemahan Halaman Sertifikat
const translations = {
    ID: {
        title: "Sertifikat & Penghargaan",
        subtitle: "Kumpulan bukti pencapaian, validasi keahlian teknis, serta keikutsertaan dalam berbagai kompetisi dan kepanitiaan profesional.",
        categories: ["Semua", "Kompetisi", "Kursus / Pelatihan", "Webinar", "Kepanitiaan"],
        btnView: "Lihat Bukti",
        emptyTitle: "Belum ada sertifikat di kategori ini.",
        emptySubtitle: "Coba pilih kategori filter yang lain di atas.",
        certificates: [
            { id: "cert-sic-2026", title: "Peserta Lomba UI/UX Design - Smart IT Competition (SIC) 2026", issuer: "Panitia Smart IT Competition" },
            { id: "cert-luminux-2025", title: "Peserta Seminar Luminux: Generative AI for Social Life", issuer: "Fakultas Vokasi UNESA" },
            { id: "cert-1", title: "Best Speakers Award in Competition Debate Indonesian Language 2023", issuer: "SMAN 1 Tapaktuan" },
            { id: "cert-2", title: "Olimpiade Sains Nasional Tingkat Kabupaten/Kota (OSN-K) 1", issuer: "Puspresnas / Kemendikbud" },
            { id: "cert-3", title: "Olimpiade Sains Nasional Tingkat Kabupaten/Kota (OSN-K) 2", issuer: "Puspresnas / Kemendikbud" },
            { id: "cert-4", title: "Penghargaan POPDA (Pekan Olahraga Pelajar Daerah)", issuer: "Dispora / Panitia POPDA" },
            { id: "cert-5", title: "Sertifikat Kegiatan / Penghargaan Pramuka", issuer: "Gerakan Pramuka" },
            { id: "cert-6", title: "Webinar & Pelatihan Proven Academy - Modul 1", issuer: "Proven Academy" },
            { id: "cert-7", title: "Webinar & Pelatihan Proven Academy - Modul 4", issuer: "Proven Academy" },
            { id: "cert-8", title: "Webinar & Pelatihan Proven Academy - Modul 5", issuer: "Proven Academy" },
            { id: "cert-9", title: "Webinar & Pelatihan Proven Academy - Modul 6", issuer: "Proven Academy" },
            { id: "cert-10", title: "Sertifikasi Amazon Web Services (AWS)", issuer: "Amazon Web Services" },
            { id: "cert-11", title: "Sertifikat Pelatihan Barista - Tingkat Dasar", issuer: "Lembaga Pelatihan Kerja / Barista" },
            { id: "cert-12", title: "Sertifikat Pelatihan Barista - Tingkat Lanjutan", issuer: "Lembaga Pelatihan Kerja / Barista" },
            { id: "cert-13", title: "Penghargaan Pelajar Pelopor", issuer: "Dinas Pendidikan / Instansi Terkait" },
            { id: "cert-14", title: "Simulasi & Try Out Pra-OSN Provinsi (OSN-P)", issuer: "Pusat Prestasi / Penyelenggara Try Out" },
            { id: "cert-15", title: "Panitia Webinar ITDS Insight & Teknologi", issuer: "ITDS" },
            { id: "cert-16", title: "Panitia Webinar Eksternal HIMIT", issuer: "HIMIT" },
        ]
    },
    US: {
        title: "Certificates & Awards",
        subtitle: "A collection of proofs of achievement, technical skill validations, and participation in various competitions and professional committees.",
        categories: ["All", "Competition", "Courses / Training", "Webinar", "Committee"],
        btnView: "View Proof",
        emptyTitle: "No certificates found in this category.",
        emptySubtitle: "Try selecting another filter category above.",
        certificates: [
            { id: "cert-sic-2026", title: "UI/UX Design Competition Participant - Smart IT Competition (SIC) 2026", issuer: "Smart IT Competition Committee" },
            { id: "cert-luminux-2025", title: "Luminux Seminar Participant: Generative AI for Social Life", issuer: "Faculty of Vocational Studies UNESA" },
            { id: "cert-1", title: "Best Speakers Award in Competition Debate Indonesian Language 2023", issuer: "SMAN 1 Tapaktuan" },
            { id: "cert-2", title: "National Science Olympiad District/City Level (OSN-K) 1", issuer: "Puspresnas / Ministry of Education" },
            { id: "cert-3", title: "National Science Olympiad District/City Level (OSN-K) 2", issuer: "Puspresnas / Ministry of Education" },
            { id: "cert-4", title: "POPDA Award (Regional Student Sports Week)", issuer: "Dispora / POPDA Committee" },
            { id: "cert-5", title: "Scout Activity Certificate / Award", issuer: "Gerakan Pramuka" },
            { id: "cert-6", title: "Proven Academy Webinar & Training - Module 1", issuer: "Proven Academy" },
            { id: "cert-7", title: "Proven Academy Webinar & Training - Module 4", issuer: "Proven Academy" },
            { id: "cert-8", title: "Proven Academy Webinar & Training - Module 5", issuer: "Proven Academy" },
            { id: "cert-9", title: "Proven Academy Webinar & Training - Module 6", issuer: "Proven Academy" },
            { id: "cert-10", title: "Amazon Web Services (AWS) Certification", issuer: "Amazon Web Services" },
            { id: "cert-11", title: "Barista Training Certificate - Basic Level", issuer: "Job Training Center / Barista" },
            { id: "cert-12", title: "Barista Training Certificate - Advanced Level", issuer: "Job Training Center / Barista" },
            { id: "cert-13", title: "Pioneer Student Award", issuer: "Education Office / Related Agency" },
            { id: "cert-14", title: "Provincial Pre-OSN Simulation & Try Out (OSN-P)", issuer: "Achievement Center / Try Out Organizer" },
            { id: "cert-15", title: "ITDS Insight & Technology Webinar Committee", issuer: "ITDS" },
            { id: "cert-16", title: "HIMIT External Webinar Committee", issuer: "HIMIT" },
        ]
    }
};

// Data Dasar Sertifikat (Struktur dan Gambar tetap sama)
const baseCertificates: Omit<Certificate, 'title' | 'issuer'>[] = [
    {
        id: "cert-sic-2026",
        date: "2026",
        category: "Kompetisi",
        image: "/assets/images/sertifikat/40.png",
        credentialUrl: "/assets/images/sertifikat/40.png",
        tags: ["Kompetisi", "UI/UX"]
    },
    {
        id: "cert-luminux-2025",
        date: "Oktober 2025",
        category: "Kompetisi",
        image: "/assets/images/sertifikat/Arif Muhammad ihsan marbun-1.png",
        credentialUrl: "/assets/images/sertifikat/Arif Muhammad ihsan marbun-1.png",
        tags: ["Kompetisi", "UI/UX"]
    },
    {
        id: "cert-1",
        date: "Februari 2023",
        category: "Kompetisi",
        image: "/assets/images/sertifikat/bestspeaker.jpg",
        credentialUrl: "/assets/images/sertifikat/bestspeaker.jpg",
        tags: ["Kompetisi"]
    },
    {
        id: "cert-2",
        date: "2023",
        category: "Kompetisi",
        image: "/assets/images/sertifikat/osnk1.jpg",
        credentialUrl: "/assets/images/sertifikat/osnk1.jpg",
        tags: ["Kompetisi"]
    },
    {
        id: "cert-3",
        date: "2023",
        category: "Kompetisi",
        image: "/assets/images/sertifikat/osnk2.jpg",
        credentialUrl: "/assets/images/sertifikat/osnk2.jpg",
        tags: ["Kompetisi"]
    },
    {
        id: "cert-4",
        date: "2023",
        category: "Kompetisi",
        image: "/assets/images/sertifikat/popda.jpg",
        credentialUrl: "/assets/images/sertifikat/popda.jpg",
        tags: ["Kompetisi"]
    },
    {
        id: "cert-5",
        date: "2023",
        category: "Organisasi",
        image: "/assets/images/sertifikat/pramuka.jpg",
        credentialUrl: "/assets/images/sertifikat/pramuka.jpg",
        tags: ["Kompetisi"]
    },
    {
        id: "cert-6",
        date: "2024",
        category: "Webinar",
        image: "/assets/images/sertifikat/provenacademy1-1.png",
        credentialUrl: "/assets/images/sertifikat/provenacademy1-1.png",
        tags: ["Webinar"]
    },
    {
        id: "cert-7",
        date: "2024",
        category: "Webinar",
        image: "/assets/images/sertifikat/provenacademy4-1.png",
        credentialUrl: "/assets/images/sertifikat/provenacademy4-1.png",
        tags: ["Webinar"]
    },
    {
        id: "cert-8",
        date: "2024",
        category: "Webinar",
        image: "/assets/images/sertifikat/provenacademy5-1.png",
        credentialUrl: "/assets/images/sertifikat/provenacademy5-1.png",
        tags: ["Webinar"]
    },
    {
        id: "cert-9",
        date: "2024",
        category: "Webinar",
        image: "/assets/images/sertifikat/provenacademy6-1.png",
        credentialUrl: "/assets/images/sertifikat/provenacademy6-1.png",
        tags: ["Webinar"]
    },
    {
        id: "cert-10",
        date: "2023",
        category: "Kursus / Pelatihan",
        image: "/assets/images/sertifikat/sertif aws-1.png",
        credentialUrl: "/assets/images/sertifikat/sertif aws-1.png",
        tags: ["Cloud Computing", "Kursus / Pelatihan"]
    },
    {
        id: "cert-11",
        date: "2023",
        category: "Kursus / Pelatihan",
        image: "/assets/images/sertifikat/sertifikat barista-1.png",
        credentialUrl: "/assets/images/sertifikat/sertifikat barista-1.png",
        tags: ["Kursus / Pelatihan"]
    },
    {
        id: "cert-12",
        date: "2023",
        category: "Kursus / Pelatihan",
        image: "/assets/images/sertifikat/sertifikat barista-2.png",
        credentialUrl: "/assets/images/sertifikat/sertifikat barista-2.png",
        tags: ["Kursus / Pelatihan"]
    },
    {
        id: "cert-13",
        date: "2023",
        category: "Kompetisi",
        image: "/assets/images/sertifikat/pelajarpelopor.png",
        credentialUrl: "/assets/images/sertifikat/pelajarpelopor.png",
        tags: ["Kompetisi"]
    },
    {
        id: "cert-14",
        date: "2023",
        category: "Kompetisi",
        image: "/assets/images/sertifikat/try out pra osnp-1.png",
        credentialUrl: "/assets/images/sertifikat/try out pra osnp-1.png",
        tags: ["Kompetisi"]
    },
    {
        id: "cert-15",
        date: "2023",
        category: "Kepanitiaan",
        image: "/assets/images/sertifikat/itds insigt-1.png",
        credentialUrl: "/assets/images/sertifikat/itds insigt-1.png",
        tags: ["Kepanitiaan"]
    },
    {
        id: "cert-16",
        date: "2023",
        category: "Kepanitiaan",
        image: "/assets/images/sertifikat/himit external-1.png",
        credentialUrl: "/assets/images/sertifikat/himit external-1.png",
        tags: ["Kepanitiaan"]
    }
];

export default function SertifikatPage() {
    const container = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const { language } = useLanguage(); // Mengambil bahasa aktif (ID / US)

    const t = translations[language] || translations.ID;

    // Menggabungkan data dasar sertifikat dengan terjemahan bahasa aktif
    const certificatesData: Certificate[] = baseCertificates.map(bc => {
        const translated = t.certificates.find(c => c.id === bc.id);
        return {
            ...bc,
            title: translated ? translated.title : "No Title",
            issuer: translated ? translated.issuer : "Unknown Issuer",
        };
    });

    const filteredCertificates = certificatesData.filter(cert => {
        if (activeFilter === "Semua" || activeFilter === "All") return true;
        // Mapping kategori filter jika bahasa Inggris
        if (language === "US") {
            const categoryMap: Record<string, string> = {
                "Competition": "Kompetisi",
                "Courses / Training": "Kursus / Pelatihan",
                "Webinar": "Webinar",
                "Committee": "Kepanitiaan"
            };
            return cert.category === categoryMap[activeFilter];
        }
        return cert.category === activeFilter;
    });

    useGSAP(() => {
        gsap.from(".header-anim", {
            y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
        });
    }, { scope: container });

    useGSAP(() => {
        if (filteredCertificates.length > 0) {
            gsap.fromTo(".cert-card",
                { y: 30, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)", clearProps: "all" }
            );
        }
    }, { scope: container, dependencies: [activeFilter, language] });

    return (
        <div ref={container} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 header-anim text-foreground flex items-center gap-3">
                    {t.title}
                    <Trophy className="text-[#FFD700] fill-[#FFD700]/20" size={36} />
                </h1>
                <p className="text-base text-muted-foreground max-w-xl header-anim leading-relaxed">
                    {t.subtitle}
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 mb-12 header-anim bg-secondary/30 p-2 rounded-2xl w-fit border border-border/50">
                {t.categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ease-out active:scale-95 select-none ${activeFilter === category
                            ? "bg-foreground text-background shadow-md scale-105"
                            : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid Certificates */}
            <div key={activeFilter + language} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
                {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="cert-card group flex flex-col rounded-3xl overflow-hidden bg-card border border-border/40 hover:border-foreground/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Gambar Sertifikat */}
                            <div className="relative w-full h-52 overflow-hidden bg-zinc-900/40 border-b border-border/40 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain p-2 transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute top-3 right-3 z-20 px-3 py-1 bg-background/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground shadow-sm flex items-center gap-1.5 border border-border/50">
                                    <Award size={13} className="text-primary" />
                                    <span>{cert.category}</span>
                                </div>
                            </div>

                            {/* Konten Detail */}
                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-2">
                                        <span className="flex items-center gap-1 text-primary">
                                            <CheckCircle size={14} />
                                            {cert.issuer}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={13} />
                                            {cert.date}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                                        {cert.title}
                                    </h3>
                                </div>

                                {/* Bawah: Tags & Tombol Bukti */}
                                <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-3 mt-auto">
                                    <div className="flex flex-wrap gap-1.5">
                                        {cert.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md ${getTagColor(tag)}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-secondary hover:bg-foreground hover:text-background text-foreground px-3.5 py-2 rounded-xl transition-colors shrink-0 shadow-sm"
                                        >
                                            <span>{t.btnView}</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground bg-secondary/20 rounded-3xl border border-dashed border-border">
                        <p className="font-medium text-lg">{t.emptyTitle}</p>
                        <p className="text-sm opacity-70 mt-1">{t.emptySubtitle}</p>
                    </div>
                )}
            </div>

        </div>
    );
}