import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useLocation,
	useNavigate,
	useParams, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { fireListGet as actionApiListGet } from 'components/Store/api/actions/list/get.js';
import { fireListProp as actionApiListProp } from 'components/Store/api/actions/list/prop.js';
import { fireListClear as actionApiListClear } from 'components/Store/api/actions/list/clear.js';
import { fireOpen as actionMenuOpen } from 'components/Store/menu/actions/open.js';
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import utilsUrlSearchPathItem from 'utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Loader from 'components/Loader';
import TablePagination from 'components/Table/Pagination';
import TableCellSort, {
	onChange as onTableCellSortChange,
} from 'components/Table/Cell/Sort';
import MenuTrafficContext from '../../Menu/Traffic/Context';

let Traffic = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { serviceKey } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const gateway = (((service || {}).servServOptions || []).find((item) => item.servOptionId === 'serv-option-gateway-url') || {}).content;
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', 'trafficList', 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', 'trafficList', 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', 'trafficList', 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', 'trafficList', 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', 'trafficList', 'data' ]));
	const query = utilsUrlSearchPathItem('query', location.search);
	const select = utilsUrlSearchPathItem('select', location.search);
	const filter = utilsUrlSearchPathItem('filter', location.search);
	const sort = utilsUrlSearchPathItem('sort', location.search);
	const onChangePage = React.useCallback((e, newPage) => {
		actionApiListProp('trafficList', 'loader', true)();
		actionApiListProp('trafficList', 'page', newPage)();
	}, [
	]);
	const onLimit = React.useCallback((e) => {
		actionApiListProp('trafficList', 'loader', true)();
		actionApiListProp('trafficList', 'limit', e.target.value)();
	}, [
	]);
	const onSortId = React.useCallback((sortValue) => {
		actionApiListProp('trafficList', 'loader', true)();
		navigate(onTableCellSortChange('id', sortValue));
	}, [
		navigate,
	]);
	const onSortCreatedAt = React.useCallback((sortValue) => {
		actionApiListProp('trafficList', 'loader', true)();
		navigate(onTableCellSortChange('createdAt', sortValue));
	}, [
		navigate,
	]);
	const onMenu = React.useCallback((itemId) => (e) => {
		actionMenuOpen(`logs-menu-traffic-context-${itemId}`, e.target)();
	}, [
	]);

	React.useEffect(() => {
		if (!unmount && gateway) {
			actionApiListGet({
				id: 'trafficList', 
				url: gateway,
				path: 'traffic',
				withAccessToken: true,
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
		gateway,
		unmount,
		enqueueSnackbar,
		page,
		limit,
		query,
		select,
		filter,
		sort,
	]);

	React.useEffect(() => () => {
		actionApiListClear('trafficList')();
	}, []);

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
									Service
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Request
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Client
								</Typography>
							</TableCell>
							<TableCellSort 
								name="createdAt"
								onChange={onSortCreatedAt}>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Created at
								</Typography>
							</TableCellSort>
						</TableRow>
					</TableHead>
					{(!loader && !unmount)
						? <TableBody>
							{data.map((item, index) => {
								return <TableRow key={item.id}>
									<TableCell sx={{ width: '16%' }}>
										{item.id}
									</TableCell>
									<TableCell sx={{ minWidth: '22%' }}>
										<Typography component="div">
											Service: <b>{item.servId}</b>
										</Typography>
										<Typography component="div">
											Replica: <b>{item.replica}</b>
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '30%' }}>
										<Typography component="div">
											Method: <b>{item.method}</b>
										</Typography>
										<Typography component="div">
											Route: <b>{item.route}</b>
										</Typography>
										<Typography component="div">
											Referrer: <b>{item.referrer}</b>
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '18%' }}>
										<Typography component="div">
											User: <b>{item.userId || '-'}</b>
										</Typography>
										<Typography component="div">
											IP: <b>{item.ipAddr}</b>
										</Typography>
									</TableCell>
									<TableCell sx={{ width: '14%' }}>
										{format(new Date(item.createdAt), 'dd MMMM, hh:mm:ss')}
									</TableCell>
									<TableCell sx={{ width: '1%' }}>
										<IconButton onClick={onMenu(item.id)}>
											<MoreVertIcon />
										</IconButton>
										<MenuTrafficContext 
											id={`logs-menu-traffic-context-${item.id}`}
											entityId={item.id} />
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

Traffic = React.memo(Traffic);
Traffic.defaultProps = {
};
Traffic.propTypes = {
};

export default Traffic;
