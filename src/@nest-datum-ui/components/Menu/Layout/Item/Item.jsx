import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useUrlPathname } from '@nest-datum-ui/utils/hooks';
import { REGISTRY_PATH_SERV } from '@nest-datum-ui-lib/registry/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let ItemMemo = ({ 
	index,
	name,
	currentServiceIsOpened, 
}) => {
	return <React.Fragment>
		<ListItem disablePadding>
			<ListItemButton
				{ ...currentServiceIsOpened
					? { 
						sx: {
							pointerEvents: 'none',
							backgroundColor: '#f7f7f7',
							paddingTop: '4px !important',
							paddingBottom: '4px !important',
						} 
					}
					: {
						component: ButtonLink,
						to: name,
						sx: {
							paddingTop: '4px !important',
							paddingBottom: '4px !important',
						} 
					} }>
				<ListItemText>
					<Typography 
						variant="body2"
						color={currentServiceIsOpened
							? 'primary'
							: 'initial'}
						sx={{ 
							wordWrap: 'anywhere' 
						}}>
						{currentServiceIsOpened
							? <b>{name}</b>
							: name}
					</Typography>
				</ListItemText>
			</ListItemButton>
		</ListItem>
		<Divider />
	</React.Fragment>;
};

ItemMemo = React.memo(ItemMemo);

let Item = ({ index }) => {
	const name = useSelector(selectorMainExtract([ 'api', 'list', REGISTRY_PATH_SERV, 'data', index, 'name' ]));
	const urlPathname = useUrlPathname();
	const currentServiceIsOpened = (urlPathname.indexOf(`${name}/`) === 0);
	
	return <ItemMemo
		index={index}
		name={name}
		currentServiceIsOpened={currentServiceIsOpened} />;
};

Item = React.memo(Item);
Item.defaultProps = {
};
Item.propTypes = {
	index: PropTypes.number.isRequired,
};

export default Item;
