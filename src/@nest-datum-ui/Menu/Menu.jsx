import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	selectorMenuNode,
	actionMenuClose, 
} from '@nest-datum-ui/Store';
import StyledWrapper from './Styled/Wrapper.jsx';

let Menu = ({
	id,
	children,
	...props
}) => {
	const anchorNode = useSelector(selectorMenuNode(id));
	const onClose = React.useCallback((e) => actionMenuClose(id)(), [
		id,
	]);

	React.useEffect(() => () => {
		onClose();
	}, [
		onClose,
	]);

	return <StyledWrapper
		keepMounted
		id={id}
		anchorEl={anchorNode}
		open={Boolean(anchorNode)}
		onClose={onClose}
		{ ...props }>
		{children}
	</StyledWrapper>;
};

Menu = React.memo(Menu);
Menu.defaultProps = {
};
Menu.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
};

export default Menu;
