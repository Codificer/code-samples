/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// import sendError from 'lib/sendError';

import { AdvBlock, AdvUnit } from '../config';

const fetchRotator = async (
	advBlock: AdvBlock | undefined,
	type: string,
	advUnit: AdvUnit | undefined
) => {
	if (!advBlock || !advUnit) return '';
	const { containerId, params } = advBlock;
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let paramsString = '';

	if (params) {
		for (const key in params) {
			paramsString += `${key}: '${params[key]}',`;
		}
		paramsString = paramsString.replace(/,$/, '');
	}
	const text = `
		window.Ya.adfoxCode.hbCallbacks.push(function() {
			window.Ya.headerBidding.pushAdUnits([
				${JSON.stringify({ ...advUnit, code: containerId })}
			]);
			window.yaContextCb.push(function() {
				window.Ya.adfoxCode.create(
					{
					ownerId: XXXXXXX,
					${type === 'FULLSCREEN' ? 'type: "fullscreen",' : ''}
					containerId: '${containerId}',
					params: {
						${paramsString}
					},
                    sequentialLoading: true
				}
				);
			});
		});
	`;

	return text;
};

export default fetchRotator;
