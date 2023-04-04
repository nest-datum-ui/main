import React from 'react';
import { 
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaperPrimary from '@nest-datum-ui/Paper/Primary';
import FormSignIn from '../../components/Form/SignIn';

let SignIn = () => {
	const { sso: { ssoSignIn: { pageTitle } } } = React.useContext(ContextProps);

	return <ContextRoute.Provider value="ssoSignIn">
		<PaperPrimary>
			<Box pb={1}>
				<Typography component="div" variant="h4">
					{pageTitle}
				</Typography>
			</Box>
			<FormSignIn />
		</PaperPrimary>
	</ContextRoute.Provider>;
};

SignIn = React.memo(SignIn);
SignIn.defaultProps = {
};
SignIn.propTypes = {
};

export default SignIn;
