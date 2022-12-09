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
import SelectRoleStatusMultiple from '@nest-datum-ui-lib/sso/components/Select/Role/Status/Multiple';

let Status = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const statusData = useSelector(selectorMainExtract([ 'api', 'list', 'ssoRoleStatusList', 'data' ]));
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true) || {}, [
		location,
	]);
	const filterRoleStatus = React.useMemo(() => Array.isArray(statusData)
		? statusData
			.filter((item) => (filter['roleStatusId'] || []).includes(item.id))
			.map((item) => ({
				value: item.id,
				text: item.name,
			}))
		: [], [
		filter,
		statusData,
	]);
	const onFilterRoleStatusId = React.useCallback((e, newValue) => {
		actionApiListProp('ssoRoleList', 'loader', true)();

		if (newValue.length > 0) {
			filter['roleStatusId'] = [ '$In', ...newValue.map((item) => item.value) ];
		}
		else {
			delete filter['roleStatusId'];
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
	const onClearroleStatusId = React.useCallback((e) => {
		actionApiListProp('ssoRoleList', 'loader', true)();

		delete filter['roleStatusId'];

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
			{(filterRoleStatus.length > 0)
				? <Grid
					item
					xs={false}>
					<IconButton 
						size="small"
						color="error"
						onClick={onClearroleStatusId}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Grid>
				: <React.Fragment />}
			<Grid
				item
				xs={true}>
				<SelectRoleStatusMultiple 
					multiple
					label="Status"
					name="roleStatusId"
					onChange={onFilterRoleStatusId}
					value={filterRoleStatus} />
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
