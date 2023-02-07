import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { FILES_KEY_MANAGER } from '@nest-datum-ui-lib/files/consts/keys.js';
import { FILES_PATH_FOLDER } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Pagination from '@nest-datum-ui/components/Pagination';

let ManagerPagination = ({ total }) => {
	const page = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'limit' ])) ?? 60;
	const onPage = React.useCallback((e, newPage) => {
		actionApiListProp(FILES_PATH_FOLDER, 'data', [])();
		actionApiListPage(FILES_PATH_FOLDER, newPage);
	}, [
	]);
	const onLimit = React.useCallback((e) => {
		actionApiListLimit(FILES_PATH_FOLDER, e);
		actionApiListPage(FILES_PATH_FOLDER, 1);
	}, [
	]);

	return <React.Fragment>
		<ListManager />
		{total > 5
			&& <Pagination
				withChangeLimit
				total={total}
				page={page}
				limit={limit}
				onChange={onPage}
				onLimit={onLimit} />}
	</React.Fragment>;
};

ManagerPagination = React.memo(ManagerPagination);
ManagerPagination.defaultProps = {
	total: 0,
};
ManagerPagination.propTypes = {
	total: PropTypes.number,
};

export default ManagerPagination;
