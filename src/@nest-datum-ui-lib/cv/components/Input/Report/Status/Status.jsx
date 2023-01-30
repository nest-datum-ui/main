import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { CV_PATH_REPORT_STATUS } from '@nest-datum-ui-lib/cv/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import CvSelectReportStatus from '@nest-datum-ui-lib/cv/components/Select/Report/Status';

let Status = ({ 
	storeFormName,
	...props 
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'loader' ]));
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'reportStatusId' ])) || '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeFormName, 'errors', 'reportStatusId' ]));
	const onChange = React.useCallback((e) => actionApiFormProp(storeFormName, 'reportStatusId', e.target.value)(), [
		storeFormName,
	]);

	return <React.Fragment>
		<Box 
			py={2}
			maxWidth="240px">
			<CvSelectReportStatus
				disabled={loader}
				name="reportStatusId"
				label="Report status"
				value={value}
				onChange={onChange}
				error={error}
				{ ...props } />
		</Box>
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
	storeFormName: CV_PATH_REPORT_STATUS,
};
Status.propTypes = {
	storeFormName: PropTypes.string,
};

export default Status;
