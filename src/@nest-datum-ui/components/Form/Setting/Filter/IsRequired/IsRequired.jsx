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

let IsRequired = ({ storeName }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const filter = React.useMemo(() => utilsUrlSearchPathItem('filter', location.search, true) || {}, [
		location,
	]);
	const value = (filter['isRequired'] === true
		|| filter['isRequired'] === false)
		? Number(filter['isRequired'])
		: '';
	const onChange = React.useCallback((e) => {
		actionApiListProp(storeName, 'loader', true)();

		const newValue = e.target.value;
		let url = ``,
			query = utilsUrlSearchPathItem('query', window.location.search),
			sort = utilsUrlSearchPathItem('sort', window.location.search, true);

		if (!newValue) {
			delete filter['isRequired'];
		}
		else {
			filter['isRequired'] = Boolean(Number(newValue));
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
			<FormLabel id={`form-filter-option-required-${storeName}`}>
				Required fields
			</FormLabel>
			<RadioGroup
				aria-labelledby={`form-filter-option-required-${storeName}`}
				name={`form-filter-option-required-${storeName}`}
				value={value}
				onChange={onChange}>
				<FormControlLabel
					control={<Radio />}  
					value="" 
					label="Все" />
				<FormControlLabel
					control={<Radio />}  
					value="1" 
					label="Mandatory only" />
				<FormControlLabel
					control={<Radio />}  
					value="0" 
					label="Optional" />
			</RadioGroup>
		</FormControl>
	</React.Fragment>;
};

IsRequired = React.memo(IsRequired);
IsRequired.defaultProps = {
};
IsRequired.propTypes = {
};

export default IsRequired;
