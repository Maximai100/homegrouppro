import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Фото', plural: 'Фото' },
  admin: { group: 'Контент' },
  access: { read: () => true },
  fields: [
    {
      name: 'alt',
      label: 'Что на фото',
      type: 'text',
      required: true,
      admin: { description: 'Коротко: «Гостиная с видом на бухту». Нужно для поисковиков и незрячих.' },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumb', width: 400, height: 300, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'card', width: 900, formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'hero', width: 1920, formatOptions: { format: 'webp', options: { quality: 80 } } },
    ],
    adminThumbnail: 'thumb',
  },
}
