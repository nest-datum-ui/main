import React from 'react';
import SsoDialogAccessOptionDrop from '@nest-datum-ui-lib/sso/components/Dialog/Access/Option/Drop';
import SsoTableAccessOption from '@nest-datum-ui-lib/sso/components/Table/Access/Option';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableAccessOption />
		<SsoDialogAccessOptionDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
