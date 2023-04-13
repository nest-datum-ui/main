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
} from '@nest-datum-ui/Store';
import { 
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists, 
} from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Field from '@nest-datum-ui/Field';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import Select from 'components/Select';
import InputId from 'components/Input/Id';
import InputEnvKey from 'components/Input/EnvKey';
import InputName from 'components/Input/Name';
import InputDescription from 'components/Input/Description';
import InputValue from 'components/Input/Value';
import InputRegex from 'components/Input/Regex';
import InputIsMultiline from 'components/Input/IsMultiline';
import InputIsRequired from 'components/Input/IsRequired';
import InputIsNotDelete from 'components/Input/IsNotDelete';
import DialogDrop from 'components/Dialog/Drop';
import DialogDisable from 'components/Dialog/Disable';
import DialogDisableMany from 'components/Dialog/Disable/Many';
import ListRelation from 'components/List/Relation';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerSubmit from './handler/submit.js';

let Option = () => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				id, 
				storeName, 
				apiFullUrl,
				entityRelation, 
				relationListName,
			},
		},
		'data-type': { 
			dataTypeList: {
				storeName: dataTypeListStoreName, 
				apiFullUrl: dataTypeListApiFullUrl, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const {
		[serviceName]: {
			[relationListName]: {
				columnName,
				apiMainModelUrl,
			} = {},
		},
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isDeleted' ]));
	const onSubmitWrapper = React.useCallback((e) => handlerSubmit(e, storeName, apiFullUrl, entityId), [
		storeName,
		apiFullUrl,
		entityId,
	]);
	const onDrop = React.useCallback(() => actionDialogOpen(isDeleted ? 'drop' : 'disable', { entityId })(), [
		entityId,
		isDeleted,
	]);
	const onRestore = React.useCallback(() => actionApiFormRestore(storeName, { apiUrl: apiFullUrl, entityId })(), [
		storeName,
		apiFullUrl,
		entityId,
	]);
	const initialFilter = React.useMemo(() => ({ [entityRelation]: entityId }), [
		entityRelation,
		entityId,
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiFullUrl}
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
				Component={InputEnvKey}
				form={id}
				name="envKey" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputName}
				form={id}
				name="name"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputDescription}
				form={id}
				name="description" />
		</Box>
		<Box py={1}>
			<Field
				storeName={dataTypeListStoreName}
				apiUrl={dataTypeListApiFullUrl}
				Component={Select}
				form={id}
				itemKey="name"
				name="dataTypeId"
				label="Data type"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputValue}
				form={id}
				name="defaultValue" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputRegex}
				form={id}
				name="regex" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputIsMultiline}
				form={id}
				type="checkbox"
				name="isMultiline" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputIsRequired}
				form={id}
				type="checkbox"
				name="isRequired" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputIsNotDelete}
				form={id}
				type="checkbox"
				name="isNotDelete" />
		</Box>
		<Box pb={2}>
			<Grid container spacing={2} justifyContent="flex-end">
				<Grid
					item
					xs={false}>
					<ButtonPrimary form={id} type="submit" startIcon={<SaveIcon />}>
						Save
					</ButtonPrimary>
				</Grid>
				{!isNotDelete && isDeleted
					&& <Grid
						item
						xs={false}>
						<ButtonPrimary startIcon={<SettingsBackupRestoreIcon />} onClick={onRestore}>
							Restore
						</ButtonPrimary>
					</Grid>}
				{!isNotDelete && utilsCheckStrId(entityId)
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
			{(utilsCheckStrIdExists(entityId) && relationListName)
				&& <ContextRoute.Provider value={relationListName}>
					<Box py={2}>
						<Divider />
					</Box>
					<ListRelation 
						initialFilter={initialFilter}
						Component={({ 
							id, 
							isDeleted,
							[columnName]: entityId, 
						}) => <TypographyFetch 
							key={id ?? entityId} 
							apiUrl={apiMainModelUrl}>
							{entityId}
						</TypographyFetch>} />
					<DialogDisableMany />
				</ContextRoute.Provider>}
		</Box>
		<DialogDrop redirect />
		<DialogDisable />
	</StyledWrapper>;
};

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
