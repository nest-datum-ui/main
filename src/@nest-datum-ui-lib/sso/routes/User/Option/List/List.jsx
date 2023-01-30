import React from 'react';
import SsoDialogUserOptionDrop from '@nest-datum-ui-lib/sso/components/Dialog/User/Option/Drop';
import SsoTableUserOption from '@nest-datum-ui-lib/sso/components/Table/User/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableUserOption />
		<SsoDialogUserOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
