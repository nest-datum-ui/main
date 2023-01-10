import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useLocation,
	useNavigate, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Store from '@nest-datum-ui/components/Store';
import Loader from '@nest-datum-ui/components/Loader';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import TableCellSort, {
	onChange as onTableCellSortChange,
} from '@nest-datum-ui/components/Table/Cell/Sort';
import validateDate from '@nest-datum-ui/utils/validate/date.js';

let Err = ({
	withAccessToken,
	storeName,
	url,
	path,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const location = useLocation();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
	const dataSelected = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selected' ]));
	const query = utilsUrlSearchPathItem('query', location.search);
	const select = utilsUrlSearchPathItem('select', location.search);
	const filter = utilsUrlSearchPathItem('filter', location.search);
	const sort = utilsUrlSearchPathItem('sort', location.search);
	const onChangePage = React.useCallback((e, newPage) => {
		actionApiListProp(storeName, 'loader', true)();
		actionApiListProp(storeName, 'selected', [])();
		actionApiListProp(storeName, 'page', newPage)();
	}, [
		storeName,
	]);
	const onLimit = React.useCallback((e) => {
		actionApiListProp(storeName, 'loader', true)();
		actionApiListProp(storeName, 'selected', [])();
		actionApiListProp(storeName, 'limit', e.target.value)();
	}, [
		storeName,
	]);
	const onSortId = React.useCallback((sortValue) => {
		actionApiListProp(storeName, 'loader', true)();
		actionApiListProp(storeName, 'selected', [])();
		navigate(onTableCellSortChange('id', sortValue));
	}, [
		navigate,
		storeName,
	]);
	const onSortCreatedAt = React.useCallback((sortValue) => {
		actionApiListProp(storeName, 'loader', true)();
		actionApiListProp(storeName, 'selected', [])();
		navigate(onTableCellSortChange('createdAt', sortValue));
	}, [
		navigate,
		storeName,
	]);
	const onMassSelect = React.useCallback((e) => {
		actionApiListProp(storeName, 'selected', (e.target.checked)
			? ((Store()
				.getState()
				.api
				.list[storeName] || {})
				.data || [])
				.map((item) => item.id)
			: [])();
	}, [
		storeName,
	]);
	const onMassDelete = React.useCallback(() => {
	}, [
	]);
	const onSelect = React.useCallback((id) => (e) => {
		const dataSelected = (Store()
			.getState()
			.api
			.list[storeName] || {})
			.selected || [];
		const dataSelectedIndex = dataSelected.indexOf(id);

		(e.target.checked && dataSelectedIndex < 0)
			? dataSelected.push(id)
			: dataSelected.splice(dataSelectedIndex, 1);
		actionApiListProp(storeName, 'selected', [ ...dataSelected ])();
	}, [
		storeName,
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet({
				id: storeName, 
				url,
				path,
				withAccessToken,
				page, 
				limit, 
				query,
				...select
					? { select: JSON.parse(decodeURI(select)) }
					: {},
				...filter
					? { filter: JSON.parse(decodeURI(filter)) }
					: {},
				...sort
					? { sort: JSON.parse(decodeURI(sort)) }
					: {},
			})(enqueueSnackbar);
		}
	}, [
		storeName,
		withAccessToken,
		url,
		path,
		unmount,
		page,
		limit,
		query,
		select,
		filter,
		sort,
		enqueueSnackbar,
	]);

	React.useEffect(() => () => {
		actionApiListClear(storeName)();
	}, [
		storeName,
	]);

	return <React.Fragment>
		<Loader visible={!Array.isArray(data)} />
		{(Array.isArray(data))
			? ((data.length > 0)
				? <TablePagination
					withChangeLimit
					withMassDelete
					total={total}
					page={page}
					limit={limit}
					length={data.length}
					onChange={onChangePage}
					onLimit={onLimit}
					onMassSelect={onMassSelect}
					onMassDelete={onMassDelete}
					isSelected={(dataSelected || []).length > 0 && (dataSelected || []).length === data.length}>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox" />
							<TableCellSort 
								name="id"
								onChange={onSortId}>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									ID
								</Typography>
							</TableCellSort>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Host
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Source
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Content
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									User
								</Typography>
							</TableCell>
							<TableCellSort
								name="createdAt"
								onChange={onSortCreatedAt}>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Story
								</Typography>
							</TableCellSort>
						</TableRow>
					</TableHead>
					{(!loader && !unmount)
						? <TableBody>
							{data.map((item, index) => {
								return <TableRow key={item.id}>
									<TableCell 
										padding="checkbox"
										sx={{ minWidth: '1%' }}>
										<Checkbox 
											checked={(dataSelected || []).includes(item.id)}
											onChange={onSelect(item.id)} />
									</TableCell>
									<TableCell sx={{ minWidth: '14%' }}>
										<Typography 
											component="div"
											color={item.isDeleted
												? 'textSecondary'
												: 'inherit'}
											sx={{
												textDecoration: item.isDeleted
													? 'line-through'
													: 'inherit',
											}}>
											{item.id}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '16%' }}>
										<Typography 
											component="div"
											color={item.isDeleted
												? 'textSecondary'
												: 'secondary'}
											sx={{
												textDecoration: item.isDeleted
													? 'line-through'
													: 'initial',
											}}>
											{item.replicaHost}
										</Typography>
										<div />
										<Typography 
											component="div"
											color={item.isDeleted
												? 'textSecondary'
												: 'inherit'}
											sx={{
												textDecoration: item.isDeleted
													? 'line-through'
													: 'inherit',
											}}>
											{item.servId}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '18%' }}>
										<Box pb={1}>
											<Typography component="div">
												method: <b>{item.method}</b>
											</Typography>
										</Box>
										<Box pb={1}>
											<Typography component="div">
												file: <b>{item.file}</b>
											</Typography>
										</Box>
										<Box pb={1}>
											<Typography component="div">
												line: <b>{Number(item.line)}</b>
											</Typography>
										</Box>
									</TableCell>
									<TableCell sx={{ minWidth: '23%' }}>
										<Typography
											component="code"
											variant="subtitle1"
											color="textSecondary"
											sx={{
												textDecoration: item.isDeleted
													? 'line-through'
													: 'initial',
											}}>
											{(item.content || '').length > 100
												? `${(item.content || '').substring(0, 100)}...`
												: (item.content || '')}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '13%' }}>
										<Typography component="div">
											{item.userId}
										</Typography>
									</TableCell>
									<TableCell sx={{ width: '15%' }}>
										{validateDate(item.createdAt)
											? <Box pb={1}>
												<Typography	
													component="div"
													variant="caption"
													color="textSecondary">
													Created at:
												</Typography>
												<Typography component="div">
													<b>{format(new Date(item.createdAt), 'dd MMMM, hh:mm')}</b>
												</Typography>
											</Box>
											: <React.Fragment />}
									</TableCell>
								</TableRow>;
							})}
						</TableBody>
						: <tbody>
							<tr>
								<td 
									style={{
										position: 'absolute',
										width: '100%',
									}}>
									<Loader visible />
								</td>
							</tr>
							<tr>
								<td
									style={{
										height: '160px',
										minHeight: '160px',
										maxHeight: '160px',
										paddingTop: '48px',
										paddingBottom: '48px',
									}} />
							</tr>
						</tbody>}
				</TablePagination>
				: <Box
					py={6}
					display="flex"
					justifyContent="center">
					<Typography
						variant="subtitle2"
						color="secondary">
						No entries created.
					</Typography>
				</Box>)
			: <React.Fragment />}
	</React.Fragment>;
};

Err = React.memo(Err);
Err.defaultProps = {
	withAccessToken: true,
	storeName: 'logsErrList',
	url: process.env.SERVICE_LOGS,
	path: 'err',
};
Err.propTypes = {
};

export default Err;
