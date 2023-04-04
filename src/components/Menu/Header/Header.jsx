import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import StyledWrapper from './Styled/Wrapper.jsx';

let Header = (props) => {
	return <StyledWrapper { ...props }>
		<MenuItem>
			<ListItemText>
				Account
			</ListItemText>
		</MenuItem>
		<MenuItem>
			<ListItemText>
				Language
			</ListItemText>
		</MenuItem>
		<MenuItem>
			<ListItemText>
				Clear cache
			</ListItemText>
		</MenuItem>
		<MenuItem>
			<ListItemText>
				Reload all services
			</ListItemText>
		</MenuItem>
		<MenuItem>
			<ListItemText>
				Rebuild frontend
			</ListItemText>
		</MenuItem>
		<MenuItem>
			<ListItemText>
				Exit
			</ListItemText>
		</MenuItem>
	</StyledWrapper>;
};

Header = React.memo(Header);
Header.defaultProps = {
};
Header.propTypes = {
};

export default Header;
