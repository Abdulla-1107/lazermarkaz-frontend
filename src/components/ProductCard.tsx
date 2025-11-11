import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: Record<"uz" | "en" | "ru", string>;
  price: number;
  image: string;
  category: string;
  inStock?: boolean;
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  inStock = true,
}: ProductCardProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "uz" | "en" | "ru";
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      quantity: 1,
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name[currentLang]}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${id}`}>
          <Badge variant="secondary" className="mb-2">
            {category}
          </Badge>
          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {name[currentLang]}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {price.toLocaleString()} {t("common.currency")}
            </span>
            {!inStock && (
              <Badge variant="destructive">{t("product.outOfStock")}</Badge>
            )}
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t("product.addToCart")}
        </Button>
      </CardFooter>
    </Card>
  );
};
