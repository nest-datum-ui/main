import React from 'react';
import { 
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaperPrimary from '@nest-datum-ui/Paper/Primary';
import FormReset from '../../components/Form/Reset';

let Reset = () => {
	const { sso: { ssoReset: { pageTitle } } } = React.useContext(ContextProps);

	return <ContextRoute.Provider value="ssoReset">
		<PaperPrimary>
			<Box pb={1}>
				<Typography component="div" variant="h4">
					{pageTitle}
				</Typography>
			</Box>
			<FormReset />
		</PaperPrimary>
	</ContextRoute.Provider>;
};

Reset = React.memo(Reset);
Reset.defaultProps = {
};
Reset.propTypes = {
};

export default Reset;
