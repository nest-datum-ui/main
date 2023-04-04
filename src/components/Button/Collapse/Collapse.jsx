import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

let Collapse = ({ 
	open,
	onClick,
	children,
	...props 
}) => {
	const [ state, setState ] = React.useState(() => open ?? false);
	const onOpen = React.useCallback((e) => {
		let newValue;

		setState((currentState) => (newValue = !currentState));
		onClick(e, newValue);
	}, [
		setState,
		onClick,
	]);

	return <React.Fragment>
		<Button 
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
