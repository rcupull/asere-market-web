import { createSimpleSlice } from './utils';

export const slices = {
  useGetUserPaymentPlan: createSimpleSlice('useGetUserPaymentPlan', null),
  useAuthSignIn: createSimpleSlice('useAuthSignIn', null),
  useGetAllUserBusinessRouteNames: createSimpleSlice('useGetAllUserBusinessRouteNames', null),
  useGetAllUserBusiness: createSimpleSlice('useGetAllUserBusiness', null),
  useGetOneBusiness: createSimpleSlice('useGetOneBusiness', null),
  //
  useCallFromAfar: createSimpleSlice<Array<any>>('useCallFromAfar', []),
  emergentModals: createSimpleSlice<Array<any>>('emergentModals', []),
};
