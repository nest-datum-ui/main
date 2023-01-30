import React from 'react';
import PropTypes from 'prop-types';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ButtonMenu from '@nest-datum-ui/components/Button/Menu';

let Restore = ({
	isDeleted,
	children,
	...props
}) => {
	return isDeleted
		&& <ButtonMenu 
			icon={<SettingsBackupRestoreIcon />}
			{ ...props }>
			{children}
		</ButtonMenu>;
};

Restore = React.memo(Restore);
Restore.defaultProps = {
	isDeleted: false,
	children: 'Restore',
};
Restore.propTypes = {
	isDeleted: PropTypes.bool,
	children: PropTypes.string,
};

export default Restore;
