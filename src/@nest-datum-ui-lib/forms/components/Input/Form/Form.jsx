import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { FORMS_PATH_CONTENT } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import FormsSelectForm from '@nest-datum-ui-lib/forms/components/Select/Form';

let Form = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'formId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'formId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'formId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<FormsSelectForm
				disabled={loader}
				name="formId"
				label="Form"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
	storeFormName: FORMS_PATH_CONTENT,
};
Form.propTypes = {
	storeFormName: PropTypes.string,
};

export default Form;
