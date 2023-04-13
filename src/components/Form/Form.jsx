import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
	actionApiFormGet,
	actionApiFormPurge,
} from '@nest-datum-ui/Store';
import { strIdExists as utilsCheckStrIdExists } from '@nest-datum-utils/check'; 
import StyledWrapper from './Styled/Wrapper.jsx';

let Form = ({ storeName, entityId: entityPropId, id, apiUrl, loadOnFirstRender, ...props }) => {
	const { entityId } = useParams();
	const processedId = String(entityPropId ?? entityId);

	React.useEffect(() => {
		if (utilsCheckStrIdExists(processedId)) {
			loadOnFirstRender
				? actionApiFormGet(storeName, { apiUrl, entityId: processedId, redirectIfError: true })()
				: actionApiFormGet(storeName)();
		}
	}, [
		storeName,
		apiUrl,
		loadOnFirstRender,
		processedId,
	]);

	React.useEffect(() => () => {
		actionApiFormPurge(storeName)();
	}, [
		storeName,
	]);

	return <StyledWrapper { ...props } storeName={storeName} id={id} />;
};

Form = React.memo(Form);
Form.defaultProps = {
	loadOnFirstRender: false,
};
Form.propTypes = {
	storeName: PropTypes.string,
	loadOnFirstRender: PropTypes.bool,
	propId: PropTypes.string,
};

export default Form;
