import type { Metadata } from "next";
import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlobCursor from "@/components/ui/BlobCursor";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
          fillColor="#4E4E4E"
          trailCount={3}
          sizes={[50, 24, 32  ]}
          innerSizes={[10, 18]}
          innerColor="rgba(255,255,255,0.8)"
          opacities={[0.25, 0.25]}
          shadowColor="rgba(0,0,0,0.25)"
          shadowBlur={2}
          shadowOffsetX={8}
          shadowOffsetY={8}
          filterStdDeviation={18}
          useFilter={true}
          fastDuration={0.03}
          slowDuration={0.08}
          borderColor="#5227FF"
          borderWidth={2}
          zIndex={100}
        />
        <Header />
        <main className="pt-20 sm:pt-24 lg:pt-18">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
