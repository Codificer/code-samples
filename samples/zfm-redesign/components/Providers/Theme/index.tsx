'use client';

import GlobalStyles from '@/style/globalStyles';
import theme from '@/style/theme';

import { ThemeContext, ThemeProvider } from 'styled-components';

import useGlobalTheme from './hooks/useGlobalTheme';

export default function GlobalThemeProvider({
	children,
	serverTheme,
}: {
	children: React.ReactNode;
	serverTheme?: string;
}) {
	const { mainTheme, updateTheme, isMobile, isModalOpen } = useGlobalTheme();
	const isServer = typeof window === 'undefined';
	return (
		<ThemeContext.Provider value={{ mainTheme, updateTheme }}>
			<ThemeProvider theme={theme[isServer ? serverTheme || 'light' : mainTheme]}>
				<GlobalStyles isMobile={isMobile} isModalOpen={isModalOpen} />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}
