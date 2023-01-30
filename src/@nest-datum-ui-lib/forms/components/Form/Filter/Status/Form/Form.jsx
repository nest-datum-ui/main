import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fireListCreateFilterUrl as actionApiListCreateFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/createFilterUrl.js';
import { fireListClearFilterUrl as actionApiListClearFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/clearFilterUrl.js';
import { FORMS_PATH_FORM_STATUS } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsUrlItemFilterGetId from '@nest-datum-ui/utils/url/item/filter/get/id.js';
import utilsUrlItemFilterId from '@nest-datum-ui/utils/url/item/filter/id.js';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormsSelectFormStatusMultiple from '@nest-datum-ui-lib/forms/components/Select/Form/Status/Multiple';

let Form = ({
	onChange,
	onInput,
}) => {
	const { search } = useLocation();
	const [ id ] = React.useState(() => uuidv4());
	const dataLength = useSelector(selectorMainExtract([ 'api', 'list', FORMS_PATH_FORM_STATUS, 'data', 'length' ]));
	const value = (dataLength > 0)
		? utilsUrlItemFilterGetId(search, FORMS_PATH_FORM_STATUS, 'formStatusId')
		: [];
	const onChangeMemo = React.useCallback((e) => {
		actionApiListCreateFilterUrl(e, utilsUrlItemFilterId('formStatusId'));
		onChange(e);
		onInput(e);
	}, [
		onChange,
		onInput,
	]);
	const onClear = React.useCallback((e) => {
		actionApiListClearFilterUrl(utilsUrlItemFilterId('formStatusId'));
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
				<FormsSelectFormStatusMultiple 
					label="Status"
					name={id}
					onChange={onChangeMemo}
					value={value} />
			</Grid>
		</Grid>
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
	onChange: () => {},
	onInput: () => {},
};
Form.propTypes = {
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default Form;
