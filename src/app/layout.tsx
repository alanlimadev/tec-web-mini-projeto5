import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { ThemeSwitcher } from '@/app/components/themeSwitcher';
import { Toaster } from 'react-hot-toast';

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
        <nav className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/20 transition-colors duration-200">
          <div className=" mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-900 dark:text-gray-100 hover:opacity-80 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                  <path d="M3 10h18" />
                  <path d="m16 20 2 2 4-4" />
                </svg>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex space-x-6">
                <Link
                  href="/cadastro"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Cadastrar
                </Link>
                <Link
                  href="/listagem"
                  className=" text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Listagem
                </Link>
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 transition-colors duration-200">
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}
