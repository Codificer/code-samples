import Rotator from '@/components/AdvertismentRotator';
import MiniPlayer from '@/components/Player/MiniPlayer';
import Providers from '@/components/Providers';
import MobileService from '@/components/Services/MobileService';
import YandexAdvServive from '@/components/Services/YandexAdvService';
import SharmankaWrapper from '@/components/Sharmanka';
import MediaNavigator from '@/components/Sharmanka/MediaNavigator';
import YaCounter from '@/components/YaCounter';
import { mainFont } from '@/lib/fonts-config';
import getChannels from '@/lib/getChannels';
import getCookiesServer from '@/lib/getCookiesServer';
import { GlobalState, defaultModals } from '@/redux/slices/global';

import { headers } from 'next/headers';

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userAgent = headers().get('user-agent');
	const isMobile = userAgent && userAgent.toLowerCase().includes('mobile');
	const global: GlobalState = {
		theme: getCookiesServer('theme') || 'light',
		isMobile: !!isMobile,
		currentChannel: getCookiesServer('channel') || 'pop',
		modals: defaultModals,
		hasAdblock: false,
	};
	const channels = await getChannels();

	return (
		<html lang='ru' className={mainFont.className}>
			<Providers global={global} channels={channels}>
				<body>
					<Rotator type='FULLSCREEN' />
					<YaCounter />
					<YandexAdvServive />
					<MobileService defaultIsMobile={!!isMobile} />
					<div className='contentMainLayout'>{children}</div>
					<SharmankaWrapper />
					<MediaNavigator />
					<MiniPlayer />
				</body>
			</Providers>
		</html>
	);
}
