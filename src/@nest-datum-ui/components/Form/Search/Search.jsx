import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Portal } from 'react-portal';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@nest-datum-ui/components/Input';
import handlersSubmit from './handlers/submit.js';

let Search = ({
	name,
	onSearch,
	...props
}) => {
	const [ id ] = React.useState(() => uuidv4());
	const onSubmit = React.useCallback((e) => handlersSubmit(e, name, onSearch), [
		name,
		onSearch,
	]);

	return <React.Fragment>
		<Portal node={document && document.getElementById('root')}>
			<form 
				id={id}
				onSubmit={onSubmit} />
		</Portal>
		<Input 
			size="small"
			{...props}
			name={name} 
			InputProps={{
				inputProps: {
					form: id,
				},
				endAdornment: <InputAdornment position="end">
					<IconButton 
						form={id}
						type="submit"
						size="small">
						<SearchIcon />
					</IconButton>
				</InputAdornment>,
			}} />
	</React.Fragment>;
};

Search = React.memo(Search);
Search.defaultProps = {
	name: 'query',
	placeholder: 'Поиск...',
	onSearch: () => {},
};
Search.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onSearch: PropTypes.func,
};

export default Search;
