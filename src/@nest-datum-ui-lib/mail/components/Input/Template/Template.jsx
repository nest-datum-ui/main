import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { MAIL_PATH_TEMPLATE } from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import MailSelectTemplate from '@nest-datum-ui-lib/mail/components/Select/Template';

let Template = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'templateStatusId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'templateStatusId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'templateStatusId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<MailSelectTemplate
				disabled={loader}
				name="templateStatusId"
				label="Template status"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Template = React.memo(Template);
Template.defaultProps = {
	storeFormName: MAIL_PATH_TEMPLATE,
};
Template.propTypes = {
	storeFormName: PropTypes.string,
};

export default Template;
