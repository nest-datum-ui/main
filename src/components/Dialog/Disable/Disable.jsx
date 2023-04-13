import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextRoute,
	ContextService,
	ContextProps, 
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiFormDrop, 
} from '@nest-datum-ui/Store';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/Dialog';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';

let Disable = ({
	type,
	id,
	content,
	buildListPath,
	buildFormPath,
	apiUrl: propApiUrl,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
				apiFullUrl, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'entityId' ]));
	const apiUrl = propApiUrl ?? apiFullUrl;
	const onSubmit = React.useCallback(() => actionApiFormDrop(storeName, { apiUrl, entityId, type })(), [
		storeName,
		apiUrl,
		entityId,
		type,
	]);

	return <Dialog actions={<ButtonPrimary onClick={onSubmit}>OK</ButtonPrimary>} id={id} { ...props }>
		{content 
			&& <DialogContentText>
				{content}
			</DialogContentText>}
	</Dialog>;
};

Disable = React.memo(Disable);
Disable.defaultProps = {
	id: 'disable',
	type: 'form',
	title: 'Disable item?',
	content: 'Are you sure you want to disable the current item? The element will not be processed by API.',
	onSubmit: () => {},
};
Disable.propTypes = {
	onSubmit: PropTypes.func,
	redirect: PropTypes.bool,
	type: PropTypes.string,
	buildListPath: PropTypes.func,
	buildFormPath: PropTypes.func,
};

export default Disable;