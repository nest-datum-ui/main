import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import handlersOpen from './handlers/open.js';

let Collapse = ({ 
	open,
	onClick,
	children,
	...props 
}) => {
	const [ state, setState ] = React.useState(() => open ?? false);
	const onOpen = React.useCallback((e) => handlersOpen(e, setState, onClick), [
		setState,
		onClick,
	]);

	return <React.Fragment>
		<Button
			disableElevation
			color="primary"
			onClick={onOpen}
			startIcon={<React.Fragment>
				<ExpandLessIcon 
					sx={{ 
						display: state 
							? 'block'
							: 'none',
						}} />
				<ExpandMoreIcon
					sx={{ 
						display: state 
							? 'none'
							: 'block',
						}} />
			</React.Fragment>}
			{ ...props }>
			{state
				? <Typography>
					Collapse
				</Typography>
				: children}
		</Button>
	</React.Fragment>;
};

Collapse = React.memo(Collapse);
Collapse.defaultProps = {
	onClick: () => {},
};
Collapse.propTypes = {
	open: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Collapse;
