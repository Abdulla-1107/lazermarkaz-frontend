import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const currentLang = i18n.language as 'uz' | 'en' | 'ru';

  const shipping = 30000;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-4">{t('cart.empty')}</h2>
          <Button asChild>
            <Link to="/catalog">{t('cart.continueShopping')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">{t('cart.title')}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
              <img
                src={item.image}
                alt={item.name[currentLang]}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.name[currentLang]}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.price.toLocaleString()} {t('common.currency')}
                </p>
                {item.customization?.engraving && (
                  <p className="text-sm text-muted-foreground">
                    {t('product.engravingText')}: {item.customization.engraving}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">{t('cart.title')}</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                <span>{subtotal.toLocaleString()} {t('common.currency')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('cart.shipping')}</span>
                <span>{shipping.toLocaleString()} {t('common.currency')}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>{t('cart.total')}</span>
              <span>{total.toLocaleString()} {t('common.currency')}</span>
            </div>

            <div className="space-y-2">
              <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
                {t('cart.checkout')}
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/catalog">{t('cart.continueShopping')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
