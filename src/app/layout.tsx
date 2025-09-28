import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from './context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mercure Mekinda: Développeur Web & mobile',
  description: 'Développeur web & mobile passionné.',
  metadataBase: new URL('https://votre-domain.com'), // Remplacez par votre domaine
  openGraph: {
    title: 'Mercure Mekinda: Développeur Web & mobile',
    description: 'Développeur web & mobile passionné.',
    images: [
      {
        url: 'https://res.cloudinary.com/dmfjhas5a/image/upload/v1758637700/profile_aarjez.jpg', // Chemin relatif depuis le dossier public
        width: 1200,
        height: 630,
        alt: 'Portfolio Développeur Web & mobile',
      },
    ],
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercure Mekinda: Développeur Web & mobile',
    description: 'Développeur web & mobile passionné.',
    images: ['https://res.cloudinary.com/dmfjhas5a/image/upload/v1758637700/profile_aarjez.jpg'], // Même image que pour Open Graph
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}