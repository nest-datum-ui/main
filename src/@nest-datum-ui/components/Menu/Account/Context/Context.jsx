import React from 'react';
import { fireClose as actionMenuClose } from '@nest-datum-ui/components/Store/menu/actions/close.js';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@nest-datum-ui/components/Menu';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let Context = (props) => {
	const onClose = React.useCallback((e) => {
		actionMenuClose()();
	}, [
	]);

	return <React.Fragment>
		<Menu { ...props }>
			<MenuItem
				component={ButtonLink}
				to="/account"
				onClick={onClose}>
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
		</Menu>
	</React.Fragment>;
};

Context = React.memo(Context);
Context.defaultProps = {
};
Context.propTypes = {
};

export default Context;
