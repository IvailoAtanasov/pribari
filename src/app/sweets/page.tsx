import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'

type Sweet = {
  _id: string
  name: string
  description?: string
  price: string
  imageUrl: string
  slug: string
  order?: number
  priceUnit?: string
}

const formatPrice = (eur: string | number) => {
  const numeric = Number(String(eur).replace(/[^0-9.,-]/g, '').replace(',', '.'))
  const value = Number.isFinite(numeric) ? numeric : 0
  const euro = value.toFixed(2)
  const bgn = (value * 1.95583).toFixed(2)
  return `${euro}€ | ${bgn} лв`
}

const sweetsQuery = groq`
  *[_type == "sweet"]|order(order asc){
    _id,
    name,
    description,
    price,
    priceUnit,
    "imageUrl": image.asset->url,
    "slug": slug.current,
    order
  }
`


async function getSweets(): Promise<Sweet[]> {
  return client.fetch(
    sweetsQuery, 
    {}, 
    { 
      next: { 
        revalidate: 60, // Re-check for new content every 60 seconds
        tags: ['sweets']  // Tagging this makes it easier to clear later
      } 
    }
  )
}

export default async function SweetsPage() {
  const sweetsProducts = await getSweets();

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
            {sweetsProducts.map((product: Sweet) => (
              <Link
                key={product._id}
                href={`/sweets/${product.slug}`}
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
                    className="text-xl font-semibold mb-1"
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
        </div>
      </section>
    </main>
  )
}
