interface AdvBids {
	bidder: string;
	params: {
		[key: string]: string | boolean;
	};
}
export interface AdvUnit {
	code: string;
	codeType: string;
	bids: AdvBids[];
	sizes?: [number][];
}

interface AdvBiddersMap {
	[key: string]: string;
}
export interface AdvBlock {
	containerId: string;
	params?: {
		[key: string]: string;
	};
}
export interface AdvBlockList {
	[key: string]: AdvBlock;
}
// not real codes of advertisment
export const advUnits: AdvUnit[] = [
	{
		code: 'xxx',
		codeType: 'combo',
		bids: [],
	},
	{
		code: 'yyy',
		codeType: 'combo',
		bids: [],
	},
];

export const adfoxBiddersMap: AdvBiddersMap = {};
export const advBlockList: AdvBlockList = {
	ZFM_HEADER: {
		containerId: 'xxx',
		params: {
			p1: '123',
			p2: '234',
		},
	},
	ZFM_FULLSCREEN: {
		containerId: 'yyy',
		params: {
			p1: '345',
			p2: '456',
		},
	},
};
