'use client';
/* eslint-disable no-nested-ternary */
import { advBlockList, advUnits } from '../config';
import addScriptToPage from '../handlers/addScriptToPage';
import fetchRotator from '../handlers/fetchRotator';

import { useAppSelector } from '@/redux/hooks';
import { getGlobalHasAdblock, getGlobalIsMobile } from '@/redux/slices/global';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

const useRotator = (type: string, index?: number) => {
	const [date] = useState(Date.now());
	const [adScriptText, setAdScriptText] = useState('');
	const [containerId, setContainerId] = useState('');
	const hasAdblock = useAppSelector(getGlobalHasAdblock);
	const isMobile = useAppSelector(getGlobalIsMobile);
	const pathname = usePathname();

	const updateAds = useCallback(async () => {
		if (!hasAdblock) {
			setAdScriptText(
				await fetchRotator(
					advBlockList[type],
					type,
					advUnits.find((i) => i.code === advBlockList[type].containerId)
				),
			);
		}
	}, [hasAdblock, type]);

	useEffect(() => {
		if (adScriptText) {
			addScriptToPage(
				adScriptText,
				type
			);
		}
	}, [adScriptText, type]);

	useEffect(() => {
		updateAds();
	}, [updateAds, pathname]);

	useEffect(() => {
		setContainerId(advBlockList[type]?.containerId);
	}, [type]);

	return {
		hasAdblock,
		isMobile,
		containerId,
		date,
	};
};

export default useRotator;
