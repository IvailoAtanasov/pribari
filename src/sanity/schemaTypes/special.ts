import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'special',
  title: 'Special Occasion Cake',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'price', title: 'Price (e.g. По запитване or 7.50 лв/парче)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  orderings: [{ title: 'Order (asc)', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
