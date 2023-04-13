import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@nest-datum-ui/Input';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerSubmit from './handler/submit.js';

let Search = ({
	name,
	onSearch,
	loader,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { storeName } } } = React.useContext(ContextProps);
	const [ id ] = React.useState(() => uuidv4());
	const onSubmit = React.useCallback((e) => handlerSubmit(e, name, onSearch, `${storeName}_query`), [
		name,
		onSearch,
		storeName,
	]);

	return <StyledWrapper
		storeName={`${storeName}_query`}
		id={id}
		onSubmit={onSubmit}>
		<Input 
			size="small"
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
			}}
			{...props}  />
	</StyledWrapper>;
};

Search = React.memo(Search);
Search.defaultProps = {
	name: 'query',
	placeholder: 'Search...',
	onSearch: () => {},
};
Search.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onSearch: PropTypes.func,
};

export default Search;
