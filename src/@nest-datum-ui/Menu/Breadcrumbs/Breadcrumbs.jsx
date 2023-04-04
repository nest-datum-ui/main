import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Item from './Item';
import StyledWrapper from './Styled/Wrapper.jsx';

let Breadcrumbs = ({ name, itemProps, activeItemProps, onClick, ...props }) => {
	const data = useSelector(selectorMainExtract([ 'breadcrumbs', name, 'data' ]));

	return <StyledWrapper {...props }>
		{(data || []).map((item, index) => <Item 
			key={item.key}
			length={data.length} 
			index={index} 
			name={name}
			active={!!item.active}
			itemProps={itemProps}
			activeItemProps={activeItemProps}
			onClick={onClick} />)}
	</StyledWrapper>;
};

Breadcrumbs = React.memo(Breadcrumbs);
Breadcrumbs.defaultProps = {
	separator: '/',
	itemProps: {},
	activeItemProps: {},
	onClick: () => {},
};
Breadcrumbs.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

export default Breadcrumbs;
