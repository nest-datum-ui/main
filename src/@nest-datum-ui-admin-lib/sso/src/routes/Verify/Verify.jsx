import React from 'react';
import { 
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaperPrimary from '@nest-datum-ui/Paper/Primary';
import FormVerify from '../../components/Form/Verify';

let Verify = () => {
	const { sso: { ssoVerify: { pageTitle } } } = React.useContext(ContextProps);

	return <ContextRoute.Provider value="ssoVerify">
		<PaperPrimary>
			<Box pb={1}>
				<Typography component="div" variant="h4">
					{pageTitle}
				</Typography>
			</Box>
			<FormVerify />
		</PaperPrimary>
	</ContextRoute.Provider>;
};

Verify = React.memo(Verify);
Verify.defaultProps = {
};
Verify.propTypes = {
};

export default Verify;
