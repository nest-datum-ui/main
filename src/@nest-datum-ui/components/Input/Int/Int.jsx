import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Input from '@nest-datum-ui/components/Input';
import utilsValidateInt from '@nest-datum-ui/utils/validate/int.js';

let Int = ({
	onInput,
	placeholder,
	...props
}) => {
	const dataType = useSelector(selectorFindArray([ 'api', 'list', 'dataTypeList', 'data' ], (item) => item['id'] === 'int'));
	const dataTypeLabel = (dataType || {})['label'];
	const dataTypePlaceholder = (dataType || {})['placeholder'];
	const _onInput = React.useCallback((e) => {
		utilsValidateInt(e);
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

Int = React.memo(Int);
Int.defaultProps = {
	onInput: () => {},
};
Int.propTypes = {
	onInput: PropTypes.func,
};

export default Int;
