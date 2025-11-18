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
import i18next from "i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useProduct } from "@/hooks/api/useProduct";
import { useCategory } from "@/hooks/api/useCategory";

type SortOptions = "newest" | "priceLow" | "priceHigh";

interface ProductQueryParams {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={18} />
      </Button>

      <span className="px-2">
        {page} / {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};

const Catalog = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const { getCategory } = useCategory();
  const { data: categoryData } = getCategory({});
  const categories = categoryData || [];

  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "all"
  );

  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
  const [sortBy, setSortBy] = useState<SortOptions>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 9;

  // 🔹 Backend query params
  const productQueryParams: ProductQueryParams = {
    categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    page: currentPage,
    limit,
  };

  const { getProduct } = useProduct();
  const { data: productsData, isLoading } = getProduct(productQueryParams);
  const items = productsData?.items || [];
  const totalPages = productsData ? productsData.pages : 1;

  // Frontend sort faqat priceLow / priceHigh
  const filteredProducts = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });
  }, [items, sortBy]);

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
              {/* CATEGORY */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t("catalog.category")}
                </label>

                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setCurrentPage(1); // category o‘zgarsa sahifa reset
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      {t("catalog.allCategories")}
                    </SelectItem>

                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat[`name_${i18next.language}`] || cat.name_uz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PRICE */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t("catalog.priceRange")}
                </label>

                <Slider
                  min={0}
                  max={500000}
                  step={10000}
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value);
                    setCurrentPage(1); // price o‘zgarsa sahifa reset
                  }}
                  className="my-4"
                />

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0].toLocaleString()}</span>
                  <span>{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* CLEAR */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 500000]);
                  setSortBy("newest");
                  setCurrentPage(1);
                }}
              >
                {t("common.clear")}
              </Button>
            </div>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {filteredProducts.length} {t("catalog.title")}
            </p>

            {/* SORT */}
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOptions)}
            >
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

          {/* GRID */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("catalog.noResults")}</p>
            </div>
          ) : (
            <>
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
                    category={product.categoryId}
                    inStock={product.inStock}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
