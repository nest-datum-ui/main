import React from 'react';
import PropTypes from 'prop-types';
import InputMixed from '@nest-datum-ui/components/Input/Mixed';
import handlersState from './handlers/state.js';
import hooksSetDefaultValue from './hooks/setDefaultValue.js';

let MixedValue = ({
	stateNameForm,
	loader, 
	dataTypeId,
	name,
	value,
	error,
	onChange,
	...props
}) => {
	const [ state, setState ] = React.useState(() => value || '');
	const onState = React.useCallback((e) => handlersState(e, stateNameForm, name, onChange), [
		stateNameForm,
		name,
		onChange,
	]);

	React.useEffect(() => hooksSetDefaultValue(stateNameForm, name, dataTypeId, setState), [
		stateNameForm,
		name,
		dataTypeId,
		setState,
	]);

	return <React.Fragment>
		<InputMixed
			disabled={loader}
			dataTypeId={dataTypeId}
			defaultValue={state}
			onChange={onState}
			name={name}
			{ ...props } />
	</React.Fragment>;
};

MixedValue = React.memo(MixedValue);
MixedValue.propTypes = {
	dataTypeId: PropTypes.string.isRequired,
	stateNameForm: PropTypes.string.isRequired,
	name: PropTypes.string,
};
MixedValue.defaultProps = {
	name: 'value',
};

export default MixedValue;
