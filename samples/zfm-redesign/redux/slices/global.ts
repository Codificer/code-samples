import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie } from 'cookies-next';
import { act } from 'react-dom/test-utils';

import { setCurrentPlayerUrl } from './player';

import type { ReduxHandler, RootState } from '../store';

type ModalsType = 'channels' | 'burger';
interface Modals {
	channels: boolean;
	burger: boolean;
}
export const defaultModals: Modals = {
	channels: false,
	burger: false,
};
export interface GlobalState {
	currentChannel: string;
	theme: string;
	isMobile: boolean;
	modals: Modals;
	hasAdblock: boolean;
}
const initialState: GlobalState = {
	currentChannel: 'pop',
	theme: 'light',
	isMobile: false,
	modals: defaultModals,
	hasAdblock: false,
};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setGlobalCurrChannel: (state, action: PayloadAction<string>) => {
			state.currentChannel = action.payload;
			setCookie('channel', action.payload);
		},
		setGlobalTheme: (state, action: PayloadAction<string>) => {
			state.theme = action.payload;
			setCookie('theme', action.payload);
		},
		setGlobalIsMobile: (state, action: PayloadAction<boolean>) => {
			state.isMobile = action.payload;
		},
		toggleGlobalChannelsMenuOpen: (state) => {
			state.modals.channels = !state.modals.channels;
		},
		toggleGlobalBurgerMenuOpen: (state) => {
			state.modals.burger = !state.modals.burger;
		},
		toggleGlobalMenuByType: (state, action: PayloadAction<ModalsType>) => {
			Object.keys(state.modals).forEach((key) => {
				state.modals[key as keyof Modals] =
					key === action.payload ? !state.modals[key as keyof Modals] : false;
			});
		},
		closeGlobalAnyMenu: (state) => {
			Object.keys(state.modals).forEach((key) => {
				state.modals[key as keyof Modals] = false;
			});
		},
		setGlobalHasAdblock: (state, action: PayloadAction<boolean>) => {
			state.hasAdblock = action.payload;
		},
	},
});

export const {
	setGlobalCurrChannel,
	setGlobalTheme,
	setGlobalIsMobile,
	toggleGlobalChannelsMenuOpen,
	toggleGlobalBurgerMenuOpen,
	toggleGlobalMenuByType,
	closeGlobalAnyMenu,
	setGlobalHasAdblock,
} = globalSlice.actions;

export const getGlobalTheme = (state: RootState) => state.global.theme;
export const getGlobalCurrentChannel = (state: RootState) => state.global.currentChannel;
export const getGlobalIsMobile = (state: RootState) => state.global.isMobile;
export const getGlobalModalOpenByType = (type: ModalsType) => (state: RootState) =>
	state.global.modals[type];
export const getGlobalAnyModalIsOpen = (state: RootState) => {
	//проверяет, открыто хоть одно модальное или нет (для блокировки прокрутки html, например)
	for (let key in state.global.modals) {
		if (state.global.modals[key as ModalsType]) return true;
	}
	return false;
};
export const getGlobalHasAdblock = (state: RootState) => state.global.hasAdblock;

export default globalSlice.reducer;

export { initialState as initialGlobalState };

export const setGlobalCurrentChannel =
	(channel: string): ReduxHandler =>
	(dispatch, getState) => {
		try {
			dispatch(setGlobalCurrChannel(channel));
			dispatch(setCurrentPlayerUrl());
		} catch (e) {
			console.error(e);
		}
	};
