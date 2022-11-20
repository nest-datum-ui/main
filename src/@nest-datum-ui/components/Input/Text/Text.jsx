import React from 'react';
import { useSelector } from 'react-redux';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Input from '@nest-datum-ui/components/Input';

let Text = (props) => {
	const dataType = useSelector(selectorFindArray([ 'api', 'list', 'dataTypeList', 'data' ], (item) => item['id'] === 'text'));
	const dataTypeLabel = (dataType || {})['label'];
	const dataTypePlaceholder = (dataType || {})['placeholder'];

	return <React.Fragment>
		<Input 
			label={(dataTypeLabel ?? props['label'])}
			placeholder={dataTypePlaceholder}
			{ ...props }
			type="text" />
	</React.Fragment>;
};

Text = React.memo(Text);
Text.defaultProps = {
	label: 'Text'
};
Text.propTypes = {
};

export default Text;
