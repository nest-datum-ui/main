import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormRelation as actionApiFormRelation } from '@nest-datum-ui/components/Store/api/actions/form/relation.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	SSO_PATH_ROLE,
	SSO_PATH_ROLE_OPTION_RELATION, 
} from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DialogOptionRelation from '@nest-datum-ui/components/Dialog/Option/Relation';
import SsoSelectRole from '@nest-datum-ui-lib/sso/components/Select/Role';

let Relation = ({ optionId }) => {
	const value = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE, 'roleId' ])) ?? '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE, 'errors', 'roleId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ROLE, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', SSO_PATH_ROLE_OPTION_RELATION, 'loader' ]));
	const onSubmit = React.useCallback((e) => actionApiFormRelation(SSO_PATH_ROLE, e)({
		entityId: optionId,
		storeListName: SSO_PATH_ROLE_OPTION_RELATION,
		path: `${SSO_PATH_ROLE}/${optionId}/option`,
		columnName: 'roleId',
	}), [
		optionId,
	]);

	const onChange = React.useCallback((e) => actionApiFormProp(SSO_PATH_ROLE, 'roleId', e.target.value)(), [
	]);
	const onClose = React.useCallback(() => {
		actionDialogClose(SSO_PATH_ROLE)();
		actionApiFormClear(SSO_PATH_ROLE)();
	}, [
	]);

	return <React.Fragment>
		<DialogOptionRelation 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={SSO_PATH_ROLE}
			onHandle={onSubmit}
			onClose={onClose}>
			<Box py={2}>
				<SsoSelectRole
					disabled={formLoader === true || listLoader === true}
					name="roleId"
					label="Select role"
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