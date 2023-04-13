import React from 'react';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { 
	actionApiFormRestore,
	actionApiFormProp,
	actionDialogOpen,
	actionBreadcrumbsPush,
	actionUrlFilter,
} from '@nest-datum-ui/Store';
import TypographyTable from 'components/Typography/Table';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	parentId,
	path,
	name,
	description,
	type,
	size,
	userId,
	isDeleted,
	isNotDelete,
	createdAt,
	updatedAt,
	disableLink,
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				storeName,
				files: {
					apiFullUrl: filesApiUrl,
				},
			}, 
		},
		sso: {
			ssoUserList: {
				apiFullUrl: ssoUserListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const onDrop = React.useCallback((e) => actionDialogOpen(`fileManager${isDeleted ? 'Drop' : 'Disable'}`, { entityId: id, type })(), [
		id,
		isDeleted,
		type,
	]);
	const onDropForce = React.useCallback((e) => actionDialogOpen(`fileManagerDropForce`, { entityId: id, type })(), [
		id,
		type,
	]);
	const onRestore = React.useCallback((e) => actionApiFormRestore(storeName, { apiUrl: filesApiUrl, entityId: id, type: 'list' })(), [
		storeName,
		filesApiUrl,
		id,
	]);
	const onEdit = React.useCallback((e) => actionApiFormProp(storeName, 'loader', true)(() => actionDialogOpen((type === 'folder') ? 'folderManagerForm' : 'fileManagerForm', { entityId: id, type })()), [
		storeName,
		id,
		type,
	]);
	const onFolder = React.useCallback(() => {
		actionUrlFilter(storeName, 'parentId', id);
		actionBreadcrumbsPush(storeName, { key: id, text: name })();
	}, [
		storeName,
		name,
		id,
	]);

	return <StyledWrapper 
		id={id} 
		isDeleted={isDeleted} 
		isNotDelete={isNotDelete} 
		createdAt={createdAt} 
		updatedAt={updatedAt}
		onDrop={onDrop}
		onDropForce={onDropForce}
		onRestore={onRestore}
		onEdit={onEdit}>
		{([{ 
			children: <TypographyTable 
				key={0} 
				isDeleted={isDeleted}
				{ ...(type === 'folder')
					? { onClick: onFolder, style: { cursor: 'pointer' } }
					: {} }>
				{id}
			</TypographyTable>, 
		}, { 
			children: <React.Fragment key={1}>
				<TypographyTable 
					{ ...(type === 'folder')
						? { onClick: onFolder, style: { cursor: 'pointer' } }
						: {} }
					isDeleted={isDeleted} 
					variant="h6">
					{name}
				</TypographyTable>
				<div />
				<TypographyTable 
					{ ...(type === 'folder')
						? { onClick: onFolder, style: { cursor: 'pointer' } }
						: {} }
					isDeleted={isDeleted} 
					variant="subtitle1">
					{description}
				</TypographyTable>
			</React.Fragment>, 
		}, { 
			children: <TypographyFetch 
				key={3} 
				apiUrl={ssoUserListApiUrl} 
				label="login">
				{userId}
			</TypographyFetch>, 
		}])}
	</StyledWrapper>;
};

Row = React.memo(Row);
Row.defaultProps = {
};
Row.propTypes = {
};

export default Row;
