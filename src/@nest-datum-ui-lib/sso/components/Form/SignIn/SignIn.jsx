import React from 'react';
import { useSelector } from 'react-redux';
import { 
	Link,
	useNavigate, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireProp as actionAuthProp } from '@nest-datum-ui/components/Store/auth/actions/prop.js';
import { fireLogin as actionAuthLogin } from '@nest-datum-ui/components/Store/auth/actions/login.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Input from '@nest-datum-ui/components/Input';
import Loader from '@nest-datum-ui/components/Loader';

let SignIn = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [ visible, setVisible ] = React.useState(() => false);
	const loader = useSelector(selectorMainExtract([ 'auth', 'loader' ]));
	const error = useSelector(selectorMainExtract([ 'auth', 'error' ])) ?? {};
	const login = useSelector(selectorMainExtract([ 'auth', 'login' ])) ?? '';
	const password = useSelector(selectorMainExtract([ 'auth', 'password' ])) ?? '';
	const onLogin = React.useCallback((e) => {
		actionAuthProp('login', e.target.value)();
	}, [
	]);
	const onPassword = React.useCallback((e) => {
		actionAuthProp('password', e.target.value)();
	}, [
	]);
	const onVisible = React.useCallback(() => {
		setVisible((currentState) => !currentState);
	}, [
		setVisible,
	]);
	const onSignIn = React.useCallback((e) => {
		e.preventDefault();

		if (!loader) {
			actionAuthLogin({
				url: process.env.SERVICE_SSO,
				path: 'user/login',
			})(navigate, enqueueSnackbar);
		}
	}, [
		enqueueSnackbar,
		navigate,
		loader,
	]);

	return <React.Fragment>
		<Typography
			component="div"
			variant="h3">
			Login
		</Typography>
		<Box py={2} />
		<form onSubmit={onSignIn}>
		{loader
			? <Loader visible />
			: <Grid
				container
				spacing={3}>
				<Grid
					item
					xs={12}
					sm={12}>
					<Input
						required
						type="text"
						name="login"
						placeholder="name@email.com"
						label="Login or email"
						value={login}
						onChange={onLogin}
						error={error['login']}
						InputProps={{
							startAdornment: <InputAdornment position="start">
								<AlternateEmailIcon />
							</InputAdornment>,
						}} />
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}>
					<Input
						required
						type={visible
							? 'text'
							: 'password'}
						name="password"
						placeholder="Password"
						label="Password"
						value={password}
						onChange={onPassword}
						error={error['password']}
						InputProps={{
							startAdornment: <InputAdornment position="start">
								<LockIcon />
							</InputAdornment>,
							endAdornment: <InputAdornment position="end">
								<IconButton onClick={onVisible}>
									{visible
										? <VisibilityOffIcon />
										: <VisibilityIcon />}
								</IconButton>
							</InputAdornment>,
						}} />
				</Grid>
			</Grid>}
		<Box py={2} />
		<Grid
			container
			spacing={2}
			alignItems="center">
			<Grid
				item
				xs={false}>
				<Button
					type="submit"
					disabled={loader}
					disableElevation
					variant="contained"
					color="secondary"
					startIcon={<LoginIcon />}>
					<b>Login</b>
				</Button>
			</Grid>
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
							to={'/'+ process.env.PAGE_RECOVERY}
							size="small"
							color="primary"
							startIcon={<LockIcon />}
							sx={{
								textTransform: 'none',
								minWidth: 'max-content',
							}}>
							<Typography
								component="div"
								variant="subtitle2">
								Forgot your password?
							</Typography>
						</Button>
					</Grid>
				</React.Fragment>}
		</Grid>
		</form>
	</React.Fragment>;
};

SignIn = React.memo(SignIn);
SignIn.defaultProps = {
};
SignIn.propTypes = {
};

export default SignIn;
