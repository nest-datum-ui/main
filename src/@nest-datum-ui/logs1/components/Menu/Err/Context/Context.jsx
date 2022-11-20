import React from 'react';
import PropTypes from 'prop-types';
import { fireClose as actionMenuClose } from 'components/Store/menu/actions/close.js';
import { fireOpen as actionDialogOpen } from 'components/Store/dialog/actions/open.js';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from 'components/Menu';

let Context = ({
	entityId,
	...props
}) => {
	const onDelete = React.useCallback((e) => {
		actionDialogOpen('err', { entityId })();
		actionMenuClose()();
	}, [
		entityId,
	]);

	return <React.Fragment>
		<Menu { ...props }>
			<MenuItem onClick={onDelete}>
				<ListItemIcon>
					<DeleteIcon />
				</ListItemIcon>
				<ListItemText>
					Удалить
				</ListItemText>
			</MenuItem>
		</Menu>
	</React.Fragment>;
};

Context = React.memo(Context);
Context.defaultProps = {
};
Context.propTypes = {
	entityId: PropTypes.string.isRequired,
};

export default Context;
