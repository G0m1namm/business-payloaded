import type { Block } from 'payload'

export const ColorVariationBlock: Block = {
  slug: 'colorVariation',
  interfaceName: 'ColorVariationBlock',
  fields: [
    {
      name: 'colors',
      type: 'array',
      fields: [
        {
          name: 'colorName',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Colors',
    singular: 'Color',
  },
}
