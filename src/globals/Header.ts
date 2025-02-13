import { link } from '@/fields/link'
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'navItems',
      label: 'Nav Items',
      type: 'array',
      fields: [
        {
          name: 'type',
          label: 'Menu Type',
          type: 'radio',
          options: [
            {
              label: 'Menu Link',
              value: 'link',
            },
            {
              label: 'Menu collapsible',
              value: 'collapsible',
            },
          ],
          defaultValue: 'link',
          required: true,
        },
        {
          name: 'menuLabel',
          label: 'Menu Label',
          type: 'text',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'collapsible',
          },
        },
        link({
          overrides: {
            admin: {
              condition: (data, siblingData) => siblingData.type === 'link',
            },
          },
        }),
        {
          name: 'secondLevel',
          label: 'Second Level Items',
          type: 'array',
          minRows: 1,
          required: true,
          fields: [link()],
          admin: {
            condition: (data, siblingData) => siblingData.type === 'collapsible',
          },
        },
      ],
    },
  ],
}
