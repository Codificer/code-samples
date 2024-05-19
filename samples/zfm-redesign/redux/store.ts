import { configureStore } from '@reduxjs/toolkit';

import reducer, { ReducerType, initialReducer } from './reducer';
export const makeStore = (preloadedState?: ReducerType) => {
	return configureStore({
		reducer,
		devTools: true,
		preloadedState: { ...initialReducer, ...preloadedState },
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type ReduxHandler = (dispatch: AppDispatch, getState: () => RootState) => void;
