import React from 'react';
import Loader from '@nest-datum-ui/components/Loader';

let Small = (props) => {
	return <React.Fragment>
		<Loader
			wrapper={{
				p: 0,
			}}
			sx={{
				minWidth: '24px',
				maxWidth: '24px',
				minHeight: '24px',
				maxHeight: '24px',
			}}
			{ ...props } />
	</React.Fragment>;
};

Small = React.memo(Small);
Small.defaultProps = {
};
Small.propTypes = {
};

export default Small;
