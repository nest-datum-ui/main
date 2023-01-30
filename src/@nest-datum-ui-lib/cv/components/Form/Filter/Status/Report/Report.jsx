import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fireListCreateFilterUrl as actionApiListCreateFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/createFilterUrl.js';
import { fireListClearFilterUrl as actionApiListClearFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/clearFilterUrl.js';
import { CV_PATH_REPORT_STATUS } from '@nest-datum-ui-lib/cv/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlItemFilterGetId from '@nest-datum-ui/utils/url/item/filter/get/id.js';
import utilsUrlItemFilterId from '@nest-datum-ui/utils/url/item/filter/id.js';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CvSelectReportStatusMultiple from '@nest-datum-ui-lib/cv/components/Select/Report/Status/Multiple';

let Report = ({
	onChange,
	onInput,
}) => {
	const { search } = useLocation();
	const [ id ] = React.useState(() => uuidv4());
	const dataLength = useSelector(selectorMainExtract([ 'api', 'list', CV_PATH_REPORT_STATUS, 'data', 'length' ]));
	const value = (dataLength > 0)
		? utilsUrlItemFilterGetId(search, CV_PATH_REPORT_STATUS, 'reportStatusId')
		: [];
	const onChangeMemo = React.useCallback((e) => {
		actionApiListCreateFilterUrl(e, utilsUrlItemFilterId('reportStatusId'));
		onChange(e);
		onInput(e);
	}, [
		onChange,
		onInput,
	]);
	const onClear = React.useCallback((e) => {
		actionApiListClearFilterUrl(utilsUrlItemFilterId('reportStatusId'));
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
				<CvSelectReportStatusMultiple 
					label="Status"
					name={id}
					onChange={onChangeMemo}
					value={value} />
			</Grid>
		</Grid>
	</React.Fragment>;
};

Report = React.memo(Report);
Report.defaultProps = {
	onChange: () => {},
	onInput: () => {},
};
Report.propTypes = {
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default Report;
