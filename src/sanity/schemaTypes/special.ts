import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'special',
  title: 'Special Occasion Cake',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'additionalDetails',
      title: 'Additional Details',
      type: 'text',
    }),
    defineField({
      name: 'dropdownDescription',
      title: 'Dropdown - Description',
      type: 'text',
    }),
    defineField({
      name: 'dropdownAllergens',
      title: 'Dropdown - Allergens & Ingredients',
      type: 'text',
    }),
    defineField({
      name: 'dropdownStorage',
      title: 'Dropdown - Storage',
      type: 'text',
    }),
    defineField({
      name: 'dropdownTransport',
      title: 'Dropdown - Transport',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price (EUR)',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'priceUnit', title: 'Price unit/description (e.g. "per piece", "per 100gr")', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  orderings: [{ title: 'Order (asc)', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
