import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Главная страница',
  admin: { group: 'Тексты страниц' },
  access: { read: () => true },
  versions: { drafts: { autosave: { interval: 1500 } }, max: 30 },
  fields: [
    {
      name: 'hero',
      label: 'Первый экран',
      type: 'group',
      fields: [
        { name: 'title', label: 'Заголовок', type: 'text', required: true, maxLength: 70 },
        { name: 'subtitle', label: 'Подзаголовок', type: 'textarea', maxLength: 200 },
        { name: 'button', label: 'Текст кнопки', type: 'text', defaultValue: 'Выбрать апартаменты', maxLength: 30 },
      ],
    },
    {
      name: 'advantages',
      label: 'Преимущества',
      type: 'array',
      maxRows: 6,
      labels: { singular: 'Преимущество', plural: 'Преимущества' },
      fields: [
        { name: 'title', label: 'Заголовок', type: 'text', required: true, maxLength: 40 },
        { name: 'text', label: 'Текст', type: 'textarea', maxLength: 180 },
      ],
    },
    {
      name: 'owners',
      label: 'Блок «Собственникам»',
      type: 'group',
      fields: [
        { name: 'title', label: 'Заголовок', type: 'text', maxLength: 70 },
        { name: 'text', label: 'Текст', type: 'richText' },
      ],
    },
  ],
}
