"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink, BookOpen, Anchor } from "lucide-react";

const projects = [
    {
        title: "PayRo - HRIS & Payroll",
        description: "Aplikasi pengelolaan SDM dan penggajian yang disesuaikan dengan regulasi pajak Indonesia (PPh 21 & BPJS). Dibangun dengan React dan Tailwind CSS.",
        tags: ["React", "Tailwind", "HRIS"],
        icon: <ExternalLink size={20} />,
        color: "bg-blue-500/10 text-blue-500"
    },
    {
        title: "EMOSVER - Underwater Robotics",
        description: "Riset dan pengembangan wahana bawah air (AUV/ROV) untuk kompetisi internasional TEKNOFEST Turki. Fokus pada integrasi sensor MPU-6000 dan ROS.",
        tags: ["ROS", "Robotics", "C++"],
        icon: <Anchor size={20} />,
        color: "bg-cyan-500/10 text-cyan-500"
    },
    {
        title: "Buku: UI/UX Research",
        description: "Penulis buku 'Teknik Validasi Ide Sebelum Kode' setebal 130 halaman. Membahas metodologi riset pengguna dan validasi prototipe.",
        tags: ["UI/UX", "Research", "Writing"],
        icon: <BookOpen size={20} />,
        color: "bg-purple-500/10 text-purple-500"
    }
];

export default function ProjectsPage() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".project-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
        });
    }, { scope: container });

    return (
        <div ref={container} className="max-w-5xl">
            <div className="mb-12">
                <h1 className="text-3xl font-bold mb-4 project-card">Proyek & Karya</h1>
                <p className="text-muted-foreground project-card">
                    Kumpulan proyek pilihan yang mencakup pengembangan perangkat lunak, riset robotika, dan publikasi desain.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className={`w-12 h-12 rounded-xl ${project.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                {project.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag) => (
                                <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-secondary rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}