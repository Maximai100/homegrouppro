import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'
import fs from 'fs'

const pw = () => crypto.randomBytes(9).toString('base64url')
const payload = await getPayload({ config })

const accounts = [
  { name: 'Максим', email: 'maxim@demo.test', role: 'admin' as const, password: pw() },
  { name: 'Менеджер', email: 'manager@demo.test', role: 'editor' as const, password: pw() },
]
for (const a of accounts) await payload.create({ collection: 'users', data: a, overrideAccess: true })
fs.writeFileSync(
  'ДЕМО-ДОСТУПЫ.txt',
  'Демо-админка: http://localhost:3100/admin\n\n' +
    accounts.map((a) => `${a.name} (${a.role === 'admin' ? 'администратор' : 'редактор'})\n  логин:  ${a.email}\n  пароль: ${a.password}`).join('\n\n') +
    '\n\nЭто тестовые учётки только для этого демо на твоём Mac.\n',
)

const photo = await payload.create({
  collection: 'media',
  data: { alt: 'Вид на Геленджикскую бухту' },
  filePath: './sample.webp',
})

await payload.create({
  collection: 'objects',
  data: {
    title: 'Апартаменты «Бриз» с видом на бухту',
    tagline: 'Светлая студия на 7-м этаже, панорамные окна и 5 минут пешком до набережной.',
    area: 38,
    guests: 3,
    bedrooms: 1,
    amenities: ['sea-view', 'balcony', 'ac', 'wifi', 'kitchen'],
    cover: photo.id,
    gallery: [photo.id],
    district: 'tolstyi',
    mapPoint: 'p3',
    realtyCalendarId: 'demo-123',
    _status: 'published',
  },
})

await payload.updateGlobal({
  slug: 'home',
  data: {
    hero: {
      title: 'Апартаменты у моря под ключ',
      subtitle: 'Сдаём и обслуживаем квартиры в Геленджике: от заселения гостей до отчёта собственнику.',
      button: 'Выбрать апартаменты',
    },
    advantages: [
      { title: 'Чистота отельного уровня', text: 'Профессиональная уборка и свежее бельё перед каждым заездом.' },
      { title: 'Заселение 24/7', text: 'Бесконтактный заезд в любое время.' },
    ],
    _status: 'published',
  },
})
await payload.updateGlobal({
  slug: 'contacts',
  data: { phone: '+7 900 000-00-00', telegram: '@homegroup_demo', address: 'Геленджик, ул. Примерная, 1' },
})

console.log('seed ok')
process.exit(0)
