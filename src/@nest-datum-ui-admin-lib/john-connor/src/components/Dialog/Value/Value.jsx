import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Dialog from '@nest-datum-ui/Dialog';
import FormValue from '../../Form/Value';

let Value = ({ id, ...props }) => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'id' ]));

	return entityId
		&& <Dialog { ...props } id={id}>
			<FormValue entityId={Number(entityId.replace('p_', ''))} />
		</Dialog>;
};

Value = React.memo(Value);
Value.defaultProps = {
	id: 'dialogValue',
	onSubmit: () => {},
};
Value.propTypes = {
	onSubmit: PropTypes.func,
};

export default Value;