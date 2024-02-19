import { Skeleton } from '../../../@common/skeleton';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { Business } from 'types/business';

export interface LayoutPostsProps {
  business: Business;
}

export const LayoutPosts = ({ business }: LayoutPostsProps) => {
  return (
    <LayoutPageSection>
      <Skeleton banner='static' footer='simple' active='posts' posts='grid' search='wide'/>
    </LayoutPageSection>
  );
};
