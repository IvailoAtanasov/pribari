import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'

type Chocolate = {
  _id: string
  name: string
  description?: string
  price: string
  imageUrl: string
  slug: string
  order?: number
  priceUnit?: string
}

const calculateEuro = (levaPrice: string) => {
  const numeric = parseFloat(levaPrice.replace(/[^0-9.,]/g, '').replace(',', '.'))
  if (Number.isNaN(numeric)) return ''
  const euro = numeric / 1.95583
  return euro.toFixed(2)
}

const chocolateQuery = groq`
  *[_type == "chocolate"]|order(order asc){
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

async function getChocolate(): Promise<Chocolate[]> {
  return client.fetch(
    chocolateQuery, 
    {}, 
    { 
      next: { 
        revalidate: 60, // Re-check for new content every 60 seconds
        tags: ['chocolate']  // Tagging this makes it easier to clear later
      } 
    }
  )
}

export default async function ChocolatePage() {
  const chocolateProducts = await getChocolate()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-[55vh] min-h-[500px] overflow-hidden flex items-center justify-center"
      >
        <div
          className="absolute inset-0 animate-slow-zoom"
          style={{
            backgroundImage: 'url(/img/0062.JPG)',
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
            {chocolateProducts.map((product: Chocolate) => (
              <Link
                key={product._id}
                href={`/chocolate/${product.slug}`}
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
                    className="text-lg font-bold flex items-baseline justify-between"
                    style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
                  >
                    <span>
                      {product.price === 'По запитване'
                        ? product.price
                        : `${calculateEuro(product.price)}€ | ${product.price.replace(/ лв.*/, 'лв')}`}
                    </span>
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
