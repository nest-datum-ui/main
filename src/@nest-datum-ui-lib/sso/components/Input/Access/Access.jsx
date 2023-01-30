import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { SSO_PATH_ROLE } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import SsoSelectAccess from '@nest-datum-ui-lib/sso/components/Select/Access';

let Access = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'accessId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'accessId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'accessId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<SsoSelectAccess
				disabled={loader}
				name="accessId"
				label="Access"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Access = React.memo(Access);
Access.defaultProps = {
	storeFormName: SSO_PATH_ROLE,
};
Access.propTypes = {
	storeFormName: PropTypes.string,
};

export default Access;
