import { Divider } from 'components/divider';

import { Banner } from './Banner';
import { Logo } from './Logo';
import { PostCategories } from './PostCategories';

import { Business } from 'types/business';

export interface ResourcesProps {
  business: Business;
}

export const Resources = ({ business }: ResourcesProps) => {
  return (
    <>
      <Banner business={business} />

      <Divider />

      <Logo business={business} />

      <Divider />

      <PostCategories business={business}/>
    </>
  );
};
