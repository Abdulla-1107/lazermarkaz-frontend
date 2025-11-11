import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductGallery } from "@/components/ProductGallery";
import { OrderModal } from "@/components/OrderModal";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useProduct } from "@/hooks/api/useProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const currentLang = i18n.language as "uz" | "en" | "ru";

  const { getOneProduct } = useProduct();
  const { data: product } = getOneProduct(id);

  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState("");
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("catalog.noResults")}</h1>
        <Button onClick={() => navigate("/catalog")}>
          {t("catalog.title")}
        </Button>
      </div>
    );
  }

  const name = product[`name_${currentLang}`];
  const description = product[`description_${currentLang}`];
  const category = product.Category?.[`name_${currentLang}`];
  const price = Number(product.price) || 0;
  const imageList = [product.image];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name,
      price,
      quantity,
      image: product.image,
      customization: { engraving },
    });
    toast.success(t("common.success"));
  };

  const handleOrderNow = () => setOrderModalOpen(true);

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button onClick={() => navigate("/")}>{t("nav.home")}</button>
        <span>/</span>
        <button onClick={() => navigate("/catalog")}>{t("nav.catalog")}</button>
        <span>/</span>
        <span className="text-foreground">{name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        <ProductGallery images={imageList} alt={name} />

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3">
              {category}
            </Badge>
            <h1 className="text-4xl font-bold mb-2">{name}</h1>
            <p className="text-muted-foreground mb-4">{description}</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {t("product.price")}
            </p>
            <p className="text-4xl font-bold text-primary">
              {price.toLocaleString()} {t("common.currency")}
            </p>
          </div>

          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-semibold">{t("product.customization")}</h3>
            <Textarea
              placeholder={t("product.engravingPlaceholder")}
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t("product.addToCart")}
              </Button>
              <Button className="flex-1" size="lg" onClick={handleOrderNow}>
                {t("product.orderNow")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
          <div className="container flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-primary font-bold">
                  {price.toLocaleString()} {t("common.currency")}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("product.addToCart")}
              </Button>
              <Button onClick={handleOrderNow}>{t("product.orderNow")}</Button>
            </div>
          </div>
        </div>
      )}

      <OrderModal
        open={orderModalOpen}
        onOpenChange={setOrderModalOpen}
        productId={product.id}
        productName={name}
        productPrice={price}
        productImage={product.image}
        quantity={quantity}
        customization={{ engraving }}
      />
    </div>
  );
};

export default ProductDetail;
