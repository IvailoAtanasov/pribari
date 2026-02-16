import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'

type Cake = {
  _id: string
  name: string
  description?: string
  price: string
  imageUrl: string
  slug: string
  order?: number
}

const calculateEuro = (levaPrice: string) => {
  const numeric = parseFloat(levaPrice.replace(/[^0-9.,]/g, '').replace(',', '.'))
  if (Number.isNaN(numeric)) return ''
  const euro = numeric / 1.95583
  return euro.toFixed(2)
}

const cakesQuery = groq`
  *[_type == "cake"]|order(order asc){
    _id,
    name,
    description,
    price,
    "imageUrl": image.asset->url,
    "slug": slug.current,
    order
  }
`

async function getCakes(): Promise<Cake[]> {
  return client.fetch(cakesQuery)
}

export default async function TortiPage() {
  const tortiProducts = await getCakes()

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
            {tortiProducts.map((product: Cake) => (
              <Link
                key={product._id}
                href={`/cakes/${product.slug}`}
                className="group rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.imageUrl}
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
