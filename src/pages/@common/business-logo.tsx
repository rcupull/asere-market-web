import { useGetOneBusiness } from 'features/api/useGetOneBusiness';

import { useRouter } from 'hooks/useRouter';

import { BusinessHookLogo } from './business-hook-logo-';

import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';

export interface BusinessLogoProps extends StyleProps {}

export const BusinessLogo = ({ className }: BusinessLogoProps) => {
  const { isBusinessPage } = useRouter();

  const { getOneBusiness } = useGetOneBusiness();
  const business = getOneBusiness.data;

  if (isBusinessPage) {
    const src = business?.logo?.src;

    if (src) {
      return (
        <div className={className}>
          <img className="h-8 w-auto" src={getImageEndpoint(src)} alt="Your Company" />
        </div>
      );
    }
  }

  return <BusinessHookLogo className={className} />;
};
