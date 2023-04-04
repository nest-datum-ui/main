import React from 'react';
import { 
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaperPrimary from '@nest-datum-ui/Paper/Primary';
import FormSignUp from '../../components/Form/SignUp';

let SignUp = () => {
	const { sso: { ssoSignUp: { pageTitle } } } = React.useContext(ContextProps);

	return <ContextRoute.Provider value="ssoSignUp">
		<PaperPrimary>
			<Box pb={1}>
				<Typography component="div" variant="h4">
					{pageTitle}
				</Typography>
			</Box>
			<FormSignUp />
		</PaperPrimary>
	</ContextRoute.Provider>;
};

SignUp = React.memo(SignUp);
SignUp.defaultProps = {
};
SignUp.propTypes = {
};

export default SignUp;
