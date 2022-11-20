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

let IsMultiline = ({ storeName }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true) || {}, [
		location,
	]);
	const value = (filter['isMultiline'] === true
		|| filter['isMultiline'] === false)
		? Number(filter['isMultiline'])
		: '';
	const onChange = React.useCallback((e) => {
		actionApiListProp(storeName, 'loader', true)();

		const newValue = e.target.value;
		let url = ``,
			query = utilsUrlSearchPathItem('query', window.location.search),
			sort = utilsUrlSearchPathItem('sort', window.location.search, true);

		if (!newValue) {
			delete filter['isMultiline'];
		}
		else {
			filter['isMultiline'] = Boolean(Number(newValue));
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
			<FormLabel id={`form-filter-option-${storeName}`}>
				Multidimensional values
			</FormLabel>
			<RadioGroup
				aria-labelledby={`form-filter-option-${storeName}`}
				name={`form-filter-option-${storeName}`}
				value={value}
				onChange={onChange}>
				<FormControlLabel
					control={<Radio />}  
					value="" 
					label="All" />
				<FormControlLabel
					control={<Radio />}  
					value="1" 
					label="Multidimensional only" />
				<FormControlLabel
					control={<Radio />}  
					value="0" 
					label="Only regular" />
			</RadioGroup>
		</FormControl>
	</React.Fragment>;
};

IsMultiline = React.memo(IsMultiline);
IsMultiline.defaultProps = {
};
IsMultiline.propTypes = {
};

export default IsMultiline;
