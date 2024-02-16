import { createSimpleSlice } from './utils';

export const slices = {
  useGetUserPaymentPlan: createSimpleSlice('useGetUserPaymentPlan', null),
  useAuthSignIn: createSimpleSlice('useAuthSignIn', null),
  useGetAllUserBusinessRouteNames: createSimpleSlice('useGetAllUserBusinessRouteNames', null),
  useCallFromAfar: createSimpleSlice<Array<any>>('useCallFromAfar', []),
  emergentModals: createSimpleSlice<Array<any>>('emergentModals', []),
};
