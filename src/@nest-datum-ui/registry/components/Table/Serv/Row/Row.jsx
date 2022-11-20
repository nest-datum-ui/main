import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Table from '@nest-datum-ui/components/Table';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

let Row = ({ dataProvider }) => {
	const data = dataProvider();
	const [ open, setOpen ] = React.useState(() => false);
	const onDisplay = React.useCallback((e) => setOpen((currentState) => !currentState), [
		setOpen,
	]);

	return <React.Fragment>
		<TableRow>
			<TableCell sx={{ minWidth: '100%' }}>
				<Typography 
					component="div"
					variant="h6">
					{data['name']}
				</Typography>
			</TableCell>
			<TableCell sx={{ minWidth: 'max-content' }}>
				<Grid
					container
					alignItems="center"
					justifyContent="space-between"
					spacing={2}>
					<Grid
						item
						xs={true}>
						<Typography 
							component="div"
							variant="h6">
							Replicas data:
						</Typography>
					</Grid>
					<Grid
						item
						xs={false}>
						<IconButton onClick={onDisplay}>
							{open 
								? <KeyboardArrowUpIcon /> 
								: <KeyboardArrowDownIcon />}
						</IconButton>
					</Grid>
				</Grid>
			</TableCell>
		</TableRow>
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<Box pl={2}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>
										<Typography
											component="div"
											variant="caption"
											color="textSecondary">
											ID
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											component="div"
											variant="caption"
											color="textSecondary">
											Host
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											component="div"
											variant="caption"
											color="textSecondary">
											Database master host
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											component="div"
											variant="caption"
											color="textSecondary">
											Load
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											component="div"
											variant="caption"
											color="textSecondary">
											Story
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{(data['replicas'] || []).map((item, index) => {
									return <TableRow key={index}>
										<TableCell>
											<Typography
												component="div"
												variant="body2">
												{item.id}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography
												component="div"
												variant="body2">
												{item.host}:{item.port}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography
												component="div"
												variant="body2">
												{(item.mysqlMasterHost
													&& item.mysqlMasterPort)
													? `${item.mysqlMasterHost}:${item.mysqlMasterPort}`
													: '-'}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography
												component="div"
												variant="body2">
												{item.load}
											</Typography>
										</TableCell>
										<TableCell>
											{item.createdAt
												? <Box pb={1}>
													<Typography	
														component="div"
														variant="caption"
														color="textSecondary">
														Created at:
													</Typography>
													<Typography 
														component="div"
														variant="body2">
														<b>{format(new Date(item.createdAt), 'dd MMMM, hh:mm')}</b>
													</Typography>
												</Box>
												: <React.Fragment />}
											{item.updatedAt
												? <Box>
													<Typography	
														component="div"
														variant="caption"
														color="textSecondary">
														Updated at:
													</Typography>
													<Typography 
														component="div"
														variant="body2">
														<b>{format(new Date(item.updatedAt), 'dd MMMM, hh:mm')}</b>
													</Typography>
												</Box>
												: <React.Fragment />}
										</TableCell>
									</TableRow>;
								})}
							</TableBody>
						</Table>
					</Box>
				</Collapse>
			</TableCell>
		</TableRow>
	</React.Fragment>;
};

Row = React.memo(Row);
Row.defaultProps = {
};
Row.propTypes = {
	dataProvider: PropTypes.func,
};

export default Row;
