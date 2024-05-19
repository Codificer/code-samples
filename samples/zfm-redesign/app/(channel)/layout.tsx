import Rotator from '@/components/AdvertismentRotator';
import Channels from '@/components/Channels';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SideMainSection from '@/components/SideMainSection';

export default function ChannelLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	params: { channel: string };
	searchParams: { [key: string]: string | string[] | undefined };
}>) {
	return (
		<>
			<SideMainSection />
			<div className='contentChannelLayout'>
				<Header withLogo={false} />
				<Channels />
				{children}
				<Footer />
			</div>
		</>
	);
}
