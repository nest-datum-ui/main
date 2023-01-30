import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@nest-datum-ui/components/Menu';
import ButtonMenuEdit from '@nest-datum-ui/components/Button/Menu/Edit';
import ButtonMenuCopy from '@nest-datum-ui/components/Button/Menu/Copy';
import ButtonMenuRestore from '@nest-datum-ui/components/Button/Menu/Restore';
import ButtonMenuDrop from '@nest-datum-ui/components/Button/Menu/Drop';
import handlersClose from './handlers/close.js';
import handlersDrop from './handlers/drop.js';
import handlersRestore from './handlers/restore.js';

let Context = ({
	id,
	isDeleted,
	isNotDelete,
	onClose,
	onDrop,
	onRestore,
	edit,
	copy,
	restore,
	drop,
	...props
}) => {
	const onContextClose = React.useCallback((e) => handlersClose(e, onClose), [
		onClose,
	]);
	const onContextDrop = React.useCallback((e) => handlersDrop(e, onDrop, onContextClose), [
		onDrop,
		onContextClose,
	]);
	const onContextRestore = React.useCallback((e) => handlersRestore(e, onRestore, onContextClose), [
		onRestore,
		onContextClose,
	]);
	const isDefault = edit
		|| copy
		|| restore
		|| drop;

	return <React.Fragment>
		<Menu id={id} { ...props }>
			{(!isDefault || edit)
				&& <ButtonMenuEdit 
					to={id}
					onClick={onContextClose}>
					Edit
				</ButtonMenuEdit>}
			{(!isDefault || copy)
				&& <ButtonMenuCopy disabled>
					Copy
				</ButtonMenuCopy>}
			{(!isDefault || restore)
				&& <ButtonMenuRestore
					isDeleted={isDeleted}
					onClick={onContextRestore}>
					Restore
				</ButtonMenuRestore>}
			{(!isDefault || drop)
				&& <ButtonMenuDrop
					isNotDelete={isNotDelete}
					isDeleted={isDeleted}
					onClick={onContextDrop} />}
		</Menu>
	</React.Fragment>;
};

Context = React.memo(Context);
Context.defaultProps = {
};
Context.propTypes = {
	id: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	onDrop: PropTypes.func,
	onRestore: PropTypes.func,
	isDeleted: PropTypes.bool,
	isNotDelete: PropTypes.bool,
	edit: PropTypes.bool,
	copy: PropTypes.bool,
	restore: PropTypes.bool,
	drop: PropTypes.bool,
};

export default Context;
