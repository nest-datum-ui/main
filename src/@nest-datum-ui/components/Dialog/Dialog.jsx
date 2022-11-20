import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import MiuDialog from '@mui/material/Dialog';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import selectorDialogVisible from '@nest-datum-ui/components/Store/dialog/selectors/visible.js';

let Dialog = ({
	loader,
	id,
	title,
	subtitle,
	actions,
	disableActions,
	onClose,
	children,
	...props
}) => {
	const openFlag = useSelector(selectorDialogVisible(id));
	const onCloseLocal = React.useCallback((e) => {
		if (loader !== true) {
			return (typeof onClose === 'function')
				? onClose(e)
				: actionDialogClose(id)();
		}
	}, [
		onClose,
		id,
		loader,
	]);

	// onUnmount
	React.useEffect(() => () => {
		actionDialogClose(id)();
	}, [
		id,
	]);

	return <React.Fragment>
		<MiuDialog
			fullWidth
			maxWidth="md"
			open={openFlag}
			onClose={onCloseLocal}
			{ ...props }>
			{(title || subtitle)
				? <Box
					pt={1}
					px={3}>
					<Grid
						container
						justifyContent="space-between"
						alignItems="center">
						<Grid
							item
							xs={true}>
							{title
								? <Typography
									component="div"
									variant="h6">
									{title}
								</Typography>
								: <React.Fragment />}
							{subtitle
								? <Typography
									component="div"
									variant="subtitle2"
									color="textSecondary">
									{subtitle}
								</Typography>
								: <React.Fragment />}
						</Grid>
						<Grid
							item
							xs={false}>
							<IconButton
								{ ...(typeof loader === 'boolean')
									? { disabled: loader }
									: {} }
								onClick={onCloseLocal}>
								<CloseIcon color="error" />
							</IconButton>
						</Grid>
					</Grid>
				</Box>
				: <React.Fragment />}
			<DialogContent>
				{children}
			</DialogContent>
			{disableActions
				? <React.Fragment />
				: <Box
					py={1}
					px={3}>
					<Grid
						container
						justifyContent="space-between"
						alignItems="center">
						<Grid
							item
							xs={false}>
							<Button
								{ ...(typeof loader === 'boolean')
									? { disabled: loader }
									: {} }
								disableElevation
								variant="text"
								color="error"
								startIcon={<CloseIcon />} 
								onClick={onCloseLocal}>
								Cancel
							</Button>
						</Grid>
						{actions
							? <Grid
								item
								xs="auto">
								{actions}
							</Grid>
							: <React.Fragment />}
					</Grid>
				</Box>}
		</MiuDialog>
	</React.Fragment>;
};

Dialog = React.memo(Dialog);
Dialog.defaultProps = {
};
Dialog.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	onClose: PropTypes.func,
};

export default Dialog;