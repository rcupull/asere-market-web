import { BaseIdentity } from './general';

export type PostCurrency = 'CUP' | 'USD' | 'MLC';

export interface PostImage {
  src: string;
  alt?: string;
}

export interface PostReviews {
  average: number;
  totalCount: number;
}

export interface Post extends BaseIdentity {
  images?: Array<PostImage>;
  routeName: string;
  description: string;
  name: string;
  price: number;
  currency: PostCurrency;
  reviews?: PostReviews;
}

export interface PostColor {
  name: string;
  bgColor: string; // tailwind bg class color. Exmaple : "bg-white"
  selectedRingColor: string; // tailwind bg class color. Exmaple : "bg-white"
}

// ////////////////CLOTHING

export interface PostClothingSize {
  name: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
  inStock: boolean;
}

export interface PostClothing extends Post {
  colors: Array<PostColor>;
  sizes: Array<PostClothingSize>;
  highlights?: Array<string>;
  details?: string;
}
