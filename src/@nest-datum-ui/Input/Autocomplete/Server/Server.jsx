import React from 'react';
import PropTypes from 'prop-types';
import StyledWrapper from './Styled/Wrapper.jsx';

let Server = ({ onChange, ...props }) => {
	const onChangeWrapper = React.useCallback((e, value) => {
		onChange(e, value);
	}, [
		onChange,
	]);

	return <StyledWrapper { ...props } onChange={onChangeWrapper}  />;
};
Server = React.memo(Server);
Server.defaultProps = {
	onChange: () => {},
};
Server.propTypes = {
	onChange: PropTypes.func,
};

export default Server;
