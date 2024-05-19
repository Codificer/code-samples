'use client';

import { ChannelsState } from '@/redux/slices/channels';
import { GlobalState } from '@/redux/slices/global';
import { AppStore, makeStore } from '@/redux/store';

import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function ReduxProvider({
	children,
	global,
	channels,
}: {
	children: React.ReactNode;
	global: GlobalState;
	channels: ChannelsState;
}) {
	const storeRef = useRef<AppStore | null>(null);
	if (!storeRef.current) {
		storeRef.current = makeStore({
			global,
			channels,
		});
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
