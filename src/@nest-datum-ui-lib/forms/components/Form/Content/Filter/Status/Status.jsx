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
import SelectContentStatusMultiple from '@nest-datum-ui-lib/forms/components/Select/Content/Status/Multiple';

let Status = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const statusData = useSelector(selectorMainExtract([ 'api', 'list', 'contentStatuses', 'data' ]));
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true) || {}, [
		location,
	]);
	const filterContentStatus = React.useMemo(() => Array.isArray(statusData)
		? statusData
			.filter((item) => (filter['contentStatusId'] || []).includes(item.id))
			.map((item) => ({
				value: item.id,
				text: item.name,
			}))
		: [], [
		filter,
		statusData,
	]);
	const onFilterContentStatusId = React.useCallback((e, newValue) => {
		actionApiListProp('formsContentList', 'loader', true)();

		if (newValue.length > 0) {
			filter['contentStatusId'] = [ '$In', ...newValue.map((item) => item.value) ];
		}
		else {
			delete filter['contentStatusId'];
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
	const onClearContentStatusId = React.useCallback((e) => {
		actionApiListProp('formsContentList', 'loader', true)();

		delete filter['contentStatusId'];

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
			{(filterContentStatus.length > 0)
				? <Grid
					item
					xs={false}>
					<IconButton 
						size="small"
						color="error"
						onClick={onClearContentStatusId}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Grid>
				: <React.Fragment />}
			<Grid
				item
				xs={true}>
				<SelectContentStatusMultiple 
					multiple
					label="Status"
					name="contentStatusId"
					onChange={onFilterContentStatusId}
					value={filterContentStatus} />
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
