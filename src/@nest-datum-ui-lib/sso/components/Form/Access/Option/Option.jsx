import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { 
	SSO_PATH_ACCESS_OPTION,
	SSO_PATH_ACCESS, 
} from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import Box from '@mui/material/Box';
import SsoTableAccessOptionRelation from '@nest-datum-ui-lib/sso/components/Table/Access/Option/Relation';
import SsoDialogAccessOptionRelation from '@nest-datum-ui-lib/sso/components/Dialog/Access/Option/Relation';
import SsoDialogAccessOptionRelationDrop from '@nest-datum-ui-lib/sso/components/Dialog/Access/Option/Relation/Drop';
import TypographyTitle from '@nest-datum-ui/components/Typography/Title';
import TypographyCaption from '@nest-datum-ui/components/Typography/Caption';
import ButtonCreate from '@nest-datum-ui/components/Button/Create';
import Form from '@nest-datum-ui/components/Form';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import DataTypeInputType from '@nest-datum-ui-lib/data-type/components/Input/Type';
import InputDefaultValue from '@nest-datum-ui/components/Input/DefaultValue';
import InputRegex from '@nest-datum-ui/components/Input/Regex';
import InputIsRequired from '@nest-datum-ui/components/Input/IsRequired';
import InputIsMultiline from '@nest-datum-ui/components/Input/IsMultiline';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Option = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ACCESS_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ACCESS_OPTION ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ACCESS_OPTION, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ACCESS_OPTION, 'isDeleted' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(SSO_PATH_ACCESS_OPTION, { entityId })(), [
		entityId,
	]);
	const onRelationAdd = React.useCallback((e) => actionDialogOpen(SSO_PATH_ACCESS, { entityId })(), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(SSO_PATH_ACCESS_OPTION, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => actionApiFormClear(SSO_PATH_ACCESS_OPTION)(), [
	]);

	return <React.Fragment>
		<Form 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loader || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={SSO_PATH_ACCESS_OPTION} />
			<InputName storeFormName={SSO_PATH_ACCESS_OPTION} />
			<InputDescription storeFormName={SSO_PATH_ACCESS_OPTION} />
			<DataTypeInputType storeFormName={SSO_PATH_ACCESS_OPTION} />
			<InputDefaultValue storeFormName={SSO_PATH_ACCESS_OPTION} />
			<InputRegex storeFormName={SSO_PATH_ACCESS_OPTION} />
			<InputIsRequired storeFormName={SSO_PATH_ACCESS_OPTION} />
			<InputIsMultiline storeFormName={SSO_PATH_ACCESS_OPTION} />
			<InputIsNotDelete storeFormName={SSO_PATH_ACCESS_OPTION} />
			{utilsCheckEntityExists(entityId)
				&& <React.Fragment>
					<TypographyTitle>
						Accesses
					</TypographyTitle>
					<TypographyCaption>
						List of accesses that will own the current option.
					</TypographyCaption>
					<Box 
						pt={2}
						pb={4}>
						<ButtonCreate onClick={onRelationAdd}>
							Add new relation
						</ButtonCreate>
					</Box>
					<SsoTableAccessOptionRelation accessOptionId={entityId} />
				</React.Fragment>}
		</Form>
		<SsoDialogAccessOptionRelation optionId={entityId} />
		<SsoDialogAccessOptionRelationDrop />
	</React.Fragment>;
};

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
