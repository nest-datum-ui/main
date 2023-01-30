import React from 'react';
import SsoDialogUserStatusDrop from '@nest-datum-ui-lib/sso/components/Dialog/User/Status/Drop';
import SsoTableUserStatus from '@nest-datum-ui-lib/sso/components/Table/User/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableUserStatus />
		<SsoDialogUserStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
