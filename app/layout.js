import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from 'next/script'
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "FuelMyFlow - A Group funding platform",
  description: "A platform to discover and fund creative projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
        <body className="antialiased bg-neutral-950">
          <SessionWrapper>
            <Navbar />
            <div className="min-h-screen text-white bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
              {children}
            </div>
            <Footer />
          </SessionWrapper>
      </body>
    </html>
  );
}
