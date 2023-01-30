import React from 'react';
import SsoDialogUserDrop from '@nest-datum-ui-lib/sso/components/Dialog/User/Drop';
import SsoTableUser from '@nest-datum-ui-lib/sso/components/Table/User';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableUser />
		<SsoDialogUserDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
