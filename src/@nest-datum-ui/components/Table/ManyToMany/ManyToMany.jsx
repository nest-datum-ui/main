import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '@nest-datum-ui/components/Loader';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import DialogManyToManyItem from '@nest-datum-ui/components/Dialog/ManyToMany/Item';
import DialogManyToManyDrop from '@nest-datum-ui/components/Dialog/ManyToMany/Drop';

let ManyToMany = ({
	withAccessToken,
	storeName,
	url,
	path,
	filterOptions,
	columns,
	title,
	description,
	children,
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
	const tableColumns = React.useMemo(() => (typeof columns === 'function')
		? columns()
		: ([ 'id' ]), [
		columns,
	]);
	const select = React.useMemo(() => {
		const output = {};

		tableColumns.forEach(([ column ]) => {
			output[column] = true;
		});
		return output;
	}, [
		tableColumns,
	]);
	const onAdd = React.useCallback((e) => {
		actionDialogOpen(`${storeName}Item`, { relationId: '0' })();
	}, [
		storeName,
	]);
	const onDrop = React.useCallback((relationId) => (e) => {
		actionDialogOpen(`${storeName}Drop`, { relationId })();
	}, [
		storeName,
	]);

	React.useEffect(() => {
		if (!unmount) {
			console.log('select', select);

			actionApiListGet({
				id: storeName, 
				url,
				path,
				withAccessToken,
				page, 
				limit, 
				filter: filterOptions(),
				select,
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
		select,
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
			? <React.Fragment>
				{title
					? <Typography
						component="div"
						variant="h6">
						{title}
					</Typography>
					: <React.Fragment />}
				{description 
					? <Typography
						component="div"
						variant="caption"
						color="textSecondary">
						{description}
					</Typography>
					: <React.Fragment />}
				<Box py={2}>
					<Button
						disableElevation
						variant="contained"
						color="secondary"
						size="small"
						startIcon={<AddIcon />}
						onClick={onAdd}>
						Add new relation
					</Button>
				</Box>
				{children
					? <DialogManyToManyItem
						withAccessToken={withAccessToken}
						storeName={storeName}
						url={url}
						path={path}>
						{children}
					</DialogManyToManyItem>
					: <React.Fragment />}
				<DialogManyToManyDrop
					withAccessToken={withAccessToken}
					storeName={storeName}
					url={url}
					path={path} />
			</React.Fragment>
			: <React.Fragment />}
		{(Array.isArray(data))
			? ((data.length > 0)
				? <Box pb={3}>
					<TablePagination
						withChangeLimit
						total={total}
						page={page}
						limit={limit}
						length={data.length}
						onChange={onChangePage}
						onLimit={onLimit}>
						<TableHead>
							<TableRow>
							{Array.isArray(tableColumns)
								? tableColumns.map(([ column, title ]) => {
									return <TableCell key={column}>
										<Typography 
											component="div"
											variant="caption"
											color="textSecondary">
											{title}
										</Typography>
									</TableCell>
								})
								: <React.Fragment />}
								<TableCell />
							</TableRow>
						</TableHead>
						{(!loader && !unmount)
							? <TableBody>
								{data.map((item, index) => {
									return <TableRow key={item.id || index}>
										{Array.isArray(tableColumns)
											? tableColumns.map(([ column, title ]) => {
												return <TableCell key={column}>
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
														{item[column]}
													</Typography>
												</TableCell>
											})
											: <React.Fragment />}
											<TableCell width="1%">
												<IconButton onClick={onDrop(item.id)}>
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
				</Box>
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

ManyToMany = React.memo(ManyToMany);
ManyToMany.propTypes = {
	storeName: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
};
ManyToMany.defaultProps = {
	withAccessToken: true,
	filterOptions: () => ({}),
	columns: () => ([ 'id' ]),
};

export default ManyToMany;
