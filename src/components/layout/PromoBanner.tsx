'use client'

import { useState, useEffect } from 'react'

const slides = [
  {
    text: 'Безплатна доставка над 50€ (97,79лв)',
  },
  {
    text: 'Посетете ни на ул. Генерал Казимир Ернрод 34',
  },
]

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="w-full py-2 text-center"
      style={{
        backgroundColor: '#500050',
        color: '#f6edf6',
        fontFamily: 'IdealistSans, sans-serif',
        fontWeight: 400,
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm md:text-base transition-opacity duration-500">
          {slides[currentSlide].text}
        </p>
      </div>
    </div>
  )
}
