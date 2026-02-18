import Image from 'next/image'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'

import DetailActions from '@/components/product/DetailActions'
import type { DetailContent } from '@/components/product/DetailActions'
import { client } from '@/sanity/lib/client'

const chocolateDetailQuery = groq`
  *[_type == "chocolate" && slug.current == $slug][0]{
    name,
    price,
    priceUnit,
    description,
    additionalDetails,
    dropdownDescription,
    dropdownAllergens,
    dropdownStorage,
    dropdownTransport,
    "imageUrl": image.asset->url
  }
`

async function getChocolate(slug: string): Promise<DetailContent | null> {
  return client.fetch(
    chocolateDetailQuery,
    { slug },
    {
      next: { revalidate: 60, tags: ['chocolate', `chocolate-${slug}`] },
    }
  )
}

export default async function ChocolateDetailPage({ params }: { params: { slug: string } }) {
  const product = await getChocolate(params.slug)

  if (!product) return notFound()

  const {
    name,
    price,
    priceUnit,
    description,
    additionalDetails,
    imageUrl,
    dropdownDescription,
    dropdownAllergens,
    dropdownStorage,
    dropdownTransport,
  } = product

  return (
    <main className="min-h-screen py-16" style={{ backgroundColor: '#f6edf6' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2">
            <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-1 p-0 space-y-4" style={{ color: '#500050' }}>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'IdealistSans, sans-serif' }}>{name}</h1>
            {description ? <p className="text-base text-gray-700" style={{ fontFamily: 'IdealistSans, sans-serif' }}>{description}</p> : null}
            <p className="text-xl flex items-baseline justify-between">
              <span>{price}</span>
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
            />
          </div>
        </div>
      </div>
    </main>
  )
}
