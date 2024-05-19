import R3FLayoutChannelsWrapper from '@/components/threejs/R3FLayoutChannelsWrapper';

export default function ChannelLayout({
	children,
	top,
	recent,
	news,
}: Readonly<{
	children: React.ReactNode;
	top: React.ReactNode;
	recent: React.ReactNode;
	news: React.ReactNode;
}>) {
	return (
		<R3FLayoutChannelsWrapper>
			{children}
			<section
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
				}}
			>
				{recent}
				{top}
			</section>
		</R3FLayoutChannelsWrapper>
	);
}
