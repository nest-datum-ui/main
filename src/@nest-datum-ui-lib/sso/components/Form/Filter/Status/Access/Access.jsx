import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fireListCreateFilterUrl as actionApiListCreateFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/createFilterUrl.js';
import { fireListClearFilterUrl as actionApiListClearFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/clearFilterUrl.js';
import { SSO_PATH_ACCESS_STATUS } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlItemFilterGetId from '@nest-datum-ui/utils/url/item/filter/get/id.js';
import utilsUrlItemFilterId from '@nest-datum-ui/utils/url/item/filter/id.js';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SsoSelectAccessStatusMultiple from '@nest-datum-ui-lib/sso/components/Select/Access/Status/Multiple';

let Access = ({
	onChange,
	onInput,
}) => {
	const { search } = useLocation();
	const [ id ] = React.useState(() => uuidv4());
	const dataLength = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS_STATUS, 'data', 'length' ]));
	const value = (dataLength > 0)
		? utilsUrlItemFilterGetId(search, SSO_PATH_ACCESS_STATUS, 'accessStatusId')
		: [];
	const onChangeMemo = React.useCallback((e) => {
		actionApiListCreateFilterUrl(e, utilsUrlItemFilterId('accessStatusId'));
		onChange(e);
		onInput(e);
	}, [
		onChange,
		onInput,
	]);
	const onClear = React.useCallback((e) => {
		actionApiListClearFilterUrl(utilsUrlItemFilterId('accessStatusId'));
		onChange(e);
		onInput(e);
	}, [
		onChange,
		onInput,
	]);

	return <React.Fragment>
		<Grid
			container
			alignItems="center">
			<Grid
				item
				xs={false}>
				<IconButton 
					size="small"
					color="error"
					onClick={onClear}>
					<CloseIcon fontSize="small" />
				</IconButton>
			</Grid>
			<Grid
				item
				xs={true}>
				<SsoSelectAccessStatusMultiple 
					label="Status"
					name={id}
					onChange={onChangeMemo}
					value={value} />
			</Grid>
		</Grid>
	</React.Fragment>;
};

Access = React.memo(Access);
Access.defaultProps = {
	onChange: () => {},
	onInput: () => {},
};
Access.propTypes = {
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default Access;
