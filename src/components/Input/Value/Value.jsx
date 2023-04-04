import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import Store, { 
	selectorMainExtract,
	actionApiFormProp, 
} from '@nest-datum-ui/Store';
import InputMixed from '@nest-datum-ui/Input/Mixed';

let Value = ({ name, value, onChange, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { storeName } } } = React.useContext(ContextProps);
	const [ state, setState ] = React.useState(() => value || '');
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'dataTypeId' ]));
	const onState = React.useCallback((e) => {
		const value = (e.target.files && e.target.files.length > 0)
			? (() => {
				e.target.files['systemId'] = e.target.value['systemId'];
				e.target.files['path'] = e.target.value['path'];

				return e.target.files;
			})()
			: e.target.value;

		actionApiFormProp(storeName, name, value)();
		onChange(e, value);
	}, [
		storeName,
		name,
		onChange,
	]);

	React.useEffect(() => {
		if (dataTypeId) {
			const value = (((Store()
				.getState()
				.api || {})
				.form || {})[storeName] || {})[name];

			setState((currentState) => {
				const newValue = (value || '');

				if (newValue !== currentState) {
					return newValue;
				}
				return currentState;
			});
		}
	}, [
		storeName,
		name,
		dataTypeId,
		setState,
	]);

	return <InputMixed
		dataTypeId={dataTypeId}
		defaultValue={state}
		onChange={onState}
		name={name}
		{ ...props } />;
};

Value = React.memo(Value);
Value.defaultProps = {
	label: 'Value',
	onChange: () => {},
};
Value.propTypes = {
	onChange: PropTypes.func,
};

export default Value;
