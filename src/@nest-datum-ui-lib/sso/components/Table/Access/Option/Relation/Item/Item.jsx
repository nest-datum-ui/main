import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TypographyDate from '@nest-datum-ui/components/Typography/Date';
import SsoTypographyAccess from '@nest-datum-ui-lib/sso/components/Typography/Access';

let Item = ({
	id,
	accessOptionId,
	accessId,
	createdAt,
	onDrop,
}) => {
	return <React.Fragment key={id}>
		<TableRow>
			<TableCell sx={{ minWidth: '49%' }}>
				<SsoTypographyAccess>
					{accessId}
				</SsoTypographyAccess>
			</TableCell>
			<TableCell sx={{ width: '50%' }}>
				<TypographyDate>
					{createdAt}
				</TypographyDate>
			</TableCell>
			<TableCell sx={{ width: '1%' }}>
				<IconButton onClick={onDrop}>
					<CloseIcon color="error" />
				</IconButton>
			</TableCell>
		</TableRow>
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
};
Item.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	accessOptionId: PropTypes.string,
	accessId: PropTypes.string,
	createdAt: PropTypes.string,
	onDrop: PropTypes.func,
};

export default Item;
