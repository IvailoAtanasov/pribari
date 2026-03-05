import { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pribari.bg'

type SanitySlug = {
  slug: string
}

const cakesQuery = groq`
  *[_type == "cake"]{
    "slug": slug.current
  }
`

const categoriesQuery = groq`
  *[_type == "cakeCategory"]{
    "slug": slug.current
  }
`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all cakes and categories from Sanity
  const [cakes, categories] = await Promise.all([
    client.fetch<SanitySlug[]>(cakesQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<SanitySlug[]>(categoriesQuery, {}, { next: { revalidate: 3600 } }),
  ])

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/torti`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sladkishi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/shokolad`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ketering`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/torti/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // Individual cake pages
  const cakePages: MetadataRoute.Sitemap = cakes.map((cake) => ({
    url: `${BASE_URL}/torti/${cake.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...cakePages]
}
