'use client';

import { useMedia } from '@/lib/useMedia';
import { useAppDispatch } from '@/redux/hooks';
import { setGlobalIsMobile } from '@/redux/slices/global';

import { useEffect } from 'react';

export default function MobileService({ defaultIsMobile }: { defaultIsMobile: boolean }) {
	const dispatch = useAppDispatch();
	const isMediaMobile = useMedia(
		// '(pointer: coarse) and (max-width: 991px), (max-width: 576px)', 
		'(max-width: 991px)',
		defaultIsMobile,
	);

	useEffect(() => {
		dispatch(setGlobalIsMobile(isMediaMobile));
	}, [dispatch, isMediaMobile]);

	return null;
}
