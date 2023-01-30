import React from 'react';
import SsoDialogRoleOptionDrop from '@nest-datum-ui-lib/sso/components/Dialog/Role/Option/Drop';
import SsoTableRoleOption from '@nest-datum-ui-lib/sso/components/Table/Role/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableRoleOption />
		<SsoDialogRoleOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
