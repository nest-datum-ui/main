import React from 'react';
import { useSelector } from 'react-redux';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { ContextLanguage } from '@nest-datum-ui/components/Language';
import { REGISTRY_PATH_SERV } from '@nest-datum-ui-lib/registry/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Loader from '@nest-datum-ui/components/Loader';
import ButtonLink from '@nest-datum-ui/components/Button/Link';
import Item from './Item';

let Layout = () => {
	const {
		MenuAppLayout: {
			DashboardTitle,
		},
	} = React.useContext(ContextLanguage);
	const loader = useSelector(selectorMainExtract([ 'api', 'list', REGISTRY_PATH_SERV, 'loader' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', REGISTRY_PATH_SERV, 'data' ]));

	React.useEffect(() => {
		actionApiListGet(REGISTRY_PATH_SERV, { limit: 99999 })();
	}, [
	]);

	React.useEffect(() => () => actionApiListClear(REGISTRY_PATH_SERV)(), [
	]);

	return <React.Fragment>
		<Loader visible={!(Array.isArray(data) && !loader)} />
		{(Array.isArray(data))
			? <React.Fragment>
				<List>
					<ListItem disablePadding>
						<ListItemButton
							component={ButtonLink}
							to="/">
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText sx={{ wordWrap: 'anywhere' }}>
								{DashboardTitle()}
							</ListItemText>
						</ListItemButton>
					</ListItem>
					<Divider />
					{data.map((item, index) => {
						return <Item 
							key={item.name}
							index={index} />;
					})}
				</List>
			</React.Fragment>
			: <React.Fragment />}
	</React.Fragment>;
};

Layout = React.memo(Layout);
Layout.defaultProps = {
};
Layout.propTypes = {
};

export default Layout;
