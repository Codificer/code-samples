'use client';

import { useAppDispatch } from '@/redux/hooks';
import { setGlobalCurrentChannel } from '@/redux/slices/global';

import { useEffect } from 'react';

export default function useChannelPage({ channel }: { channel: string }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setGlobalCurrentChannel(channel));
	}, [dispatch, channel]);
}
