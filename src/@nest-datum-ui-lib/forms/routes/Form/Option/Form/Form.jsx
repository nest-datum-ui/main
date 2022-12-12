import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormOption from '@nest-datum-ui/components/Form/Option';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';
import FormFormOption from '@nest-datum-ui-lib/forms/components/Form/Form/Option';

let Form = () => {
	const { entityId } = useParams();
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'forms',
			text: 'Forms',
		}, {
			key: `/forms/form/options`,
			text: 'Options',
		}, {
			key: `/forms/form/options/${entityId}`,
			text: (entityId === '0')
				? 'Create new option'
				: <span
					style={{
						textDecoration: isDeleted
							? 'line-through'
							: 'initial',
					}}>
					{entityId}
			</span>,
		}])();
	}, [
		entityId,
		isDeleted,
	]);

	return <React.Fragment>
		<Box pb={2}>
			<Typography
				component="div"
				variant="h5">
				{(entityId === '0')
					? 'Add option'
					: <React.Fragment>
						Edit option <b
							style={{
								textDecoration: isDeleted
									? 'line-through'
									: 'initial',
							}}>
							{entityId}
						</b>
					</React.Fragment>}
			</Typography>
		</Box>
		<FormOption
			withAccessToken
			storeName="formsFormOptionsList"
			url={process.env.SERVICE_FORMS}
			FormOptionComponent={FormFormOption}
			path="form-option"
			pathRelation="form/option"
			pathCreate={`form/${entityId}/option`}
			relationTitle="Forms"
			relationDescription="List of forms that will own the current option."
			filterOptions={() => ({
				formOptionId: entityId,
			})}
			manyToManyColumns={() => ([
				[ 'formId', 'Form' ],
				[ 'createdAt', 'Create at' ],
			])} />
		<DialogOptionDrop
			withAccessToken
			storeName="formsFormOptionsList"
			url={process.env.SERVICE_FORMS}
			path="form-option" />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
