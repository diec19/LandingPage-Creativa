import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';

// Configuración de la fuente principal (Quicksand - redondeada y amigable)
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

/**
 * Metadatos de la página
 * Optimizado para SEO y redes sociales
 */
export const metadata: Metadata = {
  title: 'Librería Ilusión Creativa | Artículos Escolares - Itaembé Guazú',
  description:
    'Librería y artículos escolares en Itaembé Guazú. Útiles escolares, fotocopias, artículos personalizados. Presupuesto sin cargo. WhatsApp: 3764895527',

  keywords: [
    'librería',
    'artículos escolares',
    'útiles escolares',
    'fotocopias',
    'Itaembé Guazú',
    'papelería',
    'artículos personalizados',
  ],

  authors: [{ name: 'Librería Ilusión Creativa' }],

  verification: {
    google: 'jUmkhp__Ff05i3LxXexE9w-2CIIQ5DoP_sdThu0sPgs', // 👈 ACÁ va tu código real
  },

  openGraph: {
    title: 'Librería Ilusión Creativa - Tu librería de confianza',
    description: 'Artículos escolares y personalizados en Itaembé Guazú',
    url: 'https://www.ilusioncreativa.com.ar',
    siteName: 'Librería Ilusión Creativa',
    type: 'website',
    locale: 'es_AR',
  },

  alternates: {
    canonical: 'https://www.ilusioncreativa.com.ar',
  },

  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

/**
 * Layout principal de la aplicación
 * Envuelve todas las páginas con la estructura HTML base
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${quicksand.variable} font-rounded antialiased`}>
        {children}
      </body>
    </html>
  );
}
