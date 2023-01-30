import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { SSO_PATH_ROLE } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import SsoSelectRoleStatus from '@nest-datum-ui-lib/sso/components/Select/Role/Status';

let Status = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'roleStatusId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'roleStatusId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'roleStatusId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<SsoSelectRoleStatus
				disabled={loader}
				name="roleStatusId"
				label="Role status"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
	storeFormName: SSO_PATH_ROLE,
};
Status.propTypes = {
	storeFormName: PropTypes.string,
};

export default Status;
