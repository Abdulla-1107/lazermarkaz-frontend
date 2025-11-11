import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const { t, i18n } = useTranslation();
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const currentLang = i18n.language as 'uz' | 'en' | 'ru';

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{t('cart.title')}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">{t('cart.empty')}</p>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link to="/catalog">{t('cart.continueShopping')}</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>{t('cart.title')} ({items.length})</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 py-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name[currentLang]}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-1 truncate">
                    {item.name[currentLang]}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.price.toLocaleString()} {t('common.currency')}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-auto"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-4 pt-4">
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>{t('cart.subtotal')}</span>
            <span>{subtotal.toLocaleString()} {t('common.currency')}</span>
          </div>

          <SheetFooter className="flex-col sm:flex-col gap-2">
            <Button asChild className="w-full" onClick={() => onOpenChange(false)}>
              <Link to="/cart">{t('cart.title')}</Link>
            </Button>
            <Button asChild variant="default" className="w-full" onClick={() => onOpenChange(false)}>
              <Link to="/checkout">{t('cart.checkout')}</Link>
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
