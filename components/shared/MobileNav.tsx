"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function MobileNav() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const navItems = [
        { name: "Beranda", path: "/", icon: <Home size={20} /> },
        { name: "Tentang", path: "/tentang", icon: <User size={20} /> },
        { name: "Proyek", path: "/proyek", icon: <Briefcase size={20} /> },
    ];

    return (
        // Hanya muncul di layar kecil (md:hidden), posisi menempel di bawah (fixed bottom-0)
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border px-6 py-3 flex items-center justify-between pb-safe">

            {/* Menu Navigasi */}
            <div className="flex gap-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {item.icon}
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Toggle Tema untuk Mobile */}
            {mounted && (
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-3 rounded-full bg-secondary text-secondary-foreground border border-border transition-transform active:scale-95"
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            )}
        </div>
    );
}