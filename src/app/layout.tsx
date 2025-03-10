import type { Metadata, Viewport } from "next";
import { Orbitron, Play } from "next/font/google";
import { AuthProvider } from "@/lib/context/AuthContext";
import Navbar from "@/components/navbar.module";
import Footer from "@/components/footer.module";
import LoadingPage from "@/components/loading.module";
import "./globals.css";

// Inisialisasi font
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const play = Play({
  variable: "--font-play",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Ambil URL dari environment variable atau fallback ke localhost
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://solterragreentech.vercel.app";

// Metadata SEO & Open Graph
export const metadata: Metadata = {
  title: {
    default: "Solterra GreenTech | Sustainable Technology Solutions",
    template: "%s | Solterra GreenTech"
  },
  description: "Pioneering eco-friendly technology solutions for a sustainable future. Discover our green energy innovations and environmental initiatives.",
  keywords: ["green technology", "sustainable energy", "eco-friendly solutions", "renewable resources", "climate tech"],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Solterra GreenTech",
    url: SITE_URL,
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Solterra GreenTech Sustainable Solutions",
    }]
  },
  twitter: {
    card: "summary_large_image",
    creator: "@solterra_tech",
    images: "/og-image.jpg"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    }
  },
  other: {
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
};

// Viewport meta settings untuk responsivitas dan tema warna
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a192f",
};

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${orbitron.variable} ${play.variable} antialiased`}>
        <AuthProvider>
          <LoadingPage>
            <Navbar />
            <main id="main-content" className="min-h-[calc(100vh-160px)]">
              {children}
            </main>
            <Footer />
          </LoadingPage>
        </AuthProvider>
        
        {/* Accessibility: Skip Navigation Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-emerald-800"
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}
