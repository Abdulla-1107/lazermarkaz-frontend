import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary" />
              <span className="font-bold">Hunarmand</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.about')}
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('nav.catalog')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog?category=boxes" className="text-muted-foreground hover:text-primary">{t('catalog.boxes')}</Link></li>
              <li><Link to="/catalog?category=signs" className="text-muted-foreground hover:text-primary">{t('catalog.signs')}</Link></li>
              <li><Link to="/catalog?category=corporate" className="text-muted-foreground hover:text-primary">{t('catalog.corporate')}</Link></li>
              <li><Link to="/catalog?category=gifts" className="text-muted-foreground hover:text-primary">{t('catalog.gifts')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+998 90 123 45 67</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@hunarmand.uz</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Tashkent, Uzbekistan</span>
              </li>
              <li className="mt-4">{t('footer.hours')}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.newsletterPlaceholder')}
            </p>
            <div className="flex gap-2">
              <Input placeholder={t('footer.newsletterPlaceholder')} />
              <Button variant="default">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Hunarmand. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};
