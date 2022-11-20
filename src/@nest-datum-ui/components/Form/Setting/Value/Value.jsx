import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import InputMixed from '@nest-datum-ui/components/Input/Mixed';

let Value = ({ entityId }) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const dataTypeId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'dataTypeId' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'value' ]));
	const errorValue = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'value' ]));
	const [ defaultValueMemo ] = React.useState(() => value || '');
	const onChangeValue = React.useCallback((e) => {
		actionApiFormProp(entityId, 'value', e.target.value)();
	}, [
		entityId,
	]);

	return <React.Fragment>
		<InputMixed
			disabled={loader}
			dataTypeId={dataTypeId}
			defaultValue={defaultValueMemo}
			onChange={onChangeValue}
			error={errorValue}
			name="value"
			label="Value" />
	</React.Fragment>;
};

Value = React.memo(Value);
Value.defaultProps = {
};
Value.propTypes = {
};

export default Value;
