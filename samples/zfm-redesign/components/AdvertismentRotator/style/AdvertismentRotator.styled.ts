import PlaceholderAdv, { advTheme } from '../PlaceholderAdv';

import { rem } from '@/lib/utils';

import styled from 'styled-components';

export const StyledRotator = styled.div`
	position: relative;

	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;

	line-height: 1;

	&:empty {
		background-image: ${({ theme }) =>
			`url('data:image/svg+xml,${PlaceholderAdv(theme as advTheme)}')`};
		background-repeat: no-repeat;
		background-position: center;
	}

	a {
		display: inline-flex;
		line-height: 0;
		text-align: center;
	}

	&.FULLSCREEN {
		margin: 0;
	}
`;
