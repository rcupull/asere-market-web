import { BaseIdentity, Image } from './general';

export type BusinessCategory = 'food' | 'tool' | 'clothing' | 'service';

export type PostsLayoutType = 'none' | 'grid' | 'slicesHorizontal' | 'alternateSummary';
export type BannerLayoutType = 'none' | 'static' | 'swipableClassic';
export type SearchLayoutType = 'none' | 'wide' | 'withButtons';
export type FooterLayoutType = 'none' | 'basic';

export interface Business extends BaseIdentity {
  name: string;
  category: BusinessCategory;
  routeName: string;
  createdBy: string; // userId
  hidden?: boolean;
  bannerImages?: Array<Image>;
  bannerImageStyle?: 'static';
  logo?: Image;
  socialLinks: {
    face?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  layouts: {
    posts?: PostsLayoutType;
    footer?: FooterLayoutType;
    search?: SearchLayoutType;
    banner?: BannerLayoutType;
  };
  layoutsMobile: {
    posts?: PostsLayoutType;
    footer?: FooterLayoutType;
    search?: SearchLayoutType;
    banner?: BannerLayoutType;
  };
}
