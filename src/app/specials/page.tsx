import Image from 'next/image'
import Link from 'next/link'

const calculateEuro = (levaPrice: string) => {
  const leva = parseFloat(levaPrice.replace(' лв/парче', ''));
  if (isNaN(leva)) return '';
  const euro = leva / 1.95583;
  return euro.toFixed(2);
};

const specialsProducts = [
  {
    id: 1,
    name: 'Класическа сватбена торта',
    description: 'Традиционна бяла торта с крем и декорации.',
    price: 'По запитване',
    image: '/img/1.png',
    href: '/specials/klasicheska-svatbena-torta'
  },
  {
    id: 2,
    name: 'Романтична розова торта',
    description: 'Нежна розова торта с цветя и крем.',
    price: 'По запитване',
    image: '/img/2.png',
    href: '/specials/romantichna-rozova-torta'
  },
  {
    id: 3,
    name: 'Елегантна торта с цветя',
    description: 'Бяла торта с свежи цветя и декорации.',
    price: 'По запитване',
    image: '/img/3.png',
    href: '/specials/elegantna-torta-s-cvetya'
  },
  {
    id: 4,
    name: 'Шоколадова сватбена торта',
    description: 'Богата шоколадова торта с крем.',
    price: 'По запитване',
    image: '/img/4.png',
    href: '/specials/shokoladova-svatbena-torta'
  },
  {
    id: 5,
    name: 'Торте за момче',
    description: 'Синя торта с тематични декорации.',
    price: 'По запитване',
    image: '/img/5.png',
    href: '/specials/torte-za-momche'
  },
  {
    id: 6,
    name: 'Торте за момиче',
    description: 'Розова торта с принцеси и цветя.',
    price: 'По запитване',
    image: '/img/6.png',
    href: '/specials/torte-za-momiche'
  },
]

export default function SpecialsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-[55vh] min-h-[500px] overflow-hidden flex items-center justify-center"
      >
        <div
          className="absolute inset-0 animate-slow-zoom"
          style={{
            backgroundImage: 'url(/img/0085.JPG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Marck Script', cursive" }}
          >
            Торти за специални поводи
          </h1>

          <div
            className="text-lg md:text-xl max-w-4xl mx-auto space-y-2"
            style={{ fontFamily: 'IdealistSans, sans-serif' }}
          >
            <p>Възможен брой парчета кръгла форма: 8, 10, 12, 14, 16</p>
            <p>Възможен брой парчета правоъгълна форма: 24, 32, 36, 48</p>
            <p>Торти над 24 парчета изискват повече от един етаж</p>
            <p>Нашите торти са с придружаващ сертификат за качество</p>
            <p>За сватбени торти минимален брой парчета 30</p>
            <p>Минимален срок за изработка на сватбени торти 10 дни</p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16" style={{ backgroundColor: '#f6edf6' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {specialsProducts.map((product) => (
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
                    {product.price === 'По запитване' ? product.price : `${calculateEuro(product.price)}€ | ${product.price.replace(' лв/парче', 'лв')}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
