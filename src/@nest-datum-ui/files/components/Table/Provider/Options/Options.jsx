import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useLocation,
	useNavigate, 
	useParams,
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@nest-datum-ui/components/Link';
import Loader from '@nest-datum-ui/components/Loader';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import TableCellSort, {
	onChange as onTableCellSortChange,
} from '@nest-datum-ui/components/Table/Cell/Sort';

let Options = ({
	withAccessToken,
	storeName,
	url,
	path,
	filterOptions,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const { 
		entityId,
		serviceKey, 
	} = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
	const query = utilsUrlSearchPathItem('query', location.search);
	const select = utilsUrlSearchPathItem('select', location.search);
	const filter = utilsUrlSearchPathItem('filter', location.search);
	const sort = utilsUrlSearchPathItem('sort', location.search);
	const onChangePage = React.useCallback((e, newPage) => {
		actionApiListProp(storeName, 'loader', true)();
		actionApiListProp(storeName, 'page', newPage)();
	}, [
		storeName,
	]);
	const onLimit = React.useCallback((e) => {
		actionApiListProp(storeName, 'loader', true)();
		actionApiListProp(storeName, 'limit', e.target.value)();
	}, [
		storeName,
	]);
	const onDelete = React.useCallback((providerId) => (e) => {
		actionDialogOpen('filesProviderReferenceDrop', {
			providerId,
			optionId: entityId,
			listStoreName: storeName,
		})();
	}, [
		storeName,
		entityId,
	]);
	const onSortId = React.useCallback((sortValue) => {
		actionApiListProp(storeName, 'loader', true)();
		navigate(onTableCellSortChange('id', sortValue));
	}, [
		navigate,
		storeName,
	]);
	const onSortCreatedAt = React.useCallback((sortValue) => {
		actionApiListProp(storeName, 'loader', true)();
		navigate(onTableCellSortChange('createdAt', sortValue));
	}, [
		navigate,
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
				filter: { 
					...filter
						? { ...JSON.parse(decodeURI(filter)) }
						: {},
					...filterOptions(),
				},
				...select
					? { select: JSON.parse(decodeURI(select)) }
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
		filterOptions,
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
					total={total}
					page={page}
					limit={limit}
					length={data.length}
					onChange={onChangePage}
					onLimit={onLimit}>
					<TableHead>
						<TableRow>
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
									Main
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Status
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
									<TableCell sx={{ minWidth: '18%' }}>
										<Typography 
											component={Link}
											to={`/${serviceKey}/provider/${item.id}`}
											color={item.isDeleted
												? 'line-through'
												: 'inherit'}
											sx={{
												textDecoration: item.isDeleted
													? 'textSecondary'
													: 'inherit',
											}}>
											{item.id}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '28%' }}>
										<Typography 
											component={Link}
											to={`/${serviceKey}/provider/${item.id}`}
											variant="h6"
											color={item.isDeleted
												? 'textSecondary'
												: 'secondary'}
											sx={{
												textDecoration: item.isDeleted
													? 'line-through'
													: 'initial',
											}}>
											{item.name}
										</Typography>
										<Typography
											component="div"
											variant="subtitle1"
											color="textSecondary"
											sx={{
												textDecoration: item.isDeleted
													? 'line-through'
													: 'initial',
											}}>
											{item.description}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '16%' }}>
										<Typography component="div">
											{item.providerStatusId}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '16%' }}>
										<Typography component="div">
											{item.userId}
										</Typography>
									</TableCell>
									<TableCell sx={{ width: '19%' }}>
										<Box pb={1}>
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
										<Box>
											<Typography	
												component="div"
												variant="caption"
												color="textSecondary">
												Updated at:
											</Typography>
											<Typography component="div">
												<b>{format(new Date(item.updatedAt), 'dd MMMM, hh:mm')}</b>
											</Typography>
										</Box>
									</TableCell>
									<TableCell sx={{ width: '1%' }}>
										<IconButton onClick={onDelete(item['providerProviderOptions'][0]['id'])}>
											<CloseIcon color="error" />
										</IconButton>
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

Options = React.memo(Options);
Options.defaultProps = {
	withAccessToken: true,
	storeName: 'filesProviderOptionList',
	url: process.env.SERVICE_FILES,
	path: 'provider',
	filterOptions: () => ({}),
};
Options.propTypes = {
};

export default Options;
