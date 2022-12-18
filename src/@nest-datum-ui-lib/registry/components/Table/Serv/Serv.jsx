import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Loader from '@nest-datum-ui/components/Loader';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import validateDate from '@nest-datum-ui/utils/validate/date.js';

let Serv = ({
	withAccessToken,
	storeName,
	url,
	path,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'limit' ])) ?? 20;
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
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

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet({
				id: storeName, 
				url,
				path,
				withAccessToken,
				page, 
				limit,
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
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									ID
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Name
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Network
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
									Load
								</Typography>
							</TableCell>
							<TableCell>
								<Typography 
									component="div"
									variant="caption"
									color="textSecondary">
									Story
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					{(!loader && !unmount)
						? <TableBody>
							{data.map((item, index) => {
								return <TableRow key={item.id}>
									<TableCell sx={{ minWidth: '18%' }}>
										<Typography 
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
									<TableCell sx={{ minWidth: '14%' }}>
										<Typography component="div">
											{item.name}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '24%' }}>
										<Box pb={1}>
											<Typography component="div">
												Host: <b>{item.host}</b>
											</Typography>
											<Typography component="div">
												Port: <b>{item.port}</b>
											</Typography>
										</Box>
										<Box>
											<Typography component="div">
												Mysql master host: <b>{item.mysqlMasterHost}</b>
											</Typography>
											<Typography component="div">
												Mysql master port: <b>{item.mysqlMasterPort}</b>
											</Typography>
										</Box>
									</TableCell>
									<TableCell sx={{ minWidth: '12%' }}>
										<Typography component="div">
											{item.active
												? 'Online'
												: 'Stopped'}
										</Typography>
									</TableCell>
									<TableCell sx={{ minWidth: '14%' }}>
										<Typography component="div">
											{Number(item.serviceResponsLoadingIndicator)}
										</Typography>
									</TableCell>
									<TableCell sx={{ width: '18%' }}>
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
										{(item.updatedAt
											&& validateDate(item.updatedAt))
											? <Box pb={1}>
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
										{(item.restartedAt
											&& validateDate(item.restartedAt))
											? <Box>
												<Typography	
													component="div"
													variant="caption"
													color="textSecondary">
													Restarted at:
												</Typography>
												<Typography component="div">
													<b>{format(new Date(item.restartedAt), 'dd MMMM, hh:mm')}</b>
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

Serv = React.memo(Serv);
Serv.defaultProps = {
	withAccessToken: true,
	storeName: 'registryServList',
	url: process.env.SERVICE_REGISTRY,
	path: 'serv',
};
Serv.propTypes = {
};

export default Serv;
