import { createSimpleSlice } from './utils';

export const slices = {
  useGetUserPaymentPlan: createSimpleSlice('useGetUserPaymentPlan', null),
  useAuthSignIn: createSimpleSlice('useAuthSignIn', null),
  useCallFromAfar: createSimpleSlice<Array<string>>('useCallFromAfar', []),
};
