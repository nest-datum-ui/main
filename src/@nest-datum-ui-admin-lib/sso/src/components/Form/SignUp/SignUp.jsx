import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import {  selectorMainExtract } from '@nest-datum-ui/Store';
import { actionSsoRegister } from '../../Store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Field from '@nest-datum-ui/Field';
import InputEmail from '@nest-datum-ui/Input/Email';
import InputPassword from '@nest-datum-ui/Input/Password';
import SsoInputLogin from '@nest-datum-ui-admin-lib/sso/src/components/Input/Login';
import SsoInputUserName from '@nest-datum-ui-admin-lib/sso/src/components/Input/UserName';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import ButtonLink from '@nest-datum-ui/Button/Link';
import StyledWrapper from './Styled/Wrapper.jsx';

let SignUp = ({
	onSubmit,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				id, 
				storeName, 
				apiFullUrl, 
			}, 
		},
		sso: { 
			ssoSignIn: {
				pageFullUrl,
				pageTitle,
			},
		}, 
	} = React.useContext(ContextProps);
	const successfulRegistrationFlag = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'successfulRegistrationFlag' ]));
	const onSubmitWrapper = React.useCallback((e) => {
		actionSsoRegister(storeName, apiFullUrl);
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
		{(successfulRegistrationFlag === true)
			? <React.Fragment>
				<Typography	component="div">
					An email has been sent to your email address with a link to complete your registration.
				</Typography>
				<ButtonLink to={`/${pageFullUrl}`}>
					{pageTitle}
				</ButtonLink>
			</React.Fragment>
			: <React.Fragment>
				<Box py={2}>
					<Field
						Component={InputEmail}
						name="email"
						required />
				</Box>
				<Box py={2}>
					<Field
						Component={SsoInputLogin}
						name="login"
						required />
				</Box>
				<Box py={2}>
					<Field
						Component={SsoInputUserName}
						name="firstname"
						placeholder="John"
						label="Firstname"
						required />
				</Box>
				<Box py={2}>
					<Field
						Component={SsoInputUserName}
						name="lastname"
						placeholder="Jonson"
						label="Lastname"
						required />
				</Box>
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
				<ButtonPrimary type="submit" form={id} startIcon={<PersonIcon />}>
					<b>Send</b>
				</ButtonPrimary>
			</React.Fragment>}
	</StyledWrapper>;
};

SignUp = React.memo(SignUp);
SignUp.defaultProps = {
	onSubmit: () => {},
};
SignUp.propTypes = {
	onSubmit: PropTypes.func,
};

export default SignUp;
