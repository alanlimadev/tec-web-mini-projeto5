'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Plus, List, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ThemeSwitcher } from './themeSwitcher';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 640) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const NavItems = () => (
    <>
      <Link
        href="/cadastro"
        onClick={closeMenu}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Nova Atividade
      </Link>

      <Link
        href="/listagem"
        onClick={closeMenu}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <List className="h-4 w-4" />
        Lista de Atividades
      </Link>
      <div className="hidden sm:block">
        <ThemeSwitcher />
      </div>
    </>
  );

  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Calendar className="h-6 w-6 text-blue-500" />
          </Link>

          <div className="hidden sm:flex items-center gap-4">
            <NavItems />
          </div>

          <Button
            onClick={toggleMenu}
            variant="ghost"
            size="icon"
            className="sm:hidden text-gray-600 dark:text-gray-300"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <div
        className={`sm:hidden fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-800 border-l dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-4 gap-2">
          <div className="flex justify-between mb-4">
            <ThemeSwitcher />

            <Button
              onClick={closeMenu}
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <NavItems />
        </div>
      </div>

      {isOpen && (
        <div
          onClick={closeMenu}
          className="sm:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        />
      )}
    </nav>
  );
}
