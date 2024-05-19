'use client';
import { adfoxBiddersMap } from '@/components/AdvertismentRotator/config';
import { setGlobalHasAdblock } from '@/redux/slices/global';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useYandexAdv = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		function reloadAdv() {
			const scriptReload = document.createElement('script');
			const checkScript: HTMLScriptElement = document.getElementById(
				'yandex_reload',
			) as HTMLScriptElement;

			if (!checkScript || checkScript.src === '') {
				scriptReload.type = 'text/javascript';
				scriptReload.async = true;
				scriptReload.id = 'yandex_reload';
				scriptReload.innerHTML = `
					setInterval(() => Ya.adfoxCode.reload(null, {onlyIfWasVisible: true}), 120*1000); //reload after 120sec
				`;
				document.head.appendChild(scriptReload);
			}
		}
		const checkScript: HTMLScriptElement = document.getElementById(
			'yandex_header-bidding',
		) as HTMLScriptElement;

		if (!checkScript || checkScript.src === '') {
			const head = document.getElementsByTagName('head')[0];
			const scriptEl = document.createElement('script');
			const scriptHB = document.createElement('script');
			const scriptContext = document.createElement('script');
			const script2 = document.createElement('script');

			scriptEl.innerHTML = `
					var adfoxBiddersMap = ${adfoxBiddersMap && JSON.stringify(adfoxBiddersMap)};

					var userTimeout = 500;

					window.YaHeaderBiddingSettings = {
					biddersMap: adfoxBiddersMap,
					timeout: userTimeout,
				};
			`;

			scriptHB.type = 'text/javascript';
			scriptHB.src = 'https://yandex.ru/ads/system/header-bidding.js';
			scriptHB.async = true;
			scriptHB.id = 'yandex_header-bidding';

			scriptContext.type = 'text/javascript';
			scriptContext.src = 'https://yandex.ru/ads/system/context.js';
			scriptContext.id = 'yandex_context';

			script2.type = 'text/javascript';
			script2.innerHTML = `window.Ya || (window.Ya = {});
			window.yaContextCb = window.yaContextCb || [];
			window.Ya.adfoxCode || (window.Ya.adfoxCode = {});
			window.Ya.adfoxCode.hbCallbacks || (window.Ya.adfoxCode.hbCallbacks = []);`;

			scriptHB.onload = () => {
				console.log('%cload hb', 'color: green');
				dispatch(setGlobalHasAdblock(false));
				reloadAdv();
			};
			scriptHB.onerror = () => {
				console.log('%cerror hb', 'color: red');
				dispatch(setGlobalHasAdblock(true));
			};

			scriptContext.onload = () => {
				console.log('%cload ctx', 'color: green');
			};
			scriptContext.onerror = () => {
				console.log('%cerror ctx', 'color: red');
			};

			head.appendChild(scriptContext);
			head.appendChild(script2);
			head.appendChild(scriptEl);
			head.appendChild(scriptHB);
		}
	}, [dispatch]);
};

export default useYandexAdv;
