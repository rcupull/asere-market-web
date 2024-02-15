import { slices } from 'features/slices';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { AnyRecord } from 'types/general';

export const makerStore = (preloadedState: Partial<AnyRecord> = {}) => {
  const enhancedReducers = combineReducers({
    ...Object.values(slices).reduce((r, { name, reducer }) => ({ ...r, [name]: reducer }), {}),
  });

  const store = configureStore({
    reducer: enhancedReducers,
    preloadedState,
    devTools: true,
  });

  return { store };
};
