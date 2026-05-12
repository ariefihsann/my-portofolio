"use client";

import Link from "next/link";
import Image from "next/image"; // Import komponen Image Next.js
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Home, User, Briefcase, Moon, Sun, Mail } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { name: "Beranda", path: "/", icon: <Home size={18} /> },
        { name: "Tentang", path: "/tentang", icon: <User size={18} /> },
        { name: "Proyek", path: "/proyek", icon: <Briefcase size={18} /> },
    ];

    return (
        <aside className="w-[280px] h-screen sticky top-0 border-r border-border bg-card text-card-foreground p-6 flex flex-col overflow-y-auto hidden md:flex">

            {/* Bagian Profil */}
            <div className="flex flex-col items-center text-center gap-3">
                {/* Foto Profil */}
                <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border overflow-hidden relative">
                    <Image
                        src="/profil.jpeg" // Pastikan ada file profile.jpg di folder public/
                        alt="Foto Profil Arif"
                        fill
                        className="object-cover"
                        sizes="(max-width: 96px) 100vw, 96px"
                    />
                </div>

                <div>
                    <h2 className="font-bold text-lg flex items-center justify-center gap-1">
                        Arif Muhammad Ihsan
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">Frontend & UI/UX</p>
                </div>

                {/* Tombol Kolaborasi yang Mengarah ke Email */}
                <Link
                    href="mailto:emailanda@gmail.com?subject=Tawaran%20Kolaborasi/Proyek"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 rounded-full text-sm font-semibold transition-colors mt-2 flex items-center justify-center gap-2"
                >
                    <Mail size={16} /> Ayo Berkolaborasi
                </Link>
            </div>

            {/* Toggle Tema */}
            {mounted && (
                <div className="mt-6 flex justify-center gap-2 bg-secondary/50 p-1.5 rounded-full w-fit mx-auto border border-border">
                    <button
                        onClick={() => setTheme('light')}
                        className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <Sun size={16} />
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <Moon size={16} />
                    </button>
                </div>
            )}

            <hr className="border-border my-6" />

            {/* Bagian Navigasi */}
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all font-medium ${isActive
                                ? "bg-secondary text-secondary-foreground"
                                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}