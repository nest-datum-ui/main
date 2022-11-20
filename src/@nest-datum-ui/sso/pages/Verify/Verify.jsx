import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useNavigate,
	useLocation, 
} from 'react-router-dom';
import { fireProp as actionAuthProp } from '@nest-datum-ui/components/Store/auth/actions/prop.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Loader from '@nest-datum-ui/components/Loader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import onActivate from './onActivate.js';

let Verify = () => {
	const location = useLocation();
	const loader = useSelector(selectorMainExtract([ 'auth', 'loader' ]));
	const [ message, setMessage ] = React.useState(() => '');
	const navigate = useNavigate();

	// onMount
	React.useEffect(() => {
		setTimeout(async () => {
			await actionAuthProp('loader', true)();

			setTimeout(() => {
				onActivate(location, setMessage, navigate);
			}, 2000);
		}, 0);
	}, [
		setMessage,
		navigate,
		location,
	]);

	React.useEffect(() => {
		if (message) {
			actionAuthProp('loader', false)();
		}
	}, [
		message,
	]);

	return <React.Fragment>
		<Box 
			position="fixed"
			top="0px"
			left="0px"
			width="100%"
			height="100%">
			<Grid 
				container
				justifyContent="center"
				alignItems="center"
				sx={{
					height: '100%',
				}}>
				<Grid
					item
					xs={12}
					sm={10}
					md={8}
					lg={6}>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						minHeight="400px">
						<Box 
							width="100%"
							textAlign="center">
							<Typography variant="h3">
								Процесс активации учетной записи
							</Typography>
							{loader
								? <Loader visible />
								: <React.Fragment />}
							{(message && !loader)
								? <Box py={2}>
									{Array.isArray(message)
										? message.map((item, index) => {
											return <Typography 
												key={index}
												component="div"
												variant="h4">
												{item}
											</Typography>
										})
										: <Typography 
											component="div"
											variant="h4">
											{message}
										</Typography>}
								</Box>
								: <React.Fragment />}
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	</React.Fragment>
};

Verify = React.memo(Verify);
Verify.defaultProps = {
};

export default Verify;
