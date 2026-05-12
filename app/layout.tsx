import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import Provider Tema dan Komponen Sidebar dari struktur folder yang baru
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Sidebar } from "@/components/shared/Sidebar";

// Menggunakan font Inter
const inter = Inter({ subsets: ["latin"] });

// Metadata untuk tab browser dan SEO
export const metadata: Metadata = {
  title: "Portfolio | Arif Muhammad Ihsan",
  description: "Software Engineer & UI/UX Researcher Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        {/* Pembungkus Dark/Light Mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Default disetel ke mode gelap sesuai referensi
          enableSystem
          disableTransitionOnChange
        >
          {/* Container utama dengan Flexbox untuk membagi layar */}
          <div className="flex min-h-screen w-full">

            {/* Sidebar akan selalu ada di sebelah kiri */}
            <Sidebar />

            {/* Area konten utama di sebelah kanan */}
            <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
              {children}
            </main>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}