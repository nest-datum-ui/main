import React from 'react';
import Progress from '@nest-datum-ui/Progress';

export const ContextLanguage = React.createContext();

let data,
	timeout;
let Provider = ({ children }) => {
	const [ state, setState ] = React.useState(() => ({
		cultureKey: process.env.LANG_DEFAULT,
		mounted: false,
	}));
	const cultureKey = state.cultureKey;
	const mounted = state.mounted;

	React.useEffect(() => {
		window.addEventListener('onLanguageChange', (e) => {
			if (e.detail) {
				setState((currentState) => {
					return (currentState.cultureKey !== e.detail.cultureKey)
						? ({
							cultureKey: e.detail.cultureKey,
							mounted: false,
						})
						: currentState;
					});
			}
		});
	}, [
		setState,
	]);

	React.useEffect(() => {
		setState((currentState) => {
			(async () => {
				clearTimeout(timeout);

				data = await import(`./data/${currentState.cultureKey}/index.js`);
				timeout = setTimeout(() => {
					setState((currentState) => ({
						...currentState,
						mounted: true,
					}));
				}, [
					1000,
				]);

			})();
			return currentState;
		});
	}, [
		cultureKey,
		setState,
	]);

	React.useEffect(() => () => {
		clearTimeout(timeout);

		data = undefined;
	}, [
	]);
	
	return <React.Fragment>
		<Progress visible={!mounted} />
		{mounted
			? <ContextLanguage.Provider value={data}>
				{children}
			</ContextLanguage.Provider>
			: <React.Fragment />}
	</React.Fragment>
};

Provider = React.memo(Provider);
Provider.defaultProps = {
};

export default Provider;
