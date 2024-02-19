import { Skeleton } from '../../../@common/skeleton';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { Business } from 'types/business';

export interface LayoutSearchProps {
  business: Business;
}

export const LayoutSearch = ({ business }: LayoutSearchProps) => {
  return (
    <LayoutPageSection>
      <Skeleton banner='static' footer='simple' active='search' posts='grid' search='wide'/>
    </LayoutPageSection>
  );
};
