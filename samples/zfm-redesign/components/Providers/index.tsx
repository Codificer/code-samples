'use client';

import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import { ChannelsState } from '@/redux/slices/channels';
import { GlobalState } from '@/redux/slices/global';

import ReduxProvider from './Redux';
import GlobalThemeProvider from './Theme';

type ProvidersType = {
	children: React.ReactNode;
	global: GlobalState;
	channels: ChannelsState;
};
const Providers = (props: ProvidersType) => {
	return (
		<StyledComponentsRegistry>
			<ReduxProvider {...props}>
				<GlobalThemeProvider serverTheme={props.global.theme}>{props.children}</GlobalThemeProvider>
			</ReduxProvider>
		</StyledComponentsRegistry>
	);
};

export default Providers;
