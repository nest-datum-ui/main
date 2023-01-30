import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormRelation as actionApiFormRelation } from '@nest-datum-ui/components/Store/api/actions/form/relation.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { 
	MAIL_PATH_LETTER,
	MAIL_PATH_LETTER_OPTION_RELATION, 
} from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import DialogOptionRelation from '@nest-datum-ui/components/Dialog/Option/Relation';
import MailsSelectLetter from '@nest-datum-ui-lib/mail/components/Select/Letter';

let Relation = ({ optionId }) => {
	const value = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_LETTER, 'letterId' ])) ?? '';
	const error = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_LETTER, 'errors', 'letterId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_LETTER, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', MAIL_PATH_LETTER_OPTION_RELATION, 'loader' ]));
	const onSubmit = React.useCallback((e) => actionApiFormRelation(MAIL_PATH_LETTER, e)({
		entityId: optionId,
		storeListName: MAIL_PATH_LETTER_OPTION_RELATION,
		path: `${MAIL_PATH_LETTER}/${optionId}/option`,
		columnName: 'letterId',
	}), [
		optionId,
	]);
	const onChange = React.useCallback((e) => actionApiFormProp(MAIL_PATH_LETTER, 'letterId', e.target.value)(), [
	]);
	const onClose = React.useCallback(() => {
		actionDialogClose(MAIL_PATH_LETTER)();
		actionApiFormClear(MAIL_PATH_LETTER)();
	}, [
	]);

	return <React.Fragment>
		<DialogOptionRelation 
			loader={formLoader === true || listLoader === true}
			maxWidth="xs"
			id={MAIL_PATH_LETTER}
			onHandle={onSubmit}
			onClose={onClose}>
			<Box py={2}>
				<MailsSelectLetter
					disabled={formLoader === true || listLoader === true}
					name="letterId"
					label="Select letter"
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