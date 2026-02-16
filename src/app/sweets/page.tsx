import Image from 'next/image'
import Link from 'next/link'

const calculateEuro = (levaPrice: string) => {
  const leva = parseFloat(levaPrice.replace(/ лв\/.*/, ''));
  if (isNaN(leva)) return '';
  const euro = leva / 1.95583;
  return euro.toFixed(2);
};

const sweetsProducts = [
  // Sweets
  {
    id: 1,
    name: 'Кайзер Шмарен',
    description: 'Кралска Палачинка (предлага се само на място)',
    price: '10.50 лв/брой',
    image: '/img/viber_image_2021-07-20_18-34-49-909.jpg',
    href: '/sweets/kajzer-shmaren'
  },
  // Cookies
  {
    id: 2,
    name: 'Домашни бисквитки с шоколад',
    description: 'Прясно изпечени бисквитки с шоколад',
    price: '7.50 лв/кг',
    image: '/img/0001.JPG',
    href: '/sweets/domashni-biskvitki-s-shokolad'
  },
  {
    id: 3,
    name: 'Бисквитки с бадеми',
    description: 'Хрупкави бисквитки с бадеми',
    price: '8.50 лв/кг',
    image: '/img/0002.JPG',
    href: '/sweets/biskvitki-s-bademi'
  },
  {
    id: 4,
    name: 'Бисквитки с орехи',
    description: 'Крехки бисквитки с орехи',
    price: '8.50 лв/кг',
    image: '/img/0006.JPG',
    href: '/sweets/biskvitki-s-orehi'
  },
  {
    id: 5,
    name: 'Бисквитки с мак',
    description: 'Традиционни бисквитки с мак',
    price: '7.50 лв/кг',
    image: '/img/0009.JPG',
    href: '/sweets/biskvitki-s-mak'
  },
  {
    id: 6,
    name: 'Бисквитки с лешници',
    description: 'Богати бисквитки с лешници',
    price: '9.50 лв/кг',
    image: '/img/0012.JPG',
    href: '/sweets/biskvitki-s-leshnici'
  },
  {
    id: 7,
    name: 'Бисквитки с кокос',
    description: 'Тропически бисквитки с кокос',
    price: '8.50 лв/кг',
    image: '/img/0013.JPG',
    href: '/sweets/biskvitki-s-kokos'
  },
  // Chocolate
  {
    id: 8,
    name: 'Шоколадови бонбони',
    description: 'Вкусни шоколадови бонбони ръчно изработени',
    price: '15.00 лв/кг',
    image: '/img/0007.JPG',
    href: '/sweets/shokoladovi-bonboni'
  },
  {
    id: 9,
    name: 'Шоколадови пръчици',
    description: 'Хрупкави шоколадови пръчици',
    price: '12.00 лв/кг',
    image: '/img/0076.JPG',
    href: '/sweets/shokoladovi-pruchici'
  },
  {
    id: 10,
    name: 'Шоколадови фигури',
    description: 'Шоколадови фигури по поръчка',
    price: '20.00 лв/кг',
    image: '/img/0078.JPG',
    href: '/sweets/shokoladovi-figuri'
  },
  {
    id: 11,
    name: 'Шоколадова торта',
    description: 'Богата шоколадова торта',
    price: '25.00 лв/кг',
    image: '/img/0085.JPG',
    href: '/sweets/shokoladova-torta'
  },
  {
    id: 13,
    name: 'Австрийски бисквити',
    description: 'бисквити с три вида ядки и лимонов сок',
    price: '3.5 лв/100гр',
    image: '/img/0049.JPG',
    href: '/sweets/avstrijski-biskviti'
  },
  {
    id: 14,
    name: 'Шприц',
    description: 'Бисквити с мармалад и шоколад',
    price: '3 лв/100гр',
    image: '/img/0050.JPG',
    href: '/sweets/shpric'
  },
  {
    id: 15,
    name: 'Кокосов Сладки',
    description: 'Кокос и шоколад',
    price: '3.5 лв/100гр',
    image: '/img/0052.JPG',
    href: '/sweets/kokosov-sladki'
  },
]

export default function SweetsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-[55vh] min-h-[500px] overflow-hidden flex items-center justify-center"
      >
        <div
          className="absolute inset-0 animate-slow-zoom"
          style={{
            backgroundImage: 'url(/img/0007.JPG)',
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
            Сладкиши
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ fontFamily: 'IdealistSans, sans-serif' }}
          >
            Открийте нашите вкусни сладкиши, бисквитки и шоколадови изделия
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16" style={{ backgroundColor: '#f6edf6' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sweetsProducts.map((product) => (
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
                    {product.price === 'По запитване' ? product.price : `${calculateEuro(product.price)}€ | ${product.price.replace(/ лв\/.*/, 'лв')}`}
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
