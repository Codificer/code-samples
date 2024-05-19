'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
	getGlobalAnyModalIsOpen,
	getGlobalTheme,
	getGlobalIsMobile,
	setGlobalTheme,
} from '@/redux/slices/global';

import { useCallback } from 'react';

export default function useGlobalTheme() {
	const dispatch = useAppDispatch();
	const mainTheme = useAppSelector(getGlobalTheme);
	const isMobile = useAppSelector(getGlobalIsMobile);
	const isModalOpen = useAppSelector(getGlobalAnyModalIsOpen);

	const updateTheme = useCallback(
		(theme: string) => {
			dispatch(setGlobalTheme(theme));
		},
		[dispatch],
	);

	return {
		mainTheme,
		updateTheme,
		isMobile,
		isModalOpen,
	};
}
