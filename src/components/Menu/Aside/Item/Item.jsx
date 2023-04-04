import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import importSchema from 'importSchema.js';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ButtonLink from '@nest-datum-ui/Button/Link';

let Item = ({ name, onClick }) => {
	const { pathname } = useLocation();
	const { title, pageInitialFullUrl, pageBaseFullUrl } = importSchema[name];
	const onClickWrapper = React.useCallback((e) => onClick(e, { title, url: pageInitialFullUrl }), [
		onClick,
		title,
		pageInitialFullUrl,
	]);

	return <ListItem 
		disablePadding
		onClick={onClickWrapper}
		{ ...(pathname.indexOf(pageBaseFullUrl) === 0)
			? {	className: 'active' }
			: {
				component: ButtonLink,
				to: pageInitialFullUrl,
			} }>
		<ListItemButton>
			<ListItemText>
				<Typography variant="body2" color="initial">
					{title}
				</Typography>
			</ListItemText>
		</ListItemButton>
	</ListItem>;
};

Item = React.memo(Item);
Item.defaultProps = {
	onClick: () => {},
};
Item.propTypes = {
	onClick: PropTypes.func,
};

export default Item;
