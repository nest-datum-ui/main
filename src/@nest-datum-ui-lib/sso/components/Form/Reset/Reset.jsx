import React from 'react';
import { useSelector } from 'react-redux';
import { 
	Link,
	useNavigate, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireProp as actionAuthProp } from '@nest-datum-ui/components/Store/auth/actions/prop.js';
import { fireReset as actionAuthReset } from '@nest-datum-ui/components/Store/auth/actions/reset.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Input from '@nest-datum-ui/components/Input';
import Loader from '@nest-datum-ui/components/Loader';

let Reset = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [ visible, setVisible ] = React.useState(() => false);
	const loader = useSelector(selectorMainExtract([ 'auth', 'loader' ]));
	const reset = useSelector(selectorMainExtract([ 'auth', 'reset' ]));
	const password = useSelector(selectorMainExtract([ 'auth', 'password' ]));
	const repeatedPassword = useSelector(selectorMainExtract([ 'auth', 'repeatedPassword' ]));
	const passwordError = useSelector(selectorMainExtract([ 'auth', 'errors', 'password' ]));
	const repeatedPasswordError = useSelector(selectorMainExtract([ 'auth', 'errors', 'repeatedPassword' ]));
	const onPassword = React.useCallback((e) => {
		actionAuthProp('password', e.target.value)();
	}, [
	]);
	const onRepeatedPassword = React.useCallback((e) => {
		actionAuthProp('repeatedPassword', e.target.value)();
	}, [
	]);
	const onReset = React.useCallback((e) => {
		e.preventDefault();

		if (!loader) {
			actionAuthReset({
				url: process.env.SERVICE_SSO,
				path: `user/${process.env.PAGE_RESET}`,
			})(navigate, enqueueSnackbar);
		}
	}, [
		navigate,
		enqueueSnackbar,
		loader,
	]);
	const onVisible = React.useCallback(() => {
		setVisible((currentState) => !currentState);
	}, [
		setVisible,
	]);

	return <React.Fragment>
		<Typography
			component="div"
			variant="h3">
			Reset account password
		</Typography>
		<Box py={2} />
		<form onSubmit={onReset}>
		{loader
			? <Loader visible />
			: (reset
				? <Typography>
					A link to restore access has been sent to your email.
				</Typography>
				: <React.Fragment>
					<Box pb={2}>
						<Input
							required
							type={visible
								? 'text'
								: 'password'}
							name="password"
							placeholder="Password"
							label="Password"
							value={password || ''}
							onChange={onPassword}
							error={passwordError}
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
					</Box>
					<Input
						required
						type={visible
							? 'text'
							: 'password'}
						name="repeatedPassword"
						placeholder="Password"
						label="Repeated password"
						value={repeatedPassword || ''}
						onChange={onRepeatedPassword}
						error={repeatedPasswordError}
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
				</React.Fragment>)}
		<Box py={2} />
		<Grid
			container
			spacing={2}
			alignItems="center">
			{reset
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
							startIcon={<SettingsBackupRestoreIcon />}>
							<b>Create new password</b>
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

Reset = React.memo(Reset);
Reset.defaultProps = {
};
Reset.propTypes = {
};

export default Reset;
