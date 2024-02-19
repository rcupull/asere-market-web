import { BusinessLayout } from 'types/business';
import { mergeDeep } from 'utils/general';

export const getChangedLayout = (
  layout?: BusinessLayout,
  partial?: Partial<BusinessLayout>,
): BusinessLayout => {
  return mergeDeep(layout || {}, partial || {});
};
