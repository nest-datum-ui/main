import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionDialogOpen, 
	actionApiFormRestore,
	actionApiListGet,
	actionApiFormPurge,
	actionApiListMerge,
} from '@nest-datum-ui/Store';
import { 
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists, 
} from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Field from '@nest-datum-ui/Field';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import InputEmail from '@nest-datum-ui/Input/Email';
import InputPassword from '@nest-datum-ui/Input/Password';
import DialogDrop from 'components/Dialog/Drop';
import DialogDisable from 'components/Dialog/Disable';
import FormOptionValue from 'components/Form/Option/Value';
import Select from 'components/Select';
import InputId from 'components/Input/Id';
import InputIsNotDelete from 'components/Input/IsNotDelete';
import InputLogin from '../../Input/Login';
import InputVerifyKey from '../../Input/VerifyKey';
import InputVerifyAt from '../../Input/VerifyAt';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerSubmit from './handler/submit.js';

let User = () => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: {
				statusListName,
				optionName,
				optionFormName,
				optionListName,
				storeName,
				apiFullUrl: apiUrl,
				id,
				entity: optionRelationListEntity,
				entityOptionRelation: optionRelationListEntityOptionRelation,
			}, 
		}, 
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: { 
			[statusListName]: { 
				storeName: statusStoreName, 
				apiFullUrl: statusApiUrl,
			}, 
			[optionListName]: {
				storeName: optionListStoreName,
				apiFullUrl: optionListApiUrl,
			},
			[optionFormName]: {
				relations: {
					apiFullUrl: optionRelationListApiUrl,
				},
			}, 
			[optionName]: {
				fieldsBlock,
			},
		},
		sso: {
			ssoRoleList: {
				storeName: ssoRoleListStoreName, 
				apiFullUrl: ssoRoleListApiUrl, 
			},
			ssoUserList: {
				storeName: ssoUserListStoreName,
				apiFullUrl: ssoUserListApiUrl,
			},
		}, 
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const verifyAtDefaultValue = React.useMemo(() => new Date(), [
	]);
	const ready = useSelector(selectorMainExtract([ 'api', 'list', ssoUserListStoreName, 'ready' ]));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isDeleted' ]));
	const onDrop = React.useCallback(() => actionDialogOpen(isDeleted ? 'drop' : 'disable', { entityId })(), [
		entityId,
		isDeleted,
	]);
	const onRestore = React.useCallback(() => actionApiFormRestore(storeName, { apiUrl, entityId })(), [
		storeName,
		apiUrl,
		entityId,
	]);
	const onSubmitWrapper = React.useCallback((e) => handlerSubmit(e, { 
		storeName, 
		optionListStoreName,  
		optionRelationListEntity,
		optionRelationListEntityOptionRelation,
		apiUrl, 
		optionRelationListApiUrl,
		entityId, 
	}), [
		storeName,
		optionListStoreName,
		optionRelationListEntity,
		optionRelationListEntityOptionRelation,
		apiUrl,
		optionRelationListApiUrl,
		entityId,
	]);

	React.useEffect(() => {
		if (utilsCheckStrIdExists(entityId) && ready === undefined) {
			actionApiListGet(ssoUserListStoreName, {
				apiUrl: ssoUserListApiUrl,
				filter: {
					userUserOptions: {
						userId: entityId,
					},
				},
			})(({ data: contentData = [] }) => {
				actionApiListGet(optionListStoreName, {
					apiUrl: optionListApiUrl,
					filter: {
						isDeleted: false,
					},
				})(({ data: optionsData = [] }) => {
					let i = 0;

					while (i < optionsData.length) {
						const optionsDataItem = optionsData[i];
						const id = optionsDataItem['id'];

						optionsData[i]['userUserOptions'] = [{
							userId: contentData[0]['userId'] || '',
							userOptionId: optionsDataItem['id'],
							id,
							userUserUserOptions: (contentData[0]['userUserOptions'] ?? [])
								.filter((item) => item['userOptionId'] === optionsDataItem['id'])
								.map((item) => ({
									id: item['id'],
									userUserOptionId: id,
									userId: item['userId'] || '',
									content: item['content'] ?? optionsDataItem['defaultValue'] ?? '',
								})),
							}];
						i++;
					}
					if (optionsData.length > 0) {
						actionApiListMerge(ssoUserListStoreName, {
							data: [ ...optionsData ],
							ready: true,
						})();
					}
				});
			});
		}
	}, [
		ssoUserListStoreName,
		ssoUserListApiUrl,
		optionListStoreName,
		optionListApiUrl,
		entityId,
		ready,
	]);

	React.useEffect(() => () => {
		actionApiFormPurge(ssoUserListStoreName)();
		actionApiFormPurge(optionListStoreName)();
	}, [
		ssoUserListStoreName,
		optionListStoreName,
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		onSubmit={onSubmitWrapper}
		loadOnFirstRender>
		<Box py={1}>
			<Field
				Component={InputId}
				form={id}
				name="id" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputLogin}
				form={id}
				name="login"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputEmail}
				form={id}
				name="email"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputPassword}
				form={id}
				name="password" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputVerifyKey}
				form={id}
				name="verifyKey" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputVerifyAt}
				form={id}
				name="verifyAt"
				defaultValue={verifyAtDefaultValue} />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={ssoRoleListStoreName}
					apiUrl={ssoRoleListApiUrl} />)}
				form={id}
				itemKey="name"
				name="roleId"
				label="Role"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={statusStoreName}
					apiUrl={statusApiUrl} />)}
				form={id}
				itemKey="name"
				name="userStatusId"
				label="Status"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputIsNotDelete}
				form={id}
				type="checkbox"
				name="isNotDelete" />
		</Box>
		{(utilsCheckStrIdExists(entityId) && fieldsBlock && ready) 
			&& <FormOptionValue entityId={entityId} storeName={ssoUserListStoreName} />}
		<Box pb={2}>
			<Grid container spacing={2} justifyContent="flex-end">
				<Grid
					item
					xs={false}>
					<ButtonPrimary form={id} type="submit" startIcon={<SaveIcon />}>
						Save
					</ButtonPrimary>
				</Grid>
				{(!isNotDelete && isDeleted)
					&& <Grid
						item
						xs={false}>
						<ButtonPrimary startIcon={<SettingsBackupRestoreIcon />} onClick={onRestore}>
							Restore
						</ButtonPrimary>
					</Grid>}
				{(!isNotDelete && utilsCheckStrId(entityId))
					&& <Grid
						item
						xs={false}>
						<ButtonPrimary color="error" startIcon={<DeleteIcon />} onClick={onDrop}>
							{isDeleted
								? 'Delete'
								: 'Disable'}
						</ButtonPrimary>
					</Grid>}
			</Grid>
		</Box>
		<DialogDrop redirect />
		<DialogDisable />
    </StyledWrapper>;
};

User = React.memo(User);
User.defaultProps = {
};
User.propTypes = {
};

export default User;
