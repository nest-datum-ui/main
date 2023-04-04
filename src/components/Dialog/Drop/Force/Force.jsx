import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiFormDrop, 
} from '@nest-datum-ui/Store';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/Dialog';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';

let Force = ({
	type,
	id,
	content,
	redirect,
	reloadImmediately,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { storeName, apiFullUrl: apiUrl } } } = React.useContext(ContextProps);
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'entityId' ]));
	const onSubmit = React.useCallback(() => actionApiFormDrop(storeName, { apiUrl, entityId, type, redirect, reloadImmediately: true })(), [
		storeName,
		apiUrl,
		entityId,
		type,
		redirect,
	]);

	return <Dialog actions={<ButtonPrimary onClick={onSubmit}>OK</ButtonPrimary>} id={id} { ...props }>
		{content 
			&& <DialogContentText>
				{content}
			</DialogContentText>}
	</Dialog>;
};

Force = React.memo(Force);
Force.defaultProps = {
	id: 'drop-force',
	redirect: false,
	reloadImmediately: false,
	type: 'form',
	title: 'Remove item permanently?',
	content: 'Are you sure you want to delete the current item? This operation is irrevocable.',
	onSubmit: () => {},
};
Force.propTypes = {
	onSubmit: PropTypes.func,
	redirect: PropTypes.bool,
	type: PropTypes.string,
	buildListPath: PropTypes.func,
	buildFormPath: PropTypes.func,
};

export default Force;