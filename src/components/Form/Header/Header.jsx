import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	selectorMainExtract,
	actionMenuOpen, 
} from '@nest-datum-ui/Store';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuHeader from 'components/Menu/Header';
import StyledWrapper from './Styled/Wrapper.jsx';

let Header = ({ authFormStoreName }) => {
	const avatar = useSelector(selectorMainExtract([ 'api', 'form', authFormStoreName, 'avatar' ]));
	const firstname = useSelector(selectorMainExtract([ 'api', 'form', authFormStoreName, 'firstname' ]));
	const lastname = useSelector(selectorMainExtract([ 'api', 'form', authFormStoreName, 'lastname' ]));
	const login = useSelector(selectorMainExtract([ 'api', 'form', authFormStoreName, 'login' ]));
	const onMenu = React.useCallback((e) => actionMenuOpen('menu-header', e.target)(), [
	]);

	return <StyledWrapper container spacing={2}>
		<Grid
			item
			xs={false}>
			{avatar
				&& <Box className="header-avatar__wrapper">
					{/*<FilesPaperById>
						{avatar}
					</FilesPaperById>*/}
					avatar
				</Box>}
		</Grid>
		<Grid
			item
			xs={false}>
			{(firstname || lastname)
				&& <Typography
					component="div"
					variant="body2">
					{firstname} {lastname}
				</Typography>}
			{login
				&& <Typography
					component="div"
					variant="caption">
					@{login}
				</Typography>}
		</Grid>
		<Grid
			item
			xs={false}>
			<IconButton onClick={onMenu}>
				<SettingsIcon fontSize="small" />
			</IconButton>
			<MenuHeader id="menu-header" />
		</Grid>
	</StyledWrapper>;
};

Header = React.memo(Header);
Header.defaultProps = {
};
Header.propTypes = {
	authFormStoreName: PropTypes.string,
};

export default Header;
