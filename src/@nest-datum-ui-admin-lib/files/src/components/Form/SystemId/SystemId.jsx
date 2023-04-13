import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import {
	actionApiListProp,
	actionUrlFilter,
	hookUrlFilterItem,
} from '@nest-datum-ui/Store';
import Field from '@nest-datum-ui/Field';
import Select from 'components/Select';

let SystemId = () => {
	const { 
		files: { 
			filesManagerList: {
				storeName: listStoreName,
			},
			filesSystemList: { 
				storeName, 
				apiFullUrl: apiUrl, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const { search } = useLocation();
	const value = hookUrlFilterItem('systemId', search);
	const valueProcessed = (value === undefined)
		? ''
		: String(value);
	const onChange = React.useCallback((e) => {
		actionApiListProp(listStoreName, 'loader', true)(() => {
			actionUrlFilter(storeName, 'systemId', e.target.value);
		});
	}, [
		storeName,
		listStoreName,
	]);

	return <Field
		Component={React.memo((props) => <Select 
			{ ...props }
			storeName={storeName}
			apiUrl={apiUrl} />)}
		form={storeName}
		onChange={onChange}
		itemKey="name"
		name="systemId"
		label="System"
		value={valueProcessed} />;
};

SystemId = React.memo(SystemId);
SystemId.defaultProps = {
};
SystemId.propTypes = {
};

export default SystemId;
