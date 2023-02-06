import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { SSO_PATH_ACCESS } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import SsoSelectAccessStatus from '@nest-datum-ui-lib/sso/components/Select/Access/Status';

let Status = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'accessStatusId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'accessStatusId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'accessStatusId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<SsoSelectAccessStatus
				disabled={loader}
				name="accessStatusId"
				label="Access status"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
	storeFormName: SSO_PATH_ACCESS,
};
Status.propTypes = {
	storeFormName: PropTypes.string,
};

export default Status;
