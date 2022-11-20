import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useLocation,
	useParams, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ContextLanguage } from '@nest-datum-ui/components/Language';
import Loader from '@nest-datum-ui/components/Loader';
import Link from '@nest-datum-ui/components/Link';

let Layout = () => {
	const { serviceKey } = useParams();
	const { enqueueSnackbar } = useSnackbar();
	const {
		MenuAppLayout: {
			DashboardTitle,
		},
	} = React.useContext(ContextLanguage);
	const location = useLocation();
	const loader = useSelector(selectorMainExtract([ 'api', 'list', 'registryPoolList', 'loader' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', 'registryPoolList', 'data' ]));
	const urlPathname = location.pathname.substring(1) +'/';

	React.useEffect(() => {
		actionApiListGet({
			id: 'registryPoolList', 
			url: process.env.SERVICE_REGISTRY,
			path: 'serv',
			withAccessToken: true,
			limit: 99999,
		})(enqueueSnackbar);
	}, [
		enqueueSnackbar,
		serviceKey,
	]);

	React.useEffect(() => () => {
		actionApiListClear('registryPoolList')();
	}, [
	]);

	return <React.Fragment>
		<Loader visible={!(Array.isArray(data) && !loader)} />
		{(Array.isArray(data))
			? <React.Fragment>
				<List>
					<ListItem disablePadding>
						<ListItemButton
							component={Link}
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
						return <React.Fragment key={item.name}>
							<ListItem disablePadding>
								<ListItemButton
									{ ...(urlPathname.indexOf(`${item.name}/`) === 0)
										? { 
											sx: {
												pointerEvents: 'none',
												backgroundColor: '#f7f7f7',
												paddingTop: '4px !important',
												paddingBottom: '4px !important',
											} 
										}
										: {
											component: Link,
											to: item.name,
											sx: {
												paddingTop: '4px !important',
												paddingBottom: '4px !important',
											} 
										} }>
									<ListItemText>
										<Typography 
											variant="body2"
											color={(urlPathname.indexOf(`${item.name}/`) === 0)
												? 'primary'
												: 'initial'}
											sx={{ 
												wordWrap: 'anywhere' 
											}}>
											{(urlPathname.indexOf(`${item.name}/`) === 0)
												? <b>{item.name}</b>
												: item.name}
										</Typography>
									</ListItemText>
								</ListItemButton>
							</ListItem>
							<Divider />
						</React.Fragment>;
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
