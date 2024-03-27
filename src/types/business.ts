import { BaseIdentity, Image } from './general';

export type BusinessCategory = 'food' | 'tool' | 'clothing' | 'service';

export type PostsLayoutType = 'none' | 'grid' | 'slicesHorizontal' | 'alternateSummary';
export type BannerLayoutType = 'none' | 'static' | 'swipableClassic';
export type SearchLayoutType =
  | 'none'
  | 'left'
  | 'center'
  | 'right'
  | 'postCategories'
  | 'postCategoriesScrollable'
  | 'postCategoriesExcluded'
  | 'postCategoriesExcludedScrollable';

export type FooterLayoutType = 'none' | 'basic';

export interface PostsLayout {
  type: PostsLayoutType;
}

export type PostCardLayoutImages = 'static' | 'hoverZoom' | 'slider' | 'switch';
export type PostCardLayoutName = 'none' | 'basic';
export type PostCardLayoutPrice = 'none' | 'basic' | 'smallerCurrency' | 'usdCurrencySymbol';
export type PostCardLayoutDiscount = 'none' | 'savedPercent' | 'savedMoney';

export interface PostCardLayout {
  images?: PostCardLayoutImages;
  name?: PostCardLayoutName;
  price?: PostCardLayoutPrice;
  discount?: PostCardLayoutDiscount;
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

export interface BusinessLayouts {
  posts?: PostsLayout;
  postCard?: PostCardLayout;
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

export interface SocialLinks {
  face?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface BusinessAboutUsPage {
  visible?: boolean;
  title?: string;
  description?: string; // checkeditor text
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
  socialLinks?: SocialLinks;
  layouts?: BusinessLayouts;
  layoutsMobile?: BusinessLayouts;
  aboutUsPage?: BusinessAboutUsPage;
}
