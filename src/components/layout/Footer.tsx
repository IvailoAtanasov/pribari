'use client'

import { Phone, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="footer" className="py-16" style={{ backgroundColor: '#f6edf6' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Google Maps Section */}
          <div>
            <h3
              className="text-2xl font-semibold mb-6"
              style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
            >
              Намерете ни
            </h3>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://maps.google.com/maps?q=ж.к.%20Люлин%208,%20ул.%20ген.%20Казимир%20Ернрот%2034&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="При Бари локация"
              />
            </div>
          </div>

          {/* Contact & Info Section */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div>
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
              >
                Работно време
              </h3>
              <div
                className="space-y-2 text-gray-700"
                style={{ fontFamily: 'IdealistSans, sans-serif' }}
              >
                <p><strong>Вторник - Петък:</strong> 8:30 - 19:00</p>
                <p><strong>Събота - Неделя:</strong> 10:00 - 17:30</p>
                <p><strong>Понеделник:</strong> почивен ден</p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
              >
                Контакти
              </h3>
              <div
                className="flex items-center gap-3 text-gray-700"
                style={{ fontFamily: 'IdealistSans, sans-serif' }}
              >
                <Phone size={20} />
                <span>+359 885 650 835</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
              >
                Следете ни
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/torti.priBari/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-[#500050] text-white hover:bg-[#400040] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/sladkarskakashta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-[#500050] text-white hover:bg-[#400040] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-300 text-center">
          <p
            className="text-gray-600"
            style={{ fontFamily: 'IdealistSans, sans-serif' }}
          >
            © 2024 При Бари. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  )
}
