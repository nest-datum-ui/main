import React from 'react';
import SsoDialogAccessDrop from '@nest-datum-ui-lib/sso/components/Dialog/Access/Drop';
import SsoTableAccess from '@nest-datum-ui-lib/sso/components/Table/Access';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableAccess />
		<SsoDialogAccessDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
