import { Banner } from './Banner';
import { Logo } from './Logo';

import { Business } from 'types/business';

export interface ResourcesProps {
  business: Business;
}

export const Resources = ({ business }: ResourcesProps) => {
  return (
    <>
      <Banner business={business} />

      <Logo business={business} />
    </>
  );
};
