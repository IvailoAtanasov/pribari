import Image from 'next/image'
import Link from 'next/link'

const calculateEuro = (levaPrice: string) => {
  const leva = parseFloat(levaPrice.replace(' лв/парче', ''));
  const euro = leva / 1.95583;
  return euro.toFixed(2);
};

const tortiProducts = [
  {
    id: 1,
    name: 'Рафаело',
    description: 'Кокосов блат в комбинация с крем от нежен бял шоколад',
    price: '7.50 лв/парче',
    image: '/img/0002.JPG',
    href: '/torti/rafaelo'
  },
  {
    id: 2,
    name: 'Снежанка',
    description: 'Орехов пандишпанен блат в комбинация с гриляж от ядки и домашен крем',
    price: '7.50 лв/парче',
    image: '/img/0009.JPG',
    href: '/torti/snejanka'
  },
  {
    id: 3,
    name: 'Павлова',
    description: 'Целувачен блат в комбинация с нежен крем от домашна сметана и горски плодове',
    price: '7.50 лв/парче',
    image: '/img/0013.JPG',
    href: '/torti/pavlova'
  },
  {
    id: 4,
    name: 'Шоколадов мус',
    description: 'Пандишпанен блат в комбинация с крем от нежен шоколадов мус и тофифи',
    price: '7.50 лв/парче',
    image: '/img/0018.JPG',
    href: '/torti/shokoladov-mus'
  },
  {
    id: 5,
    name: 'Шанфастък и малини',
    description: 'Шамфъстъчен блат в комбинация с нежен крем от рикота и малина.',
    price: '7.50 лв/парче',
    image: '/img/0022.JPG',
    href: '/torti/shanfastuk-i-malini'
  },
  {
    id: 6,
    name: 'Баварско Изкушение',
    description: 'Орехово-бадемов блат комбиниран с баварски крем, шоколад и какао',
    price: '7.50 лв/парче',
    image: '/img/0027.JPG',
    href: '/torti/bavarsko-izkushenie'
  },
  {
    id: 7,
    name: 'Чиизкейк',
    description: 'Крем от домашна сметана и сирене покрити с боровинки, малини или вишни, върху бисквитена подложка',
    price: '7.50 лв/парче',
    image: '/img/0031.JPG',
    href: '/torti/chiizkeyk'
  },
  {
    id: 8,
    name: 'Домашна',
    description: 'Пандишпанен блат в комбинация с целувки, течен шоколад и плодово ванилов крем',
    price: '7.50 лв/парче',
    image: '/img/0036.JPG',
    href: '/torti/domashna'
  },
  {
    id: 9,
    name: 'Медена торта',
    description: 'Нежен меден блат в комбинация с крем маскарпоне и кондензирано мляко',
    price: '7.50 лв/парче',
    image: '/img/0039.JPG',
    href: '/torti/medena-torta'
  },
  {
    id: 10,
    name: 'Баденмайер',
    description: 'Три вида шоколадов мус, фин пандишпан и карамелизирани ядки',
    price: '7.50 лв/парче',
    image: '/img/0044.JPG',
    href: '/torti/badenmayer'
  },
  {
    id: 11,
    name: 'Тирамису',
    description: 'Бишкоти в комбинация с нежен крем от маскарпоне и десероно амарето',
    price: '7.50 лв/парче',
    image: '/img/0047.JPG',
    href: '/torti/tiramisu'
  },
  {
    id: 12,
    name: 'Шоколадов Ганаж',
    description: 'Шоколадови блатове в комбинациця с ганаж от млечен шоколад и малини',
    price: '7.50 лв/парче',
    image: '/img/0112.JPG',
    href: '/torti/shokoladov-ganaj'
  },
  {
    id: 13,
    name: 'Кирш',
    description: 'Нежен шоколадов и пандишпан с крем от домашна сметана, извара и белгийски шоколад',
    price: '7.50 лв/парче',
    image: '/img/0118.JPG',
    href: '/torti/kirsh'
  },
  {
    id: 14,
    name: 'Лимончело',
    description: 'Бишкоти в комбинация с нежен пандишпан, ликьор лимончело и нежен крем от домашно цедено кисело мляко',
    price: '7.50 лв/парче',
    image: '/img/0121.JPG',
    href: '/torti/limonchelo'
  },
  {
    id: 15,
    name: 'Японска Торта',
    description: 'Бадемови блатове и пандишпан в комбинация с нежен млечен и бял шоколадов мус',
    price: '7.50 лв/парче',
    image: '/img/0132.JPG',
    href: '/torti/yaponska-torta'
  },
  {
    id: 16,
    name: 'Бисквитена торта с маскарпоне',
    description: 'Бисквити с нежен крем от маскарпоне и шоколад',
    price: '7.50 лв/парче',
    image: '/img/0041.JPG',
    href: '/torti/biskvitena-torta-s-maskarpon'
  }
]

export default function TortiPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center animate-slow-zoom" style={{ backgroundImage: "url('/img/0007.JPG')" }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: '#ffffff', fontFamily: "'Marck Script', cursive" }}
          >
            Торти
          </h1>
          <p
            className="text-lg md:text-xl text-white max-w-2xl"
            style={{ fontFamily: 'IdealistSans, sans-serif' }}
          >
            Открийте нашата колекция от домашно приготвени торти, направени с любов и висококачествени съставки
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16" style={{ backgroundColor: '#f6edf6' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tortiProducts.map((product) => (
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
                    {calculateEuro(product.price)}€ | {product.price.replace(' лв/парче', 'лв')}
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
