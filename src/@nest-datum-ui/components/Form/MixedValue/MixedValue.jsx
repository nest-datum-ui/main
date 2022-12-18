import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import InputMixed from '@nest-datum-ui/components/Input/Mixed';
import Store from '@nest-datum-ui/components/Store';

let MixedValue = ({ 
	entityId,
	dataTypeId,
	label, 
	name,
	...props
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const dataTypeIdLocal = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'dataTypeId' ])) || dataTypeId;
	const value = useSelector(selectorMainExtract([ 'api', 'form', entityId, name ]));
	const errorValue = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', name ]));
	const [ defaultValueMemo, setDefaultValueMemo ] = React.useState(() => value || '');
	const onChangeValue = React.useCallback((e) => {
		actionApiFormProp(entityId, name, (e.target.files
			&& e.target.files.length > 0
			? (() => {
				e.target.files['systemId'] = e.target.value['systemId'];
				e.target.files['path'] = e.target.value['path'];

				return e.target.files;
			})()
			: e.target.value))();
	}, [
		entityId,
		name,
	]);

	React.useEffect(() => {
		if (dataTypeIdLocal) {
			const value = (Store()
				.getState()
				.api
				.form[entityId] || {})[name];

			setDefaultValueMemo((currentState) => {
				const newValue = (value || '');

				if (newValue !== currentState) {
					return newValue;
				}
				return currentState;
			});
		}
	}, [
		entityId,
		name,
		dataTypeIdLocal,
		setDefaultValueMemo,
	]);

	return <React.Fragment>
		<InputMixed
			{ ...props }
			disabled={loader}
			dataTypeId={dataTypeIdLocal}
			defaultValue={defaultValueMemo}
			onChange={onChangeValue}
			error={errorValue}
			name={name}
			label={label} />
	</React.Fragment>;
};

MixedValue = React.memo(MixedValue);
MixedValue.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
};
MixedValue.defaultProps = {
	name: 'value',
	label: 'Value',
};

export default MixedValue;
