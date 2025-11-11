import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCreateOrder } from "@/hooks/api/useOrder";

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { subtotal, items, clearCart } = useCart();
  const createOrder = useCreateOrder();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    oferta: false,
    delivery: false, // yetkazib berish sharti
  });

  // Shipping shartli
  const shipping = formData.delivery ? 30000 : 0;
  const total = Math.floor(subtotal + shipping);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      oferta: formData.oferta,
      totalPrice: total,
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    createOrder.mutate(payload, {
      onSuccess: (res) => {
        clearCart();
        navigate(`/order-confirmation/${res.orderId}`);
      },
    });
  };

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">{t("checkout.title")}</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <section className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t("checkout.contact")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">{t("checkout.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t("checkout.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t("checkout.shipping")}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">{t("checkout.fullName")}</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">{t("checkout.address")}</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
                {/* Yetkazib berish sharti */}
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="delivery"
                    className="w-4 h-4"
                    checked={formData.delivery}
                    onChange={(e) =>
                      setFormData({ ...formData, delivery: e.target.checked })
                    }
                  />
                  <Label htmlFor="delivery">
                    Yetkazib berishni tanlayman (+30,000)
                  </Label>
                </div>
              </div>
            </section>

            {/* Oferta */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="oferta"
                className="w-4 h-4"
                checked={formData.oferta}
                onChange={(e) =>
                  setFormData({ ...formData, oferta: e.target.checked })
                }
                required
              />
              <Label htmlFor="oferta">Ommaviy ofertani qabul qilaman</Label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">{t("cart.title")}</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>{t("cart.subtotal")}</span>
                <span>
                  {subtotal.toLocaleString()} {t("common.currency")}
                </span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>{t("cart.total")}</span>
              <span>
                {total.toLocaleString()} {t("common.currency")}
              </span>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={createOrder.isPending}
            >
              {createOrder.isPending
                ? t("checkout.processing")
                : t("checkout.placeOrder")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
