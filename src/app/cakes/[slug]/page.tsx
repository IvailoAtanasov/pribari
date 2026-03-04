import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'

import { client } from '@/sanity/lib/client'

import DetailActions from '@/components/product/DetailActions'
import type { DetailContent } from '@/components/product/DetailActions'

type Cake = {
  _id: string
  name: string
  description?: string
  price: number | string
  imageUrl: string
  slug: string
  order?: number
  priceUnit?: string
}

type Category = {
  _id: string
  title: string
  description?: string
  slug: string
}

const formatPrice = (eur: string | number) => {
  const numeric = Number(String(eur).replace(/[^0-9.,-]/g, '').replace(',', '.'))
  if (!Number.isFinite(numeric)) return ''
  const euro = numeric.toFixed(2)
  const bgn = (numeric * 1.95583).toFixed(2)
  return `${euro}€ | ${bgn} лв`
}

const categoryQuery = groq`
  *[_type == "cakeCategory" && slug.current == $slug][0]{
    _id,
    title,
    description,
    "slug": slug.current
  }
`

const cakesByCategoryQuery = groq`
  *[_type == "cake" && category->slug.current == $slug]|order(order asc){
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

const cakeDetailQuery = groq`
  *[_type == "cake" && slug.current == $slug][0]{
    name,
    price,
    priceUnit,
    description,
    additionalDetails,
    dropdownDescription,
    dropdownAllergens,
    dropdownStorage,
    dropdownTransport,
    tags,
    sizes,
    "imageUrl": image.asset->url
  }
`

async function getCategory(slug: string): Promise<Category | null> {
  return client.fetch(
    categoryQuery,
    { slug },
    { next: { revalidate: 60, tags: ['cakeCategory', `cakeCategory-${slug}`] } }
  )
}

async function getCakesByCategory(slug: string): Promise<Cake[]> {
  return client.fetch(
    cakesByCategoryQuery,
    { slug },
    { next: { revalidate: 60, tags: ['cake', `cake-category-${slug}`] } }
  )
}

async function getCake(slug: string): Promise<DetailContent | null> {
  return client.fetch(
    cakeDetailQuery,
    { slug },
    { next: { revalidate: 60, tags: ['cake', `cake-${slug}`] } }
  )
}

export default async function CakeOrCategoryPage({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const resolved = await params
  const rawSlug = Array.isArray(resolved.slug) ? resolved.slug[0] : resolved.slug
  if (!rawSlug) return notFound()
  
  // Decode URL-encoded Bulgarian slugs
  const slugParam = decodeURIComponent(rawSlug)

  // First check if this is a category
  const category = await getCategory(slugParam)
  
  if (category) {
    // It's a category - show category listing
    const cakes = await getCakesByCategory(slugParam)
    
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
              {category.title} Торти
            </h1>
            {category.description && (
              <p
                className="text-lg md:text-xl text-white max-w-2xl"
                style={{ fontFamily: 'IdealistSans, sans-serif' }}
              >
                {category.description}
              </p>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16" style={{ backgroundColor: '#f6edf6' }}>
          <div className="max-w-7xl mx-auto px-4">
            {cakes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600" style={{ fontFamily: 'IdealistSans, sans-serif' }}>
                  Няма налични торти в тази категория
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {cakes.map((product: Cake) => (
                  <Link
                    key={product._id}
                    href={`/торти/${product.slug}`}
                    className="group rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        quality={95}
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
            )}
          </div>
        </section>
      </main>
    )
  }

  // Not a category - try to get individual cake
  const product = await getCake(slugParam)

  if (!product) return notFound()

  const { name, price, priceUnit, description, additionalDetails, imageUrl, dropdownDescription, dropdownAllergens, dropdownStorage, dropdownTransport, tags, sizes } = product as DetailContent & { tags?: string[], sizes?: number[] }

  return (
    <main className="min-h-screen py-16" style={{ backgroundColor: '#f6edf6' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2">
            <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
              <Image
                src={imageUrl}
                alt={name}
                quality={95}
                fill
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            {tags && tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-gray-200/60 text-gray-500"
                    style={{ fontFamily: 'IdealistSans, sans-serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-1 p-0 space-y-4" style={{ color: '#500050' }}>
            <h1 className="text-3xl" style={{ fontFamily: 'IdealistSans, sans-serif' }}>{name}</h1>
            {description ? <p className="text-base text-gray-700" style={{ fontFamily: 'IdealistSans, sans-serif' }}>{description}</p> : null}
            <p className="text-xl flex items-baseline justify-between">
              <span>{formatPrice(price)}</span>
              {priceUnit ? <span className="text-xl ml-3">{priceUnit}</span> : null}
            </p>
            {additionalDetails ? (
              <div className="pt-2">
                <h3 className="text-lg mb-1">Допълнителни детайли</h3>
                <p className="text-sm text-gray-700" style={{ fontFamily: 'IdealistSans, sans-serif' }}>{additionalDetails}</p>
              </div>
            ) : null}

            <DetailActions
              dropdownDescription={dropdownDescription}
              dropdownAllergens={dropdownAllergens}
              dropdownStorage={dropdownStorage}
              dropdownTransport={dropdownTransport}
              sizes={sizes}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
