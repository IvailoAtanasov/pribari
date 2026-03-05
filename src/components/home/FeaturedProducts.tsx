import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

type FeaturedCake = {
  _id: string
  name: string
  description?: string
  price: number
  priceUnit?: string
  imageUrl: string
  slug: string
}

const featuredCakesQuery = groq`
  *[_type == "cake" && featured == true]|order(order asc)[0...4]{
    _id,
    name,
    description,
    price,
    priceUnit,
    "imageUrl": image.asset->url,
    "slug": slug.current
  }
`

async function getFeaturedCakes(): Promise<FeaturedCake[]> {
  return client.fetch(
    featuredCakesQuery,
    {},
    { next: { revalidate: 60, tags: ['cake', 'featured'] } }
  )
}

const formatPrice = (eur: number) => {
  const euro = eur.toFixed(2)
  const bgn = (eur * 1.95583).toFixed(2)
  return `${euro}€ | ${bgn} лв`
}

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedCakes()
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
              key={product._id}
              href={`/torti/${product.slug}`}
              className="group rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: '#f6edf6' }}
                />
              </div>
              <div className="p-4 text-left">
                <h3
                  className="text-xl mb-1"
                  style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-lg font-bold flex items-baseline justify-between"
                  style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
                >
                  <span>{formatPrice(product.price)}</span>
                  {product.priceUnit ? (
                    <span className="text-lg font-bold ml-3">{product.priceUnit}</span>
                  ) : null}
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
