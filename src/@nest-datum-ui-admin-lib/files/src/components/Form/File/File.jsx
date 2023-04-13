import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiFormMerge,
	actionApiFormPurge,
	hookUrlFilterItem, 
} from '@nest-datum-ui/Store';
import { strIdExists as utilsCheckStrIdExists } from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import Field from '@nest-datum-ui/Field';
import InputId from 'components/Input/Id';
import InputName from 'components/Input/Name';
import InputDescription from 'components/Input/Description';
import InputIsNotDelete from 'components/Input/IsNotDelete';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerSubmit from './handler/submit.js';

let File = ({ entityId }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: {
				storeName,
				id,
				files: {
					apiFullUrl: apiUrl,
				},
			}, 
		},
	} = React.useContext(ContextProps);
	const { search } = useLocation();
	const value = hookUrlFilterItem('systemId', search);
	const systemId = (value === undefined)
		? ''
		: String(value);
	const breadcrumbsData = useSelector(selectorMainExtract([ 'breadcrumbs', storeName, 'data' ])) || [];
	const parentId = (breadcrumbsData[breadcrumbsData.length - 1] || {}).key;
	const onSubmitWrapper = React.useCallback((e) => handlerSubmit(e, storeName, apiUrl, entityId), [
		storeName,
		apiUrl,
		entityId,
	]);

	React.useEffect(() => {
		if (systemId && parentId) {
			actionApiFormMerge(storeName, {
				systemId,
				parentId,
			})();
		}
	}, [
		storeName,
		systemId,
		parentId,
	]);

	React.useEffect(() => () => {
		actionApiFormPurge(storeName)();
	}, [
		storeName,
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		onSubmit={onSubmitWrapper}
		loadOnFirstRender={utilsCheckStrIdExists(entityId)}
		entityId={entityId}>
		<Box py={1}>
			<Field
				Component={InputId}
				form={id}
				name="id" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputName}
				form={id}
				name="name"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputDescription}
				form={id}
				name="description" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputIsNotDelete}
				form={id}
				type="checkbox"
				name="isNotDelete" />
		</Box>
		<Box pb={2}>
			<ButtonPrimary form={id} type="submit" startIcon={<SaveIcon />}>
				Save
			</ButtonPrimary>
		</Box>
    </StyledWrapper>;
};

File = React.memo(File);
File.defaultProps = {
	onSubmit: () => {},
};
File.propTypes = {
	id: PropTypes.string,
	storeName: PropTypes.string,
	apiUrl: PropTypes.string,
	children: PropTypes.array,
};

export default File;
