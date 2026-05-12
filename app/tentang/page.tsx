"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GraduationCap, Users, BookOpen, Compass } from "lucide-react";

export default function AboutPage() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".about-item", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
        });
    }, { scope: container });

    return (
        <div ref={container} className="max-w-4xl pb-20">

            <div className="about-item mb-12">
                <h1 className="text-3xl font-bold mb-4">Tentang Saya</h1>
                <p className="text-muted-foreground leading-relaxed">
                    Saya adalah mahasiswa Teknik Informatika di Politeknik Elektronika Negeri Surabaya (PENS) yang sangat antusias dengan pengembangan perangkat lunak, riset antarmuka pengguna (UI/UX), dan teknologi robotika bawah air. Saya percaya bahwa kode yang baik harus didasari oleh pemahaman mendalam terhadap kebutuhan pengguna dan arsitektur sistem yang solid.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Kolom Kiri: Akademik & Kepemimpinan */}
                <div className="space-y-8">
                    <section className="about-item">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                            <GraduationCap className="text-primary" size={24} />
                            Akademik & Organisasi
                        </h2>
                        <div className="space-y-4">
                            <div className="border-l-2 border-primary/30 pl-4 py-1">
                                <h3 className="font-semibold">Politeknik Elektronika Negeri Surabaya (PENS)</h3>
                                <p className="text-sm text-muted-foreground">Mahasiswa D4 Teknik Informatika</p>
                            </div>
                            <div className="border-l-2 border-primary/30 pl-4 py-1">
                                <h3 className="font-semibold">Komandan Jurusan (Komjur)</h3>
                                <p className="text-sm text-muted-foreground">Memimpin dan mengkoordinasi angkatan 2024, serta aktif dalam kepanitiaan suksesi HIMIT.</p>
                            </div>
                            <div className="border-l-2 border-primary/30 pl-4 py-1">
                                <h3 className="font-semibold">Organisasi Profesional</h3>
                                <p className="text-sm text-muted-foreground">Core Team di GDGOC PENS, Secretary di IEEE, dan Treasurer di Society of Renewable Energy (SRE).</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Kolom Kanan: Edukasi & Minat */}
                <div className="space-y-8">
                    <section className="about-item">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                            <Users className="text-primary" size={24} />
                            Mentoring & Publikasi
                        </h2>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl border border-border bg-card">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <BookOpen size={16} className="text-purple-500" /> Buku UI/UX Research
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Menulis buku komprehensif mengenai teknik validasi ide sebelum masuk ke tahap *coding*, bertujuan membantu *developer* memahami sudut pandang pengguna.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl border border-border bg-card">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Users size={16} className="text-blue-500" /> OSNK Mentor
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Membangun kurikulum dan membimbing siswa SMA dalam mempersiapkan diri untuk Olimpiade Sains Nasional bidang Informatika.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="about-item">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                            <Compass className="text-primary" size={24} />
                            Di Luar Layar
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed p-4 rounded-xl border border-border bg-card">
                            Saat tidak sedang *debugging* kode di *mini PC* atau merakit wahana bawah air bersama tim EMOSVER, saya menghabiskan waktu berlatih Pencak Silat (saat ini bersiap untuk PORSENI 2026) atau menjelajahi alam terbuka seperti melakukan pendakian ke Gunung Merbabu dan Kawah Ijen.
                        </p>
                    </section>
                </div>

            </div>
        </div>
    );
}