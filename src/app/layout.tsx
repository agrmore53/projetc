import type { Metadata } from "next";
import "./globals.css";
import { AccessLogger } from "@/components/AccessLogger";

export const metadata: Metadata = {
  title: "Mentoria Elite | Do Zero ao Primeiro Milhão",
  description: "Área de membros da Mentoria Elite - Construa seu negócio de software e alcance seu primeiro milhão.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AccessLogger>
          {children}
        </AccessLogger>
      </body>
    </html>
  );
}
