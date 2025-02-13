import { link } from '@/fields/link'
import { socialMediaTypes } from '@/lib/constants'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
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
    {
      name: 'socialItems',
      label: 'Social Items',
      type: 'array',
      fields: [
        {
          name: 'socialMediaType',
          label: 'Type',
          type: 'select',
          options: socialMediaTypes,
        },
      ],
    },
    {
      name: 'locationInfo',
      label: 'Location Info',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'footerEmail',
      label: 'Footer Email',
      type: 'email',
      required: true,
    },
  ],
}
