import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Input from '@nest-datum-ui/components/Input';
import utilsValidateUrl from '@nest-datum-ui/utils/validate/url.js';

let Url = ({
	onInput,
	...props
}) => {
	const dataType = useSelector(selectorFindArray([ 'api', 'list', 'dataTypeList', 'data' ], (item) => item['id'] === 'url'));
	const dataTypeLabel = (dataType || {})['label'];
	const dataTypePlaceholder = (dataType || {})['placeholder'];
	const _onInput = React.useCallback((e) => {
		utilsValidateUrl(e);
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

Url = React.memo(Url);
Url.defaultProps = {
	onInput: () => {},
};
Url.propTypes = {
	onInput: PropTypes.func,
};

export default Url;
