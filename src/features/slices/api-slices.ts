import { createSlice } from '@reduxjs/toolkit';

const createApiSlice = (name: string) => {
  return createSlice({
    name,
    initialState: null,
    reducers: {
      setState: (_, { payload }) => {
        return payload;
      },
      reset: () => {
        return null;
      },
    },
  });
};

export const apiSlices = {
  getUserPaymentPlanSlice: createApiSlice('getUserPaymentPlan'),
  authSignIn: createApiSlice('authSignIn'),
};
