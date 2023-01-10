import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireListPush as actionBreadcrumbsListPush } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/push.js';
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import Loader from '@nest-datum-ui/components/Loader';
import MenuFolderContext from '@nest-datum-ui-lib/files/components/Menu/Folder/Context';

let Folder = ({
	id,
	name,
	path,
	isDeleted,
	isNotDelete,
	menu,
	onSelectFolder,
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', id, 'loader' ]));
	const onClick = React.useCallback((id, name, path) => (e) => {
		actionBreadcrumbsListPush('filesManageList', { 
			key: id,
			text: name, 
			path,
		})();
		if (typeof onSelectFolder === 'function') {
			onSelectFolder(e, {
				id,
				name,
				path,
			});
		}
	}, [
		onSelectFolder,
	]);
	const onMenu = React.useCallback((itemId) => (e) => {
		actionMenuOpen(`files-menu-folder-context-${itemId}`, e.target)();
	}, [
	]);

	return <React.Fragment>
		<Grid
			item
			xs={2}>
			<Grid
				container
				spacing={1}>
				<Grid
					item
					xs={true}>
					<Button
						component="div"
						onClick={onClick(id, name, path)}
						sx={{
							alignItems: 'flex-end',
							flexDirection: 'column',
							width: '100%',
							height: '100%',
							backgroundColor: '#f7f7f7',
						}}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								height: '100%',
								backgroundColor: '#f7f7f7',
								'&:after': {
									content: '""',
									display: 'block',
									paddingBottom: '100%',
								},
							}}>
							{loader
								? <Loader 
									visible
									wrapper={{
										sx: {
											padding: '0px',
										},
									}}
									sx={{
										minWidth: '80px',
										maxWidth: '80px',
										minHeight: '80px',
										maxHeight: '80px',
									}} />
								: <FolderIcon
									sx={{
										fontSize: '800%',
											color: isDeleted
												? 'grey !important'
												: 'inherit',
										}} />}
						</Box>
						<Typography
							component="div"
							variant="body2"
							color={isDeleted
								? 'textSecondary'
								: 'initial'}
							sx={{
								width: '100%',
								padding: '4px 2px',
								textTransform: 'initial',
								wordWrap: 'anywhere',
								textAlign: 'center',
								...isDeleted
									? { textDecoration: 'line-through' }
									: {},
							}}>
							{(name || '').length > 24
								? `${(name || '').substring(0, 24)}...`
								: name}
						</Typography>
					</Button>
				</Grid>
				{menu
					? <Grid
						item
						xs={false}>
						<IconButton
							size="small"
							 onClick={onMenu(id)}>
							<MoreVertIcon fontSize="small" />
						</IconButton>
						<MenuFolderContext 
							id={`files-menu-folder-context-${id}`}
							entityId={id}
							isDeleted={isDeleted}
							isNotDelete={isNotDelete} />
					</Grid>
					: <React.Fragment />}
			</Grid>
		</Grid>
	</React.Fragment>;
};

Folder = React.memo(Folder);
Folder.defaultProps = {
};
Folder.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	path: PropTypes.string,
	isDeleted: PropTypes.bool,
	isNotDelete: PropTypes.bool,
	menu: PropTypes.bool,
	onSelectFolder: PropTypes.func,
};

export default Folder;
