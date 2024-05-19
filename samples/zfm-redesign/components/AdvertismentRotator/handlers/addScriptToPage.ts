const addScriptToPage = (
	data: string,
	type: string
) => {
	try {
		const adsBlock = Array.from(document.querySelectorAll(`.${type}`));
		const scriptAds = document.createElement('script');

		scriptAds.type = 'text/javascript';
		scriptAds.text = data;
		scriptAds.id = `script_${type}`;
		const block = adsBlock[0];
		if (block && block.parentNode) block.parentNode.appendChild(scriptAds);
	} catch (e) {
		console.error(`error with adv block ${type}`, e);
	}
};

export default addScriptToPage;
