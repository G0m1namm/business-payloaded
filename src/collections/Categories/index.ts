import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Store',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'parentCategory',
      type: 'relationship',
      relationTo: 'categories',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
    ...slugField(),
  ],
}
