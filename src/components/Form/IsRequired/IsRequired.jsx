import React from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import {
	actionUrlFilter,
	hookUrlFilterItem,
} from '@nest-datum-ui/Store';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

let IsRequired = () => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { storeName } } } = React.useContext(ContextProps);
	const { search } = useLocation();
	const [ id ] = React.useState(() => uuidv4());
	const value = hookUrlFilterItem('isRequired', search);
	const valueProcessed = (value === undefined)
		? ''
		: String(Number(value));
	const onChange = React.useCallback((e) => actionUrlFilter(storeName, 'isRequired', e.target.value, { type: Boolean }), [
		storeName,
	]);

	return <React.Fragment>
		<FormControl>
			<FormLabel id={id}>
				Required fields
			</FormLabel>
			<RadioGroup
				aria-labelledby={id}
				name={id}
				value={valueProcessed}
				onChange={onChangeMemo}>
				<FormControlLabel
					control={<Radio />}  
					value="" 
					label="All" />
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
	onChange: () => {},
	onInput: () => {},
};
IsRequired.propTypes = {
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default IsRequired;
