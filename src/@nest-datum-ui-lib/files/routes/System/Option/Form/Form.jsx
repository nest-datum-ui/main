import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormOption from '@nest-datum-ui/components/Form/Option';
import DialogOptionDrop from '@nest-datum-ui/components/Dialog/Option/Drop';
import FormSystemOption from '@nest-datum-ui-lib/files/components/Form/System/Option';

let Form = () => {
	const { entityId } = useParams();
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	
	React.useEffect(() => {
		actionBreadcrumbsListSet('app', [{
			key: '/',
			text: '...',
		}, {
			key: 'files',
			text: 'Files',
		}, {
			key: `/files/system`,
			text: 'File systems',
		}, {
			key: `/files/system/options`,
			text: 'Options',
		}, {
			key: `/files/system/options/${entityId}`,
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
			storeName="filesSystemOptionsList"
			url={process.env.SERVICE_FILES}
			FormOptionComponent={FormSystemOption}
			path="system-option"
			pathRelation="system/option"
			pathCreate={`system/${entityId}/option`}
			relationTitle="Systems"
			relationDescription="List of systems that will own the current option."
			filterOptions={() => ({
				systemOptionId: entityId,
			})}
			manyToManyColumns={() => ([
				[ 'systemId', 'System' ],
				[ 'createdAt', 'Create at' ],
			])} />
		<DialogOptionDrop
			withAccessToken
			storeName="filesSystemOptionsList"
			url={process.env.SERVICE_FILES}
			path="system-option" />
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
