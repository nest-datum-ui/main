import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireProp as actionAuthProp } from '@nest-datum-ui/components/Store/auth/actions/prop.js';
import { fireRecovery as actionAuthRecovery } from '@nest-datum-ui/components/Store/auth/actions/recovery.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import InputEmail from '@nest-datum-ui/components/Input/Email';
import Loader from '@nest-datum-ui/components/Loader';

let Recovery = () => {
	const { enqueueSnackbar } = useSnackbar();
	const loader = useSelector(selectorMainExtract([ 'auth', 'loader' ]));
	const recovery = useSelector(selectorMainExtract([ 'auth', 'recovery' ]));
	const email = useSelector(selectorMainExtract([ 'auth', 'email' ]));
	const emailError = useSelector(selectorMainExtract([ 'auth', 'error', 'email' ]));
	const onEmail = React.useCallback((e) => {
		actionAuthProp('email', e.target.value)();
	}, [
	]);
	const onRecovery = React.useCallback((e) => {
		e.preventDefault();

		if (!loader) {
			actionAuthRecovery({
				url: process.env.SERVICE_SSO,
				path: `user/${process.env.PAGE_RECOVERY}`,
			})(enqueueSnackbar);
		}
	}, [
		enqueueSnackbar,
		loader,
	]);

	return <React.Fragment>
		<Typography
			component="div"
			variant="h3">
			Account recovery
		</Typography>
		<Box py={2} />
		<form onSubmit={onRecovery}>
		{loader
			? <Loader visible />
			: (recovery
				? <Typography>
					A link to restore access has been sent to your email.
				</Typography>
				: <React.Fragment>
					<InputEmail
						required
						name="email"
						placeholder="name@email.com"
						label="Email"
						value={email || ''}
						onChange={onEmail}
						error={emailError}
						InputProps={{
							startAdornment: <InputAdornment position="start">
								<EmailIcon />
							</InputAdornment>,
						}} />
				</React.Fragment>)}
		<Box py={2} />
		<Grid
			container
			spacing={2}
			alignItems="center">
			{recovery
				? <React.Fragment />
				: <React.Fragment>
					<Grid
						item
						xs={false}>
						<Button
							type="submit"
							disabled={loader}
							disableElevation
							variant="contained"
							color="secondary"
							startIcon={<SendIcon />}>
							<b>Restore access</b>
						</Button>
					</Grid>
					<Grid
						item
						xs={false}>
						<Typography	variant="h6">
							/
						</Typography>
					</Grid>
				</React.Fragment>}
			<Grid
				item
				xs={false}>
				<Button
					disabled={loader}
					component={Link}
					to={'/'+ process.env.PAGE_SIGN_UP}
					size="small"
					color="primary"
					startIcon={<PersonIcon />}
					sx={{
						textTransform: 'none',
						minWidth: 'max-content',
					}}>
					<Typography
						component="div"
						variant="subtitle2">
						Registration
					</Typography>
				</Button>
			</Grid>
			{loader
				? <React.Fragment />
				: <React.Fragment>
					<Grid
						item
						xs={false}>
						<Typography	variant="h6">
							/
						</Typography>
					</Grid>
					<Grid
						item
						xs={false}>
						<Button
							disabled={loader}
							component={Link}
							to={'/'+ process.env.PAGE_SIGN_IN}
							size="small"
							color="primary"
							startIcon={<LoginIcon />}
							sx={{
								textTransform: 'none',
								minWidth: 'max-content',
							}}>
							<Typography
								component="div"
								variant="subtitle2">
								Sign in
							</Typography>
						</Button>
					</Grid>
				</React.Fragment>}
		</Grid>
		</form>
	</React.Fragment>;
};

Recovery = React.memo(Recovery);
Recovery.defaultProps = {
};
Recovery.propTypes = {
};

export default Recovery;
