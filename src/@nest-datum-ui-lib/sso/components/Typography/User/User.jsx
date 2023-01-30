import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormDropLoop as actionApiFormDropLoop } from '@nest-datum-ui/components/Store/api/actions/form/loop.js';
import { SSO_PATH_USER } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Typography from '@mui/material/Typography';

let Status = ({
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const login = useSelector(selectorMainExtract([ 'api', 'form', `${SSO_PATH_USER}/${children}`, 'login' ]));

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(() => `${SSO_PATH_USER}/${children}`, {
				entityId: children,
				withLoop: true,
			})();
		}
	}, [
		unmount,
		children,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(`${SSO_PATH_USER}/${children}`)();
		actionApiFormDropLoop(`${SSO_PATH_USER}/${children}`);
	}, [
		children,
	]);

	return <React.Fragment>
		<Typography
			component="div"
			{ ...props }>
			{login ?? children}
		</Typography>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
};
Status.propTypes = {
};

export default Status;