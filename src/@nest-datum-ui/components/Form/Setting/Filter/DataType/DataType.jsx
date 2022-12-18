import React from 'react';
import { 
	useNavigate,
	useLocation, 
} from 'react-router-dom';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SelectDataType from '@nest-datum-ui-lib/data-type/components/Select/Type';

const DataTypes = {
	text: {
		id: 'text',
		name: 'Text',
	},
};
let DataType = ({ storeName }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dataTypeKeys = React.useMemo(() => Object.keys(DataTypes), [
	]);
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true) || {}, [
		location,
	]);
	const filterOption = React.useMemo(() => Array.isArray(dataTypeKeys)
		? dataTypeKeys
			.filter((key) => (filter['dataTypeId'] || []).includes(key))
			.map((key) => ({
				value: key,
				text: DataTypes[key].name,
			}))
		: [], [
		filter,
		dataTypeKeys,
	]);
	const onFilterDataTypeId = React.useCallback((e, newValue) => {
		actionApiListProp(storeName, 'loader', true)();

		if (newValue.length > 0) {
			filter['dataTypeId'] = [ '$In', ...newValue.map((item) => item.value) ];
		}
		else {
			delete filter['dataTypeId'];
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
		storeName,
	]);
	const onClearDataTypeId = React.useCallback((e) => {
		actionApiListProp(storeName, 'loader', true)();

		delete filter['dataTypeId'];

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
		storeName,
	]);

	return <React.Fragment>
		<Grid
			container
			alignItems="center">
			{(filterOption.length > 0)
				? <Grid
					item
					xs={false}>
					<IconButton 
						size="small"
						color="error"
						onClick={onClearDataTypeId}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Grid>
				: <React.Fragment />}
			<Grid
				item
				xs={true}>
				<SelectDataType 
					multiple
					label="Data types"
					name="dataTypeId"
					onChange={onFilterDataTypeId}
					value={filterOption} />
			</Grid>
		</Grid>
	</React.Fragment>;
};

DataType = React.memo(DataType);
DataType.defaultProps = {
};
DataType.propTypes = {
};

export default DataType;
