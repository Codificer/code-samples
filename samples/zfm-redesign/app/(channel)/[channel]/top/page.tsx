import { StyledTrackBlock } from "@/app/(channel)/style/Channel.styled";
import ChannelService from "@/components/Services/ChannelService";
import Title from "@/components/Title";
import Track from "@/components/Track";
import { StyledTracksList } from "@/components/Track/style/Track.styled";
import { getTopData } from "@/lib/fetchActions";
import { ChannelPageProps } from "@/lib/types";

export default async function TopAllPage({
  params,
  searchParams,
}: ChannelPageProps) {
  const tracks = await getTopData(params.channel, 20);

  return (
    <StyledTrackBlock>
      <ChannelService channel={params.channel} />
      <Title level={2}>Хит-парад канала</Title>
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
    </StyledTrackBlock>
  );
}
