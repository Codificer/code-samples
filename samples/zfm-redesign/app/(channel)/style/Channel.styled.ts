'use client';

import { rem } from '@/lib/utils';

import styled from 'styled-components';

export const StyledTrackBlockShort = styled.section`
	flex: 1 1 100%;
	width: 100%;
	max-width: ${rem(555)};
	margin-top: ${rem(40)};

	@media screen and (max-width: 991px) {
		max-width: 100%;
	}
`;

export const StyledTrackBlock = styled.main`
	width: 100%;
	padding-bottom: ${rem(40)};

	@media screen and (max-width: 576px) {
		padding: ${rem(10)} ${rem(20)} ${rem(40)};
	}
`;
