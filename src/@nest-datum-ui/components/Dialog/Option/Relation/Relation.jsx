import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Relation = ({
	loader,
	onHandle,
	children,
	...props
}) => {
	return <React.Fragment>
		<Dialog 
			loader={loader}
			title="Associate an entity with the current option"
			actions={<ButtonSave
				loader={loader}
				onClick={onHandle}>
				OK
			</ButtonSave>}
			{ ...props }>
			{children}
		</Dialog>
	</React.Fragment>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
	onHandle: () => {},
};
Relation.propTypes = {
	onHandle: PropTypes.func.isRequired,
	loader: PropTypes.bool,
};

export default Relation;