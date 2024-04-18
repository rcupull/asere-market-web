import { createSimpleSlice } from './utils';

export const slices = {
  useGetUserPaymentPlan: createSimpleSlice('useGetUserPaymentPlan', null),
  useBusiness: createSimpleSlice('useBusiness', null),
  useSales: createSimpleSlice('useSales', null),
  modal_catalogsSearchImage: createSimpleSlice('modal_catalogsSearchImage', null),
  //
  useCallFromAfar: createSimpleSlice<Array<any>>('useCallFromAfar', []),
  emergentModals: createSimpleSlice<Array<any>>('emergentModals', []),
  //
  useAllUserBusiness: createSimpleSlice<null>('useAllUserBusiness', null),
  useAuth: createSimpleSlice<null>('useAuth', null),
};
