import { Skeleton } from '../../../@common/skeleton';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { Business } from 'types/business';

export interface LayoutBannerProps {
  business: Business;
}

export const LayoutBanner = ({ business }: LayoutBannerProps) => {
  return (
    <LayoutPageSection>
      <Skeleton banner='static' footer='simple' active='banner' posts='grid' search='wide'/>
    </LayoutPageSection>
  );
};
