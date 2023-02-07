import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import Loader from '@nest-datum-ui/components/Loader';

let Folder = ({
	loader,
	id,
	path,
	name,
	onClick,
}) => {
	const onHandle = React.useCallback((e) => {
		onClick(e, {
			id,
			name,
			path,
		});
	}, [
		id,
		name,
		path,
		onClick,
	]);

	return <React.Fragment>
		<Loader	visible={loader} />
		<Button
			onClick={onHandle}
			sx={{
				position: 'relative',
				padding: '0px',
				margin: '0px',
				maxWidth: '240px',
				'& > svg': {
					width: '100%',
					height: '100%',
				},
			}}>
			<FolderIcon color="primary" />
		</Button>
		<Typography 
			onClick={onHandle}
			component="div"
			variant="body2"
			sx={{
				wordWrap: 'anywhere',
				paddingLeft: '6px',
				paddingTop: '2px',
			}}>
			<b>{name
				? (name.length > 80
					? `${(name || '').substring(0, 80)}...`
					: name)
				: ((path || '').length > 80
					? `${(path || '').substring(0, 80)}...`
					: path)}</b>
		</Typography>
	</React.Fragment>;
};

Folder = React.memo(Folder);
Folder.defaultProps = {
	onClick: (() => {}),
};
Folder.propTypes = {
	loader: PropTypes.bool,
	id: PropTypes.string,
	name: PropTypes.string,
	path: PropTypes.string,
	onClick: PropTypes.func,
};

export default Folder;
