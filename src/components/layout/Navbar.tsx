'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Menu, X, Facebook, Instagram } from 'lucide-react'

const navLinks = [
  { href: '/torti', label: 'Торти' },
  { href: '/specials', label: 'За повод' },
  { href: '/sweets', label: 'Сладкиши' },
  { href: '#', label: 'За Нас' },
  { href: '#', label: 'Контакти' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav
      className="w-full py-6 fixed md:sticky top-0 z-50 md:z-40"
      style={{
        backgroundColor: '#f6edf6',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Logo - Left */}
        <div className="w-[207px] flex-shrink-0">
          <Link
            href="/"
            className="text-4xl font-bold"
            style={{
              fontFamily: "'Marck Script', cursive",
              color: '#500050',
            }}
          >
            При Бари
          </Link>
        </div>

        {/* Navigation Links - Center (Desktop) */}
        <ul className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={(e) => {
                  if (link.label === 'За Нас' || link.label === 'Контакти') {
                    e.preventDefault();
                    const sectionId = link.label === 'За Нас' ? 'about' : 'footer';
                    const element = document.getElementById(sectionId);
                    if (element) {
                      const navbarHeight = 80; // Approximate navbar height
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    } else {
                      window.location.href = `/#${sectionId}`;
                    }
                  }
                }}
                className="text-gray-700 hover:text-[#500050] transition-colors font-medium"
                style={{ fontFamily: 'IdealistSans, sans-serif' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Icon - Right (Desktop) */}
        <div className="w-[207px] flex-shrink-0 hidden md:flex justify-end">
          <Link
            href="/sign-in"
            className="flex items-center justify-center p-2 text-gray-700 hover:text-[#500050] transition-colors"
            aria-label="Вход"
          >
            <User className="w-6 h-6" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 ml-auto text-gray-700 hover:text-[#500050] transition-colors"
          aria-label={isMenuOpen ? 'Затвори меню' : 'Отвори меню'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Slide-in Panel */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#f6edf6', minHeight: 'calc(100vh - 120px)' }}
      >
        <ul className="flex flex-col py-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={(e) => {
                  if (link.label === 'За Нас' || link.label === 'Контакти') {
                    e.preventDefault();
                    const sectionId = link.label === 'За Нас' ? 'about' : 'footer';
                    const element = document.getElementById(sectionId);
                    if (element) {
                      const navbarHeight = 80; // Approximate navbar height
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    } else {
                      window.location.href = `/#${sectionId}`;
                    }
                  }
                  setIsMenuOpen(false);
                }}
                className="block px-6 py-3 text-gray-700 hover:text-[#500050] hover:bg-white/50 transition-colors font-medium"
                style={{ fontFamily: 'IdealistSans, sans-serif' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/sign-in"
              className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-[#500050] hover:bg-white/50 transition-colors font-medium"
              style={{ fontFamily: 'IdealistSans, sans-serif' }}
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={18} />
              Вход
            </Link>
          </li>
          <li className="mt-8 flex justify-center space-x-4">
            <a
              href="https://www.facebook.com/torti.priBari/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#500050] text-white hover:bg-[#400040] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/sladkarskakashta/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#500050] text-white hover:bg-[#400040] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
