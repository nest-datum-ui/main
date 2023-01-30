import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormDropLoop as actionApiFormDropLoop } from '@nest-datum-ui/components/Store/api/actions/form/loop.js';
import { FILES_PATH_SYSTEM } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Typography from '@mui/material/Typography';

let System = ({
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const name = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_SYSTEM}/${children}`, 'name' ]));

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(() => `${FILES_PATH_SYSTEM}/${children}`, {
				entityId: children,
				withLoop: true,
			})();
		}
	}, [
		unmount,
		children,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(`${FILES_PATH_SYSTEM}/${children}`)();
		actionApiFormDropLoop(`${FILES_PATH_SYSTEM}/${children}`);
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

System = React.memo(System);
System.defaultProps = {
};
System.propTypes = {
};

export default System;