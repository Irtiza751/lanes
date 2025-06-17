import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation()

  const techItems = t('about.tech', { returnObjects: true }) as { [key: string]: string }

  return (
    <div>
      <Helmet>
        <title>Sparkit Boilerplate</title>
      </Helmet>
      <section className="min-h-screen container mx-auto pt-5">
        <h1 className="text-5xl font-bold">{t('about.title')}</h1>
        <p className="mb-4 text-lg mb-6 mt-4">{t('about.desc')}</p>
        <ul className="list-disc pl-5 space-y-2 text-base">
          {Object.entries(techItems).map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong>: {value}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base">{t('about.inspired')}</p>
      </section>
    </div>
  )
}

export default About
