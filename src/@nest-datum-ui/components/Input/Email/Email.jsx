import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Input from '@nest-datum-ui/components/Input';
import utilsValidateEmail from '@nest-datum-ui/utils/validate/email.js';

let Email = ({
	onInput,
	...props
}) => {
	const dataType = useSelector(selectorFindArray([ 'api', 'list', 'dataTypeList', 'data' ], (item) => item['id'] === 'email'));
	const dataTypeLabel = (dataType || {})['label'];
	const dataTypePlaceholder = (dataType || {})['placeholder'];
	const _onInput = React.useCallback((e) => {
		utilsValidateEmail(e);
		onInput(e);
	}, [
		onInput,
	]);

	return <React.Fragment>
		<Input 
			label={dataTypeLabel}
			placeholder={dataTypePlaceholder}
			onInput={_onInput}
			{ ...props }
			type="text" />
	</React.Fragment>;
};

Email = React.memo(Email);
Email.defaultProps = {
	onInput: () => {},
};
Email.propTypes = {
	onInput: PropTypes.func,
};

export default Email;
