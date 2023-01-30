import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorMainIncludes from '@nest-datum-ui/components/Store/main/selectors/includes.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TypographyDateTable from '@nest-datum-ui/components/Typography/Date/Table';
import SsoTypographyUser from '@nest-datum-ui-lib/sso/components/Typography/User';
import MenuContext from '@nest-datum-ui/components/Menu/Context';

let Item = ({
	bulkDeletion,
	id,
	servId,
	replicaId,
	method,
	route,
	referrer,
	ipAddr,
	userId,
	createdAt,
	onClose,
	onDrop,
	onMenu,
	onCheck,
	storePath,
}) => {
	const checked = useSelector(selectorMainIncludes([ ...storePath, 'selected' ], id));

	return <React.Fragment>
		<TableRow key={id}>
			{(bulkDeletion && utilsCheckArr(storePath))
				&& <TableCell
					padding="checkbox"
					sx={{ minWidth: '1%' }}>
					<Checkbox 
						checked={checked}
						onChange={onCheck} />
				</TableCell>}
			<TableCell sx={{ minWidth: '19%' }}>
				<Typography component="div">
					{id}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: '20%' }}>
				<Typography component="div">
					{replicaId}
				</Typography>
				<div />
				<Typography component="div">
					{servId}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: '20%' }}>
				<Box pb={1}>
					<Typography component="div">
						method: <b>{method}</b>
					</Typography>
				</Box>
				<Box pb={1}>
					<Typography component="div">
						route: <b>{route}</b>
					</Typography>
				</Box>
				<Box pb={1}>
					<Typography component="div">
						referrer: <b>{referrer}</b>
					</Typography>
				</Box>
			</TableCell>
			<TableCell sx={{ minWidth: '19%' }}>
				<SsoTypographyUser>
					{userId}
				</SsoTypographyUser>
				<Box pt={1}>
					<Typography component="div">
						ip: <b>{ipAddr}</b>
					</Typography>
				</Box>
			</TableCell>
			<TableCell sx={{ width: '20%' }}>
				<TypographyDateTable>
					{createdAt}
				</TypographyDateTable>
			</TableCell>
			<TableCell sx={{ width: '1%' }}>
				<IconButton onClick={onMenu}>
					<MoreVertIcon />
				</IconButton>
				<MenuContext 
					id={id}
					onClose={onClose}
					onDrop={onDrop}
					drop />
			</TableCell>
		</TableRow>
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
	bulkDeletion: false,
	onCheck: () => {},
};
Item.propTypes = {
	bulkDeletion: PropTypes.bool,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	servId: PropTypes.string,
	replicaId: PropTypes.string,
	method: PropTypes.string,
	route: PropTypes.string,
	referrer: PropTypes.string,
	ipAddr: PropTypes.string,
	createdAt: PropTypes.string,
	onClose: PropTypes.func,
	onDrop: PropTypes.func,
	onMenu: PropTypes.func,
	onCheck: PropTypes.func,
	storePath: PropTypes.array,
};

export default Item;
