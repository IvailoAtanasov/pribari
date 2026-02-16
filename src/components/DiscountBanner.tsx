'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function DiscountBanner() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Integrate with Mailchimp API
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Close popup after 2 seconds
    setTimeout(() => {
      setIsPopupOpen(false)
      setIsSuccess(false)
      setFormData({ name: '', email: '' })
    }, 2000)
  }

  return (
    <>
      {/* Vertical Banner - Right Side */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 py-3 px-1.5 shadow-lg cursor-pointer hover:brightness-95 transition-all rounded-lg"
        style={{
          backgroundColor: '#f8f4f8',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'translateY(-50%) rotate(180deg)',
        }}
      >
        <span
          className="text-sm font-bold tracking-wider"
          style={{
            color: '#500050',
            fontFamily: 'IdealistSans, sans-serif',
          }}
        >
          Отстъпка 5%
        </span>
      </button>

      {/* Popup Overlay */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsPopupOpen(false)}
        >
          {/* Popup Content */}
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Затвори"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <>
                <h2
                  className="text-2xl font-bold mb-2 text-center"
                  style={{ color: '#500050', fontFamily: "'Marck Script', cursive" }}
                >
                  Получете 5% отстъпка
                </h2>
                <p
                  className="text-gray-600 mb-6 text-center"
                  style={{ fontFamily: 'IdealistSans, sans-serif' }}
                >
                  Абонирайте се за нашия бюлетин и получете 5% отстъпка за първата си поръчка!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: 'IdealistSans, sans-serif' }}
                    >
                      Име
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#500050] focus:border-transparent placeholder-gray-400 text-[#500050]"
                      placeholder="Вашето име"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: 'IdealistSans, sans-serif' }}
                    >
                      Имейл адрес
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#500050] focus:border-transparent placeholder-gray-400 text-[#500050]"
                      placeholder="example@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-md font-medium transition-colors disabled:opacity-50"
                    style={{
                      backgroundColor: '#500050',
                      color: '#f6edf6',
                      fontFamily: 'IdealistSans, sans-serif',
                    }}
                  >
                    {isSubmitting ? 'Изпращане...' : 'Получи отстъпката'}
                  </button>
                </form>

                <p
                  className="text-xs text-gray-500 mt-4 text-center"
                  style={{ fontFamily: 'IdealistSans, sans-serif' }}
                >
                  Като се абонирате, вие се съгласявате да получавате новини и оферти от нас.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: '#500050', fontFamily: "'Marck Script', cursive" }}
                >
                  Благодарим ви!
                </h2>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: 'IdealistSans, sans-serif' }}
                >
                  Ще получите вашия код за отстъпка на имейла.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
