import React from 'react';
import MailDialogTemplateStatusDrop from '@nest-datum-ui-lib/mail/components/Dialog/Template/Status/Drop';
import MailTableTemplateStatus from '@nest-datum-ui-lib/mail/components/Table/Template/Status';
import Title from './Title';

let List = () => {
	return <React.Fragment>
		<Title />
		<MailTableTemplateStatus />
		<MailDialogTemplateStatusDrop />
	</React.Fragment>;
};

List = React.memo(List);
List.defaultProps = {
};
List.propTypes = {
};

export default List;
