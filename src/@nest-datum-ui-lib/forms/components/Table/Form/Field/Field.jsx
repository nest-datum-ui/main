import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListPage as actionApiListPage } from '@nest-datum-ui/components/Store/api/actions/list/page.js';
import { fireListLimit as actionApiListLimit } from '@nest-datum-ui/components/Store/api/actions/list/limit.js';
import { FORMS_PATH_FORM_FIELD } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TypographyTitle from '@nest-datum-ui/components/Typography/Title';
import TypographyCaption from '@nest-datum-ui/components/Typography/Caption';
import ButtonCreate from '@nest-datum-ui/components/Button/Create';
import Loader from '@nest-datum-ui/components/Loader';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import Item from './Item';

let Field = ({
	formId,
	children,
	onAdd,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_FIELD, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_FIELD, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_FIELD, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_FIELD, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_FIELD, 'data' ]));
	const displayLoader = !utilsCheckArr(data) || unmount || loader;
	const onChangePage = React.useCallback((e, newPage) => actionApiListPage(FORMS_PATH_FORM_FIELD, newPage), [
	]);
	const onLimit = React.useCallback((e) => actionApiListLimit(FORMS_PATH_FORM_FIELD , e), [
	]);
	const onDrop = React.useCallback((entityId) => (e) => actionDialogOpen(FORMS_PATH_FORM_FIELD, { entityId })(), [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet(FORMS_PATH_FORM_FIELD, {
				page,
				limit,
				filter: {
					formId,
				},
			})();
		}
	}, [
		unmount,
		formId,
		page,
		limit,
	]);

	React.useEffect(() => () => actionApiListClear(FORMS_PATH_FORM_FIELD)(), [
	]);

	return <React.Fragment>
		<Loader visible={displayLoader} />
		{(!displayLoader)
			&& <React.Fragment>
				<TypographyTitle>
					Fields:
				</TypographyTitle>
				<TypographyCaption>
					Fields of current content form.
				</TypographyCaption>
				{onAdd
					&& <Box 
						pt={2}
						pb={4}>
						<ButtonCreate onClick={onAdd}>
							Add new relation
						</ButtonCreate>
					</Box>}
				<TablePagination
					withChangeLimit
					total={total}
					page={page}
					limit={limit}
					length={(data || []).length ?? 0}
					onChange={onChangePage}
					onLimit={onLimit}
					headRowCells={[
						<TableCell key="fieldId">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Field
							</Typography>
						</TableCell>,
						<TableCell key="userId">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								User
							</Typography>
						</TableCell>,
						<TableCell key="story">
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
							id={item.id}
							fieldId={item.fieldId}
							formId={item.formId}
							userId={item.userId}
							createdAt={item.createdAt}
							onDrop={onDrop(item.id)} />)}
				</TablePagination>
			</React.Fragment>}
	</React.Fragment>;
};

Field = React.memo(Field);
Field.defaultProps = {
};
Field.propTypes = {
	children: PropTypes.array,
	onAdd: PropTypes.func,
};

export default Field;
