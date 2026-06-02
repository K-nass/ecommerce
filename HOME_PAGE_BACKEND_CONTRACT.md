# Home Page Backend Contract

This document describes the data contract needed to render the Home page feature in `src/features/home`.

Goal:
- Make the backend payload explicit.
- Separate data the backend should provide from styling-only props handled by the frontend.
- Keep the contract stable so the UI can be wired to API responses with minimal changes.

## General Rules

- Arrays are rendered in the same order they are returned.
- Every item should have a stable `id`.
- Image fields should point to publicly reachable image URLs.
- `alt` text should be meaningful and human-readable.
- Titles are content, not layout. They should come from the backend when the UI needs section labels.
- Styling props such as `className`, `gridClassName`, `cardClassName`, `imageClassName`, and `slideSizes` are frontend-only and should not be sent by the backend.

## Top-Level Home Payload

The Home page expects a single object with the following fields:

- `heroBanners`
- `dailyOffersTitle`
- `dailyOffers`
- `topCategoriesTitle`
- `topCategories`
- `bestSellersTitle`
- `bestSellers`
- `featuredProductsTitle`
- `moreProductsTitle`
- `featuredPromotionsTitle`
- `featuredPromotions`
- `trendingNowTitle`
- `trendingProducts`
- `exploreMoreDealsTitle`
- `exploreMoreDeals`
- `leafletBanner`
- `electronicsZoneTitle`
- `electronicsZone`

## Data Shape Overview

```ts
type HomePagePayload = {
  heroBanners: BannerItem[];
  dailyOffersTitle: string;
  dailyOffers: CardSlideItem[];
  topCategoriesTitle: string;
  topCategories: ContentSectionItem[];
  bestSellersTitle: string;
  bestSellers: ProductItem[];
  featuredProductsTitle: string;
  moreProductsTitle: string;
  featuredPromotionsTitle: string;
  featuredPromotions: CardSlideItem[];
  trendingNowTitle: string;
  trendingProducts: ProductItem[];
  exploreMoreDealsTitle: string;
  exploreMoreDeals: CardSlideItem[];
  leafletBanner: BannerItem;
  electronicsZoneTitle: string;
  electronicsZone: CardSlideItem[];
};
```

## Component Contract Map

| Component | Backend data needed | Notes |
| --- | --- | --- |
| `HomePage` | Entire payload | Composes all sections. |
| `HeroSwiper` | `heroBanners[]` | Banner carousel at the top of the page. |
| `CardSlider` | `title`, `items[]` | Horizontal slider for promotional cards. |
| `CardGrid` | `title`, `items[]` | Grid layout for card promotions. |
| `ContentSection` | `title`, `items[]` | Category-style icon/image grid. |
| `ProductSlider` | `title`, `items[]` | Product carousel with price and discount info. |
| `Banner` | `leafletBanner` | Large full-width promotional banner. |
| `BannerArrows` | None | UI-only navigation controls. |
| `BannerPagination` | None | UI-only navigation controls. |

## Component Hierarchy

This is the parent-child relationship for the Home feature UI. It helps the backend understand which payload belongs to which visible block on the page.

```text
HomePage
├── HeroSwiper
│   ├── Banner
│   ├── BannerArrows
│   └── BannerPagination
├── CardSlider
│   └── Slide
├── CardGrid
│   └── Slide
├── ContentSection
│   └── ContentItem
├── ProductSlider
│   └── ProductCard
└── Banner
```

### Parent Ownership Notes

- `HomePage`
  - Parent container for the entire homepage.
  - Receives the full backend payload and passes section data to child components.
- `HeroSwiper`
  - Owns the hero banner carousel.
  - Uses `heroBanners`.
- `CardSlider`
  - Owns horizontally scrolling card sections.
  - Used for `dailyOffers` and `exploreMoreDeals`.
- `CardGrid`
  - Owns grid-style promotional card sections.
  - Used for `featuredPromotions` and `electronicsZone`.
- `ContentSection`
  - Owns the category grid.
  - Uses `topCategories`.
- `ProductSlider`
  - Owns the product carousel.
  - Used for `bestSellers`, `featuredProducts`, `trendingProducts`, and any future product feeds.
- `Banner`
  - Owns the large standalone promotional banner.
  - Uses `leafletBanner`.
- `Slide`
  - Leaf visual card used by both `CardSlider` and `CardGrid`.
  - Backend data comes from `CardSlideItem`.
- `ContentItem`
  - Leaf visual item used inside `ContentSection`.
  - Backend data comes from `ContentSectionItem`.
- `ProductCard`
  - Leaf visual item used inside `ProductSlider`.
  - Backend data comes from `ProductItem`.
- `BannerArrows`
  - Internal control used by `HeroSwiper`, `CardSlider`, and `ProductSlider`.
  - No backend data required.
- `BannerPagination`
  - Internal control used by `HeroSwiper`.
  - No backend data required.

## Shared Item Types

### 1) `BannerItem`

Used by:
- `heroBanners`
- `leafletBanner`

```ts
type BannerItem = {
  id: string;
  imageSrc: string;
  alt: string;
  title?: string;
  href?: string;
  priority?: boolean;
};
```

Field details:

- `id`
  - Stable unique identifier.
  - Required for rendering and tracking.
- `imageSrc`
  - Image URL for the banner.
  - Required.
- `alt`
  - Accessibility text for the image.
  - Required.
- `title`
  - Optional visible title for the banner section.
  - Used by the large banner component.
- `href`
  - Optional link target if the banner should be clickable.
- `priority`
  - Optional hint for eager loading.
  - Recommended for the first hero banner and important banners above the fold.

Backend guidance:
- If a banner is clickable, return `href`.
- If the banner is above the fold, set `priority: true` on the most important banner(s).
- If the banner has a visible heading, include `title`.

### 2) `CardSlideItem`

Used by:
- `dailyOffers`
- `featuredPromotions`
- `exploreMoreDeals`
- `electronicsZone`

```ts
type CardSlideItem = {
  id: string | number;
  image: string;
  title: string;
  borderColor?: string;
};
```

Field details:

- `id`
  - Stable unique identifier.
  - Can be a string or number.
- `image`
  - Image URL for the card visual.
- `title`
  - Card title shown under or over the image depending on the component.
- `borderColor`
  - Optional border token for future accent styling.
  - Safe to omit.

Backend guidance:
- Return a clear title for each card.
- Prefer a consistent image ratio across the same section.
- Omit `borderColor` unless the UI explicitly needs branded borders.

### 3) `ContentSectionItem`

Used by:
- `topCategories`

```ts
type ContentSectionItem = {
  id: number;
  image: string;
  title: string;
};
```

Field details:

- `id`
  - Stable numeric identifier.
- `image`
  - Image or icon URL.
- `title`
  - Category name.

Backend guidance:
- This section is visually compact, so titles should be short and readable.
- Use icon-like or category-friendly images.

### 4) `ProductItem`

Used by:
- `bestSellers`
- `trendingProducts`

```ts
type ProductItem = {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice: number;
};
```

Field details:

- `id`
  - Stable numeric identifier.
- `image`
  - Product image URL.
- `title`
  - Product name.
- `price`
  - Current price.
  - Must be numeric, not formatted string.
- `originalPrice`
  - List price before discount.
  - Must be numeric, not formatted string.

Backend guidance:
- Send raw numeric values for prices.
- The frontend will format the display.
- If a product is not discounted, you can set `originalPrice` equal to `price`.

## Section-by-Section Contract

### Hero section

Payload:

```ts
heroBanners: BannerItem[];
```

What the UI uses:
- `imageSrc`
- `alt`
- `href`
- `priority`

Styling notes:
- The carousel layout is controlled by the frontend.
- The backend should only provide content and linking data.

### Daily Offers

Payload:

```ts
dailyOffersTitle: string;
dailyOffers: CardSlideItem[];
```

What the UI uses:
- `dailyOffersTitle` as section heading.
- Each item `image`, `title`, and `id`.

Styling notes:
- The carousel behavior and card sizing are frontend-only.

### Top Categories

Payload:

```ts
topCategoriesTitle: string;
topCategories: ContentSectionItem[];
```

What the UI uses:
- `topCategoriesTitle`
- Each category `image`, `title`, `id`

Styling notes:
- The grid layout is frontend-controlled.

### Best Sellers

Payload:

```ts
bestSellersTitle: string;
bestSellers: ProductItem[];
```

What the UI uses:
- `bestSellersTitle`
- Product image, title, price, originalPrice

Styling notes:
- The product card component shows discount and currency UI automatically.
- Backend should not format the price string.

### Featured Products

Payload:

```ts
featuredProductsTitle: string;
```

Current frontend usage:
- This title is used for an additional product slider section.
- The current implementation reuses the `bestSellers` product array for this section.

Backend guidance:
- If you want this section to have its own products later, expose a separate product array.

### Featured Promotions

Payload:

```ts
featuredPromotionsTitle: string;
featuredPromotions: CardSlideItem[];
```

What the UI uses:
- Section title
- Card image and title

Styling notes:
- This section is rendered as a grid, not a slider.

### Trending Now

Payload:

```ts
trendingNowTitle: string;
trendingProducts: ProductItem[];
```

What the UI uses:
- `trendingNowTitle`
- Product cards

Backend guidance:
- Same product item contract as best sellers.
- If this section represents a different feed, return a separate array.

### Explore More Deals

Payload:

```ts
exploreMoreDealsTitle: string;
exploreMoreDeals: CardSlideItem[];
```

What the UI uses:
- Section title
- Deal card items

### Leaflet Banner

Payload:

```ts
leafletBanner: BannerItem;
```

What the UI uses:
- `title`
- `imageSrc`
- `alt`
- `href`
- `priority`

Backend guidance:
- This is a featured, full-width banner.
- Set `title` if you want the banner heading to appear.
- If the banner should navigate somewhere, provide `href`.

### Electronics Zone

Payload:

```ts
electronicsZoneTitle: string;
electronicsZone: CardSlideItem[];
```

What the UI uses:
- Section title
- Grid of promo cards

Styling notes:
- Rendered as a grid with a more vertical card aspect ratio.

## Frontend-Only Props

These props affect layout, styling, or interaction, and should not be part of the backend response:

- `className`
- `cardClassName`
- `gridClassName`
- `imageClassName`
- `slideSizes`
- `showArrows`
- `loading`
- `overlay`
- `buttonClassName`
- `iconClassName`
- `previousLabel`
- `nextLabel`
- `isRtl`
- `variant`
- `strokeWidth`

## Recommended API Response Shape

Example JSON response:

```json
{
  "heroBanners": [
    {
      "id": "eid-special-1",
      "imageSrc": "/hero1.jpg",
      "alt": "Eid special hero banner",
      "priority": true
    }
  ],
  "dailyOffersTitle": "Daily Offers",
  "dailyOffers": [
    {
      "id": 1,
      "image": "https://example.com/daily-offer-1.jpg",
      "title": "Mega Flash Sale"
    }
  ],
  "topCategoriesTitle": "Top Categories",
  "topCategories": [
    {
      "id": 1,
      "image": "https://example.com/category-1.svg",
      "title": "Mobiles & Tablets"
    }
  ],
  "bestSellersTitle": "Best sellers",
  "bestSellers": [
    {
      "id": 100,
      "image": "https://example.com/product-1.jpg",
      "title": "Premium Coffee Beans - 500g",
      "price": 189.5,
      "originalPrice": 249.99
    }
  ],
  "featuredProductsTitle": "Featured products",
  "moreProductsTitle": "More products",
  "featuredPromotionsTitle": "Featured promotions",
  "featuredPromotions": [
    {
      "id": "promo-1",
      "image": "https://example.com/promo-1.jpg",
      "title": "Fresh deals"
    }
  ],
  "trendingNowTitle": "Trending Now",
  "trendingProducts": [
    {
      "id": 200,
      "image": "https://example.com/product-2.jpg",
      "title": "Organic Chia Seeds - 200g",
      "price": 115,
      "originalPrice": 155
    }
  ],
  "exploreMoreDealsTitle": "Explore more deals",
  "exploreMoreDeals": [
    {
      "id": "deal-1",
      "image": "https://example.com/deal-1.jpg",
      "title": "Weekly Leaflet Offers"
    }
  ],
  "leafletBanner": {
    "id": "carrefour-leaflets",
    "title": "Carrefour leaflets",
    "imageSrc": "https://example.com/leaflet-banner.jpg",
    "alt": "Carrefour leaflets banner",
    "priority": false
  },
  "electronicsZoneTitle": "Electronics Zone",
  "electronicsZone": [
    {
      "id": "electronics-1",
      "image": "https://example.com/electronics-1.jpg",
      "title": "Fresh deals"
    }
  ]
}
```

## Backend Checklist

- Provide all required arrays and titles.
- Keep `id` values stable.
- Use raw numeric `price` values.
- Use accessible, descriptive `alt` text.
- Provide absolute image URLs or a predictable public asset base.
- Decide in advance whether a banner or card should be clickable and provide `href` accordingly.
- Avoid UI styling props in the API response.

## Notes For Future API Expansion

If the backend later becomes the source of truth for homepage content, this contract can be extended with:

- `badge`
- `subtitle`
- `description`
- `ctaLabel`
- `ctaHref`
- `discountPercent`
- `stockStatus`
- `trackingId`

Only add fields when the UI truly needs them.
