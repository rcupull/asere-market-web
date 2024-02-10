import { BaseIdentity } from './general';

export type PostCurrency = 'CUP' | 'USD' | 'MLC';

export interface PostImage {
  url: string;
}

export interface Post extends BaseIdentity {
  images?: Array<PostImage>;
  routeName: string;
  description: string;
  name: string;
  price: number;
  currency: PostCurrency;
  amountAvailable?: number;
}
