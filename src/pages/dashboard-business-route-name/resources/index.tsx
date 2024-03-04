import { Divider } from 'components/divider';

import { Banner } from './Banner';
import { Logo } from './Logo';
import { PostCategories } from './PostCategories';

import { Business } from 'types/business';

export interface ResourcesProps {
  business: Business;
  onRefresh: () => void;
}

export const Resources = ({ business, onRefresh }: ResourcesProps) => {
  return (
    <>
      <Banner business={business} />

      <Divider />

      <Logo business={business} />

      <Divider />

      <PostCategories business={business} onRefresh={onRefresh} />
    </>
  );
};
