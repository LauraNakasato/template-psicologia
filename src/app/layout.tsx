import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr(a). Nome Sobrenome | Psicologia Clínica e Online",
  description: "Psicólogo(a) clínico(a) focado em saúde mental, autoconhecimento e bem-estar. Atendimento presencial acolhedor e terapia online com segurança e sigilo.",
  keywords: [
    "Psicólogo(a) Especialista",
    "Terapia Online",
    "Psicologia Clínica",
    "Psicoterapia",
    "Atendimento Psicológico",
    "Saúde Mental"
  ],
  authors: [{ name: "Dr(a). Nome Sobrenome" }],
  openGraph: {
    title: "Dr(a). Nome Sobrenome | Psicologia Clínica",
    description: "Equilíbrio mental para uma vida plena. Atendimento presencial e Online.",
    url: "https://seusitedepsicologia.com.br", // Link genérico para o template
    siteName: "Nome Sobrenome Psicologia",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}