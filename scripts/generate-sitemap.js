import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'https://svetdalubov.ru'
const NOW = new Date().toISOString().split('T')[0]

const pages = [
  { loc: '/',          priority: '1.0', changefreq: 'weekly'  },
  { loc: '/#services', priority: '0.8', changefreq: 'monthly' },
  { loc: '/#portfolio',priority: '0.8', changefreq: 'monthly' },
  { loc: '/#pricing',  priority: '0.8', changefreq: 'monthly' },
  { loc: '/#reviews',  priority: '0.7', changefreq: 'monthly' },
  { loc: '/#contact',  priority: '0.6', changefreq: 'monthly' },
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${BASE_URL}${p.loc}</loc>
    <lastmod>${NOW}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`

const outPath = join(__dirname, '..', 'public', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`✓ sitemap.xml generated → ${outPath}`)
