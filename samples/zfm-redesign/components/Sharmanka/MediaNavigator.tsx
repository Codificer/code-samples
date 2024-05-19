'use client';
import { useAppSelector } from '@/redux/hooks';
import { getGlobalCurrentChannel } from '@/redux/slices/global';
import { getPlayingState } from '@/redux/slices/player';
import { getRecentForChannel, getRecentTrackForChannel } from '@/redux/slices/recent';

import { useEffect } from 'react';

export default function MediaNavigator() {
	const currentChannel = useAppSelector(getGlobalCurrentChannel);
	const recents = useAppSelector(getRecentForChannel(currentChannel));
	const isPlaying = useAppSelector(getPlayingState);

	useEffect(() => {
		if (recents && recents.length > 0) {
			const track = recents[0].track;
			if ('mediaSession' in navigator) {
				navigator.mediaSession!.metadata = new MediaMetadata({
					title: track?.title,
					artist: track?.artist,
					artwork: [
						{
							src: track?.images?.large || track?.images?.medium || track?.images?.original || '',
						},
					],
				});
				navigator.mediaSession!.playbackState = isPlaying ? 'playing' : 'paused';
			}
		}
	}, [recents, isPlaying]);
	return null;
}
