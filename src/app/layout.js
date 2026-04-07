import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/PromoBanner";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Wanderlust Accommodation | Curated Global Travel Experiences",
    template: "%s | Wanderlust Accommodation",
  },
  description: "Discover the world's most breathtaking destinations with Wanderlust. From Arctic expeditions to African safaris, we curate journeys that define how you remember your trip.",
  keywords: ["travel", "tours", "vacations", "adventure", "luxury travel", "global trips", "wanderlust"],
  authors: [{ name: "Wanderlust Team" }],
  creator: "Wanderlust Accommodation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wanderlust-travels.com",
    siteName: "Wanderlust Accommodation",
    images: [
      {
        url: "/og-image.jpg", // Placeholder for actual brand image
        width: 1200,
        height: 630,
        alt: "Wanderlust Accommodation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wanderlust Accommodation | Curated Global Travel Experiences",
    description: "Discover the world's most breathtaking destinations with Wanderlust.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-grow ">
          {children}
        </main>
        <PromoBanner />
        <Analytics/> 
        <Footer />
      </body>
    </html>
  );
}
