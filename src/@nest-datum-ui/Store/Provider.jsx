import React from 'react';
import { Provider as ProviderStore } from 'react-redux';
import {
	obj as utilsCheckObj,
	func as utilsCheckFunc,
	strFilled as utilsCheckStrFilled,
} from '@nest-datum-utils/check';
import { setStore } from './Store.js';
import { hookSnackbar } from './snackbar/hooks';
import { fireSchema as actionLoaderSchema } from './loader/actions/schema.js';
import { fireSchema as actionMenuSchema } from './menu/actions/schema.js';
import { fireSchema as actionDialogSchema } from './dialog/actions/schema.js';
import { fireSchema as actionBreadcrumbsSchema } from './breadcrumbs/actions/schema.js';
import { fireSchema as actionApiSchema } from './api/actions/schema.js';

let Provider = ({ children }) => {
	React.useEffect(() => {
		window.addEventListener('unhandledrejection', (e) => {
			hookSnackbar(utilsCheckObj(e.reason['MessageComponent'])
				&& (utilsCheckObj(e.reason['MessageComponent']['type'])
					|| utilsCheckFunc(e.reason['MessageComponent']['type']))
				&& utilsCheckStrFilled(e.reason['MessageComponent']['type']['name'])
				? (() => {
					const MessageComponent = e.reason['MessageComponent'];

					return <MessageComponent />;
				})()
				: e.reason.message, { 
				variant: 'error', 
			});
		});
		actionLoaderSchema()();
		actionMenuSchema()();
		actionDialogSchema()();
		actionBreadcrumbsSchema()();
		actionApiSchema()();
	}, [
	]);

	return <ProviderStore store={setStore()}>
		{children}
	</ProviderStore>
};

Provider = React.memo(Provider);
Provider.defaultProps = {
};

export default Provider;
