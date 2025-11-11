import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Settings, TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import heroImage from "/images/hero-workshop.jpg";
import { useProduct } from "@/hooks/api/useProduct";

const Index = () => {
  const { t } = useTranslation();
  const { getProduct } = useProduct();
  const { data } = getProduct({ limit: 3 });
  const items = data?.items;

  const featuredProducts = items || [];

  console.log(items);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/40" />
        </div>

        <div className="container relative z-10 text-center md:text-left">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link to="/catalog">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("howItWorks.step1.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("howItWorks.step1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("howItWorks.step2.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("howItWorks.step2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("howItWorks.step3.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("featured.title")}</h2>
            <p className="text-muted-foreground">{t("featured.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={{
                  uz: product.name_uz,
                  en: product.name_en,
                  ru: product.name_ru,
                }}
                price={product.price}
                image={product.image}
                category={product.Category?.name_uz}
                inStock={true} // yoki product.inStock bo‘lsa backendda
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link to="/catalog">{t("catalog.title")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("benefits.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-background">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("benefits.eco.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("benefits.eco.description")}
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("benefits.precision.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("benefits.precision.description")}
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("benefits.custom.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("benefits.custom.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
