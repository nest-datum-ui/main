import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import { 
	DATA_TYPE_PATH_TYPE_OPTION,
	DATA_TYPE_PATH_TYPE, 
} from '@nest-datum-ui-lib/data-type/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import Box from '@mui/material/Box';
import DataTypeTableTypeOptionRelation from '@nest-datum-ui-lib/data-type/components/Table/Type/Option/Relation';
import DataTypeDialogTypeOptionRelation from '@nest-datum-ui-lib/data-type/components/Dialog/Type/Option/Relation';
import DataTypeDialogTypeOptionRelationDrop from '@nest-datum-ui-lib/data-type/components/Dialog/Type/Option/Relation/Drop';
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
	const loader = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE_OPTION, 'loader' ]));
	const formLength = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE_OPTION ], (formObj) => Object.keys(formObj || {}).length));
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE_OPTION, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', DATA_TYPE_PATH_TYPE_OPTION, 'isDeleted' ]));
	const onSubmit = React.useCallback((e) => handlerSubmit(e, entityId), [
		entityId,
	]);
	const onDrop = React.useCallback((e) => actionDialogOpen(DATA_TYPE_PATH_TYPE_OPTION, { entityId })(), [
		entityId,
	]);
	const onRelationAdd = React.useCallback((e) => actionDialogOpen(DATA_TYPE_PATH_TYPE, { entityId })(), [
		entityId,
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiFormGet(DATA_TYPE_PATH_TYPE_OPTION, entityId)();
		}
	}, [
		unmount,
		entityId,
	]);

	React.useEffect(() => () => actionApiFormClear(DATA_TYPE_PATH_TYPE_OPTION)(), [
	]);

	return <React.Fragment>
		<Form 
			onSubmit={onSubmit}
			onDrop={onDrop}
			loader={loader || (utilsCheckEntityExists(entityId) && formLength < 6)}
			isDeleted={isDeleted}
			isNotDelete={isNotDelete}
			showDropButton={!isNotDelete && utilsCheckEntityExists(entityId)}>
			<InputId storeFormName={DATA_TYPE_PATH_TYPE_OPTION} />
			<InputName storeFormName={DATA_TYPE_PATH_TYPE_OPTION} />
			<InputDescription storeFormName={DATA_TYPE_PATH_TYPE_OPTION} />
			<DataTypeInputType storeFormName={DATA_TYPE_PATH_TYPE_OPTION} />
			<InputDefaultValue storeFormName={DATA_TYPE_PATH_TYPE_OPTION} />
			<InputRegex storeFormName={DATA_TYPE_PATH_TYPE_OPTION} />
			<InputIsRequired storeFormName={DATA_TYPE_PATH_TYPE_OPTION} />
			<InputIsMultiline storeFormName={DATA_TYPE_PATH_TYPE_OPTION} />
			<InputIsNotDelete storeFormName={DATA_TYPE_PATH_TYPE_OPTION} />
			{utilsCheckEntityExists(entityId)
				&& <React.Fragment>
					<TypographyTitle>
						Types
					</TypographyTitle>
					<TypographyCaption>
						List of data types that will own the current option.
					</TypographyCaption>
					<Box 
						pt={2}
						pb={4}>
						<ButtonCreate onClick={onRelationAdd}>
							Add new relation
						</ButtonCreate>
					</Box>
					<DataTypeTableTypeOptionRelation typeOptionId={entityId} />
				</React.Fragment>}
		</Form>
		<DataTypeDialogTypeOptionRelation optionId={entityId} />
		<DataTypeDialogTypeOptionRelationDrop />
	</React.Fragment>;
};

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
