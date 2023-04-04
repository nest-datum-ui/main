import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
	actionApiFormGet,
	actionApiFormPurge,
} from '@nest-datum-ui/Store';
import { strIdExists as utilsCheckStrIdExists } from '@nest-datum-utils/check'; 
import StyledWrapper from './Styled/Wrapper.jsx';

let Form = ({ storeName, id, apiUrl, loadOnFirstRender, ...props }) => {
	const { entityId } = useParams();
	React.useEffect(() => {
		if (utilsCheckStrIdExists(entityId)) {
			loadOnFirstRender
				? actionApiFormGet(storeName, { apiUrl, entityId, redirectIfError: true })()
				: actionApiFormGet(storeName)();
		}
	}, [
		storeName,
		apiUrl,
		loadOnFirstRender,
		entityId,
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
};

export default Form;
