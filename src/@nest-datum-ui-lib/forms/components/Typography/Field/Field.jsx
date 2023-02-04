import React from 'react';
import { useSelector } from 'react-redux';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormDropLoop as actionApiFormDropLoop } from '@nest-datum-ui/components/Store/api/actions/form/loop.js';
import { FORMS_PATH_FIELD } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Typography from '@mui/material/Typography';

let Field = ({
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const name = useSelector(selectorMainExtract([ 'api', 'form', `${FORMS_PATH_FIELD}/${children}`, 'name' ]));

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(() => `${FORMS_PATH_FIELD}/${children}`, {
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
		actionApiFormClear(`${FORMS_PATH_FIELD}/${children}`)();
		actionApiFormDropLoop(`${FORMS_PATH_FIELD}/${children}`);
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

Field = React.memo(Field);
Field.defaultProps = {
};
Field.propTypes = {
};

export default Field;