import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonMenu from '@nest-datum-ui/components/Button/Menu';

let Drop = ({
	isNotDelete,
	isDeleted,
	textDropPermanentlyButton,
	children,
	...props
}) => {
	return !isNotDelete
		&& <ButtonMenu 
			icon={<DeleteIcon
				color={isDeleted
					? 'error'
					: 'inherit'} />}
			{ ...props }>
			{isDeleted
				? textDropPermanentlyButton
				: children}
		</ButtonMenu>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
	isNotDelete: false,
	isDeleted: false,
	textDropPermanentlyButton: 'Delete permanently',
	children: 'Delete',
};
Drop.propTypes = {
	isNotDelete: PropTypes.bool,
	isDeleted: PropTypes.bool,
	textDropPermanentlyButton: PropTypes.string,
	children: PropTypes.string,
};

export default Drop;
