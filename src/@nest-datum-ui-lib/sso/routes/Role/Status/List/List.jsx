import React from 'react';
import SsoDialogRoleStatusDrop from '@nest-datum-ui-lib/sso/components/Dialog/Role/Status/Drop';
import SsoTableRoleStatus from '@nest-datum-ui-lib/sso/components/Table/Role/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableRoleStatus />
		<SsoDialogRoleStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
