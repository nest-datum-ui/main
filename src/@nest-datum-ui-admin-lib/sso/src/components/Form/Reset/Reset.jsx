import React from 'react';
import PropTypes from 'prop-types';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import { actionSsoReset } from '../../Store';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Field from '@nest-datum-ui/Field';
import InputPassword from '@nest-datum-ui/Input/Password';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import StyledWrapper from './Styled/Wrapper.jsx';

let Reset = ({
	onSubmit,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { id, storeName, apiFullUrl } } } = React.useContext(ContextProps);
	const onSubmitWrapper = React.useCallback((e) => {
		actionSsoReset(storeName, apiFullUrl);
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
		<Box py={2}>
			<Field
				Component={InputPassword}
				name="password"
				visibility
				required />
		</Box>
		<Box py={2}>
			<Field
				Component={InputPassword}
				name="repeatedPassword"
				visibility
				required />
		</Box>
		<ButtonPrimary type="submit" form={id} startIcon={<SendIcon />}>
			<b>Send</b>
		</ButtonPrimary>
	</StyledWrapper>;
};

Reset = React.memo(Reset);
Reset.defaultProps = {
	onSubmit: () => {},
};
Reset.propTypes = {
	onSubmit: PropTypes.func,
};

export default Reset;
