import React from 'react';

let NotFound = () => {
	return <React.Fragment>
		NotFound
	</React.Fragment>;
};

NotFound = React.memo(NotFound);
NotFound.defaultProps = {
};
NotFound.propTypes = {
};

export default NotFound;
