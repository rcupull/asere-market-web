import { createSimpleSlice } from './utils';

export const slices = {
  useGetUserPaymentPlan: createSimpleSlice('useGetUserPaymentPlan', null),
  useAuthSignIn: createSimpleSlice('useAuthSignIn', null),
  useGetAllUserBusinessRouteNames: createSimpleSlice('useGetAllUserBusinessRouteNames', null),
  useGetAllUserBusiness: createSimpleSlice('useGetAllUserBusiness', null),
  useBusinessPageData: createSimpleSlice('useBusinessPageData', null),
  useBusinessOwnerData: createSimpleSlice('useBusinessOwnerData', null),
  modal_catalogsSearchImage: createSimpleSlice('modal_catalogsSearchImage', null),
  //
  useCallFromAfar: createSimpleSlice<Array<any>>('useCallFromAfar', []),
  emergentModals: createSimpleSlice<Array<any>>('emergentModals', []),
};
