import { BaseIdentity, Image } from './general';

export type BusinessCategory = 'food' | 'tool' | 'clothing' | 'service';

export interface Business extends BaseIdentity {
  name: string;
  category: BusinessCategory;
  routeName: string;
  createdBy: string; // userId
  hidden?: boolean;
  bannerImages?: Array<Image>;
  bannerImageStyle?: 'static';
  socialLinks: {
    face?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}
