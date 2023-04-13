import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import { 
	actionApiListGet,
	actionApiListPurge,
	actionApiFormPurge,
	actionApiFormProp,
	actionBreadcrumbsSet,
	actionUrlFilter,
	hookUrlFilterItem, 
	hookUrlNavigate,
} from '@nest-datum-ui/Store';
import { objFilled as utilsCheckObjFilled } from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuBreadcrumbs from '@nest-datum-ui/Menu/Breadcrumbs';
import PaperManage from '../../Paper/Manage';
import TableManager from '../../Table/Manager';
import FormSystemId from '../../Form/SystemId';
import StyledWrapper from './Styled/Wrapper.jsx';

let Manager = (props) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				apiFullUrl: apiUrl, 
				storeName,
				folders: {
					apiFullUrl: foldersApiUrl,
				},
			}, 
			filesSystemList: {
				storeName: filesSystemListStoreName,
			}
		}, 
	} = React.useContext(ContextProps);
	const { search } = useLocation();
	const systemIdUrl = hookUrlFilterItem('systemId', search);
	const parentIdUrl = hookUrlFilterItem('parentId', search);
	const systemId = (systemIdUrl === undefined)
		? ''
		: String(systemIdUrl);
	const parentId = (parentIdUrl === undefined)
		? ''
		: String(parentIdUrl);
	const processFilter = React.useCallback((data) => {
		data = JSON.parse(data);

		delete data['systemId'];
		return (utilsCheckObjFilled(data))
			? JSON.stringify(data)
			: undefined;
	}, [
	]);
	const onBreadcrumbs = React.useCallback((e, { key, index }) => actionUrlFilter(storeName, 'parentId', key), [
		storeName,
	]);

	React.useEffect(() => {
		if (systemId) {
			actionApiListGet(`${storeName}_parentFolder`, { 
				apiUrl: foldersApiUrl, 
				limit: 1, 
				filter: {
					parentId: '',
					systemId,
				},
			})(async ({ data = [] }) => {
				const parentIdUrl = hookUrlFilterItem('parentId');

				if (parentIdUrl) {
					const core = data[0];

					actionApiListGet(`${storeName}_parentFolder`, { 
						apiUrl: foldersApiUrl, 
						limit: 1, 
						filter: {
							id: parentIdUrl,
							systemId,
						},
					})(async ({ data = [] }) => {
						const dataSplit = data[0]['path'].replace(core['path'], '').split('/');

						if (dataSplit.length > 1) {
							const last = data[0];
							let i = 0,
								paths = [];

							while (i < dataSplit.length - 1) {
								paths.push(paths.length === 0
									? `${core['path']}/${dataSplit[i]}`.replace(new RegExp('//', 'g'), '/')
									: `${dataSplit[dataSplit.length - 1]}/${dataSplit[i]}`.replace(new RegExp('//', 'g'), '/'));
								i++;
							}
							actionApiListGet(`${storeName}_parentFolder`, { 
								apiUrl: foldersApiUrl, 
								limit: 1, 
								filter: {
									systemId,
									path: [ '$In', ...paths ],
								},
							})(async ({ data = [] }) => {
								await actionApiFormProp(storeName, 'systemId', systemId)();
								await actionApiFormProp(storeName, 'parentId', parentIdUrl)();
								await actionBreadcrumbsSet(storeName, [{ 
									key: core['id'], 
									text: '...', 
								}, 
								...paths.map((path) => {
									const item = data.find((item) => item['path'] === path);

									return {
										key: item['id'], 
										text: item['name'], 
									};
								}), {
									key: parentIdUrl, 
									text: last['name'], 
								}])();
							});
						}
						else {
							await actionApiFormProp(storeName, 'systemId', systemId)();
							await actionApiFormProp(storeName, 'parentId', parentIdUrl)();
							await actionBreadcrumbsSet(storeName, [{ 
								key: core['id'], 
								text: '...', 
							}, {
								key: parentIdUrl, 
								text: data[0]['name'], 
							}])();
						}
					});
				}
				else {
					await actionApiFormProp(storeName, 'systemId', systemId)();
					await actionApiFormProp(storeName, 'parentId', data[0]['id'])();
					await actionBreadcrumbsSet(storeName, [{ key: data[0]['id'], text: '...' }])();

					hookUrlNavigate(`${window.location.pathname}?filter={"systemId":"${systemId}","parentId":"${data[0]['id']}"}`);
				}
			});
		}
	}, [
		systemId,
		foldersApiUrl,
		storeName,
	]);

	React.useEffect(() => () => {
		actionApiFormPurge(storeName)();
		actionApiListPurge(storeName)();
		actionApiFormPurge(filesSystemListStoreName)();
		actionApiListPurge(filesSystemListStoreName)();
		actionApiFormPurge(`${storeName}_query`)();
		actionApiListPurge(`${storeName}_query`)();
		actionApiFormPurge(`${filesSystemListStoreName}_query`)();
		actionApiListPurge(`${filesSystemListStoreName}_query`)();
		actionApiFormPurge(`${storeName}_parentFolder`)();
		actionApiListPurge(`${storeName}_parentFolder`)();
	}, [
		storeName,
		filesSystemListStoreName,
	]);

	return <React.Fragment>
		<Box maxWidth="180px">
			<FormSystemId />
		</Box>
		{(systemId && parentId)
			? <StyledWrapper 
				apiUrl={apiUrl.replace(':id', systemId)} 
				processFilter={processFilter}
				ManageComponent={() => <PaperManage systemId={systemId} />}>
				<Box pb={2}>
					<MenuBreadcrumbs 
						name={storeName}
						onClick={onBreadcrumbs} />
				</Box>
				<TableManager />
			</StyledWrapper>
			: <Box 
				pt={2}
				display="flex"
				justifyContent="center">
				<Typography
					component="div"
					variant="caption"
					color="textSecondary">
					No file system selected.
				</Typography>
			</Box>}
	</React.Fragment>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
};
Manager.propManagers = {
};

export default Manager;
