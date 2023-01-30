import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Input from '@nest-datum-ui/components/Input';

let TextWithStore = ({
	storeFormName,
	name,
	...props
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, name ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', name ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, name, e.target.value)(), [
		storeFormName,
		name,
	]);

	return <React.Fragment>
		<Box py={2}>
			<Input
				type="text"
				label="Text"
				placeholder="Example string..."
				disabled={loader}
				name={name}
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

TextWithStore = React.memo(TextWithStore);

let Text = (props) => {
	return (props.storeFormName && props.name)
		? <TextWithStore { ...props } />
		: <Input
			type="text"
			label="Text"
			placeholder="Example string..."
			{ ...props } />;
};

Text = React.memo(Text);
Text.defaultProps = {
};
Text.propTypes = {
	storeFormName: PropTypes.string,
	name: PropTypes.string,
};

export default Text;
