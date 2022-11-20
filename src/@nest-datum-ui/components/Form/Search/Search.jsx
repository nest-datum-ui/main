import React from 'react';
import { Portal } from 'react-portal';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@nest-datum-ui/components/Input';

let Search = ({
	name,
	onSearch,
	...props
}) => {
	const [ id ] = React.useState(() => (Math.random() + 1).toString(36).substring(7));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onSearch(e.target.elements[name].value);
	}, [
		onSearch,
		name,
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
			name={name.toString()} 
			InputProps={{
				inputProps: {
					form: id,
				},
				endAdornment: <InputAdornment position="end"  >
					<IconButton 
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
};

export default Search;
