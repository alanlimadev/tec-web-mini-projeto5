import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Navigation } from '@/app/components/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gestão de Atividades UFC Sobral',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="transition-colors duration-200">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <Navigation />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 transition-colors duration-200">
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}
