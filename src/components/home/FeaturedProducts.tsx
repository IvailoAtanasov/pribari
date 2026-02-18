'use client'

import Image from 'next/image'
import Link from 'next/link'

const featuredProducts = [
  {
    id: 1,
    name: 'Баварско изкушение',
    description: 'Нежна баварска крем с шоколад и бисквитена основа',
    price: '7.50 лв/парче',
    image: '/img/0027.JPG',
    href: '/cakes/bavarsko-izkushenie',
  },
  {
    id: 2,
    name: 'Шанфъстък и Малини',
    description: 'Пандишпан с шанфъстък и свежи малини',
    price: '7.50 лв/парче',
    image: '/img/0022.JPG',
    href: '/cakes/shanfustak-i-malini',
  },
  {
    id: 3,
    name: 'Снежанка',
    description: 'Орехов пандишпанен блат в комбинация с гриляж от ядки и домашен крем',
    price: '7.50 лв/парче',
    image: '/img/0009.JPG',
    href: '/cakes/snejanka',
  },
  {
    id: 4,
    name: 'Павлова',
    description: 'Целувачен блат в комбинация с нежен крем от домашна сметана и горски плодове',
    price: '7.50 лв/парче',
    image: '/img/0013.JPG',
    href: '/cakes/pavlova',
  },
]

const calculateEuro = (levaPrice: string) => {
  const leva = parseFloat(levaPrice.replace(' лв/парче', ''));
  const euro = leva / 1.95583;
  return euro.toFixed(2);
};

export default function FeaturedProducts() {
  return (
    <section className="py-16" style={{ backgroundColor: '#f6edf6' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: '#500050', fontFamily: "'Marck Script', cursive" }}
          >
            Най-Продавани
          </h2>
          <p
            className="text-xl md:text-2xl text-gray-700"
            style={{ fontFamily: 'IdealistSans, sans-serif' }}
          >
            наслади се на вкуса
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: '#f6edf6' }}
                />
              </div>
              <div className="p-4 text-left">
                <h3
                  className="text-xl font-semibold mb-1"
                  style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-lg font-bold"
                  style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
                >
                  {calculateEuro(product.price)}€ | {product.price.replace(' лв/парче', 'лв')}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/torti"
            className="inline-block px-8 py-3 rounded-full font-medium transition-all hover:scale-105 border-2"
            style={{
              backgroundColor: 'transparent',
              color: '#500050',
              borderColor: '#500050',
              fontFamily: 'IdealistSans, sans-serif',
            }}
          >
            Виж всички торти
          </Link>
        </div>
      </div>
    </section>
  )
}
