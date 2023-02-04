import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormDropLoop as actionApiFormDropLoop } from '@nest-datum-ui/components/Store/api/actions/form/loop.js';
import { SSO_PATH_USER_STATUS } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Typography from '@mui/material/Typography';

let Status = ({
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const name = useSelector(selectorMainExtract([ 'api', 'form', `${SSO_PATH_USER_STATUS}/${children}`, 'name' ]));

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(() => `${SSO_PATH_USER_STATUS}/${children}`, {
				entityId: children,
				withLoop: true,
				notRedirect: true,
			})();
		}
	}, [
		unmount,
		children,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(`${SSO_PATH_USER_STATUS}/${children}`)();
		actionApiFormDropLoop(`${SSO_PATH_USER_STATUS}/${children}`);
	}, [
		children,
	]);

	return <React.Fragment>
		<Typography
			component="div"
			{ ...props }>
			{name ?? children}
		</Typography>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
};
Status.propTypes = {
};

export default Status;