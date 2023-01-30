import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fireListCreateFilterUrl as actionApiListCreateFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/createFilterUrl.js';
import utilsUrlItemFilterBool from '@nest-datum-ui/utils/url/item/filter/bool.js';
import utilsUrlItemFilterGetBool from '@nest-datum-ui/utils/url/item/filter/get/bool.js';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

let IsRequired = ({
	onChange,
	onInput,
}) => {
	const { search } = useLocation();
	const [ id ] = React.useState(() => uuidv4());
	const value = utilsUrlItemFilterGetBool(search, 'isRequired');
	const onChangeMemo = React.useCallback((e) => {
		actionApiListCreateFilterUrl(e, utilsUrlItemFilterBool('isRequired'));
		onChange(e);
		onInput(e);
	}, [
		onChange,
		onInput,
	]);

	return <React.Fragment>
		<FormControl>
			<FormLabel id={id}>
				Required fields
			</FormLabel>
			<RadioGroup
				aria-labelledby={id}
				name={id}
				value={value}
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
