import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NavBar } from "@/components/ui";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "600", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mytilimer Professionnel — Concentré de Moules B2B",
  description:
    "Ingrédient Umami B2B issu des moules de bouchot françaises. Concentré de chair de moules, Clean Label, Origine France. Pour industriels agroalimentaires et aromaticiens.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const themeClass = themeCookie === "light" || themeCookie === "dark" ? themeCookie : "";

  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${jakartaSans.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased${themeClass ? ` ${themeClass}` : ""}`}
    >
        <body className="min-h-full flex flex-col bg-canvas">
        <ThemeProvider>
          {/* Burst-bubble portal — z:5 (above section bg, below navbar z:50) */}
          <div
            id="bubble-portal"
            className="pointer-events-none fixed inset-0 overflow-hidden"
            style={{ zIndex: 5 }}
            aria-hidden="true"
          />
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
