import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormDropLoop as actionApiFormDropLoop } from '@nest-datum-ui/components/Store/api/actions/form/loop.js';
import { FILES_PATH_FILE } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import FilesPaper from '../Paper.jsx';

let ById = ({
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/${children}`, 'loader' ]));
	const name = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/${children}`, 'name' ]));
	const path = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/${children}`, 'path' ]));
	const size = useSelector(selectorMainExtract([ 'api', 'form', `${FILES_PATH_FILE}/${children}`, 'size' ]));

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(() => `${FILES_PATH_FILE}/${children}`, {
				entityId: children,
				withLoop: true,
			})();
		}
	}, [
		unmount,
		children,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(`${FILES_PATH_FILE}/${children}`)();
		actionApiFormDropLoop(`${FILES_PATH_FILE}/${children}`);
	}, [
		children,
	]);

	return <React.Fragment>
		<FilesPaper
			loader={loader}
			name={name}
			path={path}
			size={size} />
	</React.Fragment>;
};

ById = React.memo(ById);
ById.defaultProps = {
};
ById.propTypes = {
	children: PropTypes.string,
};

export default ById;
