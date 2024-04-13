import { createSimpleSlice } from './utils';

export const slices = {
  useGetUserPaymentPlan: createSimpleSlice('useGetUserPaymentPlan', null),
  useBusinessPageData: createSimpleSlice('useBusinessPageData', null),
  useBusinessOwnerData: createSimpleSlice('useBusinessOwnerData', null),
  modal_catalogsSearchImage: createSimpleSlice('modal_catalogsSearchImage', null),
  //
  useCallFromAfar: createSimpleSlice<Array<any>>('useCallFromAfar', []),
  emergentModals: createSimpleSlice<Array<any>>('emergentModals', []),
  //
  useAllUserBusiness: createSimpleSlice<null>('useAllUserBusiness', null),
  useAuth: createSimpleSlice<null>('useAuth', null),
};
