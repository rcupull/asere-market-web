import { BusinessLayouts } from 'types/business';
import { mergeDeep } from 'utils/general';

export const getChangedLayout = (
  layout?: BusinessLayouts,
  partial?: Partial<BusinessLayouts>,
): BusinessLayouts => {
  return mergeDeep(layout || {}, partial || {});
};
