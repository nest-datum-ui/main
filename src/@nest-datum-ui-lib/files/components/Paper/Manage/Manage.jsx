import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormEmpty as actionApiFormEmpty } from '@nest-datum-ui/components/Store/api/actions/form/empty.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SelectSystem from '@nest-datum-ui-lib/files/components/Select/System';
import FormManageFilter from '@nest-datum-ui-lib/files/components/Form/Manage/Filter';
import MenuBreadcrumbs  from '@nest-datum-ui-lib/files/components/Menu/Breadcrumbs';
import MenuManage from '@nest-datum-ui-lib/files/components/Menu/Manage';
import ListManage from '@nest-datum-ui-lib/files/components/List/Manage';

let Manage = ({
	label,
	labelWrapperProps,
	labelProps,
	selectSystemLabel,
	selectSystemWrapperProps,
	selectSystemProps,
	createFolder,
	createFile,
	filters,
	search,
	children,
	onSelectFolder,
	onSelectFile,
}) => {
	const [ mount, setMount ] = React.useState(() => false);
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const systemId = useSelector(selectorMainExtract([ 'api', 'form', 'filesManageSystem', 'systemId' ]));
	const onChangeSystemId = React.useCallback((e, newValue) => {
		actionApiFormProp('filesManageSystem', 'systemId', e.target.value)();
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
		<Box pt={2}>
			<Grid
				container
				spacing={3}
				alignItems="center">
				{label
					? <Grid
						item
						xs={false}
						{ ...labelWrapperProps }>
						<Typography
							component="div"
							variant="h5"
							{ ...labelProps }>
							{label}
						</Typography>
					</Grid>
					: <React.Fragment />}
				<Grid
					item
					xs={12}
					sm={12}
					md={4}
					lg={2}
					{ ...selectSystemWrapperProps }>
					<SelectSystem
						label={selectSystemLabel}
						name="systemId"
						value={systemId || ''}
						onChange={onChangeSystemId}
						{ ...selectSystemProps } />
				</Grid>
			</Grid>
		</Box>
		{systemId
			? <React.Fragment>
				{(filters
					|| search)
					? <Box pt={2}>
						<FormManageFilter
							filters={filters}
							search={search} />
					</Box>
					: <React.Fragment />}
				<Box overflow="hidden">
					<MenuManage
						createFolder={createFolder}
						createFile={createFile} />
				</Box>
				<Box pb={1}>
					<MenuBreadcrumbs />
				</Box>
				<Box overflow="hidden">
					<ListManage
						onSelectFolder={onSelectFolder}
						onSelectFile={onSelectFile} />
				</Box>
				{children
					? children
					: <React.Fragment />}
			</React.Fragment>
			: <React.Fragment />}
	</React.Fragment>;
};

Manage = React.memo(Manage);
Manage.defaultProps = {
	label: `File manager`,
	labelWrapperProps: {},
	labelProps: {},
	selectSystemLabel: `Select file system`,
	selectSystemWrapperProps: {},
	selectSystemProps: {},
};
Manage.propTypes = {
	label: PropTypes.string,
	labelWrapperProps: PropTypes.object,
	labelProps: PropTypes.object,
	selectSystemLabel: PropTypes.string,
	selectSystemWrapperProps: PropTypes.object,
	selectSystemProps: PropTypes.object,
	createFolder: PropTypes.bool,
	createFile: PropTypes.bool,
	filters: PropTypes.bool,
	search: PropTypes.bool,
	onSelectFolder: PropTypes.func,
	onSelectFile: PropTypes.func,
};

export default Manage;