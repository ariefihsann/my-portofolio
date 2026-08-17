"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageContext"; // <- Import Language Context
import {
    ExternalLink,
    ArrowUpRight,
} from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: string | string[];
    icon: React.ReactNode;
    image: string;
}

const tagColors: Record<string, string> = {
    "React": "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    "Tailwind": "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
    "HRIS": "bg-purple-500/15 text-purple-700 dark:text-purple-400",
    "ROS": "bg-green-500/15 text-green-700 dark:text-green-400",
    "Robotics": "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    "C++": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
    "UI/UX": "bg-rose-500/15 text-rose-700 dark:text-rose-400",
    "Research": "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    "Writing": "bg-slate-500/15 text-slate-700 dark:text-slate-400",
    "Flutter": "bg-sky-500/15 text-sky-700 dark:text-sky-400",
    "Dart": "bg-teal-500/15 text-teal-700 dark:text-teal-400",
    "PHP": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
    "Laravel": "bg-red-500/15 text-red-700 dark:text-red-400",
    "MySQL": "bg-blue-500/15 text-blue-700 dark:text-blue-400"
};

const getTagColor = (tag: string) => {
    return tagColors[tag] || "bg-secondary text-secondary-foreground";
};

const categories = ["All", "UI/UX", "Web", "Mobile", "Robot"];

// Kamus Terjemahan Teks Statis
const translations = {
    ID: {
        title: "Proyek & Karya",
        subtitle: "Eksplorasi portofolio berdasarkan kategori. Klik pada kartu untuk melihat detail dan pratinjau aplikasi.",
        emptyTitle: "Belum ada proyek di kategori ini.",
        emptySubtitle: "Coba pilih kategori lain di atas.",
        // Anda juga bisa menerjemahkan judul/deskripsi proyek khusus untuk US jika diinginkan
        projects: [
            {
                id: "sistem-vote-osis",
                title: "Sistem Voting OSIS Realtime",
                description: "Aplikasi e-voting sekolah dengan live update hasil pemungutan suara.",
            },
            {
                id: "payro-hris",
                title: "Pencatatan Keuangan",
                description: "Aplikasi pencatatan pemasukan dan pengeluaran keuangan.",
            },
            {
                id: "finplan-tracker",
                title: "FinPlan - Tracker App",
                description: "Aplikasi mobile pencatatan keuangan pribadi dengan visualisasi grafik interaktif untuk memantau arus kas.",
            },
            {
                id: "seo-dash",
                title: "SEO Dash - CRUD Data Kuliah",
                description: "Dashboard manajemen data akademik mahasiswa dan mata kuliah dengan antarmuka modern.",
            },
            {
                id: "emosver-robotics",
                title: "EMOSVER - Robotics",
                description: "Website Profile Robotika EMOSVER, menampilkan proyek robotika dan penelitian terkait.",
            },
            {
                id: "buku-validasi-ide",
                title: "CodeC - Bimbel Bahasa C",
                description: "Website bimbingan belajar bahasa pemrograman C untuk pemula, dilengkapi dengan materi, latihan, dan kuis interaktif.",
            },
            {
                id: "tbChecker",
                title: "tbChecker - Aplikasi Reminder TBC",
                description: "Aplikasi reminder untuk pasien TBC dengan fitur notifikasi dan pencatatan.",
            },
            {
                id: "Rebite",
                title: "Rebite - Aplikasi Kulkas Pintar untuk pengurangan limbah makanan",
                description: "Aplikasi untuk mengelola dan meminimalkan limbah makanan melalui pengingat dan notifikasi serta penggunaan redeem voucher.",
            },
            {
                id: "Barier",
                title: "Barier - Aplikasi menentukan bakat dan minat",
                description: "Aplikasi Berbasis AI untuk menentukan keahlian dan minat seseorang melalui tes psikologi dan rekomendasi jurusan kuliah dan juga penentuan informasi pekerjaan yang sesuai dengan minat dan bakat seseorang.",
            },
            {
                id: "Payro",
                title: "Payro (mobile) - Aplikasi HRIS & Payroll",
                description: "Aplikasi HRIS & Payroll untuk mempermudah pengelolaan data karyawan, absensi, dan penggajian.",
            },
            {
                id: "Payro-web",
                title: "Payro (web) - Aplikasi HRIS & Payroll",
                description: "Aplikasi HRIS & Payroll untuk mempermudah pengelolaan data karyawan, absensi, dan penggajian.",
            }
        ]
    },
    US: {
        title: "Projects & Works",
        subtitle: "Explore portfolio by category. Click on a card to view details and app preview.",
        emptyTitle: "No projects found in this category.",
        emptySubtitle: "Try selecting another category above.",
        projects: [
            {
                id: "sistem-vote-osis",
                title: "Realtime Student Council Voting System",
                description: "School e-voting application with live updates for voting results.",
            },
            {
                id: "payro-hris",
                title: "Financial Recording",
                description: "Income and expense tracking application.",
            },
            {
                id: "finplan-tracker",
                title: "FinPlan - Tracker App",
                description: "Personal finance mobile application with interactive chart visualizations to monitor cash flow.",
            },
            {
                id: "seo-dash",
                title: "SEO Dash - College Data CRUD",
                description: "Academic data management dashboard for students and courses with a modern interface.",
            },
            {
                id: "emosver-robotics",
                title: "EMOSVER - Robotics",
                description: "EMOSVER Robotics Profile Website, showcasing robotics projects and related research.",
            },
            {
                id: "buku-validasi-ide",
                title: "CodeC - C Programming Tutoring",
                description: "C programming language tutoring website for beginners, equipped with materials, exercises, and interactive quizzes.",
            },
            {
                id: "tbChecker",
                title: "tbChecker - TB Reminder App",
                description: "Reminder application for TB patients featuring notification and tracking systems.",
            },
            {
                id: "Rebite",
                title: "Rebite - Smart Fridge App for Food Waste Reduction",
                description: "Application to manage and minimize food waste through reminders, notifications, and voucher redemption.",
            },
            {
                id: "Barier",
                title: "Barier - Talent and Interest Assessment App",
                description: "AI-based application to determine individual skills and interests through psychological testing, college major recommendations, and matching career info.",
            },
            {
                id: "Payro",
                title: "Payro (mobile) - HRIS & Payroll App",
                description: "HRIS & Payroll application to simplify employee data management, attendance, and payroll processes.",
            },
            {
                id: "Payro-web",
                title: "Payro (web) - HRIS & Payroll App",
                description: "HRIS & Payroll web application to simplify employee data management, attendance, and payroll processes.",
            }
        ]
    }
};

const baseProjects: Omit<Project, 'title' | 'description'>[] = [
    {
        id: "sistem-vote-osis",
        tags: ["Laravel", "PHP", "Tailwind", "MySQL"],
        category: "Web",
        icon: <ExternalLink size={18} />,
        image: "/assets/images/sistem-vote-osis/coverr.png",
    },
    {
        id: "payro-hris",
        tags: ["Laravel", "PHP", "Tailwind", "MySQL"],
        category: "Web",
        icon: <ExternalLink size={18} />,
        image: "/assets/images/pencatatan-keuangan/cover.png",
    },
    {
        id: "finplan-tracker",
        tags: ["laravel", "PHP", "Bootstrap", "MySQL"],
        category: "Web",
        icon: <ExternalLink size={18} />,
        image: "/assets/images/finance-tracker/cover.png",
    },
    {
        id: "seo-dash",
        tags: ["PHP", "Tailwind", "MySQL"],
        category: "Web",
        icon: <ExternalLink size={18} />,
        image: "/assets/images/seo-dash/cover.png",
    },
    {
        id: "emosver-robotics",
        tags: ["node.js", "tailwind"],
        category: "Web",
        icon: <ExternalLink size={18} />,
        image: "/assets/images/krbai/cover.png",
    },
    {
        id: "buku-validasi-ide",
        tags: ["Laravel", "PHP", "Tailwind", "MySQL"],
        category: "Web",
        icon: <ExternalLink size={18} />,
        image: "/assets/images/bimbel-c/cover.png",
    },
    {
        id: "tbChecker",
        tags: ["Figma", "Flutter", "Dart", "Supabase"],
        category: ["Mobile", "UI/UX"],
        icon: <ExternalLink size={18} />,
        image: "/assets/images/tbChecker/MockUp.png",
    },
    {
        id: "Rebite",
        tags: ["Figma"],
        category: ["UI/UX"],
        icon: <ExternalLink size={18} />,
        image: "/assets/images/Rebite/MockUp.png",
    },
    {
        id: "Barier",
        tags: ["Figma"],
        category: ["UI/UX"],
        icon: <ExternalLink size={18} />,
        image: "/assets/images/barier/MockUp.png",
    },
    {
        id: "Payro",
        tags: ["Figma", "Flutter", "Dart", ".net"],
        category: ["UI/UX", "Mobile"],
        icon: <ExternalLink size={18} />,
        image: "/assets/images/payro/MockUp.webp",
    },
    {
        id: "Payro-web",
        tags: ["Figma", "React", "Node.js", ".net"],
        category: ["UI/UX", "Web"],
        icon: <ExternalLink size={18} />,
        image: "/assets/images/payro-web/MockUp.png",
    }
];

export default function ProjectsPage() {
    const container = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const { language } = useLanguage(); // Mengambil status bahasa aktif (ID / US)

    const t = translations[language] || translations.ID;

    // Menggabungkan data dasar proyek dengan teks terjemahan bahasa aktif
    const projects: Project[] = baseProjects.map(bp => {
        const translated = t.projects.find(p => p.id === bp.id);
        return {
            ...bp,
            title: translated ? translated.title : "No Title",
            description: translated ? translated.description : "No Description",
        };
    });

    const filteredProjects = projects.filter(project => {
        if (activeFilter === "All") return true;
        if (Array.isArray(project.category)) {
            return project.category.includes(activeFilter);
        }
        return project.category === activeFilter;
    });

    useGSAP(() => {
        gsap.from(".header-anim", {
            y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
        });
    }, { scope: container });

    useGSAP(() => {
        if (filteredProjects.length > 0) {
            gsap.fromTo(".project-card",
                { y: 30, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)", clearProps: "all" }
            );
        }
    }, { scope: container, dependencies: [activeFilter, language] });

    return (
        <div ref={container} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-3 header-anim text-foreground">
                        {t.title}
                    </h1>
                    <p className="text-base text-muted-foreground max-w-xl header-anim leading-relaxed">
                        {t.subtitle}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mb-12 header-anim bg-secondary/30 p-2 rounded-2xl w-fit border border-border/50">
                {categories.map((category) => (
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

            <div key={activeFilter + language} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/proyek/${project.id}`}
                            className="project-card group flex flex-col rounded-3xl overflow-hidden bg-card border border-border/40 hover:border-foreground/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer block"
                        >
                            <div className="relative w-full h-52 overflow-hidden bg-muted">
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />

                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                                />

                                <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-background/95 backdrop-blur-md rounded-full flex items-center justify-center text-foreground shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                                    {project.icon}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center justify-between group-hover:text-primary transition-colors">
                                        {project.title}
                                        <ArrowUpRight size={18} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-foreground" />
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md transition-colors ${getTagColor(tag)}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground project-card bg-secondary/20 rounded-3xl border border-dashed border-border">
                        <p className="font-medium text-lg">{t.emptyTitle}</p>
                        <p className="text-sm opacity-70 mt-1">{t.emptySubtitle}</p>
                    </div>
                )}
            </div>
        </div>
    );
}