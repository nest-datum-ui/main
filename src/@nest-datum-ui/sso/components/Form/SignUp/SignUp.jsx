import React from 'react';
import { useSelector } from 'react-redux';
import { 
	Link,
	useNavigate, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireProp as actionAuthProp } from '@nest-datum-ui/components/Store/auth/actions/prop.js';
import { fireRegister as actionAuthRegister } from '@nest-datum-ui/components/Store/auth/actions/register.js';
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
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Input from '@nest-datum-ui/components/Input';
import InputEmail from '@nest-datum-ui/components/Input/Email';
import Loader from '@nest-datum-ui/components/Loader';

let SignUp = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [ visible, setVisible ] = React.useState(() => false);
	const register = useSelector(selectorMainExtract([ 'auth', 'register' ]));
	const loader = useSelector(selectorMainExtract([ 'auth', 'loader' ]));
	const error = useSelector(selectorMainExtract([ 'auth', 'error' ])) ?? {};
	const email = useSelector(selectorMainExtract([ 'auth', 'email' ])) ?? '';
	const login = useSelector(selectorMainExtract([ 'auth', 'login' ])) ?? '';
	const firstname = useSelector(selectorMainExtract([ 'auth', 'firstname' ])) ?? '';
	const lastname = useSelector(selectorMainExtract([ 'auth', 'lastname' ])) ?? '';
	const password = useSelector(selectorMainExtract([ 'auth', 'password' ])) ?? '';
	const repeatedPassword = useSelector(selectorMainExtract([ 'auth', 'repeatedPassword' ])) ?? '';
	const onEmail = React.useCallback((e) => {
		actionAuthProp('email', e.target.value)();
	}, [
	]);
	const onLogin = React.useCallback((e) => {
		actionAuthProp('login', e.target.value)();
	}, [
	]);
	const onFirstname = React.useCallback((e) => {
		actionAuthProp('firstname', e.target.value)();
	}, [
	]);
	const onLastname = React.useCallback((e) => {
		actionAuthProp('lastname', e.target.value)();
	}, [
	]);
	const onPassword = React.useCallback((e) => {
		actionAuthProp('password', e.target.value)();
	}, [
	]);
	const onRepeatedPassword = React.useCallback((e) => {
		actionAuthProp('repeatedPassword', e.target.value)();
	}, [
	]);
	const onSignUp = React.useCallback((e) => {
		e.preventDefault();

		if (!loader) {
			actionAuthRegister({
				url: process.env.SERVICE_SSO,
				path: 'user/register',
			})(navigate, enqueueSnackbar);
		}
	}, [
		enqueueSnackbar,
		navigate,
		loader,
	]);
	const onVisible = React.useCallback(() => {
		setVisible((currentState) => !currentState);
	}, [
		setVisible,
	]);

	return register
		? <React.Fragment>
			<Typography
				component="div"
				variant="h4">
				An email has been sent to your email address with a link to complete your registration.
			</Typography>
			<Box py={2} />
			<Button
				disabled={loader}
				component={Link}
				to={'/'+ process.env.PAGE_SIGN_IN}
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
					Sign-in
				</Typography>
			</Button>
		</React.Fragment>
		: <React.Fragment>
			<Typography
				component="div"
				variant="h3">
				Registering a new account
			</Typography>
			<Box py={2} />
			<form onSubmit={onSignUp}>
			{loader
				? <Loader visible />
				: <Grid
					container
					spacing={3}>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}>
						<InputEmail
							required
							name="email"
							placeholder="name@email.com"
							label="Email"
							value={email}
							onChange={onEmail}
							error={error['email']}
							InputProps={{
								startAdornment: <InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>,
							}} />
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}>
						<Input
							required
							type="text"
							name="login"
							placeholder="john95"
							label="Login"
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
						sm={12}
						md={6}>
						<InputEmail
							required
							name="firstname"
							placeholder="John"
							label="Firstname"
							value={firstname}
							onChange={onFirstname}
							error={error['firstname']}
							InputProps={{
								startAdornment: <InputAdornment position="start">
									<PersonIcon />
								</InputAdornment>,
							}} />
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}>
						<Input
							required
							type="text"
							name="lastname"
							placeholder="jonson"
							label="Lastname"
							value={lastname}
							onChange={onLastname}
							error={error['lastname']}
							InputProps={{
								startAdornment: <InputAdornment position="start">
									<PersonIcon />
								</InputAdornment>,
							}} />
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}>
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
					<Grid
						item
						xs={12}
						sm={12}
						md={6}>
						<Input
							required
							type={visible
								? 'text'
								: 'password'}
							name="repeatedPassword"
							placeholder="Password"
							label="Repeated password"
							value={repeatedPassword}
							onChange={onRepeatedPassword}
							error={error['repeatedPassword']}
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
						<b>Sign-up</b>
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
						to={'/'+ process.env.PAGE_SIGN_IN}
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
							Sign-in
						</Typography>
					</Button>
				</Grid>
			</Grid>
			</form>
		</React.Fragment>;
};

SignUp = React.memo(SignUp);
SignUp.defaultProps = {
};
SignUp.propTypes = {
};

export default SignUp;
