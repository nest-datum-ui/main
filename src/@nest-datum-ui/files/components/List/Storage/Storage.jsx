import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireListSet as actionBreadcrumbsListSet } from 'components/Store/breadcrumbs/actions/list/set.js';
import { fireListPush as actionBreadcrumbsListPush } from 'components/Store/breadcrumbs/actions/list/push.js';
import { fireListClear as actionBreadcrumbsListClear } from 'components/Store/breadcrumbs/actions/list/clear.js';
import { fireFormGet as actionApiFormGet } from 'components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from 'components/Store/api/actions/form/clear.js';
import { fireOpen as actionMenuOpen } from 'components/Store/menu/actions/open.js';
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import selectorApiExtractByKey from 'components/Store/api/selectors/extractByKey.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import Store from 'components/Store';
import Loader from 'components/Loader';
import MenuStorageContext from '@nest-datum-ui/files/components/Menu/Storage/Context';

let Storage = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { serviceKey } = useParams();
	const service = useSelector(selectorApiExtractByKey('registryPoolList', serviceKey));
	const gateway = (((service || {}).servServOptions || []).find((item) => item.servOptionId === 'serv-option-gateway-url') || {}).content;
	const breadcrumbs = useSelector(selectorMainExtract([ 'breadcrumbs', 'list', 'storage', 'data' ])) ?? [];
	const currentFolderKey = (breadcrumbs[breadcrumbs.length - 1] || {}).key || '';
	const currentFolderPath = (breadcrumbs[breadcrumbs.length - 1] || {}).path || '';
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', currentFolderKey, 'loader' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'form', currentFolderKey ])) || {};
	const onFolder = React.useCallback((id, name, path) => (e) => {
		actionBreadcrumbsListPush('storage', { 
			key: id,
			text: name, 
			path: path,
		})();
	}, [
	]);
	const onFile = React.useCallback((id, name) => (e) => {

	}, [
	]);
	const onMenu = React.useCallback((id) => (e) => {
		actionMenuOpen(`files-menu-storage-context-${id}`, e.target)();
	}, [
	]);

	React.useEffect(() => {
		actionBreadcrumbsListSet('storage', [{
			key: 'root',
			text: '...',
		}])();
	}, [
	]);

	React.useEffect(() => {
		if (!unmount 
			&& gateway
			&& currentFolderKey) {
			actionApiFormGet({
				entityId: currentFolderKey,
				url: gateway,
				path: 'folder',
				withAccessToken: true,
			})(enqueueSnackbar);
		}
	}, [
		unmount,
		enqueueSnackbar,
		gateway,
		currentFolderKey,
	]);

	React.useEffect(() => {
		if (currentFolderKey) {
			((Store()
				.getState()['breadcrumbs']
				.list
				.storage || {})
				.data || [])
				.filter((item) => item.key !== currentFolderKey)
				.forEach((item) => {
					actionApiFormClear(item.key)();
				});
		}
	}, [
		currentFolderKey,
	]);

	React.useEffect(() => () => {
		actionBreadcrumbsListClear('storage')();
	}, []);

	return <React.Fragment>
		{(Array.isArray(data['files']) && !loader)
			? ((data['files'].length > 0)
				? <React.Fragment>
					<Grid
						container
						alignItems="flex-start"
						spacing={4}>
						{data['files'].map((item, i) => {
							return <Grid
								key={item.name}
								item
								xs={2}>
								<Grid
									container
									spacing={1}>
									<Grid
										item
										xs={true}>
										<Button
											component="div"
											onClick={item.path
												? onFolder(item.id, item.name, item.path)
												: onFile(item.id, item.name)}
											sx={{
												alignItems: 'flex-end',
												flexDirection: 'column',
												width: '100%',
												height: '100%',
												backgroundColor: '#f7f7f7',
											}}>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													width: '100%',
													height: '100%',
													backgroundColor: '#f7f7f7',
													...(item.type === 'png'
														|| item.type === 'jpeg'
														|| item.type === 'jpg'
														|| item.type === 'svg'
														|| item.type === 'gif')
														? {
															backgroundImage: `url("${process.env.STORAGE_URL}/${`${currentFolderPath}/${item.name}`
																.split('/')
																.filter((item) => item)
																.join('/')}")`,
															backgroundSize: 'contain',
															backgroundPosition: 'center',
															backgroundRepeat: 'no-repeat',
														}
														: {},
													'&:after': {
														content: '""',
														display: 'block',
														paddingBottom: '100%',
													},
												}}>
												{item.path
													? <FolderIcon
														sx={{
															fontSize: '80px',
															color: item.isDeleted
																? 'grey !important'
																: 'inherit',
														}} />
													: <React.Fragment />}
											</Box>
											<Typography
												component="div"
												color={item.isDeleted
													? 'textSecondary'
													: 'initial'}
												sx={{
													width: '100%',
													padding: '4px 2px',
													textTransform: 'initial',
													wordWrap: 'anywhere',
													textAlign: 'center',
													...item.isDeleted
														? { textDecoration: 'line-through' }
														: {},
												}}>
												{item.name}
											</Typography>
										</Button>
									</Grid>
									<Grid
										item
										xs={false}>
										<IconButton
											size="small"
											onClick={onMenu(item.id)}>
											<MoreVertIcon fontSize="small" />
										</IconButton>
										<MenuStorageContext
											id={`files-menu-storage-context-${item.id}`}
											entityId={item.id}
											isDeleted={item.isDeleted}
											isNotDelete={item.isNotDelete}
											name={item.name}
											type={item.type
												? 'file'
												: 'folder'} />
									</Grid>
								</Grid>
							</Grid>
						})}
					</Grid>
				</React.Fragment>
				: <Box
					py={6}
					display="flex"
					justifyContent="center">
					<Typography
						variant="subtitle2"
						color="secondary">
						Файлы не добавлены
					</Typography>
				</Box>)
			: <Loader visible />}
	</React.Fragment>;
};

Storage = React.memo(Storage);
Storage.defaultProps = {
};
Storage.propTypes = {
};

export default Storage;
