import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useParams,
	useNavigate, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectUserStatus from '@nest-datum-ui-lib/sso/components/Select/User/Status';
import SelectRole from '@nest-datum-ui-lib/sso/components/Select/Role';
import Loader from '@nest-datum-ui/components/Loader';
import InputText from '@nest-datum-ui/components/Input/Text';
import InputEmail from '@nest-datum-ui/components/Input/Email';
import InputPassword from '@nest-datum-ui/components/Input/Password';
import InputDateTime from '@nest-datum-ui/components/Input/DateTime';
import InputBool from '@nest-datum-ui/components/Input/Bool';
import FormOptionEntity from '@nest-datum-ui/components/Form/Option/Entity';
import onStore from './onStore.js';

let User = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { entityId } = useParams();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const id = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'id' ]));
	const login = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'login' ]));
	const email = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'email' ]));
	const password = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'password' ]));
	const emailVerifyKey = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'emailVerifyKey' ]));
	const emailVerifiedAt = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'emailVerifiedAt' ]));
	const roleId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'roleId' ]));
	const userStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'userStatusId' ]));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	const errorId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'id' ]));
	const errorLogin = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'login' ]));
	const errorEmail = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'email' ]));
	const errorPassword = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'password' ]));
	const errorEmailVerifyKey = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'emailVerifyKey' ]));
	const errorEmailVerifiedAt = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'emailVerifiedAt' ]));
	const errorRoleId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'roleId' ]));
	const errorUserStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'userStatusId' ]));
	const errorIsNotDelete = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'isNotDelete' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onStore({
			entityId,
			path: 'user',
			withAccessToken: true,
			enqueueSnackbar,
			navigate,
		});
	}, [
		entityId,
		enqueueSnackbar,
		navigate,
	]);
	const onChangeId = React.useCallback((e) => {
		actionApiFormProp(entityId, 'id', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeLogin = React.useCallback((e) => {
		actionApiFormProp(entityId, 'login', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeEmail = React.useCallback((e) => {
		actionApiFormProp(entityId, 'email', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeEmailVerifyKey = React.useCallback((e) => {
		actionApiFormProp(entityId, 'emailVerifyKey', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeEmailVerifiedAt = React.useCallback((e) => {
		actionApiFormProp(entityId, 'emailVerifiedAt', e.target.value)();
	}, [
		entityId,
	]);
	const onChangePassword = React.useCallback((e) => {
		actionApiFormProp(entityId, 'password', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeRoleId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'roleId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeUserStatusId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'userStatusId', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeIsNotDelete = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'isNotDelete', newValue)();
	}, [
		entityId,
	]);
	const onDelete = React.useCallback((e) => {
		actionDialogOpen('optionDrop', { entityId })();
	}, [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount
			&& entityId
			&& entityId !== '0') {
			actionApiFormGet({
				entityId,
				url: process.env.SERVICE_SSO,
				path: 'user',
				withAccessToken: true,
			})(enqueueSnackbar, navigate);
		}
	}, [
		unmount,
		entityId,
		enqueueSnackbar,
		navigate,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(entityId)();
	}, [
		entityId,
	]);

	return <React.Fragment>
		<Loader	visible={typeof loader === 'undefined' || unmount} />
		<form 
			onSubmit={onSubmit}
			style={{
				display: (typeof loader === 'undefined' || unmount)
					? 'none'
					: 'initial',
			}}>
			<Box py={2}>
				<InputText
					disabled={loader}
					name="id"
					label="id"
					helperText="Unique identificator"
					placeholder="For example: test-entity-id"
					value={id || ''}
					onChange={onChangeId}
					error={errorId} />
			</Box>
			<Box py={2}>
				<InputText
					disabled={loader}
					required
					name="login"
					label="User login"
					placeholder="For example: john95"
					value={login || ''}
					onChange={onChangeLogin}
					error={errorLogin} />
			</Box>
			<Box py={2}>
				<InputEmail
					disabled={loader}
					required
					name="email"
					label="Email"
					placeholder="For example: test@email.com"
					value={email || ''}
					onChange={onChangeEmail}
					error={errorEmail} />
			</Box>
			<Box py={2}>
				<InputPassword
					disabled={loader}
					required={(!entityId
						|| entityId === '0')}
					name="password"
					label="Password"
					value={password || ''}
					onChange={onChangePassword}
					error={errorPassword} />
			</Box>
			<Box py={2}>
				<InputText
					disabled={loader}
					name="emailVerifyKey"
					label="Email verify key"
					value={emailVerifyKey || ''}
					onChange={onChangeEmailVerifyKey}
					error={errorEmailVerifyKey} />
			</Box>
			<Box py={2}>
				{(entityId
					&& entityId !== '0')
					? (emailVerifiedAt
						? <InputDateTime
							disabled={loader}
							name="emailVerifiedAt"
							label="Email verified at"
							value={new Date(emailVerifiedAt)}
							onChange={onChangeEmailVerifiedAt}
							error={errorEmailVerifiedAt} />
						: <React.Fragment />)
					: <InputDateTime
						disabled={loader}
						name="emailVerifiedAt"
						label="Email verified at"
						value={(new Date())}
						onChange={onChangeEmailVerifiedAt}
						error={errorEmailVerifiedAt} />}
			</Box>
			<Box py={2}>
				<SelectRole
					disabled={loader}
					label="Role"
					name="roleId"
					value={roleId || ''}
					onChange={onChangeRoleId}
					error={errorRoleId} />
			</Box>
			<Box py={2}>
				<SelectUserStatus
					disabled={loader}
					label="Status"
					name="userStatusId"
					value={userStatusId || ''}
					onChange={onChangeUserStatusId}
					error={errorUserStatusId} />
			</Box>
			<Box py={2}>
				<InputBool
					disabled={loader}
					name="isNotDelete"
					label="Make entry undeletable"
					value={!!isNotDelete}
					onChange={onChangeIsNotDelete}
					error={errorIsNotDelete} />
			</Box>
			<FormOptionEntity
				withAccessToken
				entityId={entityId}
				url={process.env.SERVICE_SSO}
				path="user-option"
				pathEntity="user" />
			<Grid
				container
				spacing={3}
				alignItems="center"
				justifyContent="flex-end">
				<Grid
					item
					xs={false}>
					<Button
						disableElevation
						disabled={loader}
						type="submit"
						variant="contained"
						color="secondary"
						startIcon={loader
							? <Loader
								visible
								wrapper={{
									sx: {
										padding: '0px',
									},
								}}
								sx={{
									minWidth: '24px',
									maxWidth: '24px',
									minHeight: '24px',
									maxHeight: '24px',
								}} />
							: <SaveIcon />}>
						Save
					</Button>
				</Grid>
				{(!isNotDelete
					&& entityId
					&& typeof entityId === 'string'
					&& entityId !== '0')
					? <Grid
						item
						xs={false}>
						<Button
							disableElevation
							disabled={loader}
							variant="contained"
							color="error"
							startIcon={<DeleteIcon />}
							onClick={onDelete}>
							{isDeleted
								? 'Delete permanently'
								: 'Delete'}
						</Button>
					</Grid>
					: <React.Fragment />}
			</Grid>
		</form>
	</React.Fragment>;
};

User = React.memo(User);
User.defaultProps = {
};
User.propTypes = {
};

export default User;
