import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormRelation as actionApiFormRelation } from '@nest-datum-ui/components/Store/api/actions/form/relation.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	SSO_PATH_ACCESS,
	SSO_PATH_ACCESS_OPTION_RELATION, 
} from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DialogOptionRelation from '@nest-datum-ui/components/Dialog/Option/Relation';
import SsoSelectAccess from '@nest-datum-ui-lib/sso/components/Select/Access';

let Relation = ({ optionId }) => {
	const value = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ACCESS, 'accessId' ])) ?? '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ACCESS, 'errors', 'accessId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ACCESS, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ACCESS_OPTION_RELATION, 'loader' ]));
	const onSubmit = React.useCallback((e) => actionApiFormRelation(SSO_PATH_ACCESS, e)({
		entityId: optionId,
		storeListName: SSO_PATH_ACCESS_OPTION_RELATION,
		path: `${SSO_PATH_ACCESS}/${optionId}/option`,
		columnName: 'accessId',
	}), [
		optionId,
	]);

	const onChange = React.useCallback((e) => actionApiFormProp(SSO_PATH_ACCESS, 'accessId', e.target.value)(), [
	]);
	const onClose = React.useCallback(() => {
		actionDialogClose(SSO_PATH_ACCESS)();
		actionApiFormClear(SSO_PATH_ACCESS)();
	}, [
	]);

	return <React.Fragment>
		<DialogOptionRelation 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={SSO_PATH_ACCESS}
			onHandle={onSubmit}
			onClose={onClose}>
			<Box py={2}>
				<SsoSelectAccess
					disabled={formLoader === true || listLoader === true}
					name="accessId"
					label="Select access"
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