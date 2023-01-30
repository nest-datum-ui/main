import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TypographyDateTable from '@nest-datum-ui/components/Typography/Date/Table';

let Item = ({
	id,
	name,
	host,
	port,
	mysqlMasterHost,
	mysqlMasterPort,
	active,
	serviceResponsLoadingIndicator,
	createdAt,
	updatedAt,
	restartedAt,
}) => {
	return <React.Fragment>
		<TableRow key={id}>
			<TableCell sx={{ minWidth: '18%' }}>
				<Typography component="div">
					{id}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: '14%' }}>
				<Typography component="div">
					{name}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: '24%' }}>
				<Box pb={1}>
					<Typography component="div">
						Host: <b>{host}</b>
					</Typography>
					<Typography component="div">
						Port: <b>{port}</b>
					</Typography>
				</Box>
				<Box>
					<Typography component="div">
						Mysql master host: <b>{mysqlMasterHost}</b>
					</Typography>
					<Typography component="div">
						Mysql master port: <b>{mysqlMasterPort}</b>
					</Typography>
				</Box>
			</TableCell>
			<TableCell sx={{ minWidth: '12%' }}>
				<Typography component="div">
					{active
						? 'Online'
						: 'Stopped'}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: '14%' }}>
				<Typography component="div">
					{Number(serviceResponsLoadingIndicator)}
				</Typography>
			</TableCell>
			<TableCell sx={{ width: '18%' }}>
				<TypographyDateTable
					createdAt={createdAt}
					updatedAt={updatedAt}
					restartedAt={restartedAt} />
			</TableCell>
		</TableRow>
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
};
Item.propTypes = {
	bulkDeletion: PropTypes.bool,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	name: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	restartedAt: PropTypes.string,
};

export default Item;
