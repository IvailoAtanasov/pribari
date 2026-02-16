import Image from 'next/image'
import Link from 'next/link'

const calculateEuro = (levaPrice: string) => {
  const leva = parseFloat(levaPrice.replace(/ лв\/.*/, ''));
  if (isNaN(leva)) return '';
  const euro = leva / 1.95583;
  return euro.toFixed(2);
};

const chocolateProducts = [
  {
    id: 1,
    name: 'Шоколадови бонбони',
    description: 'Вкусни шоколадови бонбони ръчно изработени',
    price: '15.00 лв/кг',
    image: '/img/0007.JPG',
    href: '/chocolate/shokoladovi-bonboni'
  },
  {
    id: 2,
    name: 'Шоколадови пръчици',
    description: 'Хрупкави шоколадови пръчици',
    price: '12.00 лв/кг',
    image: '/img/0076.JPG',
    href: '/chocolate/shokoladovi-pruchici'
  },
  {
    id: 3,
    name: 'Шоколадови фигури',
    description: 'Шоколадови фигури по поръчка',
    price: '20.00 лв/кг',
    image: '/img/0078.JPG',
    href: '/chocolate/shokoladovi-figuri'
  },
  {
    id: 4,
    name: 'Шоколадова торта',
    description: 'Богата шоколадова торта',
    price: '25.00 лв/кг',
    image: '/img/0085.JPG',
    href: '/chocolate/shokoladova-torta'
  },
  {
    id: 5,
    name: 'Бели шоколадови бонбони',
    description: 'Кремави бели шоколадови бонбони',
    price: '16.00 лв/кг',
    image: '/img/0087.JPG',
    href: '/chocolate/beli-shokoladovi-bonboni'
  },
]

export default function ChocolatePage() {
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
            Шоколад
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ fontFamily: 'IdealistSans, sans-serif' }}
          >
            Открийте нашите вкусни шоколадови изделия
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16" style={{ backgroundColor: '#f6edf6' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {chocolateProducts.map((product) => (
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
