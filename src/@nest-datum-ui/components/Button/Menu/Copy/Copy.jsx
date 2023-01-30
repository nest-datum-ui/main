import React from 'react';
import PropTypes from 'prop-types';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ButtonMenu from '@nest-datum-ui/components/Button/Menu';

let Copy = ({
	children,
	...props
}) => {
	return <ButtonMenu 
		icon={<FileCopyIcon />}
		{ ...props }>
		{children}
	</ButtonMenu>;
};

Copy = React.memo(Copy);
Copy.defaultProps = {
	children: 'Copy'
};
Copy.propTypes = {
	children: PropTypes.string,
};

export default Copy;
