import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Input from '@nest-datum-ui/components/Input';
import utilsValidateFloat from '@nest-datum-ui/utils/validate/float.js';

let Float = ({
	onInput,
	placeholder,
	...props
}) => {
	const dataType = useSelector(selectorFindArray([ 'api', 'list', 'dataTypeList', 'data' ], (item) => item['id'] === 'float'));
	const dataTypeLabel = (dataType || {})['label'];
	const dataTypePlaceholder = (dataType || {})['placeholder'];
	const _onInput = React.useCallback((e) => {
		utilsValidateFloat(e);
		onInput(e);
	}, [
		onInput,
	]);

	return <React.Fragment>
		<Input 
			label={dataTypeLabel}
			placeholder={(typeof placeholder === 'string'
				|| typeof placeholder === 'number')
				? placeholder.toString() 
				: (dataTypePlaceholder || '').toString()}
			onInput={_onInput}
			{ ...props }
			type="text" />
	</React.Fragment>;
};

Float = React.memo(Float);
Float.defaultProps = {
	onInput: () => {},
};
Float.propTypes = {
	onInput: PropTypes.func,
};

export default Float;
