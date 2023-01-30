import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fireListCreateFilterUrl as actionApiListCreateFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/createFilterUrl.js';
import { fireListClearFilterUrl as actionApiListClearFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/clearFilterUrl.js';
import { MAIL_PATH_LETTER_STATUS } from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlItemFilterGetId from '@nest-datum-ui/utils/url/item/filter/get/id.js';
import utilsUrlItemFilterId from '@nest-datum-ui/utils/url/item/filter/id.js';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MailSelectLetterStatusMultiple from '@nest-datum-ui-lib/mail/components/Select/Letter/Status/Multiple';

let Letter = ({
	onChange,
	onInput,
}) => {
	const { search } = useLocation();
	const [ id ] = React.useState(() => uuidv4());
	const dataLength = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_LETTER_STATUS, 'data', 'length' ]));
	const value = (dataLength > 0)
		? utilsUrlItemFilterGetId(search, MAIL_PATH_LETTER_STATUS, 'letterStatusId')
		: [];
	const onChangeMemo = React.useCallback((e) => {
		actionApiListCreateFilterUrl(e, utilsUrlItemFilterId('letterStatusId'));
		onChange(e);
		onInput(e);
	}, [
		onChange,
		onInput,
	]);
	const onClear = React.useCallback((e) => {
		actionApiListClearFilterUrl(utilsUrlItemFilterId('letterStatusId'));
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
				<MailSelectLetterStatusMultiple 
					label="Status"
					name={id}
					onChange={onChangeMemo}
					value={value} />
			</Grid>
		</Grid>
	</React.Fragment>;
};

Letter = React.memo(Letter);
Letter.defaultProps = {
	onChange: () => {},
	onInput: () => {},
};
Letter.propTypes = {
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default Letter;
