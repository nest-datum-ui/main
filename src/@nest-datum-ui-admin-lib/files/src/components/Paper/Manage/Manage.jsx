import React from 'react';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import Store, { 
	selectorMainExtract, 
	actionApiFormCreateFile,
	actionApiListProp,
} from '@nest-datum-ui/Store';
import { 
	func as utilsCheckFunc,
	obj as utilsCheckObj,
} from '@nest-datum-utils/check';
import Grid from '@mui/material/Grid';
import Button from '@nest-datum-ui/Button';
import InputUpload from '@nest-datum-ui/Input/Upload';
import StyledWrapper from './Styled/Wrapper.jsx';

let Manage = ({ systemId, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: list, 
		}, 
	} = React.useContext(ContextProps);
	const { 
		storeName, 
		manage, 
		files: {
			apiFullUrl: filesApiUrl,
		}
	} = list;
	const selected = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selected' ])) || [];
	const selectedForDrop = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selectedForDrop' ])) || [];
	const selectedForDropPermanently = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selectedForDropPermanently' ])) || [];
	const onManage = React.useCallback((onClick, index, selected, selectedForDrop, selectedForDropPermanently) => (e) => onClick(e, index, selected, selectedForDrop, selectedForDropPermanently, { ...list }), [
		list,
	]);
	const onFile = React.useCallback(async (e) => {
		const breadcrumbsData = (Store()
			.getState()
			.breadcrumbs[storeName] || {})
			.data || [];
		const parentId = (breadcrumbsData[breadcrumbsData.length - 1] || {}).key || '/';
		const files = e.target.files;

		files['systemId'] = systemId;
		files['parentId'] = parentId;

		actionApiListProp(storeName, 'loader', true)(async () => {
			await actionApiFormCreateFile(filesApiUrl, { files })(() => {
				actionApiListProp(storeName, 'updatedIndex', Date.now())();
			});
		});
	}, [
		storeName,
		systemId,
		filesApiUrl,
	]);

	return <StyledWrapper container spacing={1}>
		{Object
			.keys(manage)
			.map((key, index) => ((utilsCheckFunc(manage[key].showStrategy) && manage[key].showStrategy(selected, selectedForDrop, selectedForDropPermanently)) || !utilsCheckObj(manage[key]) || !manage[key].showStrategy)
				&& <Grid
					key={index} 
					item
					xs={false}>
					<Button 
						to={manage[key].to} 
						variant={manage[key].variant || 'contained'} 
						color={manage[key].color || 'inherit'}
						{ ...utilsCheckFunc(manage[key].onClick)
							? { onClick: onManage(manage[key].onClick, index, selected, selectedForDrop, selectedForDropPermanently) }
							: {} }>
						{utilsCheckFunc(manage[key].text)
							? manage[key].text(index, selected, selectedForDrop, selectedForDropPermanently)
							: manage[key].text}
					</Button>
				</Grid>)}
		<Grid
			item
			xs={false}>
			<InputUpload
				variant="contained"
				color="secondary"
				form={storeName}
				onChange={onFile}>
				Upload files
			</InputUpload>
		</Grid>
	</StyledWrapper>;
};

Manage = React.memo(Manage);
Manage.defaultProps = {
};
Manage.propTypes = {
};

export default Manage;
