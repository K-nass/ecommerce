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

export interface BannerProps {
  imageSrc: string;
  alt: string;
  title?: string;
  href?: string;
  priority?: boolean;
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

export interface HomePageSection {
  id: number;
  type: string;
  title: string;
  endpoint: string;
  order: number;
}

export interface HomeContentPage {
  id: number;
  title: string;
  slug: string;
  is_active: boolean;
  sections: HomePageSection[];
}

export interface HeroBannerImage {
  desktop: string;
  mobile: string;
}

export interface HeroBanner {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: HeroBannerImage;
  status: boolean;
}

export interface HeroSwiperProps {
  endpoint: string;
}
