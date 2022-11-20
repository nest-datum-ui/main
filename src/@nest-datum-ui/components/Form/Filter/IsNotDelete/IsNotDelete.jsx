import React from 'react';
import { 
	useNavigate,
	useLocation, 
} from 'react-router-dom';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

let IsNotDelete = ({ storeName }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true) || {}, [
		location,
	]);
	const value = (filter['isNotDelete'] === true
		|| filter['isNotDelete'] === false)
		? Number(filter['isNotDelete'])
		: '';
	const onChange = React.useCallback((e) => {
		actionApiListProp(storeName, 'loader', true)();

		const newValue = e.target.value;
		let url = ``,
			query = utilsUrlSearchPathItem('query', window.location.search),
			sort = utilsUrlSearchPathItem('sort', window.location.search, true);

		if (!newValue) {
			delete filter['isNotDelete'];
		}
		else {
			filter['isNotDelete'] = Boolean(Number(newValue));
		}
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

	return <React.Fragment>
		<FormControl>
			<FormLabel id={`form-filter-option-is_not_delete-${storeName}`}>
				Possibility of deletion
			</FormLabel>
			<RadioGroup
				aria-labelledby={`form-filter-option-is_not_delete-${storeName}`}
				name={`form-filter-option-is_not_delete-${storeName}`}
				value={value}
				onChange={onChange}>
				<FormControlLabel
					control={<Radio />}  
					value="" 
					label="All" />
				<FormControlLabel
					control={<Radio />}  
					value="1" 
					label="Unremovable" />
				<FormControlLabel
					control={<Radio />}  
					value="0" 
					label="Removed" />
			</RadioGroup>
		</FormControl>
	</React.Fragment>;
};

IsNotDelete = React.memo(IsNotDelete);
IsNotDelete.defaultProps = {
};
IsNotDelete.propTypes = {
};

export default IsNotDelete;
