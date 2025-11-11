import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProduct } from "@/hooks/api/useProduct";

const Catalog = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { getProduct } = useProduct();
  const { data, isLoading } = getProduct({}); // isLoading ham qo‘shamiz
  const items = data?.items || [];

  console.log(items);

  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "all"
  );
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);

  const [sortBy, setSortBy] = useState("newest");

  // 🔹 Filter va sort backenddan kelgan items bo‘yicha
  const filteredProducts = useMemo(() => {
    return items
      .filter(
        (p) => selectedCategory === "all" || p.category === selectedCategory
      )
      .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
      .sort((a, b) => {
        if (sortBy === "priceLow") return a.price - b.price;
        if (sortBy === "priceHigh") return b.price - a.price;
        return 0;
      });
  }, [items, selectedCategory, priceRange, sortBy]);

  if (isLoading) {
    return (
      <div className="container py-20 text-center text-lg text-muted-foreground">
        {t("common.loading")}...
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">{t("catalog.title")}</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <h2 className="text-xl font-semibold mb-4">
              {t("catalog.filters")}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t("catalog.category")}
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("catalog.allCategories")}
                    </SelectItem>
                    <SelectItem value="boxes">{t("catalog.boxes")}</SelectItem>
                    <SelectItem value="signs">{t("catalog.signs")}</SelectItem>
                    <SelectItem value="corporate">
                      {t("catalog.corporate")}
                    </SelectItem>
                    <SelectItem value="gifts">{t("catalog.gifts")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t("catalog.priceRange")}
                </label>
                <Slider
                  min={0}
                  max={500000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0].toLocaleString()}</span>
                  <span>{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 500000]);
                  setSortBy("newest");
                }}
              >
                {t("common.clear")}
              </Button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {filteredProducts.length} {t("catalog.title")}
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t("catalog.sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  {t("catalog.sortNewest")}
                </SelectItem>
                <SelectItem value="priceLow">
                  {t("catalog.sortPriceLow")}
                </SelectItem>
                <SelectItem value="priceHigh">
                  {t("catalog.sortPriceHigh")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("catalog.noResults")}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={{
                    uz: product.name_uz || product.name || "",
                    ru: product.name_ru || product.name || "",
                    en: product.name_en || product.name || "",
                  }}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  inStock={product.inStock}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
