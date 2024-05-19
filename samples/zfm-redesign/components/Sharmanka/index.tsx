'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPlayerUrl, getPlayingState, getVolume, setPlayingState } from '@/redux/slices/player';

import { useCallback, useEffect, useState } from 'react';
import Sharmanka from 'sharmanka-ts';

export default function SharmankaWrapper() {
	const dispatch = useAppDispatch();
	const streamUrl = useAppSelector(getPlayerUrl);
	const isPlaying = useAppSelector(getPlayingState);
	const volume = useAppSelector(getVolume);
	const [firstStart, setFirstStart] = useState(true);
	const sharmankaInitEvents = useCallback(async () => {
		Sharmanka.onPlay(() => {
			const playerPlayEvent = new Event('playerPlay', { bubbles: true });

			document.dispatchEvent(playerPlayEvent);
			if (localStorage.getItem('shouldAllOtherPlayersStop'))
				localStorage.removeItem('shouldAllOtherPlayersStop');
			localStorage.setItem('shouldAllOtherPlayersStop', '1');
		});
		Sharmanka.onPause(() => {
			const playerPauseEvent = new Event('playerPause', { bubbles: true });

			document.dispatchEvent(playerPauseEvent);
		});

		if ('mediaSession' in navigator) {
			navigator.mediaSession.setActionHandler('play', async () => {
				dispatch(setPlayingState(true));
				navigator.mediaSession.playbackState = 'playing';
			});

			navigator.mediaSession.setActionHandler('pause', async () => {
				dispatch(setPlayingState(false));
				navigator.mediaSession.playbackState = 'paused';
			});

			window.onstorage = (event) => {
				if (event.key !== 'shouldAllOtherPlayersStop') return;
				if (event.newValue) {
					dispatch(setPlayingState(false));
					localStorage.removeItem('shouldAllOtherPlayersStop');
				}
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [dispatch]);

	useEffect(() => {
		if (!Sharmanka.node) {
			Sharmanka.init();

			sharmankaInitEvents();
		}
	}, [sharmankaInitEvents]);

	useEffect(() => {
		if (isPlaying) {
			Sharmanka.setTrack(streamUrl);
			Sharmanka.play();
			if (firstStart) setFirstStart(false);
		} else if (streamUrl && !firstStart) {
			Sharmanka.pause();
			Sharmanka.clearTrack();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlaying, streamUrl]);

	useEffect(() => {
		Sharmanka.volume(volume);
	}, [volume]);
	return null;
}
