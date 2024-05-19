import channels, { ChannelsState, initialChannelsState } from './slices/channels';
import global, { GlobalState, initialGlobalState } from './slices/global';
import player, { PlayerState, initialPlayerState } from './slices/player';
import recent, { RecentTracksState, initialRecentState } from './slices/recent';

export type ReducerType = {
	global: GlobalState;
	channels: ChannelsState;
	player: PlayerState;
	recent: RecentTracksState;
};
const reducer = {
	global,
	channels,
	player,
	recent,
};

export const initialReducer: ReducerType = {
	global: initialGlobalState,
	channels: initialChannelsState,
	player: initialPlayerState,
	recent: initialRecentState,
};
export default reducer;
