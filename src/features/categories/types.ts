export interface CategoryImage {
  desktop: string;
  mobile: string;
}

export interface CategoryMenuItem {
  id: number;
  name: string;
  slug: string;
  level: 1 | 2 | 3;
  image: CategoryImage;
  children: CategoryMenuItem[];
}
