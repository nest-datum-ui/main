import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Dialog from '@nest-datum-ui/Dialog';
import FormDescription from '../../Form/Description';

let Description = ({ id, ...props }) => {
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'id' ]));

	return entityId
		&& <Dialog { ...props } id={id}>
			<FormDescription entityId={Number(entityId.replace('p_', ''))} />
		</Dialog>;
};

Description = React.memo(Description);
Description.defaultProps = {
	id: 'dialogDescription',
	onSubmit: () => {},
};
Description.propTypes = {
	onSubmit: PropTypes.func,
};

export default Description;