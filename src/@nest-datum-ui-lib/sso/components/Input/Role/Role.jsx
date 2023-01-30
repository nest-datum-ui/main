import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { SSO_PATH_USER } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import SsoSelectRole from '@nest-datum-ui-lib/sso/components/Select/Role';

let Role = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'roleId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'roleId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'roleId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<SsoSelectRole
				disabled={loader}
				name="roleId"
				label="Role"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Role = React.memo(Role);
Role.defaultProps = {
	storeFormName: SSO_PATH_USER,
};
Role.propTypes = {
	storeFormName: PropTypes.string,
};

export default Role;
