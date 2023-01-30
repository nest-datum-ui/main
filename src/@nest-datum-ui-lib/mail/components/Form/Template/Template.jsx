import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormCreateOption as actionApiFormCreateOption } from '@nest-datum-ui/components/Store/api/actions/form/createOption.js';
import { fireFormUpdateOption as actionApiFormUpdateOption } from '@nest-datum-ui/components/Store/api/actions/form/updateOption.js';
import { fireFormDropOption as actionApiFormDropOption } from '@nest-datum-ui/components/Store/api/actions/form/dropOption.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { 
	MAIL_PATH_TEMPLATE,
	MAIL_PATH_TEMPLATE_OPTION, 
} from '@nest-datum-ui-lib/mail/consts/path.js';
import {
	MAIL_KEY_TEMPLATE_RELATION,
	MAIL_KEY_TEMPLATE_VALUE,
} from '@nest-datum-ui-lib/mail/consts/keys.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import ListOption from '@nest-datum-ui/components/List/Option';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputText from '@nest-datum-ui/components/Input/Text';
import InputEmail from '@nest-datum-ui/components/Input/Email';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import MailInputTemplateStatus from '@nest-datum-ui-lib/mail/components/Input/Template/Status';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Template = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE, 'loader' ]));
	const loaderOption = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_TEMPLATE_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_TEMPLATE, 'isDeleted' ]));
	const dataOption = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_TEMPLATE_OPTION, 'data' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(MAIL_PATH_TEMPLATE, { entityId })(), [
		entityId,
	]);
	const onOptionChange = React.useCallback((data) => actionApiFormUpdateOption(MAIL_PATH_TEMPLATE_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionAdd = React.useCallback((data) => actionApiFormCreateOption(MAIL_PATH_TEMPLATE_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionDrop = React.useCallback((data) => actionApiFormDropOption(MAIL_PATH_TEMPLATE_OPTION, { ...data, entityId }), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(MAIL_PATH_TEMPLATE, entityId)();
			actionApiListGet(MAIL_PATH_TEMPLATE_OPTION, {
				relations: {
					templateTemplateOptions: {
						templateTemplateTemplateOptions: true,
					},
				},
				filter: {
					isDeleted: false,
					templateTemplateOptions: {
						templateId: entityId,
					},
				},
			})();

		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(MAIL_PATH_TEMPLATE)();
		actionApiListClear(MAIL_PATH_TEMPLATE_OPTION)()
	}, [
	]);

	return <React.Fragment>
		<FormDefault 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loaderForm || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={MAIL_PATH_TEMPLATE} />
			<InputName storeFormName={MAIL_PATH_TEMPLATE} />
			<InputDescription storeFormName={MAIL_PATH_TEMPLATE} />
			<InputEmail 
				storeFormName={MAIL_PATH_TEMPLATE}
				name="fromEmail"
				label="From email"
				required />
			<InputText 
				storeFormName={MAIL_PATH_TEMPLATE}
				name="fromName"
				label="From name"
				required />
			<MailInputTemplateStatus storeFormName={MAIL_PATH_TEMPLATE} />
			<InputIsNotDelete storeFormName={MAIL_PATH_TEMPLATE} />
			{utilsCheckEntityExists(entityId)
				&& <ListOption 
					title="Options:"
					entityId={entityId}
					loader={!utilsCheckArr(dataOption) || unmount || loaderOption}
					onChange={onOptionChange}
					onAdd={onOptionAdd}
					onDrop={onOptionDrop}
					relationTableName={MAIL_KEY_TEMPLATE_RELATION}
					valueTableName={MAIL_KEY_TEMPLATE_VALUE}>
					{dataOption}
				</ListOption>}
		</FormDefault>
	</React.Fragment>;
};

Template = React.memo(Template);
Template.defaultProps = {
};
Template.propTypes = {
};

export default Template;
