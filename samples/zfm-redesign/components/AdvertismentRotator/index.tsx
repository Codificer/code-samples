'use client';

import useRotator from './hook/useRotator';
import { StyledRotator } from './style/AdvertismentRotator.styled';

interface RotatorProps {
	type: string;
	style?: { [key: string]: string | boolean | number };
	index?: number;
}

export default function Rotator({ type, style, index }: RotatorProps) {
	const { containerId, hasAdblock, isMobile } = useRotator(type, index);
	if (hasAdblock) return null;
	if (!isMobile && type === 'FULLSCREEN') return null;
	return <StyledRotator style={style} className={type} id={containerId} />;
}
