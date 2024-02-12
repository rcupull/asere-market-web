import { BaseIdentity } from './general';

export type PostCurrency = 'CUP' | 'USD' | 'MLC';

export interface PostImage {
  src: string;
  alt?: string;
}

export type PostReviews = [number, number, number, number, number];

export interface Post extends BaseIdentity {
  images?: Array<PostImage>;
  routeName: string;
  description: string;
  name: string;
  price: number;
  currency: PostCurrency;
  reviews?: PostReviews;
  colors?: Array<PostColor>;
  highlights?: Array<string>;
  details?: string;
  // clothing
  clothingSizes?: Array<PostClothingSize>;
}

export type PostColor = 'white' | 'gray' | 'black';

export type PostColorMeta = Record<
  PostColor,
  {
    name: PostColor;
    bgColor: string;
    selectedRingColor: string;
  }
>;
// ////////////////CLOTHING

export type PostClothingSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
