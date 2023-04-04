import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	selectorMainExtract,
	actionBreadcrumbsDel, 
} from '@nest-datum-ui/Store';
import StyledButton from './Styled/Button.jsx';
import StyledTypography from './Styled/Typography.jsx';

let Breadcrumbs = ({ 
	length, 
	index, 
	name, 
	active, 
	itemProps, 
	activeItemProps, 
	onClick, 
}) => {
	const text = useSelector(selectorMainExtract([ 'breadcrumbs', name, 'data', index, 'text' ]));
	const key = useSelector(selectorMainExtract([ 'breadcrumbs', name, 'data', index, 'key' ]));
	const onClickWrapper = React.useCallback((e) => {
		actionBreadcrumbsDel(name, 0, index + 1)();
		onClick(e, {
			index,
			name,
			text,
			key,
			active,
		});
	}, [
		onClick,
		index,
		name,
		text,
		key,
		active,
	]);

	return (active || length - 1 === index)
		? <StyledTypography { ...activeItemProps }>
			{text}
		</StyledTypography>
		: <StyledButton onClick={onClickWrapper} { ...itemProps }>
			{text}
		</StyledButton>;
};

Breadcrumbs = React.memo(Breadcrumbs);
Breadcrumbs.defaultProps = {
	itemProps: {},
	activeItemProps: {},
	onClick: () => {},
};
Breadcrumbs.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	length: PropTypes.number, 
	index: PropTypes.number,
	active: PropTypes.bool,
};

export default Breadcrumbs;
