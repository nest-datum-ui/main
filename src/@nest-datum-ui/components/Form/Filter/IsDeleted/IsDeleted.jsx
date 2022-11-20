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

let IsDeleted = ({ storeName }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true) || {}, [
		location,
	]);
	const value = (filter['isDeleted'] === true
		|| filter['isDeleted'] === false)
		? Number(filter['isDeleted'])
		: '';
	const onChange = React.useCallback((e) => {
		actionApiListProp(storeName, 'loader', true)();

		const newValue = e.target.value;
		let url = ``,
			query = utilsUrlSearchPathItem('query', window.location.search),
			sort = utilsUrlSearchPathItem('sort', window.location.search, true);

		if (!newValue) {
			delete filter['isDeleted'];
		}
		else {
			filter['isDeleted'] = Boolean(Number(newValue));
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
			<FormLabel id={`form-filter-option-deleted-${storeName}`}>
				Visibility
			</FormLabel>
			<RadioGroup
				aria-labelledby={`form-filter-option-deleted-${storeName}`}
				name={`form-filter-option-deleted-${storeName}`}
				value={value}
				onChange={onChange}>
				<FormControlLabel
					control={<Radio />}  
					value="" 
					label="All" />
				<FormControlLabel
					control={<Radio />}  
					value="1" 
					label="Remote only" />
				<FormControlLabel
					control={<Radio />}  
					value="0" 
					label="Not deleted" />
			</RadioGroup>
		</FormControl>
	</React.Fragment>;
};

IsDeleted = React.memo(IsDeleted);
IsDeleted.defaultProps = {
};
IsDeleted.propTypes = {
};

export default IsDeleted;
