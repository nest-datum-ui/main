import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuContext from '@nest-datum-ui/components/Menu/Context';
import Paper from '../Paper.jsx';

let Menu = ({
	id,
	isDeleted,
	isNotDelete,
	onMenu,
	onClose,
	onDrop,
	onRestore,
	onEdit,
	...props
}) => {
	const onMenuLocal = React.useCallback((e) => {
		onMenu(e, id);
	}, [
		onMenu,
		id,
	]);

	return <Grid 
		container
		spacing={1}>
		<Grid
			item
			sx={{
				maxWidth: 'calc(100% - 20px)',
				minWidth: 'calc(100% - 20px)',
			}}>
			<Paper 
				isDeleted={isDeleted}
				isNotDelete={isNotDelete}
				id={id}
				{ ...props } />
		</Grid>
		<Grid
			item
			sx={{
				maxWidth: '20px',
				minWidth: '20px',
			}}>
			<IconButton
				onClick={onMenuLocal} 
				size="small"
				sx={{
					padding: '0px',
				}}>
				<MoreVertIcon fontSize="small" />
			</IconButton>
			<MenuContext 
				id={id}
				isDeleted={isDeleted}
				isNotDelete={isNotDelete}
				onClose={onClose}
				onDrop={onDrop}
				onRestore={onRestore}
				onEdit={onEdit} />
		</Grid>
	</Grid>;
};

Menu = React.memo(Menu);
Menu.defaultProps = {
	onClick: (() => {}),
};
Menu.propTypes = {
	id: PropTypes.string.isRequired,
	isDeleted: PropTypes.bool,
	isNotDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onClose: PropTypes.func,
	onDrop: PropTypes.func,
	onRestore: PropTypes.func,
	onEdit: PropTypes.func,
};

export default Menu;
