import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import Navbar from './Navbar'

type CakeCategory = {
  title: string
  slug: string
}

const categoriesQuery = groq`
  *[_type == "cakeCategory"]|order(order asc){
    title,
    "slug": slug.current
  }
`

async function getCategories(): Promise<CakeCategory[]> {
  return client.fetch(
    categoriesQuery,
    {},
    { next: { revalidate: 60, tags: ['cakeCategory'] } }
  )
}

export default async function NavbarWrapper() {
  const categories = await getCategories()
  return <Navbar cakeCategories={categories} />
}
