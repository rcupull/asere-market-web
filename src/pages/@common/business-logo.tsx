import { BusinessMarketLogo } from './business-market-logo';

import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';

export interface BusinessLogoProps extends StyleProps {}

export const BusinessLogo = ({ className }: BusinessLogoProps) => {
  const { business } = useBusinessPageData();

  if (business) {
    const src = business?.logo?.src;

    if (src) {
      return (
        <div className={className}>
          <img className="h-8 w-auto" src={getImageEndpoint(src)} alt="Your Company" />
        </div>
      );
    }
  }

  return <BusinessMarketLogo className={className} />;
};
