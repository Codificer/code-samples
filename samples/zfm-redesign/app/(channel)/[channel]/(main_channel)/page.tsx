import Player from '@/components/Player';
import { PlayerType } from '@/components/Player/enum/playerType';
import ChannelService from '@/components/Services/ChannelService';
import RecentService from '@/components/Services/RecentService';
import { ChannelPageProps } from '@/lib/types';

export default function Channel({ params }: ChannelPageProps) {
	return (
		<main>
			<ChannelService channel={params.channel} />
			<RecentService />
			<Player type={PlayerType.Main}></Player>
		</main>
	);
}
