import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import selectorDialogVisible from '@nest-datum-ui/components/Store/dialog/selectors/visible.js';
import MiuDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TypographySubtitle from '@nest-datum-ui/components/Typography/Subtitle';
import TypographyTitle from '@nest-datum-ui/components/Typography/Title';
import ButtonCancel from '@nest-datum-ui/components/Button/Cancel';
import ButtonCancelIcon from '@nest-datum-ui/components/Button/Cancel/Icon';
import handlerClose from './handler/close.js';

let Dialog = ({
	loader,
	id,
	title,
	subtitle,
	actions,
	onClose,
	children,
	...props
}) => {
	const openFlag = useSelector(selectorDialogVisible(id));
	const onCancel = React.useCallback((e) => handlerClose(e, id, loader, onClose), [
		id,
		loader,
		onClose,
	]);

	React.useEffect(() => () => actionDialogClose(id)(), [
		id,
	]);

	return <React.Fragment>
		<MiuDialog
			fullWidth
			maxWidth="md"
			open={openFlag}
			onClose={onCancel}
			{ ...props }>
			{(title || subtitle)
				&& <Box
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
								&& <TypographyTitle>
									{title}
								</TypographyTitle>}
							{subtitle
								&& <TypographySubtitle>
									{subtitle}
								</TypographySubtitle>}
						</Grid>
						<Grid
							item
							xs={false}>
							<ButtonCancelIcon
								disabled={loader}
								onClick={onCancel} />
						</Grid>
					</Grid>
				</Box>}
			<DialogContent>
				{children}
			</DialogContent>
			{actions
				&& <Box
					py={1}
					px={3}>
					<Grid
						container
						justifyContent="space-between"
						alignItems="center">
						<Grid
							item
							xs={false}>
							<ButtonCancel
								disabled={loader}
								onClick={onCancel} />
						</Grid>
						<Grid
							item
							xs="auto">
							{actions}
						</Grid>
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
	]).isRequired,
	loader: PropTypes.bool,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	onClose: PropTypes.func,
};

export default Dialog;