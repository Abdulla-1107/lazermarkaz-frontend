import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('about.title')}</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.story')}
            </p>
          </section>

          <section className="bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{t('about.mission')}</h2>
            <p className="text-muted-foreground">
              {t('about.mission')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">{t('about.values.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-background border">
                <h3 className="text-xl font-semibold mb-3">{t('about.values.quality')}</h3>
                <p className="text-muted-foreground">{t('about.values.qualityDesc')}</p>
              </div>
              <div className="p-6 rounded-lg bg-background border">
                <h3 className="text-xl font-semibold mb-3">{t('about.values.eco')}</h3>
                <p className="text-muted-foreground">{t('about.values.ecoDesc')}</p>
              </div>
              <div className="p-6 rounded-lg bg-background border">
                <h3 className="text-xl font-semibold mb-3">{t('about.values.individual')}</h3>
                <p className="text-muted-foreground">{t('about.values.individualDesc')}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
