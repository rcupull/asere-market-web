import { BaseIdentity } from './general';
import { Post } from './post';

export type SaleState = 'CONSTRUCTION' | 'REQUESTED' | 'DELIVERED' | 'CANCELED' | 'REJECTED';

export interface Sale extends BaseIdentity {
  posts: Array<{
    post: Post;
    count: number;
    lastUpdatedDate: Date;
  }>;
  purchaserId: string;
  state: SaleState;
}
