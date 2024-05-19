/* eslint-disable max-len */
'use client';
import { useAppSelector } from '@/redux/hooks';
import { getGlobalCurrentChannel } from '@/redux/slices/global';

import * as ReactDOMServer from 'react-dom/server';

export interface advTheme {
	advertisment: {
		background: {
			main: string;
		};
		text: {
			main: string;
		};
	};
	channelColors: { [key: string]: string };
}
// component, which provides styled with theme svg as background img
export default function PlaceholderAdv(theme: advTheme) {
	const currentChannel = useAppSelector(getGlobalCurrentChannel);
	const Svg = () => (
		<svg
			width='1000'
			height='1000'
			viewBox='0 0 1000 1000'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<rect width='1000' height='1000' fill={theme.advertisment.background.main} />
			<text
				x='400'
				y='505'
				fill={theme.channelColors[currentChannel]}
				fontSize='20px'
				fontFamily='Arial'
			>
				Это реклама. За счет неё
			</text>
			<text
				x='415'
				y='522'
				fill={theme.channelColors[currentChannel]}
				fontSize='20px'
				fontFamily='Arial'
			>
				наш сайт существует
			</text>
		</svg>
	);

	return encodeURIComponent(ReactDOMServer.renderToString(<Svg />));
}
