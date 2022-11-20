import { BrowserHistory } from 'history';
import React, { useContext } from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';

export default function usePathname() {
	let [ state, setState ] = React.useState(window.location.pathname);
	const navigation = useContext(UNSAFE_NavigationContext).navigator;
	
	React.useLayoutEffect(() => {
		if (navigation) {
			navigation.listen((locationListener) =>
				setState(locationListener.location.pathname)
			);
		}
	}, [ navigation ]);

	return state;
}