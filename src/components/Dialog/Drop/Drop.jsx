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

let Drop = ({
	type,
	id,
	content,
	redirect,
	sliceInList,
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
	const onSubmit = React.useCallback(() => actionApiFormDrop(storeName, { apiUrl, entityId, type, redirect, sliceInList })(), [
		storeName,
		apiUrl,
		entityId,
		type,
		redirect,
		sliceInList,
	]);

	return <Dialog actions={<ButtonPrimary onClick={onSubmit}>OK</ButtonPrimary>} id={id} { ...props }>
		{content 
			&& <DialogContentText>
				{content}
			</DialogContentText>}
	</Dialog>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
	id: 'drop',
	redirect: false,
	sliceInList: false,
	type: 'form',
	title: 'Delete item?',
	content: 'Are you sure you want to delete the current item? This operation is irreversible and may compromise data integrity.',
	onSubmit: () => {},
};
Drop.propTypes = {
	onSubmit: PropTypes.func,
	redirect: PropTypes.bool,
	type: PropTypes.string,
	buildListPath: PropTypes.func,
	buildFormPath: PropTypes.func,
	apiUrl: PropTypes.string,
};

export default Drop;