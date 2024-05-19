import { StyledTrackBlockShort } from '@/app/(channel)/style/Channel.styled';
import Title from '@/components/Title';
import RecentTrackList from '@/components/TrackList/components/RecentTrackList';
import { getRecentData } from '@/lib/fetchActions';
import { TrackFullData } from '@/types/track_types';

import Link from 'next/link';

export default async function RecentPage({
	params,
	searchParams,
}: {
	params: { channel: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const limit = 20;
	const size = 5;
	let serverRecent: TrackFullData[] = [];

	try {
		serverRecent = await getRecentData(params.channel, limit);
	} catch (error) {
		throw new Error('Recent tracks fetching error.');
	}

	return (
		<StyledTrackBlockShort>
			<Link href={`${params.channel}/recent`}>
				<Title level={2}>История эфира</Title>
			</Link>
			<RecentTrackList
				channel={params.channel}
				limit={limit}
				size={size}
				initialTrackList={serverRecent}
			/>
		</StyledTrackBlockShort>
	);
}
