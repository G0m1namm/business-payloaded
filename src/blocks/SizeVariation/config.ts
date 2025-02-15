import type { Block } from 'payload'

export const SizeVariationBlock: Block = {
  slug: 'sizeVariation',
  interfaceName: 'SizeVariationBlock',
  fields: [
    {
      name: 'sizes',
      type: 'array',
      fields: [
        {
          name: 'sizeTag',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Sizes',
    singular: 'Size',
  },
}
