import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: any } }) => req.user?.role === 'admin'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Пользователь', plural: 'Пользователи' },
  admin: { useAsTitle: 'name', group: 'Настройки', defaultColumns: ['name', 'email', 'role'] },
  auth: { maxLoginAttempts: 5, lockTime: 10 * 60 * 1000 },
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
  },
  fields: [
    { name: 'name', label: 'Имя', type: 'text', required: true },
    {
      name: 'role',
      label: 'Роль',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Администратор', value: 'admin' },
        { label: 'Редактор', value: 'editor' },
      ],
      access: { update: ({ req }) => req.user?.role === 'admin' },
    },
  ],
}
