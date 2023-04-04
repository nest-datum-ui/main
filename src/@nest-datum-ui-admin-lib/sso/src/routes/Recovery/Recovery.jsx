import React from 'react';
import { 
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaperPrimary from '@nest-datum-ui/Paper/Primary';
import FormRecovery from '../../components/Form/Recovery';

let Recovery = () => {
	const { sso: { ssoRecovery: { pageTitle } } } = React.useContext(ContextProps);

	return <ContextRoute.Provider value="ssoRecovery">
		<PaperPrimary>
			<Box pb={1}>
				<Typography component="div" variant="h4">
					{pageTitle}
				</Typography>
			</Box>
			<FormRecovery />
		</PaperPrimary>
	</ContextRoute.Provider>;
};

Recovery = React.memo(Recovery);
Recovery.defaultProps = {
};
Recovery.propTypes = {
};

export default Recovery;
