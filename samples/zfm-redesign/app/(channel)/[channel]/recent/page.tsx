import { StyledTrackBlock } from '@/app/(channel)/style/Channel.styled';
import ChannelService from '@/components/Services/ChannelService';
import Title from '@/components/Title';
import Track from '@/components/Track';
import { StyledTracksList } from '@/components/Track/style/Track.styled';
import { getRecentData } from '@/lib/fetchActions';
import { ChannelPageProps } from '@/lib/types';

export default async function RecentPage({ params }: Readonly<ChannelPageProps>) {
	const tracks = await getRecentData(params.channel, 20);
	if (!tracks.length) return null;
	return (
		<StyledTrackBlock>
			<ChannelService channel={params.channel} />
			<Title level={2}>История эфира</Title>
			<StyledTracksList>
				{tracks?.map((track, index) => (
					<Track
						playedAt={track.played_at}
						track={track.track}
						index={index}
						key={track.track.track_id}
						isHit={false}
						channel={params.channel}
					/>
				))}
			</StyledTracksList>
		</StyledTrackBlock>
	);
}
