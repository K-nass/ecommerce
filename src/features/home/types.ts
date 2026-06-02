export interface BannerItem {
  id: string;
  imageSrc: string;
  alt: string;
  title?: string;
  href?: string;
  priority?: boolean;
}

export interface CardSlideItem {
  id: number | string;
  image: string;
  title: string;
  borderColor?: string;
}

export interface ContentSectionItem {
  id: number;
  image: string;
  title: string;
}

export interface ProductItem {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice: number;
}

export interface BannerProps extends Omit<BannerItem, "id"> {
  loading?: "lazy" | "eager";
  className?: string;
  overlay?: import("react").ReactNode;
  sizes?: string;
}

export interface BannerArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
  previousLabel?: string;
  nextLabel?: string;
  isRtl?: boolean;
  variant?: "hero" | "card";
  strokeWidth?: number;
}

export interface BannerPaginationProps {
  total: number;
  currentIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export interface HeroSwiperProps {
  banners: BannerItem[];
}

export interface CardSliderProps {
  title?: string;
  items: CardSlideItem[];
  className?: string;
  cardClassName?: string;
  imageClassName?: string;
  slideSizes?: string;
  showArrows?: boolean;
}

export interface CardGridProps {
  title?: string;
  items: CardSlideItem[];
  className?: string;
  gridClassName?: string;
  cardClassName?: string;
  imageClassName?: string;
  slideSizes?: string;
}

export interface ContentSectionProps {
  title: string;
  items: ContentSectionItem[];
}

export interface ContentItemProps {
  item: ContentSectionItem;
}

export interface ProductSliderProps {
  title?: string;
  items: ProductItem[];
}

export interface HomePageProps {
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
}
