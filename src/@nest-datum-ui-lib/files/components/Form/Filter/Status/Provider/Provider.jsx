import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fireListCreateFilterUrl as actionApiListCreateFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/createFilterUrl.js';
import { fireListClearFilterUrl as actionApiListClearFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/clearFilterUrl.js';
import { FILES_PATH_PROVIDER_STATUS } from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlItemFilterGetId from '@nest-datum-ui/utils/url/item/filter/get/id.js';
import utilsUrlItemFilterId from '@nest-datum-ui/utils/url/item/filter/id.js';
import utilsCheckArrFilled from '@nest-datum-ui/utils/check/arr/filled.js';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FilesSelectProviderStatusMultiple from '@nest-datum-ui-lib/files/components/Select/Provider/Status/Multiple';

let Provider = ({
	onChange,
	onInput,
}) => {
	const { search } = useLocation();
	const [ id ] = React.useState(() => uuidv4());
	const dataLength = useSelector(selectorMainExtract([ 'api', 'list', FILES_PATH_PROVIDER_STATUS, 'data', 'length' ]));
	const value = (dataLength > 0)
		? utilsUrlItemFilterGetId(search, FILES_PATH_PROVIDER_STATUS, 'providerStatusId')
		: [];
	const onChangeMemo = React.useCallback((e) => {
		actionApiListCreateFilterUrl(e, utilsUrlItemFilterId('providerStatusId'));
		onChange(e);
		onInput(e);
	}, [
		onChange,
		onInput,
	]);
	const onClear = React.useCallback((e) => {
		actionApiListClearFilterUrl(utilsUrlItemFilterId('providerStatusId'));
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
			{utilsCheckArrFilled(value)
				&& <Grid
					item
					xs={false}>
					<IconButton 
						size="small"
						color="error"
						onClick={onClear}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Grid>}
			<Grid
				item
				xs={true}>
				<FilesSelectProviderStatusMultiple 
					label="Status"
					name={id}
					onChange={onChangeMemo}
					value={value} />
			</Grid>
		</Grid>
	</React.Fragment>;
};

Provider = React.memo(Provider);
Provider.defaultProps = {
	onChange: () => {},
	onInput: () => {},
};
Provider.propTypes = {
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default Provider;
