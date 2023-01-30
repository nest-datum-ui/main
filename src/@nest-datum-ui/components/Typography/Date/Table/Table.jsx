import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TypographyCaption from '@nest-datum-ui/components/Typography/Caption';
import TypographyDate from '@nest-datum-ui/components/Typography/Date';
import utilsCheckStrDate from '@nest-datum-ui/utils/check/str/date.js';

let Table = ({
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

Table = React.memo(Table);
Table.defaultProps = {
	pattern: 'dd MMMM, hh:mm',
};
Table.propTypes = {
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	restartedAt: PropTypes.string,
	emailVerifiedAt: PropTypes.string,
	pattern: PropTypes.string,
};

export default Table;
