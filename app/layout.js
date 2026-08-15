import { Hanken_Grotesk, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

import AuthProvider from "@/components/providers/AuthProvider";

export const metadata = {
  title: "GenX — Automated Resumes & Technical Elegance",
  description: "Technical Elegance Resume Builder",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-ui">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
