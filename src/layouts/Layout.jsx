import React from 'react';
import LayoutBase from '@nest-datum-ui/Layout';

let Layout = () => {
	return <React.Fragment>
		<LayoutBase />
	</React.Fragment>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
