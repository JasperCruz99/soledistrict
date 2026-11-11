import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "SoleDistrict — Premium Sneakers & Streetwear Footwear",
    template: "%s | SoleDistrict",
  },
  description:
    "A curated destination for lifestyle sneakers, running shoes and streetwear footwear. Discover your next everyday pair at SoleDistrict.",
  applicationName: "SoleDistrict",
  keywords: [
    "sneakers",
    "streetwear",
    "running shoes",
    "lifestyle sneakers",
    "SoleDistrict",
  ],
  openGraph: {
    title: "SoleDistrict — Step Into Your Next Era",
    description:
      "Discover sneakers that define your style. Curated lifestyle, running and streetwear pairs.",
    siteName: "SoleDistrict",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#F7F7F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Providers>
          <a
            href="#main-content"
            className="sr-only z-[200] bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
