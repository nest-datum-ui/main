import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

let Route = ({
	entityId,
	defaultContent,
	isDeleted,
	children,
}) => {
	return <React.Fragment>
		<Typography
			component="div"
			variant="h5">
			{(entityId && defaultContent)
				? ((entityId === '0')
					? defaultContent
					: <React.Fragment>
						{children} <b
							style={{
								textDecoration: isDeleted
									? 'line-through'
									: 'initial',
							}}>
							{entityId}
						</b>
					</React.Fragment>)
				: children}
		</Typography>
	</React.Fragment>;
};

Route = React.memo(Route);
Route.defaultProps = {
};
Route.propTypes = {
	entityId: PropTypes.string,
	isDeleted: PropTypes.bool,
};

export default Route;
