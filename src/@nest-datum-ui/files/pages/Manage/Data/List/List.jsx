import React from 'react';
import { useSelector } from 'react-redux';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormEmpty as actionApiFormEmpty } from '@nest-datum-ui/components/Store/api/actions/form/empty.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SelectSystem from '@nest-datum-ui/files/components/Select/System';
import FormManageFilter from '@nest-datum-ui/files/components/Form/Manage/Filter';
import MenuBreadcrumbs  from '@nest-datum-ui/files/components/Menu/Breadcrumbs';
import MenuManage from '@nest-datum-ui/files/components/Menu/Manage';
import ListManage from '@nest-datum-ui/files/components/List/Manage';
import DialogFolderStore from '@nest-datum-ui/files/components/Dialog/Folder/Store';
import DialogFolderDrop from '@nest-datum-ui/files/components/Dialog/Folder/Drop';
import DialogFileStore from '@nest-datum-ui/files/components/Dialog/File/Store';
import DialogFileDrop from '@nest-datum-ui/files/components/Dialog/File/Drop';

let List = () => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const systemId = useSelector(selectorMainExtract([ 'api', 'form', 'filesManageSystem', 'systemId' ]));
	const [ mount, setMount ] = React.useState(() => false);
	const onChangeSystemId = React.useCallback((e, newValue) => {
		actionApiFormProp('filesManageSystem', 'systemId', e.target.value)();
	}, [
	]);

	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'files',
			text: 'Files',
		}, {
			key: '/files/manage',
			text: 'File manager',
		}])();
	}, [
	]);

	React.useEffect(() => {
		if (!unmount
			&& !mount) {
			actionApiFormEmpty('filesManageSystem', {
				systemId: '',
				loader: false,
			})();
			setMount(true);
		}
	}, [
		unmount,
		mount,
	]);

	React.useEffect(() => () => {
		actionApiFormClear('filesManageSystem')();
	}, [
	]);

	return <React.Fragment>
		<React.Fragment>
			<Box pt={2}>
				<Grid
					container
					spacing={3}
					alignItems="center">
					<Grid
						item
						xs={false}>
						<Typography
							component="div"
							variant="h5">
							File manager
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}
						lg={2}>
						<SelectSystem
							label="Select file system"
							name="systemId"
							value={systemId || ''}
							onChange={onChangeSystemId} />
					</Grid>
				</Grid>
			</Box>
			{systemId
				? <React.Fragment>
					<Box pt={2}>
						<FormManageFilter />
					</Box>
					<Box 
						overflow="hidden"
						pb={4}>
						<MenuManage />
					</Box>
					<Box pb={2}>
						<MenuBreadcrumbs />
					</Box>
					<Box overflow="hidden">
						<ListManage />
					</Box>
					<Routes>
						<Route
							path=":entityId"
							element={<React.Fragment>
								<DialogFolderDrop />
								<DialogFolderStore />
								<DialogFileDrop />
								<DialogFileStore />
							</React.Fragment>} />
					</Routes>
				</React.Fragment>
				: <React.Fragment />}
		</React.Fragment>
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
