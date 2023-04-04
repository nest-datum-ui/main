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

let IsNotDelete = () => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { storeName } } } = React.useContext(ContextProps);
	const [ id ] = React.useState(() => uuidv4());
	const { search } = useLocation();
	const value = hookUrlFilterItem('isNotDelete', search);
	const valueProcessed = (value === undefined)
		? ''
		: String(Number(value));
	const onChange = React.useCallback((e) => actionUrlFilter(storeName, 'isNotDelete', e.target.value, { type: Boolean }), [
		storeName,
	]);

	return <FormControl>
		<FormLabel id={id}>
			Possibility of deletion
		</FormLabel>
		<RadioGroup
			aria-labelledby={id}
			name={id}
			value={valueProcessed}
			onChange={onChange}>
			<FormControlLabel
				control={<Radio />}  
				value="" 
				label="All" />
			<FormControlLabel
				control={<Radio />}  
				value="0" 
				label="Can be deleted" />
			<FormControlLabel
				control={<Radio />}  
				value="1" 
				label="Unremovable" />
		</RadioGroup>
	</FormControl>;
};

IsNotDelete = React.memo(IsNotDelete);
IsNotDelete.defaultProps = {
};
IsNotDelete.propTypes = {
};

export default IsNotDelete;
