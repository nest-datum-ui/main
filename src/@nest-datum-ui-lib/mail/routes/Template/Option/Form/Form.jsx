import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormOption from '@nest-datum-ui/components/Form/Option';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';
import FormTemplateOption from '@nest-datum-ui-lib/mail/components/Form/Template/Option';

let Form = () => {
	const { entityId } = useParams();
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'mail',
			text: 'Mail',
		}, {
			key: `/mail/template`,
			text: 'Templates',
		}, {
			key: `/mail/template/options`,
			text: 'Options',
		}, {
			key: `/mail/template/options/${entityId}`,
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
			storeName="mailTemplateOptionsList"
			url={process.env.SERVICE_MAIL}
			path="template-option"
			FormOptionComponent={FormTemplateOption}
			pathRelation="template"
			pathCreate={`template/${entityId}/option`}
			relationTitle="Templates"
			relationDescription="List of templates that will own the current option."
			filterOptions={() => ({
				templateTemplateOptions: {
					templateOptionId: entityId,
				},
			})}
			manyToManyColumns={() => ([
				[ 'id', 'ID' ], 
				[ 'name', 'Name' ],
				[ 'description', 'Description' ],
				[ 'createdAt', 'Create at' ],
			])} />
		<DialogOptionDrop
			withAccessToken
			storeName="mailTemplateOptionsList"
			url={process.env.SERVICE_MAIL}
			path="template-option" />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
