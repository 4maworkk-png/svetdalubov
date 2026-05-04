import express from 'express'
import { readFileSync } from 'fs'

const app = express()
app.use(express.json())

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

const CHANNELS = { tg: 'Telegram', wa: 'WhatsApp', call: 'Звонок' }

app.post('/api/submit', async (req, res) => {
  const { name, phone, guests, channel, comment } = req.body

  if (!name || !phone) {
    return res.status(400).json({ error: 'name and phone are required' })
  }

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set')
    return res.status(500).json({ error: 'server misconfigured' })
  }

  const lines = [
    '📋 *Новая заявка — СветДаЛюбовь*',
    '',
    `👤 *Имя:* ${name}`,
    `📞 *Телефон:* ${phone}`,
    guests ? `👥 *Гостей:* ${guests}` : null,
    `📡 *Связь:* ${CHANNELS[channel] ?? channel}`,
    comment ? `💬 *Комментарий:* ${comment}` : null,
  ].filter(Boolean).join('\n')

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: lines, parse_mode: 'Markdown' }),
      }
    )
    const tgData = await tgRes.json()
    if (!tgData.ok) throw new Error(tgData.description)
    res.json({ ok: true })
  } catch (err) {
    console.error('Telegram error:', err.message)
    res.status(500).json({ error: 'failed to send' })
  }
})

// Serve built frontend in production
app.use(express.static('dist'))
app.get('*', (req, res) => {
  res.sendFile(new URL('./dist/index.html', import.meta.url).pathname)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
