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
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Loader from '@nest-datum-ui/components/Loader';
import Link from '@nest-datum-ui/components/Link';
import MenuOptionContext from '@nest-datum-ui/components/Menu/Option/Context';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import TableCellSort, {
	onChange as onTableCellSortChange,
} from '@nest-datum-ui/components/Table/Cell/Sort';
import validateDate from '@nest-datum-ui/utils/validate/date.js';

let Option = ({
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
	const onMenu = React.useCallback((itemId) => (e) => {
		actionMenuOpen(`menu-options-context-${itemId}`, e.target)();
	}, [
	]);
	const onSortId = React.useCallback((sortValue) => {
		actionApiListProp('ssoUserList', 'loader', true)();
		navigate(onTableCellSortChange('id', sortValue));
	}, [
		navigate,
	]);
	const onSortCreatedAt = React.useCallback((sortValue) => {
		actionApiListProp('ssoUserList', 'loader', true)();
		navigate(onTableCellSortChange('createdAt', sortValue));
	}, [
		navigate,
	]);

	React.useEffect(() => {
		if (!unmount
			&& url) {
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
		unmount,
		enqueueSnackbar,
		page,
		limit,
		query,
		select,
		filter,
		sort,
		storeName,
		url,
		path,
		withAccessToken,
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
									Data type
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Config
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
									<TableCell sx={{ minWidth: '17%' }}>
										<Typography 
											component={Link}
											to={item.id}
											color={item.isDeleted
												? 'textSecondary'
												: 'secondary'}
											sx={{
												textDecoration: item.isDeleted
													? 'line-through'
													: 'initial',
											}}>
											{item.id}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '24%' }}>
										<Typography 
											component={Link}
											to={item.id}
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
									<TableCell sx={{ minWidth: '19%' }}>
										<Typography component="div">
											{item.dataTypeId}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '23%' }}>
										<Box 
											pb={1}>
											<Typography 
												component="div"
												variant="caption">
												Format:
											</Typography>
											<Typography component="div">
												<b>{item.isMultiline
													? 'Multidimensional value'
													: 'Atomic value'}</b>
											</Typography>
										</Box>
										<Box 
											sx={{
												...item.isDeleted
													? {
														textDecoration: 'line-through',
														color: 'textSecondary',
													}
													: {},
											}}>
											<Typography 
												component="div"
												variant="caption">
												Required:
											</Typography>
											<Typography component="div">
												<b>{item.isRequired
													? 'Required to fill'
													: 'Not required'}</b>
											</Typography>
										</Box>
										{item.regex
											? <Box pt={1}>
												<Typography 
													component="div"
													variant="caption">
													Regex:
												</Typography>
												<Typography component="div">
													<b>{item.regex}</b>
												</Typography>
											</Box>
											: <React.Fragment />}
									</TableCell>
									<TableCell sx={{ width: '16%' }}>
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
										{validateDate(item.updatedAt)
											? <Box>
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
											: <React.Fragment />}
									</TableCell>
									<TableCell sx={{ width: '1%' }}>
										<IconButton onClick={onMenu(item.id)}>
											<MoreVertIcon />
										</IconButton>
										<MenuOptionContext 
											id={`menu-options-context-${item.id}`}
											entityId={item.id}
											withAccessToken={withAccessToken}
											storeName={storeName}
											url={url}
											path={path}
											isDeleted={item.isDeleted}
											isNotDelete={item.isNotDelete} />
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

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
