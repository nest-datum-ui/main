import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import { actionSsoRecovery } from '../../Store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Field from '@nest-datum-ui/Field';
import InputEmail from '@nest-datum-ui/Input/Email';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import StyledWrapper from './Styled/Wrapper.jsx';

let Recovery = ({
	onSubmit,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { id, storeName, apiFullUrl } } } = React.useContext(ContextProps);
	const successfulRequestFlag = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'successfulRequestFlag' ]));
	const onSubmitWrapper = React.useCallback((e) => {
		actionSsoRecovery(storeName, apiFullUrl);
		onSubmit(e);
	}, [
		onSubmit,
		storeName,
		apiFullUrl,
	]);

	return <StyledWrapper { ...props } 
		id={id} 
		storeName={storeName} 
		onSubmit={onSubmitWrapper}>
		{(successfulRequestFlag === true)
			? <React.Fragment>
				<Typography	component="div">
					A link to restore access has been sent to your email.
				</Typography>
			</React.Fragment>
			: <React.Fragment>
				<Box py={2}>
					<Field
						Component={InputEmail}
						name="email"
						required />
				</Box>
				<ButtonPrimary type="submit" form={id} startIcon={<SendIcon />}>
					<b>Send</b>
				</ButtonPrimary>
			</React.Fragment>}
	</StyledWrapper>;
};

Recovery = React.memo(Recovery);
Recovery.defaultProps = {
	onSubmit: () => {},
};
Recovery.propTypes = {
	onSubmit: PropTypes.func,
};

export default Recovery;
