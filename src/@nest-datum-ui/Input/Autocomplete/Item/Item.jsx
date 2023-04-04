import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';

let Item = (props) => {
	return <StyledWrapper { ...props }  />;
};
Item = React.memo(Item);
Item.defaultProps = {
};
Item.propTypes = {
};

export default Item;
