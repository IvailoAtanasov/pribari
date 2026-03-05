import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

type CakeCategory = {
  _id: string
  title: string
  description?: string
  imageUrl: string
  slug: string
  order?: number
}

const categoriesQuery = groq`
  *[_type == "cakeCategory"]|order(order asc){
    _id,
    title,
    description,
    "imageUrl": image.asset->url,
    "slug": slug.current,
    order
  }
`

async function getCategories(): Promise<CakeCategory[]> {
  return client.fetch(
    categoriesQuery,
    {},
    {
      next: {
        revalidate: 60,
        tags: ['cakeCategory']
      }
    }
  )
}

export default async function TortiPage() {
  const cakeCategories = await getCategories()
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

      {/* Categories Grid */}
      <section className="py-16" style={{ backgroundColor: '#f6edf6' }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: '#500050', fontFamily: "'Marck Script', cursive" }}
            >
              Категории Торти
            </h2>
            <p
              className="text-xl md:text-2xl text-gray-700"
              style={{ fontFamily: 'IdealistSans, sans-serif' }}
            >
              изберете вашата любима
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cakeCategories.map((category) => (
              <Link
                key={category._id}
                href={`/torti/${category.slug}`}
                className="group rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.imageUrl}
                    alt={category.title}
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
                    {category.title}
                  </h3>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: 'IdealistSans, sans-serif' }}
                  >
                    {category.description}
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
