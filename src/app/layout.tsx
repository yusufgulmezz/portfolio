import type { Metadata } from "next";
import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VerticalNav from "@/components/layout/VerticalNav";
import BlobCursor from "@/components/ui/BlobCursor";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DesignEveryThink",
  description: "Poster designs, pixel art, 3D works, UI/UX and coding projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${geistMono.variable} antialiased`}
      >
        <BlobCursor
          blobType="circle"
          fillColor="#5227FF"
          trailCount={3}
          sizes={[28, 56, 18]}
          innerSizes={[10, 18]}
          innerColor="rgba(255,255,255,0.8)"
          opacities={[0.4, 0.4]}
          shadowColor="rgba(0,0,0,0.4)"
          shadowBlur={3}
          shadowOffsetX={8}
          shadowOffsetY={8}
          filterStdDeviation={20}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={100}
        />
        <VerticalNav />
        <Header />
        <main className="pt-20 sm:pt-24 lg:pt-18">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
