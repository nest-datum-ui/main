import React from 'react';
import PropTypes from 'prop-types';
import { strDate as utilsCheckStrDate } from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import TypographyCaption from '../../Caption';
import TypographyDate from '../../Date';

let TableDate = ({
	pattern,
	createdAt,
	updatedAt,
	restartedAt,
	emailVerifiedAt,
	children,
	...props
}) => {
	return <React.Fragment>
		{utilsCheckStrDate(createdAt)
			&& <Box pb={1}>
				<TypographyCaption>
					Created at:
				</TypographyCaption>
				<TypographyDate pattern="dd MMMM, hh:mm">
					{createdAt}
				</TypographyDate>
			</Box>}
		{utilsCheckStrDate(updatedAt)
			&& <Box pb={1}>
				<TypographyCaption>
					Updated at:
				</TypographyCaption>
				<TypographyDate pattern={pattern}>
					{updatedAt}
				</TypographyDate>
			</Box>}
		{utilsCheckStrDate(restartedAt)
			&& <Box pb={1}>
				<TypographyCaption>
					Restarted at:
				</TypographyCaption>
				<TypographyDate pattern={pattern}>
					{restartedAt}
				</TypographyDate>
			</Box>}
		{utilsCheckStrDate(emailVerifiedAt)
			&& <Box pb={1}>
				<TypographyCaption>
					Email verified at:
				</TypographyCaption>
				<TypographyDate pattern={pattern}>
					{emailVerifiedAt}
				</TypographyDate>
			</Box>}
		{children
			&& <TypographyDate pattern={pattern}>
				{children}
			</TypographyDate>}
	</React.Fragment>;
};

TableDate = React.memo(TableDate);
TableDate.defaultProps = {
	pattern: 'dd MMMM, hh:mm',
};
TableDate.propTypes = {
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	restartedAt: PropTypes.string,
	emailVerifiedAt: PropTypes.string,
	pattern: PropTypes.string,
};

export default TableDate;
