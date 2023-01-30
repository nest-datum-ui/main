import React from 'react';
import SsoDialogRoleDrop from '@nest-datum-ui-lib/sso/components/Dialog/Role/Drop';
import SsoTableRole from '@nest-datum-ui-lib/sso/components/Table/Role';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableRole />
		<SsoDialogRoleDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
