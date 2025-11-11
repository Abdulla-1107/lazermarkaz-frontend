import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/contexts/CartContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId?: string;
  productName?: Record<string, string>;
  productPrice?: number;
  productImage?: string;
  customization?: {
    engraving?: string;
    variant?: string;
  };
  quantity?: number;
  useCartItems?: boolean;
}

export const OrderModal = ({
  open,
  onOpenChange,
  productId,
  productName,
  productPrice,
  productImage,
  customization,
  quantity = 1,
  useCartItems = false,
}: OrderModalProps) => {
  const { t, i18n } = useTranslation();
  const { items: cartItems, subtotal: cartSubtotal } = useCart();
  const currentLang = i18n.language as 'uz' | 'en' | 'ru';

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    note: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate pricing
  const itemSubtotal = useCartItems 
    ? cartSubtotal 
    : (productPrice || 0) * quantity;
  const shipping = 30000;
  const discount = 0;
  const total = itemSubtotal + shipping - discount;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('common.error');
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      newErrors.phone = t('common.error');
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = t('common.error');
    }
    if (!formData.address.trim()) {
      newErrors.address = t('common.error');
    }
    if (!formData.city.trim()) {
      newErrors.city = t('common.error');
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t('common.error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(t('common.error'));
      return;
    }

    setStep('processing');

    // Simulate API call
    setTimeout(() => {
      const newOrderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderId(newOrderId);
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      region: '',
      postalCode: '',
      deliveryMethod: 'courier',
      paymentMethod: 'card',
      note: '',
      acceptTerms: false,
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle>{t('checkout.title')}</DialogTitle>
              <DialogDescription>
                {t('checkout.contact')}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Product Summary */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold">{t('cart.title')}</h3>
                
                {useCartItems ? (
                  <div className="space-y-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-3 text-sm">
                        <img src={item.image} alt="" className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-medium">{item.name[currentLang]}</p>
                          <p className="text-muted-foreground">
                            {item.quantity} × {item.price.toLocaleString()} {t('common.currency')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : productName && (
                  <div className="flex gap-3">
                    {productImage && (
                      <img src={productImage} alt="" className="w-16 h-16 object-cover rounded" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{productName[currentLang]}</p>
                      {customization?.variant && (
                        <p className="text-sm text-muted-foreground">{customization.variant}</p>
                      )}
                      {customization?.engraving && (
                        <p className="text-sm text-muted-foreground">
                          {t('product.engravingText')}: {customization.engraving}
                        </p>
                      )}
                      <p className="text-sm mt-1">
                        {quantity} × {productPrice?.toLocaleString()} {t('common.currency')}
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                    <span>{itemSubtotal.toLocaleString()} {t('common.currency')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('cart.shipping')}</span>
                    <span>{shipping.toLocaleString()} {t('common.currency')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>{t('cart.discount')}</span>
                      <span>-{discount.toLocaleString()} {t('common.currency')}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-base">
                    <span>{t('cart.total')}</span>
                    <span>{total.toLocaleString()} {t('common.currency')}</span>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">{t('checkout.fullName')} *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={errors.fullName ? 'border-destructive' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t('checkout.phone')} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">{t('checkout.email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                </div>

                <div>
                  <Label htmlFor="address">{t('checkout.address')} *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={errors.address ? 'border-destructive' : ''}
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">{t('checkout.city')} *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={errors.city ? 'border-destructive' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="region">{t('checkout.region')}</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">{t('checkout.zip')}</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>{t('checkout.deliveryMethod')}</Label>
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) => setFormData({ ...formData, deliveryMethod: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="courier" id="courier" />
                      <Label htmlFor="courier">{t('checkout.courier')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup">{t('checkout.pickup')}</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>{t('checkout.payment')}</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">{t('checkout.card')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">{t('checkout.cash')}</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="note">{t('checkout.note')}</Label>
                  <Textarea
                    id="note"
                    rows={3}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, acceptTerms: checked as boolean })
                    }
                    className={errors.acceptTerms ? 'border-destructive' : ''}
                  />
                  <Label htmlFor="terms" className="text-sm leading-tight">
                    {t('checkout.acceptTerms')}
                  </Label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                    {t('common.cancel')}
                  </Button>
                  <Button type="submit" className="flex-1">
                    {t('checkout.placeOrder')}
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">{t('checkout.processing')}</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{t('orderConfirmation.title')}</h2>
              <p className="text-muted-foreground">{t('orderConfirmation.message')}</p>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg mb-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">{t('orderConfirmation.orderNumber')}</p>
              <p className="text-3xl font-mono font-bold">#{orderId}</p>
              <p className="text-sm text-muted-foreground mt-4">
                {t('orderConfirmation.estimatedDelivery')}: 5-7 {t('common.days')}
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full" onClick={handleClose}>
                {t('cart.continueShopping')}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => window.print()}>
                {t('orderConfirmation.downloadInvoice')}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
