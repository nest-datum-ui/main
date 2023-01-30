import React from 'react';
import MailDialogSettingDrop from '@nest-datum-ui-lib/mail/components/Dialog/Setting/Drop';
import MailTableSetting from '@nest-datum-ui-lib/mail/components/Table/Setting';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<MailTableSetting />
		<MailDialogSettingDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
