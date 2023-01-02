import React from 'react';
import FilesInputUpload from '@nest-datum-ui-lib/files/components/Input/Upload';

let Dashboard = () => {
	return <React.Fragment>
		<FilesInputUpload
			label="test" />
	</React.Fragment>;
};

Dashboard = React.memo(Dashboard);
Dashboard.defaultProps = {
};
Dashboard.propTypes = {
};

export default Dashboard;
