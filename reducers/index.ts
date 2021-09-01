import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import myPickCountReducer from '@/features/myPickCount';
import { createWrapper } from 'next-redux-wrapper';

const reducer = combineReducers({
  auth: authReducer,
  pickCount: myPickCountReducer,
});

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware(),
    preloadedState: {},
  });

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof reducer>;
export default wrapper;
