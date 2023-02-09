import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuContext from '@nest-datum-ui/components/Menu/Context';
import Folder from '../Folder.jsx';

let Menu = ({
	id,
	isDeleted,
	isNotDelete,
	onClose,
	onMenu,
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

	return <Grid container>
		<Grid
			item
			sx={{
				maxWidth: 'calc(100% - 20px)',
				minWidth: 'calc(100% - 20px)',
			}}>
			<Folder 
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
};
Menu.propTypes = {
};

export default Menu;
