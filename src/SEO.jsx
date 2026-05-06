import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'СветДаЛюбовь'
const DEFAULT_IMAGE = 'https://svetdalubov.ru/assets/gallery/g06.jpg'

export default function SEO({
  title,
  description,
  keywords = '',
  url = 'https://svetdalubov.ru',
  image = DEFAULT_IMAGE,
  schema = null,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Аренда звука, света и сцены на свадьбу в СПб`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
