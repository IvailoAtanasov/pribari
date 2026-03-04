import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cake',
  title: 'Cake',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
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
    defineField({
      name: 'priceUnit',
      title: 'Price unit/description (e.g. "per piece", "per 100gr")',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'cakeCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this cake in the Featured Products section on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'SEO tags for this product (e.g., "торта", "шоколад", "рожден ден")',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes (number of pieces)',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Available sizes in number of pieces (e.g., 8, 12, 16, 20)',
    }),
  ],
  orderings: [
    {
      title: 'Order (asc)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
