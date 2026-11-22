import type { CollectionConfig } from 'payload'

export const Objects: CollectionConfig = {
  slug: 'objects',
  labels: { singular: 'Объект', plural: 'Объекты' },
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'district', 'guests', 'visible', 'updatedAt'],
    description: 'Апартаменты на сайте. Цены и свободные даты берутся из Realty Calendar.',
  },
  access: { read: () => true },
  versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 30 },
  defaultSort: 'order',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основное',
          fields: [
            { name: 'title', label: 'Название', type: 'text', required: true, maxLength: 60 },
            {
              name: 'tagline',
              label: 'Короткое описание для карточки',
              type: 'textarea',
              required: true,
              maxLength: 160,
              admin: { description: 'До 160 знаков. Видно в списке объектов.' },
            },
            { name: 'description', label: 'Подробное описание', type: 'richText' },
            {
              type: 'row',
              fields: [
                { name: 'area', label: 'Площадь, м²', type: 'number', min: 10, admin: { width: '33%' } },
                { name: 'guests', label: 'Гостей', type: 'number', min: 1, max: 20, required: true, admin: { width: '33%' } },
                { name: 'bedrooms', label: 'Спален', type: 'number', min: 0, max: 10, admin: { width: '33%' } },
              ],
            },
            {
              name: 'amenities',
              label: 'Удобства',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Вид на море', value: 'sea-view' },
                { label: 'Балкон / терраса', value: 'balcony' },
                { label: 'Кондиционер', value: 'ac' },
                { label: 'Wi-Fi', value: 'wifi' },
                { label: 'Кухня', value: 'kitchen' },
                { label: 'Стиральная машина', value: 'washer' },
                { label: 'Парковка', value: 'parking' },
                { label: 'Бассейн', value: 'pool' },
                { label: 'Можно с животными', value: 'pets' },
              ],
            },
          ],
        },
        {
          label: 'Фото',
          fields: [
            { name: 'cover', label: 'Обложка', type: 'upload', relationTo: 'media', required: true },
            {
              name: 'gallery',
              label: 'Галерея',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              admin: { description: 'Перетаскивайте, чтобы поменять порядок.' },
            },
          ],
        },
        {
          label: 'Расположение и бронирование',
          fields: [
            {
              name: 'district',
              label: 'Район',
              type: 'select',
              required: true,
              options: [
                { label: 'Центр', value: 'center' },
                { label: 'Толстый мыс', value: 'tolstyi' },
                { label: 'Тонкий мыс', value: 'tonkiy' },
                { label: 'Кабардинка', value: 'kabardinka' },
              ],
            },
            {
              name: 'mapPoint',
              label: 'Метка на схеме бухты',
              type: 'select',
              options: Array.from({ length: 12 }, (_, i) => ({ label: `Точка ${i + 1}`, value: `p${i + 1}` })),
              admin: { description: 'Точки заранее размечены на схеме. Выберите ближайшую к дому.' },
            },
            {
              name: 'realtyCalendarId',
              label: 'ID объекта в Realty Calendar',
              type: 'text',
              admin: { description: 'Нужен, чтобы кнопка «Забронировать» открывала именно эту квартиру.' },
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      label: 'Адрес страницы',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Заполнится сам из названия.' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            const map: Record<string, string> = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'c',ч:'ch',ш:'sh',щ:'sch',ы:'y',э:'e',ю:'yu',я:'ya' }
            return String(data?.title || '')
              .toLowerCase()
              .split('')
              .map((c) => map[c] ?? c)
              .join('')
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '')
          },
        ],
      },
    },
    { name: 'visible', label: 'Показывать на сайте', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'order', label: 'Порядок в списке', type: 'number', defaultValue: 100, admin: { position: 'sidebar', description: 'Меньше — выше.' } },
  ],
}
