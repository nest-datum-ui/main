import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormRelation as actionApiFormRelation } from '@nest-datum-ui/components/Store/api/actions/form/relation.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	DATA_TYPE_PATH_TYPE,
	DATA_TYPE_PATH_TYPE_OPTION_RELATION, 
} from '@nest-datum-ui-lib/data-type/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DialogOptionRelation from '@nest-datum-ui/components/Dialog/Option/Relation';
import DataTypeSelectType from '@nest-datum-ui-lib/data-type/components/Select/Type';

let Relation = ({ optionId }) => {
	const value = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE, 'typeId' ])) ?? '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE, 'errors', 'typeId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', DATA_TYPE_PATH_TYPE_OPTION_RELATION, 'loader' ]));
	const onSubmit = React.useCallback((e) => actionApiFormRelation(DATA_TYPE_PATH_TYPE, e)({
		entityId: optionId,
		storeListName: DATA_TYPE_PATH_TYPE_OPTION_RELATION,
		path: `${DATA_TYPE_PATH_TYPE}/${optionId}/option`,
		columnName: 'typeId',
	}), [
		optionId,
	]);

	const onChange = React.useCallback((e) => actionApiFormProp(DATA_TYPE_PATH_TYPE, 'typeId', e.target.value)(), [
	]);
	const onClose = React.useCallback(() => {
		actionDialogClose(DATA_TYPE_PATH_TYPE)();
		actionApiFormClear(DATA_TYPE_PATH_TYPE)();
	}, [
	]);

	return <React.Fragment>
		<DialogOptionRelation 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={DATA_TYPE_PATH_TYPE}
			onHandle={onSubmit}
			onClose={onClose}>
			<Box py={2}>
				<DataTypeSelectType
					disabled={formLoader === true || listLoader === true}
					name="typeId"
					label="Select type"
					value={value}
					onChange={onChange}
					error={error} />
			</Box>
		</DialogOptionRelation>
	</React.Fragment>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
};
Relation.propTypes = {
	optionId: PropTypes.string.isRequired,
};

export default Relation;