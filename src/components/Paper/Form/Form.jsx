import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionBreadcrumbsSet,
	actionQueueClear, 
} from '@nest-datum-ui/Store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StyledWrapper from './Styled/Wrapper.jsx';

let Form = ({ children, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				parentName,
				pageTitle: 
				pageTitleForm, 
				pageFullUrl: pageFullUrlForm, 
				storeName, 
			}, 
		},
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: { 
			[parentName]: { 
				prevPage = [],
				pageFullUrl, 
				breadcrumbsMenuTitle, 
				orderInHeaderTabMenu,
			}, 
		}, 
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isDeleted' ]));
	const pageFullUrlFormProcessed = pageFullUrlForm.replace(':id', entityId);

	React.useEffect(() => {
		const startIndex = (orderInHeaderTabMenu === 0 || (prevPage[0] || {}).orderInHeaderTabMenu === 0)
			? 1
			: 2;

		setTimeout(() => actionBreadcrumbsSet('breadcrumbs-header', [ 
			...prevPage, 
		{ 
			key: pageFullUrl, 
			text: breadcrumbsMenuTitle 
		}, { 
			key: pageFullUrlFormProcessed, 
			text: (entityId === '0') ? 'Create new item' : entityId 
		}], startIndex, 5)(), 0);
	}, [
		orderInHeaderTabMenu,
		breadcrumbsMenuTitle,
		pageFullUrl,
		pageFullUrlFormProcessed,
		entityId,
		prevPage,
	]);

	React.useEffect(() => () => {
		actionQueueClear();
	}, [
	]);

	return <StyledWrapper { ...props }>
		<Box py={1}>
			<Typography component="div" variant="h5">
				{pageTitleForm}: <b 
					style={{ 
						textDecoration: (isDeleted === true)
							? 'line-through'
							: 'initial', 
						}}>
					{(entityId === '0')
						? 'Create new item'
						: entityId}
				</b>
			</Typography>
		</Box>
		{children}
	</StyledWrapper>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
