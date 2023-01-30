import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { 
	FILES_PATH_SYSTEM_OPTION,
	FILES_PATH_SYSTEM, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import Box from '@mui/material/Box';
import FilesTableSystemOptionRelation from '@nest-datum-ui-lib/files/components/Table/System/Option/Relation';
import FilesDialogSystemOptionRelation from '@nest-datum-ui-lib/files/components/Dialog/System/Option/Relation';
import FilesDialogSystemOptionRelationDrop from '@nest-datum-ui-lib/files/components/Dialog/System/Option/Relation/Drop';
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
	const loader = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM_OPTION ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM_OPTION, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', FILES_PATH_SYSTEM_OPTION, 'isDeleted' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(FILES_PATH_SYSTEM_OPTION, { entityId })(), [
		entityId,
	]);
	const onRelationAdd = React.useCallback((e) => actionDialogOpen(FILES_PATH_SYSTEM, { entityId })(), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(FILES_PATH_SYSTEM_OPTION, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => actionApiFormClear(FILES_PATH_SYSTEM_OPTION)(), [
	]);

	return <React.Fragment>
		<Form 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loader || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={FILES_PATH_SYSTEM_OPTION} />
			<InputName storeFormName={FILES_PATH_SYSTEM_OPTION} />
			<InputDescription storeFormName={FILES_PATH_SYSTEM_OPTION} />
			<DataTypeInputType storeFormName={FILES_PATH_SYSTEM_OPTION} />
			<InputDefaultValue storeFormName={FILES_PATH_SYSTEM_OPTION} />
			<InputRegex storeFormName={FILES_PATH_SYSTEM_OPTION} />
			<InputIsRequired storeFormName={FILES_PATH_SYSTEM_OPTION} />
			<InputIsMultiline storeFormName={FILES_PATH_SYSTEM_OPTION} />
			<InputIsNotDelete storeFormName={FILES_PATH_SYSTEM_OPTION} />
			{utilsCheckEntityExists(entityId)
				&& <React.Fragment>
					<TypographyTitle>
						Systems
					</TypographyTitle>
					<TypographyCaption>
						List of systems that will own the current option.
					</TypographyCaption>
					<Box 
						pt={2}
						pb={4}>
						<ButtonCreate onClick={onRelationAdd}>
							Add new relation
						</ButtonCreate>
					</Box>
					<FilesTableSystemOptionRelation systemOptionId={entityId} />
				</React.Fragment>}
		</Form>
		<FilesDialogSystemOptionRelation optionId={entityId} />
		<FilesDialogSystemOptionRelationDrop />
	</React.Fragment>;
};

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
