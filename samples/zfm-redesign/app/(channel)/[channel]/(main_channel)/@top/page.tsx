import { StyledTrackBlockShort } from '@/app/(channel)/style/Channel.styled';
import Title from '@/components/Title';
import Track from '@/components/Track';
import { StyledTracksList } from '@/components/Track/style/Track.styled';
import { getTopData } from '@/lib/fetchActions';

import Link from 'next/link';

export default async function TopPage({
	params,
	searchParams,
}: {
	params: { channel: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const tracks = await getTopData(params.channel, 5);
	return (
		<StyledTrackBlockShort>
			<Link href={`${params.channel}/top`}>
				<Title level={2}>Хит-парад канала</Title>
			</Link>
			<StyledTracksList>
				{tracks?.map((track, index) => (
					<Track
						playedAt={track.played_at}
						track={track.track}
						index={index}
						key={track.track.track_id}
						isHit
						channel={params.channel}
					/>
				))}
			</StyledTracksList>
		</StyledTrackBlockShort>
	);
}
