import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { 
	MAIL_PATH_TEMPLATE_OPTION,
	MAIL_PATH_TEMPLATE, 
} from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import Box from '@mui/material/Box';
import MailTableTemplateOptionRelation from '@nest-datum-ui-lib/mail/components/Table/Template/Option/Relation';
import MailDialogTemplateOptionRelation from '@nest-datum-ui-lib/mail/components/Dialog/Template/Option/Relation';
import MailDialogTemplateOptionRelationDrop from '@nest-datum-ui-lib/mail/components/Dialog/Template/Option/Relation/Drop';
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
	const loader = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE_OPTION ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE_OPTION, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE_OPTION, 'isDeleted' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(MAIL_PATH_TEMPLATE_OPTION, { entityId })(), [
		entityId,
	]);
	const onRelationAdd = React.useCallback((e) => actionDialogOpen(MAIL_PATH_TEMPLATE, { entityId })(), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(MAIL_PATH_TEMPLATE_OPTION, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => actionApiFormClear(MAIL_PATH_TEMPLATE_OPTION)(), [
	]);

	return <React.Fragment>
		<Form 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loader || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={MAIL_PATH_TEMPLATE_OPTION} />
			<InputName storeFormName={MAIL_PATH_TEMPLATE_OPTION} />
			<InputDescription storeFormName={MAIL_PATH_TEMPLATE_OPTION} />
			<DataTypeInputType storeFormName={MAIL_PATH_TEMPLATE_OPTION} />
			<InputDefaultValue storeFormName={MAIL_PATH_TEMPLATE_OPTION} />
			<InputRegex storeFormName={MAIL_PATH_TEMPLATE_OPTION} />
			<InputIsRequired storeFormName={MAIL_PATH_TEMPLATE_OPTION} />
			<InputIsMultiline storeFormName={MAIL_PATH_TEMPLATE_OPTION} />
			<InputIsNotDelete storeFormName={MAIL_PATH_TEMPLATE_OPTION} />
			{utilsCheckEntityExists(entityId)
				&& <React.Fragment>
					<TypographyTitle>
						Templates
					</TypographyTitle>
					<TypographyCaption>
						List of templates that will own the current option.
					</TypographyCaption>
					<Box 
						pt={2}
						pb={4}>
						<ButtonCreate onClick={onRelationAdd}>
							Add new relation
						</ButtonCreate>
					</Box>
					<MailTableTemplateOptionRelation templateOptionId={entityId} />
				</React.Fragment>}
		</Form>
		<MailDialogTemplateOptionRelation optionId={entityId} />
		<MailDialogTemplateOptionRelationDrop />
	</React.Fragment>;
};

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
