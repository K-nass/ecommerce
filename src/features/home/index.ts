import type { HomePageProps } from "./types";

export { HomePage } from "./HomePage";
export type {
  BannerArrowsProps,
  BannerItem,
  BannerPaginationProps,
  BannerProps,
  CardGridProps,
  CardSlideItem,
  CardSliderProps,
  ContentItemProps,
  ContentSectionItem,
  ContentSectionProps,
  HomePageProps,
  HeroSwiperProps,
  ProductItem,
  ProductSliderProps,
} from "./types";

export const homePageMockData = {
  heroBanners: [
    {
      id: "eid-special-1",
      imageSrc: "/hero1.jpg",
      alt: "Eid special hero banner",
      priority: true,
    },
    {
      id: "eid-special-2",
      imageSrc: "/hero2.webp",
      alt: "Eid special hero banner",
      priority: true,
    },
    {
      id: "eid-special-3",
      imageSrc: "/hero3.webp",
      alt: "Eid special hero banner",
      priority: true,
    },
  ],
  dailyOffersTitle: "Daily Offers",
  dailyOffers: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=281&h=364&fit=crop",
      title: "Mega Flash Sale",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=281&h=364&fit=crop",
      title: "Daily Supermarket Deals",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=281&h=364&fit=crop",
      title: "Fashion & Apparel",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=281&h=364&fit=crop",
      title: "Electronics & Tech",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=281&h=364&fit=crop",
      title: "Beauty & Cosmetics Packs",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=281&h=364&fit=crop",
      title: "Weekly Leaflet Offers",
    },
  ],
  topCategoriesTitle: "Top Categories",
  topCategories: [
    {
      id: 3,
      title: "Mobiles & Tablets",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4f1.svg",
    },
    {
      id: 4,
      title: "Electronics & Appliances",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f50c.svg",
    },
    {
      id: 5,
      title: "Health & Beauty",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9f4.svg",
    },
    {
      id: 6,
      title: "Home & Kitchen",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3e0.svg",
    },
    {
      id: 7,
      title: "Sports & Fitness",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26bd.svg",
    },
    {
      id: 8,
      title: "Toys & Games",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ae.svg",
    },
    {
      id: 9,
      title: "Books & Stationery",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4da.svg",
    },
    {
      id: 10,
      title: "Baby Products",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f476.svg",
    },
    {
      id: 11,
      title: "Pet Supplies",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg",
    },
    {
      id: 12,
      title: "Automotive",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f697.svg",
    },
    {
      id: 13,
      title: "Gaming",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f579.svg",
    },
    {
      id: 14,
      title: "Jewelry & Accessories",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f48d.svg",
    },
    {
      id: 15,
      title: "Office Supplies",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bc.svg",
    },
    {
      id: 16,
      title: "Music & Instruments",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3b8.svg",
    },
    {
      id: 17,
      title: "Travel & Luggage",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9f3.svg",
    },
    {
      id: 18,
      title: "Furniture & Decor",
      image:
        "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa91.svg",
    },
  ],
  bestSellersTitle: "Best sellers",
  bestSellers: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop",
      title: "Nouri Crunchy Strips - 1Kg",
      price: 254.99,
      originalPrice: 349.99,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      title: "Premium Coffee Beans - 500g",
      price: 189.5,
      originalPrice: 249.99,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
      title: "Organic Olive Oil - 750ml",
      price: 299.75,
      originalPrice: 399.99,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
      title: "Dark Chocolate Bar - 200g",
      price: 79.99,
      originalPrice: 119.99,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop",
      title: "Almond Butter - 350g",
      price: 159.99,
      originalPrice: 199.99,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      title: "Raw Natural Honey - 500g",
      price: 135,
      originalPrice: 165,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
      title: "Whole Wheat Pasta - 400g",
      price: 45.5,
      originalPrice: 60,
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
      title: "Himalayan Pink Salt - 250g",
      price: 85.99,
      originalPrice: 110,
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop",
      title: "Matcha Green Tea Powder - 100g",
      price: 245,
      originalPrice: 320,
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      title: "Roasted Mixed Nuts - 300g",
      price: 215.5,
      originalPrice: 285.99,
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
      title: "Gluten-Free Rolled Oats - 1Kg",
      price: 95,
      originalPrice: 130,
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
      title: "Pure Organic Maple Syrup - 250ml",
      price: 340,
      originalPrice: 450,
    },
  ],
  featuredProductsTitle: "Featured products",
  moreProductsTitle: "More products",
  featuredPromotionsTitle: "Featured promotions",
  featuredPromotions: [
    {
      id: "fresh-deals",
      image:
        "https://cdnprod.mafretailproxy.com/assets/images/Bulk_buys_2x_a000fbb0a8.jpg",
      title: "Fresh deals",
    },
    {
      id: "summer-fruits",
      image:
        "https://cdnprod.mafretailproxy.com/assets/images/Coupon_02_4_735e49bf3d.png",
      title: "Summer fruits",
    },
    {
      id: "snack-time",
      image:
        "https://cdnprod.mafretailproxy.com/assets/images/Choose_Better_2x_e287527b18.jpg",
      title: "Snack time",
    },
    {
      id: "make-a-savings",
      image:
        "https://cdnprod.mafretailproxy.com/assets/images/CRF_Products_2x_53d3855a1b.jpg",
      title: "Make a savings",
    },
  ],
  trendingNowTitle: "Trending Now",
  trendingProducts: [
    {
      id: 13,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop",
      title: "Unsweetened Coconut Milk - 400ml",
      price: 68.99,
      originalPrice: 85,
    },
    {
      id: 14,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      title: "Organic Chia Seeds - 200g",
      price: 115,
      originalPrice: 155,
    },
    {
      id: 15,
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
      title: "Dried Cranberries - 150g",
      price: 145.25,
      originalPrice: 180,
    },
    {
      id: 16,
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
      title: "Pure Vanilla Extract - 50ml",
      price: 190,
      originalPrice: 240,
    },
    {
      id: 16,
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
      title: "Pure Vanilla Extract - 50ml",
      price: 190,
      originalPrice: 240,
    },{
      id: 16,
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
      title: "Pure Vanilla Extract - 50ml",
      price: 190,
      originalPrice: 240,
    },{
      id: 16,
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
      title: "Pure Vanilla Extract - 50ml",
      price: 190,
      originalPrice: 240,
    },{
      id: 16,
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
      title: "Pure Vanilla Extract - 50ml",
      price: 190,
      originalPrice: 240,
    },{
      id: 16,
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
      title: "Pure Vanilla Extract - 50ml",
      price: 190,
      originalPrice: 240,
    },
  ],
  exploreMoreDealsTitle: "Explore more deals",
  exploreMoreDeals: [
    {
      id: "explore-1",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=281&h=364&fit=crop",
      title: "Mega Flash Sale",
    },
    {
      id: "explore-2",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=281&h=364&fit=crop",
      title: "Daily Supermarket Deals",
    },
    {
      id: "explore-3",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=281&h=364&fit=crop",
      title: "Fashion & Apparel",
    },
    {
      id: "explore-4",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=281&h=364&fit=crop",
      title: "Electronics & Tech",
    },
    {
      id: "explore-5",
      image:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=281&h=364&fit=crop",
      title: "Beauty & Cosmetics Packs",
    },
    {
      id: "explore-6",
      image:
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=281&h=364&fit=crop",
      title: "Weekly Leaflet Offers",
    },
  ],
  electronicsZoneTitle: "Electronics Zone",
  leafletBanner: {
    id: "carrefour-leaflets",
    title: "Carrefour leaflets",
    imageSrc:
      "https://cdnprod.mafretailproxy.com/assets/images/Artboard_1_copy_11_cd5b8663fa.png",
    alt: "Carrefour leaflets banner",
    priority: false,
  },
  electronicsZone: [
    {
      id: "electronics-1",
      image:
        "https://cdnprod.mafretailproxy.com/assets/images/Bulk_buys_2x_a000fbb0a8.jpg",
      title: "Fresh deals",
    },
    {
      id: "electronics-2",
      image:
        "https://cdnprod.mafretailproxy.com/assets/images/Coupon_02_4_735e49bf3d.png",
      title: "Summer fruits",
    },
    {
      id: "electronics-3",
      image:
        "https://cdnprod.mafretailproxy.com/assets/images/Choose_Better_2x_e287527b18.jpg",
      title: "Snack time",
    },
    {
      id: "electronics-4",
      image:
        "https://cdnprod.mafretailproxy.com/assets/images/CRF_Products_2x_53d3855a1b.jpg",
      title: "Make a savings",
    },
  ],
} satisfies HomePageProps;
