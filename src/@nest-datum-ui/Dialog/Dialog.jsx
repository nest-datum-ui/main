import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	selectorDialogVisible,
	actionDialogClose, 
} from '@nest-datum-ui/Store';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StyledWrapper from './Styled/Wrapper.jsx';
import StyledTitleWrapper from './Styled/TitleWrapper.jsx';
import StyledContentWrapper from './Styled/ContentWrapper.jsx';
import StyledActionsWrapper from './Styled/ActionsWrapper.jsx';
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

	return <StyledWrapper
		fullWidth
		open={openFlag}
		onClose={onCancel}
		{ ...props }>
		{(title || subtitle)
			&& <StyledTitleWrapper container>
				<Grid
					item
					xs={true}>
					{title
						&& <Typography className="dialog-title__typography-title" variant="h6">
							{title}
						</Typography>}
					{subtitle
						&& <Typography className="dialog-title__typography-subtitle" variant="caption" color="textSecondary">
							{subtitle}
						</Typography>}
				</Grid>
				<Grid
					item
					xs={false}>
					<IconButton
						className="dialog-title__button-close"
						disabled={loader}
						onClick={onCancel}>
						<CloseIcon />
					</IconButton>
				</Grid>
			</StyledTitleWrapper>}
		{children
			&& <StyledContentWrapper>
				{children}
			</StyledContentWrapper>}
		{actions
			&& <StyledActionsWrapper>
				{actions}
			</StyledActionsWrapper>}
	</StyledWrapper>;
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