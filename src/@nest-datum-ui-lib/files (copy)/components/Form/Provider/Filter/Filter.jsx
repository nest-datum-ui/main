import React from 'react';
import { 
	useNavigate,
	useLocation, 
} from 'react-router-dom';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormSearch from '@nest-datum-ui/components/Form/Search';
import FormFilterIsDeleted from '@nest-datum-ui/components/Form/Filter/IsDeleted';
import FormFilterIsNotDelete from '@nest-datum-ui/components/Form/Filter/IsNotDelete';
import FormFilterProviderStatus from './Status';

let Filter = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [ filterFlag, setFilterFlag ] = React.useState(() => false);
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true), [
		location,
	]);
	const query = React.useMemo(() => utilsUrlSearchPathItem('query', window.location.search), [
	]);
	const onFilterFlag = React.useCallback((e) => {
		setFilterFlag((currentState) => !currentState);
	}, [
		setFilterFlag,
	]);
	const onSearch = React.useCallback((newQuery) => {
		const currentQuery = utilsUrlSearchPathItem('query', window.location.search) || '';

		if (newQuery !== currentQuery) {
			actionApiListProp('filesProviderList', 'loader', true)();

			let url = '',
				sort = utilsUrlSearchPathItem('sort', window.location.search, true);

			if (newQuery.length > 0) {
				url = `?query=${newQuery}`;
			}
			if (filter
				&& typeof filter === 'object'
				&& Object.keys(filter).length > 0) {
				url += url
					? `&filter=${JSON.stringify(filter)}`
					: `?filter=${JSON.stringify(filter)}`;
			}
			if (sort
				&& typeof sort === 'object'
				&& Object.keys(sort).length > 0) {
				url += url
					? `&sort=${JSON.stringify(sort)}`
					: `?sort=${JSON.stringify(sort)}`;
			}
			navigate(url);
		}
	}, [
		navigate,
		filter,
	]);
	const onClear = React.useCallback((e) => {
		actionApiListProp('filesProviderList', 'loader', true)();

		let url = '',
			query = utilsUrlSearchPathItem('query', window.location.search) || '',
			sort = utilsUrlSearchPathItem('sort', window.location.search, true);

		if (query.length > 0) {
			url = `?query=${query}`;
		}
		if (sort
			&& typeof sort === 'object'
			&& Object.keys(sort).length > 0) {
			url += url
				? `&sort=${JSON.stringify(sort)}`
				: `?sort=${JSON.stringify(sort)}`;
		}
		navigate(url);
	}, [
		navigate,
	]);
	
	return <React.Fragment>
		<FormSearch 
			onSearch={onSearch}
			defaultValue={query} />
		<Grid
			container
			spacing={3}
			alignItems="center"
			justifyContent="flex-end"
			sx={{
				paddingTop: '24px',
			}}>
			{(filterFlag
				&& typeof filter === 'object'
				&& Object.keys(filter).length > 0)
				? <Grid
					item
					xs={false}>
					<Button
						disableElevation
						color="error"
						startIcon={<CloseIcon />}
						onClick={onClear}>
						Clear
					</Button>
				</Grid>
				: <React.Fragment />}
			<Grid
				item
				xs={false}>
				<Button
					disableElevation
					color="primary"
					onClick={onFilterFlag}
					startIcon={<React.Fragment>
						<ExpandLessIcon 
							sx={{ 
								display: filterFlag 
									? 'block'
									: 'none',
								}} />
						<ExpandMoreIcon
							sx={{ 
								display: filterFlag 
									? 'none'
									: 'block',
								}} />
					</React.Fragment>}>
					<Typography
						sx={{ 
							display: filterFlag 
								? 'block'
								: 'none',
						}}>
						Collapse
					</Typography>
					<Typography
						sx={{ 
							display: filterFlag 
								? 'none'
								: 'block',
						}}>
						Filters
					</Typography>
				</Button>
			</Grid>
		</Grid>
		<Box 
			pb={filterFlag
				? 2
				: 0}
			sx={{
				position: 'relative',
				overflow: 'hidden',
				...filterFlag
					? {
						height: 'initial',
						opacity: '1',
					}
					: {
						height: '0px',
						opacity: '0.01',
					},
				}}>
			<Grid
				container
				spacing={3}>
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					lg={3}
					xl={2}>
					<FormFilterProviderStatus />
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					lg={3}
					xl={2}>
					<FormFilterIsDeleted storeName="filesProviderList" />
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					lg={3}
					xl={2}>
					<FormFilterIsNotDelete storeName="filesProviderList" />
				</Grid>
			</Grid>
		</Box>
	</React.Fragment>;
};

Filter = React.memo(Filter);
Filter.defaultProps = {
};
Filter.propTypes = {
};

export default Filter;
