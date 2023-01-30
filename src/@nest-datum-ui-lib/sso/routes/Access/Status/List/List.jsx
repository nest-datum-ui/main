import React from 'react';
import SsoDialogAccessStatusDrop from '@nest-datum-ui-lib/sso/components/Dialog/Access/Status/Drop';
import SsoTableAccessStatus from '@nest-datum-ui-lib/sso/components/Table/Access/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<SsoTableAccessStatus />
		<SsoDialogAccessStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
