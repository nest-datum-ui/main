import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { 
	FILES_PATH_FOLDER,
	FILES_PATH_FILE, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Pagination from '@nest-datum-ui/components/Pagination';
import ListManager from '../Manager.jsx';

let ManagerPagination = ({ 
	total,
	...props 
}) => {
	const range = React.useMemo(() => [ 12, 36, 60, 96, 144, 216 ], []);
	const page = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_FOLDER, 'limit' ])) ?? 60;
	const onPage = React.useCallback((e, newPage) => {
		actionApiListPage(FILES_PATH_FOLDER, newPage, () => {
			actionApiListProp(FILES_PATH_FOLDER, 'data', [])();
		});
	}, [
	]);
	const onLimit = React.useCallback((e) => {
		actionApiListClear(FILES_PATH_FOLDER, { limit: e.target.value })();
		actionApiListClear(FILES_PATH_FILE, { limit: e.target.value })();
		actionApiListProp(FILES_PATH_FOLDER, 'allowLoadList', false)();
	}, [
	]);

	return <React.Fragment>
		<ListManager { ...props } />
		{total > 5
			&& <Pagination
				withChangeLimit
				displayButtons={total > limit}
				total={total}
				page={page}
				limit={limit}
				onChange={onPage}
				onLimit={onLimit}
				range={range} />}
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
