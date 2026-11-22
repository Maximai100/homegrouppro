import type { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Контакты',
  admin: { group: 'Тексты страниц' },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Телефон', type: 'text', admin: { width: '50%' } },
        { name: 'email', label: 'E-mail', type: 'email', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'telegram', label: 'Telegram', type: 'text', admin: { width: '50%', placeholder: '@homegroup' } },
        { name: 'whatsapp', label: 'WhatsApp', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'address', label: 'Адрес офиса', type: 'text' },
    { name: 'hours', label: 'Часы работы', type: 'text', defaultValue: 'Ежедневно, 9:00–21:00' },
  ],
}
