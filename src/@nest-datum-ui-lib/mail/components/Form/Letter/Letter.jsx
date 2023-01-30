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
	MAIL_PATH_LETTER,
	MAIL_PATH_LETTER_OPTION, 
} from '@nest-datum-ui-lib/mail/consts/path.js';
import {
	MAIL_KEY_LETTER_RELATION,
	MAIL_KEY_LETTER_VALUE,
} from '@nest-datum-ui-lib/mail/consts/keys.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import FormDefault from '@nest-datum-ui/components/Form';
import ListOption from '@nest-datum-ui/components/List/Option';
import MailInputLetterStatus from '@nest-datum-ui-lib/mail/components/Input/Letter/Status';
import MailInputTemplate from '@nest-datum-ui-lib/mail/components/Input/Template';
import InputId from '@nest-datum-ui/components/Input/Id';
import InputText from '@nest-datum-ui/components/Input/Text';
import InputName from '@nest-datum-ui/components/Input/Name';
import InputDescription from '@nest-datum-ui/components/Input/Description';
import InputIsNotDelete from '@nest-datum-ui/components/Input/IsNotDelete';
import handlerSubmit from './handler/submit.js';

let Letter = () => {
	const { entityId } = useParams();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loaderForm = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_LETTER, 'loader' ]));
	const loaderOption = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_LETTER_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_LETTER ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_LETTER, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_LETTER, 'isDeleted' ]));
	const dataOption = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_LETTER_OPTION, 'data' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(MAIL_PATH_LETTER, { entityId })(), [
		entityId,
	]);
	const onOptionChange = React.useCallback((data) => actionApiFormUpdateOption(MAIL_PATH_LETTER_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionAdd = React.useCallback((data) => actionApiFormCreateOption(MAIL_PATH_LETTER_OPTION, { ...data, entityId }), [
		entityId,
	]);
	const onOptionDrop = React.useCallback((data) => actionApiFormDropOption(MAIL_PATH_LETTER_OPTION, { ...data, entityId }), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount && utilsCheckEntityExists(entityId)) {
			actionApiFormGet(MAIL_PATH_LETTER, entityId)();
			actionApiListGet(MAIL_PATH_LETTER_OPTION, {
				relations: {
					letterLetterOptions: {
						letterLetterLetterOptions: true,
					},
				},
				filter: {
					isDeleted: false,
					letterLetterOptions: {
						letterId: entityId,
					},
				},
			})();

		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(MAIL_PATH_LETTER)();
		actionApiListClear(MAIL_PATH_LETTER_OPTION)()
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
			<InputId storeFormName={MAIL_PATH_LETTER} />
			<InputName 
				storeFormName={MAIL_PATH_LETTER}
				required />
			<InputDescription storeFormName={MAIL_PATH_LETTER} />
			<InputText 
				storeFormName={MAIL_PATH_LETTER}
				name="subject"
				label="Subject"
				required />
			<InputText 
				storeFormName={MAIL_PATH_LETTER}
				name="textPart"
				label="Letter subtitle"
				required />
			<MailInputTemplate 
				storeFormName={MAIL_PATH_LETTER}
				required />
			<MailInputLetterStatus storeFormName={MAIL_PATH_LETTER} />
			<InputIsNotDelete storeFormName={MAIL_PATH_LETTER} />
			{utilsCheckEntityExists(entityId)
				&& <ListOption 
					title="Options:"
					entityId={entityId}
					loader={!utilsCheckArr(dataOption) || unmount || loaderOption}
					onChange={onOptionChange}
					onAdd={onOptionAdd}
					onDrop={onOptionDrop}
					relationTableName={MAIL_KEY_LETTER_RELATION}
					valueTableName={MAIL_KEY_LETTER_VALUE}>
					{dataOption}
				</ListOption>}
		</FormDefault>
	</React.Fragment>;
};

Letter = React.memo(Letter);
Letter.defaultProps = {
};
Letter.propTypes = {
};

export default Letter;
