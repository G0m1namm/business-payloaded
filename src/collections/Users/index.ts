import { isSuperAdmin } from '@/access/isSuperAdmin'
import { roles } from '@/lib/constants'
import type { CollectionConfig } from 'payload'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      admin: {
        position: 'sidebar',
      },
      name: 'roles',
      type: 'select',
      defaultValue: ['editor'],
      hasMany: true,
      options: roles,
      access: {
        update: ({ req }) => {
          return isSuperAdmin(req.user)
        },
      },
    },
    {
      name: 'username',
      type: 'text',
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
    },
    {
      name: 'customerDetails',
      type: 'group',
      fields: [
        {
          name: 'address',
          type: 'text',
        },
        {
          name: 'contactInfo',
          type: 'text',
        },
      ],
      admin: {
        condition: (data, siblingData) => {
          return siblingData.roles.includes('user')
        },
      },
    },
    {
      name: 'orderHistory',
      type: 'text', // TODO: chance to relationship once Order collection exists
      admin: {
        condition: (data, siblingData) => {
          return siblingData.roles.includes('user')
        },
      },
    },
    {
      name: 'cart',
      type: 'json',
      admin: {
        condition: (data, siblingData) => {
          return siblingData.roles.includes('user')
        },
      },
    },
  ],
}
