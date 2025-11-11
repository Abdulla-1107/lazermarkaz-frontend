export interface Product {
  id: string;
  sku: string;
  name: {
    uz: string;
    en: string;
    ru: string;
  };
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  fullDescription: {
    uz: string;
    en: string;
    ru: string;
  };
  price: number;
  variants?: {
    name: string;
    price: number;
  }[];
  category: string;
  material: {
    uz: string;
    en: string;
    ru: string;
  };
  dimensions: string;
  weight?: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  productionTime: {
    uz: string;
    en: string;
    ru: string;
  };
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    sku: 'BOX-GEO-001',
    name: {
      uz: "Geometrik naqshli quti",
      en: "Geometric Pattern Box",
      ru: "Коробка с геометрическим узором"
    },
    description: {
      uz: "Lazerli kesish texnologiyasi yordamida tayyorlangan noyob geometrik naqshli quti.",
      en: "Unique geometric pattern box made with laser cutting technology.",
      ru: "Уникальная коробка с геометрическим узором, изготовленная лазерной резкой."
    },
    fullDescription: {
      uz: "Bu noyob quti yuqori sifatli fanera materialidan lazerli kesish texnologiyasi yordamida tayyorlangan. Har bir detal aniqlik bilan kesilgan va qo'lda yig'ilgan. Sovg'alar, zargarlik buyumlari va boshqa qimmatbaho narsalarni saqlash uchun mukammal. Ekologik toza material va noyob dizayn sizning uyingiz uchun ajoyib bezak bo'ladi.",
      en: "This unique box is crafted from high-quality plywood using precision laser cutting technology. Each detail is carefully cut and hand-assembled. Perfect for storing gifts, jewelry, and other valuables. Eco-friendly materials and unique design make it a wonderful decoration for your home.",
      ru: "Эта уникальная коробка изготовлена из высококачественной фанеры с использованием лазерной резки. Каждая деталь тщательно вырезана и собрана вручную. Идеально подходит для хранения подарков, украшений и других ценностей. Экологичные материалы и уникальный дизайн делают её прекрасным украшением для вашего дома."
    },
    price: 150000,
    variants: [
      { name: "10x10x5 cm", price: 150000 },
      { name: "15x15x8 cm", price: 220000 },
      { name: "20x20x10 cm", price: 300000 },
    ],
    category: 'boxes',
    material: {
      uz: "Yuqori sifatli fanera (6mm)",
      en: "High-quality plywood (6mm)",
      ru: "Высококачественная фанера (6mm)"
    },
    dimensions: "10x10x5 cm",
    weight: "150g",
    images: ['/src/assets/product-box.jpg', '/src/assets/product-box.jpg'],
    inStock: true,
    stockQuantity: 15,
    productionTime: {
      uz: "3-5 ish kuni",
      en: "3-5 business days",
      ru: "3-5 рабочих дней"
    },
    rating: 4.8,
    reviewCount: 24,
    featured: true
  },
  {
    id: '2',
    sku: 'SIGN-WALL-001',
    name: {
      uz: "Shaxsiy yozuv taxta",
      en: "Custom Wall Sign",
      ru: "Индивидуальная настенная вывеска"
    },
    description: {
      uz: "Istalgan matn va dizayn bilan buyurtma qilinadigan devor yozuvi.",
      en: "Customizable wall sign with any text and design.",
      ru: "Индивидуальная настенная вывеска с любым текстом и дизайном."
    },
    fullDescription: {
      uz: "Uy yoki ofis uchun ideal devor yozuvi. Siz tanlagan matn va shriftda tayyorlanadi. Tabiiy yog'ochdan yasalgan va lazerli gravyura bilan bezatilgan. Oson o'rnatish uchun orqa tomonida maxsus o'rnatgich mavjud. Har qanday interyerga mos keladi va noyob atmosfera yaratadi.",
      en: "Ideal wall sign for home or office. Made with your chosen text and font. Crafted from natural wood with laser engraving. Includes mounting hardware on the back for easy installation. Suits any interior and creates a unique atmosphere.",
      ru: "Идеальная настенная вывеска для дома или офиса. Изготавливается с выбранным вами текстом и шрифтом. Сделана из натурального дерева с лазерной гравировкой. Включает крепления для легкой установки. Подходит к любому интерьеру и создает уникальную атмосферу."
    },
    price: 200000,
    variants: [
      { name: "Small (30x20 cm)", price: 200000 },
      { name: "Medium (50x30 cm)", price: 350000 },
      { name: "Large (70x40 cm)", price: 500000 },
    ],
    category: 'signs',
    material: {
      uz: "Tabiiy qayrag'och yog'och (10mm)",
      en: "Natural birch wood (10mm)",
      ru: "Натуральная береза (10mm)"
    },
    dimensions: "30x20x1 cm",
    weight: "200g",
    images: ['/src/assets/product-sign.jpg', '/src/assets/product-sign.jpg'],
    inStock: true,
    stockQuantity: 8,
    productionTime: {
      uz: "5-7 ish kuni",
      en: "5-7 business days",
      ru: "5-7 рабочих дней"
    },
    rating: 4.9,
    reviewCount: 18,
    featured: true
  },
  {
    id: '3',
    sku: 'CORP-SET-001',
    name: {
      uz: "Korporativ sovg'a to'plami",
      en: "Corporate Gift Set",
      ru: "Корпоративный подарочный набор"
    },
    description: {
      uz: "Kompaniya logotipi va brendingi bilan maxsus tayyorlangan korporativ sovg'alar.",
      en: "Custom corporate gift set with company logo and branding.",
      ru: "Корпоративный подарочный набор с логотипом и брендингом компании."
    },
    fullDescription: {
      uz: "Premium korporativ sovg'alar to'plami sizning kompaniyangiz brendingi bilan. To'plamga notebook tutgich, qalam ushlagich, va vizitka qutisi kiradi. Barcha mahsulotlar yuqori sifatli yog'ochdan yasalgan va lazerli gravyura bilan bezatilgan. Xodimlar, mijozlar va hamkorlar uchun ajoyib sovg'a. Kompaniyangiz imijini ko'taradi.",
      en: "Premium corporate gift set with your company branding. Set includes notebook holder, pen holder, and business card case. All items are crafted from high-quality wood with laser engraving. Excellent gift for employees, clients, and partners. Elevates your company image.",
      ru: "Премиум корпоративный подарочный набор с брендингом вашей компании. В набор входят держатель для блокнота, подставка для ручек и визитница. Все изделия выполнены из высококачественного дерева с лазерной гравировкой. Отличный подарок для сотрудников, клиентов и партнеров. Повышает имидж компании."
    },
    price: 350000,
    category: 'corporate',
    material: {
      uz: "Premium eman yog'och",
      en: "Premium oak wood",
      ru: "Премиум дубовая древесина"
    },
    dimensions: "25x15x8 cm",
    weight: "500g",
    images: ['/src/assets/product-corporate.jpg', '/src/assets/product-corporate.jpg'],
    inStock: true,
    stockQuantity: 12,
    productionTime: {
      uz: "7-10 ish kuni",
      en: "7-10 business days",
      ru: "7-10 рабочих дней"
    },
    rating: 5.0,
    reviewCount: 31,
    featured: true
  },
  {
    id: '4',
    sku: 'BOX-SML-002',
    name: {
      uz: "Quticha (10x10x5 cm)",
      en: "Small Box (10x10x5 cm)",
      ru: "Маленькая коробка (10x10x5 cm)"
    },
    description: {
      uz: "Ixcham va chiroyli quti kichik sovg'alar uchun.",
      en: "Compact and elegant box for small gifts.",
      ru: "Компактная и элегантная коробка для небольших подарков."
    },
    fullDescription: {
      uz: "Klassik dizayndagi kichik yog'och quti. Zargarlik buyumlari, mayda sovg'alar yoki shaxsiy narsalarni saqlash uchun ideal. Silliq yuzasi va aniq o'lchamlari bilan ajralib turadi. Gravyura qo'shish mumkin.",
      en: "Classic design small wooden box. Ideal for jewelry, small gifts, or personal items. Features smooth finish and precise dimensions. Engraving available.",
      ru: "Классическая маленькая деревянная коробка. Идеальна для украшений, небольших подарков или личных вещей. Отличается гладкой отделкой и точными размерами. Доступна гравировка."
    },
    price: 120000,
    category: 'boxes',
    material: {
      uz: "Fanera",
      en: "Plywood",
      ru: "Фанера"
    },
    dimensions: "10x10x5 cm",
    weight: "120g",
    images: ['/src/assets/product-box.jpg'],
    inStock: true,
    stockQuantity: 25,
    productionTime: {
      uz: "2-3 ish kuni",
      en: "2-3 business days",
      ru: "2-3 рабочих дня"
    },
    rating: 4.7,
    reviewCount: 42,
    featured: false
  },
  {
    id: '5',
    sku: 'GIFT-FRAME-001',
    name: {
      uz: "Foto ramka",
      en: "Photo Frame",
      ru: "Фоторамка"
    },
    description: {
      uz: "Yog'ochdan yasalgan foto ramka gravyura bilan.",
      en: "Wooden photo frame with engraving.",
      ru: "Деревянная фоторамка с гравировкой."
    },
    fullDescription: {
      uz: "Chiroyli yog'och foto ramka sizning sevikli suratlaringiz uchun. Shaxsiy xabar yoki ism bilan gravyura qo'shish mumkin. Stol yoki devorga o'rnatish uchun mo'ljallangan. Ajoyib sovg'a.",
      en: "Beautiful wooden photo frame for your favorite pictures. Can add engraving with personal message or name. Designed for table or wall mounting. Makes a wonderful gift.",
      ru: "Красивая деревянная фоторамка для ваших любимых фотографий. Можно добавить гравировку с личным сообщением или именем. Предназначена для установки на стол или стену. Отличный подарок."
    },
    price: 180000,
    category: 'gifts',
    material: {
      uz: "Qayrag'och yog'och",
      en: "Birch wood",
      ru: "Березовая древесина"
    },
    dimensions: "20x15x2 cm",
    weight: "250g",
    images: ['/src/assets/product-box.jpg'],
    inStock: true,
    stockQuantity: 18,
    productionTime: {
      uz: "3-4 ish kuni",
      en: "3-4 business days",
      ru: "3-4 рабочих дня"
    },
    rating: 4.6,
    reviewCount: 15,
    featured: false
  },
];
