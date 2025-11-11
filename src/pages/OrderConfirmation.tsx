import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const { t } = useTranslation();
  const { orderId } = useParams();

  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="h-24 w-24 text-success mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">{t('orderConfirmation.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('orderConfirmation.message')}</p>
        
        <div className="bg-muted/30 p-6 rounded-lg mb-8">
          <p className="text-sm text-muted-foreground mb-2">{t('orderConfirmation.orderNumber')}</p>
        </div>

        <Button size="lg" asChild>
          <Link to="/">{t('orderConfirmation.backToHome')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
