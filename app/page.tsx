"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/shared/LanguageContext";

const SKILL_CATEGORIES: Record<string, string[]> = {
  ID: ["Semua", "Utama", "Frontend", "Backend", "Mobile", "Robotics", "Tools"],
  US: ["All", "Main", "Frontend", "Backend", "Mobile", "Robotics", "Tools"],
};

const SKILLS_DATA = [
  { name: "HTML5", category: "Frontend", categoryID: "Frontend", color: "#E34F26", icon: "5️⃣" },
  { name: "CSS3", category: "Frontend", categoryID: "Frontend", color: "#1572B6", icon: "🎨" },
  { name: "JavaScript", category: "Frontend", categoryID: "Frontend", color: "#F7DF1E", icon: "JS" },
  { name: "TypeScript", category: "Frontend", categoryID: "Frontend", color: "#3178C6", icon: "TS" },
  { name: "React.js", category: "Frontend", categoryID: "Frontend", color: "#61DAFB", icon: "⚛️" },
  { name: "Next.js", category: "Frontend", categoryID: "Frontend", color: "#000000", darkColor: "#FFFFFF", icon: "N" },
  { name: "Tailwind CSS", category: "Frontend", categoryID: "Frontend", color: "#06B6D4", icon: "🌊" },
  { name: "Framer Motion", category: "Frontend", categoryID: "Frontend", color: "#E902B5", icon: "✨" },
  { name: "Laravel", category: "Backend", categoryID: "Backend", color: "#FF2D20", icon: "🐘" },
  { name: "Node.js", category: "Backend", categoryID: "Backend", color: "#339933", icon: "🟩" },
  { name: "Prolog", category: "Backend", categoryID: "Backend", color: "#F2A52B", icon: "🦉" },
  { name: "MySQL", category: "Backend", categoryID: "Backend", color: "#4479A1", icon: "🐬" },
  { name: "PostgreSQL", category: "Backend", categoryID: "Backend", color: "#4169E1", icon: "🐘" },
  { name: "Flutter", category: "Mobile", categoryID: "Mobile", color: "#42A5F5", icon: "📱" },
  { name: "ROS", category: "Robotics", categoryID: "Robotics", color: "#4A90E2", icon: "🤖" },
  { name: "AUV/ROV Tech", category: "Robotics", categoryID: "Robotics", color: "#00BCD4", icon: "🌊" },
  { name: "UI/UX Research", category: "Tools", categoryID: "Tools", color: "#EC4899", icon: "🧠" },
  { name: "Figma", category: "Tools", categoryID: "Tools", color: "#F24E1E", icon: "🎨" },
  { name: "AWS", category: "Tools", categoryID: "Tools", color: "#FF9900", icon: "☁️" },
  { name: "Cisco PT", category: "Tools", categoryID: "Tools", color: "#1BA0D7", icon: "🔌" },
  { name: "Git", category: "Tools", categoryID: "Tools", color: "#F05032", icon: "🐙" },
  { name: "GitHub", category: "Tools", categoryID: "Tools", color: "#000000", darkColor: "#FFFFFF", icon: "🐈‍⬛" },
];

const MAIN_SKILLS = ["React.js", "Tailwind CSS", "Flutter", "Laravel", "UI/UX Research", "ROS"];

const pageTranslations: Record<"ID" | "US", {
  heroTitle: string;
  heroSub: string;
  heroCalling: string;
  aboutTitle: string;
  now: string;
  role: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  aboutP4: string;
  focusTitle: string;
  focusItems: { title: string; desc: string }[];
  skillsSubtitle: string;
  emptySkill: string;
  basedIn: string;
}> = {
  ID: {
    heroTitle: "Mengubah ide menjadi",
    heroSub: "produk digital nyata",
    heroCalling: "panggilan jiwa saya",
    aboutTitle: "Tentang Saya",
    now: "Sekarang",
    role: "Mahasiswa D4 Teknik Informatika",
    aboutP1: "Halo, saya Arif Muhammad Ihsan Marbun, mahasiswa semester 5 D4 Teknik Informatika di Politeknik Elektronika Negeri Surabaya (PENS). Sebagai perantau dari Aceh, saya membawa dedikasi dan semangat tinggi untuk membangun solusi digital yang fungsional, efisien, dan tepat sasaran. Berfokus sebagai Fullstack Developer, saya memiliki ketertarikan mendalam pada rekayasa perangkat lunak yang andal, mulai dari perancangan konsep UI/ UX, integrasi infrastruktur cloud dan database seperti Supabase, hingga deployment menggunakan tools modern seperti Docker dan Vercel.",
    aboutP2: "Selain pengembangan perangkat lunak, saya juga mengeksplorasi inovasi di bidang sistem tanpa awak. Saat ini, saya tergabung sebagai anggota inti tim EMOSVER PENS, berkolaborasi dalam riset dan pengembangan robotika bawah air (AUV/ROV) untuk kompetisi internasional & nasional.",
    aboutP3: "Saya percaya pada pertumbuhan yang berkelanjutan. Di luar layar monitor, saya aktif mengasah keterampilan teknis di GDG on Campus PENS, mendedikasikan waktu sebagai mentor persiapan Olimpiade Nasional (OSNK) bidang Informatika untuk siswa SMA, Aktif dikegiatan ORMAWA dan menjadi ketua di berbagai kegiatan. dan menjaga keseimbangan serta kedisiplinan diri melalui seni bela diri Pencak Silat.",
    aboutP4: "",
    focusTitle: "Fokus Utama",
    focusItems: [
      { title: "Software Developer", desc: "Merancang dan mengembangkan solusi perangkat lunak end-to-end yang efisien, aman, dan berpusat pada pengguna." },
      { title: "Riset Robotika Bawah Air", desc: "Mengembangkan arsitektur sistem dan navigasi (ROS) untuk kendaraan bawah air (AUV/ROV)." },
      { title: "Design Grafis", desc: "Menciptakan identitas visual, ilustrasi, dan materi desain yang estetis serta komunikatif untuk berbagai keperluan digital." },
    ],
    skillsSubtitle: "Keahlian profesional & teknologi yang saya gunakan.",
    emptySkill: "Belum ada keahlian di kategori ini.",
    basedIn: "Berbasis di Surabaya, Indonesia",
  },
  US: {
    heroTitle: "Turning ideas into",
    heroSub: "real life products",
    heroCalling: "is my calling",
    aboutTitle: "About Me",
    now: "Present",
    role: "D4 Informatics Engineering Student",
    aboutP1: 'I am a software engineer with a strong enthusiasm for building functional and targeted digital solutions. I believe that great code begins with a thorough understanding of the user. This dedication led me to write a 130-page guidebook titled "UI/UX Research: Idea Validation Techniques Before Coding".',
    aboutP2: "In the realm of software development, I specialize in the React, Tailwind, and Flutter ecosystems. Currently, I am actively developing PayRo, a large-scale HRIS and Payroll system.",
    aboutP3: "Beyond software engineering, I have a deep interest in unmanned systems. As a core member of the EMOSVER team, I participate in researching and developing underwater robotics (AUV/ROV) to compete in the international TEKNOFEST Turkey 2026.",
    aboutP4: "Outside the monitor screen, I maintain work-life balance through the martial art of Pencak Silat, actively organizing in GDG on Campus PENS, and enjoying sharing knowledge as a mentor for National Science Olympiad (OSNK) Informatics preparation for high school students.",
    focusTitle: "Main Focus",
    focusItems: [
      { title: "Web & Mobile Dev", desc: "Building scalable and responsive application ecosystems for various needs." },
      { title: "AUV/ROV Robotics", desc: "Research and development of underwater control systems using ROS." },
      { title: "UI/UX Research", desc: "Idea validation and user-centered interface design." },
    ],
    skillsSubtitle: "My professional skills & tech stack.",
    emptySkill: "No skills in this category yet.",
    basedIn: "Based in Surabaya, Indonesia",
  },
};

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = pageTranslations[language as "ID" | "US"];
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Ubah .from menjadi .fromTo agar opacity tidak nyangkut saat React re-render
    tl.fromTo(".hero-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power4.out" }
    );
    tl.fromTo(".hero-social",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );
    tl.fromTo(".hero-image",
      { scale: 0.95, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.7"
    );
    tl.fromTo(".min-fade",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", clearProps: "all" },
      "-=0.3"
    );
  }, { scope: container });

  useGSAP(() => {
    gsap.fromTo(
      ".skill-badge",
      { scale: 0.85, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "back.out(1.5)", clearProps: "all" }
    );
  }, { scope: container, dependencies: [activeCategoryIndex, language] });

  useGSAP(() => {
    gsap.fromTo(
      ".skill-badge",
      { scale: 0.85, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "back.out(1.5)", clearProps: "all" }
    );
  }, { scope: container, dependencies: [activeCategoryIndex, language] });

  const categoriesList = SKILL_CATEGORIES[language as "ID" | "US"];
  const activeCategoryName = categoriesList[activeCategoryIndex] || categoriesList[0];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (activeCategoryIndex === 0) return true;
    if (activeCategoryIndex === 1) return MAIN_SKILLS.includes(skill.name);
    const catID = language === "ID" ? skill.categoryID : skill.category;
    return catID === activeCategoryName;
  });

  const getCategoryCount = (idx: number) => {
    if (idx === 0) return SKILLS_DATA.length;
    if (idx === 1) return MAIN_SKILLS.length;
    const catName = categoriesList[idx];
    return SKILLS_DATA.filter((s) => (language === "ID" ? s.categoryID : s.category) === catName).length;
  };

  return (
    <div ref={container} className="max-w-5xl pb-1 relative z-10 pt-10 sm:pt-16">
      {/* =========================================================
          HERO SECTION (Diperbarui)
          ========================================================= */}
      <section className="mb-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-10">
        <div className="w-full lg:w-3/5">
          <h1 className="hero-text text-[2rem] md:text-[2rem] lg:text-[4.2rem] font-bold tracking-tighter mb-6 leading-[1.1] text-zinc-900 dark:text-[#f4f4f5]">
            {t.heroTitle} <br />
            <span className="text-zinc-600 dark:text-zinc-400">{t.heroSub}</span> <br />
            {language === "ID" ? (
              <>adalah <span className="bg-gradient-to-r from-[#e26975] to-[#7986cf] bg-clip-text text-transparent">{t.heroCalling}</span>.</>
            ) : (
              <>{t.heroCalling} <span className="bg-gradient-to-r from-[#e26975] to-[#7986cf] bg-clip-text text-transparent">calling</span>.</>
            )}
          </h1>

          <div className="hero-social flex items-center gap-6 mt-10">
            <div className="w-16 h-[2px] bg-zinc-200 dark:bg-white/10 rounded-full"></div>
            <div className="flex items-center gap-5 text-zinc-500 dark:text-muted-foreground">
              <a href="https://www.instagram.com/ariefihsann/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-foreground hover:-translate-y-1 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="https://github.com/ariefihsann" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-foreground hover:-translate-y-1 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/arifmuhammadihsan" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-foreground hover:-translate-y-1 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-image w-full lg:w-2/5 flex justify-center lg:justify-end relative items-center">
          {/* Background Glow Elegan */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#e26975]/20 via-[#7986cf]/20 to-[#FFD700]/10 rounded-full blur-[3rem] -z-10 w-[120%] h-[120%] left-[-10%] top-[-10%] animate-pulse"></div>

          <div className="relative z-10 w-[280px] h-[340px] md:w-[320px] md:h-[400px] overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-900/80 border-[4px] border-white/40 dark:border-white/10 shadow-2xl group transition-all duration-500 hover:shadow-[#7986cf]/20 hover:border-white/60 dark:hover:border-white/20">
            <img
              src="/my.png"
              alt="Arif Muhammad Ihsan"
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-5xl font-bold text-zinc-400 dark:text-white/20">AM</div>';
              }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT SECTION
          ========================================================= */}
      <section className="mb-24 border-t border-zinc-200 dark:border-white/10 pt-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="w-full md:w-1/3">
            <h2 className="min-fade text-2xl font-bold text-zinc-900 dark:text-foreground tracking-tight">{t.aboutTitle}</h2>
            <div className="min-fade mt-8 relative border-l-2 border-zinc-200 dark:border-white/10 ml-2 space-y-8 pb-2">
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-zinc-900 dark:bg-white rounded-full -left-[7px] top-1 ring-4 ring-white dark:ring-background shadow-sm"></div>
                <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5 block">{t.now}</span>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">Politeknik Elektronika Negeri Surabaya</h4>
                <p className="text-xs font-medium text-zinc-500 dark:text-white/60 mt-1.5">{t.role}</p>
              </div>
              <div className="relative pl-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="absolute w-2 h-2 bg-zinc-300 dark:bg-white/20 rounded-full -left-[5px] top-1.5 ring-4 ring-white dark:ring-background"></div>
                <h4 className="text-sm font-medium text-zinc-700 dark:text-muted-foreground">SMAN Unggul Aceh Selatan</h4>
              </div>
              <div className="relative pl-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="absolute w-2 h-2 bg-zinc-300 dark:bg-white/20 rounded-full -left-[5px] top-1.5 ring-4 ring-white dark:ring-background"></div>
                <h4 className="text-sm font-medium text-zinc-700 dark:text-muted-foreground">MTsN Pondok Pesantren Al Manar</h4>
              </div>
            </div>
          </div>

          {/* BAGIAN YANG DIPERBARUI: Hapus sm:text-left, biarkan text-justify agar rata kanan kiri di semua layar */}
          <div className="w-full md:w-2/3 space-y-6 text-zinc-600 dark:text-muted-foreground leading-relaxed font-light text-sm sm:text-[15px] text-justify mt-2">
            <p className="min-fade">{t.aboutP1}</p>
            <p className="min-fade">{t.aboutP2}</p>
            <p className="min-fade">{t.aboutP3}</p>
            {t.aboutP4 && <p className="min-fade">{t.aboutP4}</p>}
          </div>
        </div>
      </section>
      {/* =========================================================
          FOKUS UTAMA SECTION (Diperbarui)
          ========================================================= */}
      <section className="mb-24">
        <h2 className="min-fade text-2xl font-bold text-zinc-900 dark:text-foreground tracking-tight mb-8">{t.focusTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.focusItems.map((item: { title: string; desc: string }, i: number) => (
            <div
              key={i}
              className="min-fade group relative p-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-white dark:hover:bg-zinc-800/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 overflow-hidden"
            >
              {/* Ornamen Latar Belakang */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-white/5 dark:to-transparent rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>

              <div className="relative z-10">
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600 mb-5 block uppercase tracking-widest font-mono">0{i + 1}</span>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 text-lg">{item.title}</h3>
                <p className="text-[14px] text-zinc-600 dark:text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SKILLS SECTION
          ========================================================= */}
      <section className="mb-24">
        <div className="min-fade mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-foreground tracking-tight flex items-center gap-3 mb-2">
            <span className="text-zinc-300 dark:text-white/20 font-mono text-2xl font-light">&lt;/&gt;</span> Skills
          </h2>
          <p className="text-zinc-500 dark:text-muted-foreground text-sm">{t.skillsSubtitle}</p>
        </div>

        <div className="min-fade flex flex-wrap gap-3 mb-10">
          {categoriesList.map((category: string, idx: number) => {
            const isActive = activeCategoryIndex === idx;
            const count = getCategoryCount(idx);
            return (
              <button
                key={category}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border ${isActive ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white shadow-md" : "bg-transparent text-zinc-600 dark:text-white/70 border-zinc-200 dark:border-white/20 hover:border-zinc-400 dark:hover:border-white/40 hover:text-zinc-900 dark:hover:text-white"
                  }`}
              >
                {category}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${isActive ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black' : 'bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-white/60'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-start content-start gap-3 min-h-[200px]">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="skill-badge flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-white/10">
              <span className="flex items-center justify-center font-bold text-[15px] drop-shadow-sm" style={{ color: skill.color }}>{skill.icon}</span>
              <span className="text-[13px] font-medium text-zinc-800 dark:text-white/90 tracking-wide">{skill.name}</span>
            </div>
          ))}
          {filteredSkills.length === 0 && <div className="w-full py-12 text-center text-zinc-500 dark:text-muted-foreground text-sm border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl">{t.emptySkill}</div>}
        </div>
      </section>

      {/* =========================================================
          FOOTER
          ========================================================= */}
      <footer className="min-fade border-t border-zinc-200 dark:border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-[13px] text-zinc-500 dark:text-muted-foreground font-medium">
          <span>&copy; {new Date().getFullYear()} Arif Muhammad Ihsan.</span>
          <span className="hidden sm:block w-[4px] h-[4px] rounded-full bg-zinc-300 dark:bg-white/20"></span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{t.basedIn}</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[13px] font-semibold text-zinc-500 dark:text-muted-foreground">
          <a href="https://github.com/ariefihsann" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-foreground transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/arifmuhammadihsan" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-foreground transition-colors">LinkedIn</a>
          <a href="mailto:ariefihsann@gmail.com" className="hover:text-zinc-900 dark:hover:text-foreground transition-colors">Email</a>
        </div>
      </footer>
    </div>
  );
}