import React from 'react';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	hookUrlNavigate,
	selectorMainExtract, 
} from '@nest-datum-ui/Store';
import { actionSsoVerify } from '../../Store';
import Typography from '@mui/material/Typography';
import Progress from '@nest-datum-ui/Progress';
import StyledWrapper from './Styled/Wrapper.jsx';

let Verify = (props) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				storeName, 
				apiFullUrl,  
			}, 
		},
		sso: { 
			ssoSignIn: { 
				pageFullUrl, 
			}, 
		}
	} = React.useContext(ContextProps);
	const resultMessage = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'resultMessage' ]));

	React.useEffect(() => {
		(async () => {
			if (await actionSsoVerify(storeName, apiFullUrl)) {
				setTimeout(() => hookUrlNavigate(`/${pageFullUrl}`), 2000);
			}
		})();
	}, [
		pageFullUrl,
		apiFullUrl,
		storeName,
	]);

	return <StyledWrapper { ...props }>
		<Progress visible={!resultMessage} />
		{resultMessage
			&& <Typography component="div">
				{resultMessage}
			</Typography>}
	</StyledWrapper>;
};

Verify = React.memo(Verify);
Verify.defaultProps = {
};
Verify.propTypes = {
};

export default Verify;
