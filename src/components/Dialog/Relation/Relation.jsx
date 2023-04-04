import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@nest-datum-ui/Dialog';
import FormRelation from 'components/Form/Relation';


let Relation = (props) => {
	return <Dialog { ...props }>
		<FormRelation />
	</Dialog>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
	id: 'relation',
	title: 'Add new relation',
	subtitle: 'Create new relation between main model and observe option.',
	onSubmit: () => {},
};
Relation.propTypes = {
	onSubmit: PropTypes.func,
};

export default Relation;