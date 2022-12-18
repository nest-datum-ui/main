import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import InputMixed from '@nest-datum-ui/components/Input/Mixed';
import Store from '@nest-datum-ui/components/Store';

let DefaultValue = ({ entityId }) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'dataTypeId' ]));
	const defaultValue = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'defaultValue' ]));
	const errorDefaultValue = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'defaultValue' ]));
	const [ defaultValueMemo, setDefaultValueMemo ] = React.useState(() => defaultValue || '');
	const onChangeDefaultValue = React.useCallback((e) => {
		actionApiFormProp(entityId, 'defaultValue', e.target.value)();
	}, [
		entityId,
	]);

	React.useEffect(() => {
		if (dataTypeId) {
			const defaultValue = (Store()
				.getState()
				.api
				.form[entityId] || {})
				.defaultValue;

			setDefaultValueMemo((currentState) => {
				const newValue = (defaultValue || '');

				if (newValue !== currentState) {
					return newValue;
				}
				return currentState;
			});
		}
	}, [
		entityId,
		dataTypeId,
		setDefaultValueMemo,
	]);

	return <React.Fragment>
		<InputMixed
			disabled={loader}
			dataTypeId={dataTypeId}
			defaultValue={defaultValueMemo}
			onChange={onChangeDefaultValue}
			error={errorDefaultValue}
			name="defaultValue"
			label="Default value" />
	</React.Fragment>;
};

DefaultValue = React.memo(DefaultValue);
DefaultValue.defaultProps = {
};
DefaultValue.propTypes = {
};

export default DefaultValue;
