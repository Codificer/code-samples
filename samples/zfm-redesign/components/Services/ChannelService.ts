'use client';
import useChannelPage from '@/lib/useChannelPage';

export default function ChannelService({ channel }: { channel: string }) {
	useChannelPage({ channel });
	return null;
}
