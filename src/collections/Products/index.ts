import { ColorVariationBlock } from '@/blocks/ColorVariation/config'
import { SizeVariationBlock } from '@/blocks/SizeVariation/config'
import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Store',
  },
  fields: [
    ...slugField(),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'First picture will be taken as the main product image',
      },
    },
    {
      name: 'price',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'categories',
      type: 'text', // TODO: change to Relationship when Categories collection is created
    },
    {
      name: 'productVariations',
      type: 'blocks',
      maxRows: 1,
      blocks: [SizeVariationBlock, ColorVariationBlock],
    },
  ],
}
