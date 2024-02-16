import { cookiesUtils } from 'features/cookies';
import { slices } from 'features/slices';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { AuthData } from 'types/auth';
import { AnyRecord } from 'types/general';

export const makerStore = (preloadedState: Partial<AnyRecord> = {}) => {
  const enhancedReducers = combineReducers({
    ...Object.values(slices).reduce((r, { name, reducer }) => ({ ...r, [name]: reducer }), {}),
  });

  const store = configureStore({
    reducer: enhancedReducers,
    preloadedState,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      //https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });

  // setting authentication data
  const cookiesData = cookiesUtils.getCookie('authData');
  if (cookiesData) {
    store.dispatch(slices.useAuthSignIn.actions.setState(cookiesData as AuthData));
  }

  return { store };
};
