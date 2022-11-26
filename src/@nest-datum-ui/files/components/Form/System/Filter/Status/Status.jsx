import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useNavigate,
	useLocation, 
} from 'react-router-dom';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SelectSystemStatusMultiple from '@nest-datum-ui/files/components/Select/System/Status/Multiple';

let Status = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const statusData = useSelector(selectorMainExtract([ 'api', 'list', 'filesSystemStatusList', 'data' ]));
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true) || {}, [
		location,
	]);
	const filterSystemStatus = React.useMemo(() => Array.isArray(statusData)
		? statusData
			.filter((item) => (filter['systemStatusId'] || []).includes(item.id))
			.map((item) => ({
				value: item.id,
				text: item.name,
			}))
		: [], [
		filter,
		statusData,
	]);
	const onFilterSystemStatusId = React.useCallback((e, newValue) => {
		actionApiListProp('filesSystemList', 'loader', true)();

		if (newValue.length > 0) {
			filter['systemStatusId'] = [ '$In', ...newValue.map((item) => item.value) ];
		}
		else {
			delete filter['systemStatusId'];
		}
		let url = ``,
			query = utilsUrlSearchPathItem('query', window.location.search),
			sort = utilsUrlSearchPathItem('sort', window.location.search, true);

		if (Object.keys(filter).length > 0) {
			url += `?filter=${JSON.stringify(filter)}`;
		}
		if (sort
			&& typeof sort === 'object'
			&& Object.keys(sort).length > 0) {
			url += url
				? `&sort=${JSON.stringify(sort)}`
				: `?sort=${JSON.stringify(sort)}`;
		}
		if (query) {
			url += url
				? `&query=${query}`
				: `?query=${query}`;
		}
		navigate(url);
	}, [
		navigate,
		filter,
	]);
	const onClearSystemStatusId = React.useCallback((e) => {
		actionApiListProp('filesSystemList', 'loader', true)();

		delete filter['systemStatusId'];

		let url = ``,
			query = utilsUrlSearchPathItem('query', window.location.search),
			sort = utilsUrlSearchPathItem('sort', window.location.search, true);

		if (Object.keys(filter).length > 0) {
			url += `?filter=${JSON.stringify(filter)}`;
		}
		if (sort
			&& typeof sort === 'object'
			&& Object.keys(sort).length > 0) {
			url += url
				? `&sort=${JSON.stringify(sort)}`
				: `?sort=${JSON.stringify(sort)}`;
		}
		if (query) {
			url += url
				? `&query=${query}`
				: `?query=${query}`;
		}		
		navigate(url);
	}, [
		filter,
		navigate,
	]);

	return <React.Fragment>
		<Grid
			container
			alignItems="center">
			{(filterSystemStatus.length > 0)
				? <Grid
					item
					xs={false}>
					<IconButton 
						size="small"
						color="error"
						onClick={onClearSystemStatusId}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Grid>
				: <React.Fragment />}
			<Grid
				item
				xs={true}>
				<SelectSystemStatusMultiple 
					multiple
					label="Status"
					name="systemStatusId"
					onChange={onFilterSystemStatusId}
					value={filterSystemStatus} />
			</Grid>
		</Grid>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
};
Status.propTypes = {
};

export default Status;
