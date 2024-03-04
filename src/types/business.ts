import { BaseIdentity, Image } from './general';

export type BusinessCategory = 'food' | 'tool' | 'clothing' | 'service';

export type PostsLayoutType = 'none' | 'grid' | 'slicesHorizontal' | 'alternateSummary';
export type BannerLayoutType = 'none' | 'static' | 'swipableClassic';
export type SearchLayoutType = 'none' | 'left' | 'center' | 'right' | 'postCategories';
export type FooterLayoutType = 'none' | 'basic';

export interface PostsLayout {
  type: PostsLayoutType;
}

export interface BannerLayout {
  type: BannerLayoutType;
}

export interface SearchLayout {
  type: SearchLayoutType;
}

export interface FooterLayout {
  type: FooterLayoutType;
}

export interface BusinessLayout {
  posts?: PostsLayout;
  footer?: FooterLayout;
  search?: SearchLayout;
  banner?: BannerLayout;
}

export interface PostCategory {
  _id: string;
  label: string;
  tag: string;
  hidden?: boolean;
}

export interface Business extends BaseIdentity {
  name: string;
  category: BusinessCategory;
  routeName: string;
  createdBy: string; // userId
  hidden?: boolean;
  bannerImages?: Array<Image>;
  logo?: Image;
  postCategories?: Array<PostCategory>;
  socialLinks?: {
    face?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  layouts?: BusinessLayout;
  layoutsMobile?: BusinessLayout;
}
