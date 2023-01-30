import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { FORMS_PATH_FORM_OPTION_RELATION } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Loader from '@nest-datum-ui/components/Loader';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import Item from './Item';

let Relation = ({
	formOptionId,
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_OPTION_RELATION, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_OPTION_RELATION, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_OPTION_RELATION, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_OPTION_RELATION, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_OPTION_RELATION, 'data' ]));
	const displayLoader = !utilsCheckArr(data) || unmount || loader;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(FORMS_PATH_FORM_OPTION_RELATION, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(FORMS_PATH_FORM_OPTION_RELATION , e), [
	]);
	const onDrop = React.useCallback((entityId) => (e) => actionDialogOpen(FORMS_PATH_FORM_OPTION_RELATION, { entityId })(), [
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(formOptionId)) {
			actionApiListGet(FORMS_PATH_FORM_OPTION_RELATION, {
				filter: {
					formOptionId,
				},
			})();
		}
	}, [
		unmount,
		formOptionId,
	]);

	React.useEffect(() => () => actionApiListClear(FORMS_PATH_FORM_OPTION_RELATION)(), [
	]);

	return <React.Fragment>
		<Loader visible={displayLoader} />
		{(!displayLoader)
			&& <React.Fragment>
				<TablePagination
					withChangeLimit
					total={total}
					page={page}
					limit={limit}
					length={(data || []).length ?? 0}
					onChange={onChangePage}
					onLimit={onLimit}
					headRowCells={[
						<TableCell key="form">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Form
							</Typography>
						</TableCell>,
						<TableCell key="createdAt">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Created at
							</Typography>
						</TableCell>,
					]}
					{ ...props }>
					{utilsCheckArr(data)
						&& data.map((item, index) => <Item
							key={item.id}
							formOptionId={formOptionId}
							id={item.id}
							formId={item.formId}
							createdAt={item.createdAt}
							onDrop={onDrop(item.id)} />)}
				</TablePagination>
			</React.Fragment>}
	</React.Fragment>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
};
Relation.propTypes = {
	children: PropTypes.array,
};

export default Relation;
