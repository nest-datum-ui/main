import React from 'react';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import {
	selectorMainExtract,
	actionApiListBulk,
	actionApiListBulkDrop,
	actionUrlFilterClear,
	hookUrlProperty,
} from '@nest-datum-ui/Store';
import { 
	func as utilsCheckFunc,
	obj as utilsCheckObj,
	strFilled as utilsCheckStrFilled,
} from '@nest-datum-utils/check';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import FormSearchUrl from '@nest-datum-ui/Form/Search/Url';
import Button from '@nest-datum-ui/Button';
import ButtonCollapse from 'components/Button/Collapse';
import CheckboxBulk from 'components/Checkbox/Bulk';
import FormIsDeleted from 'components/Form/IsDeleted';
import FormIsNotDelete from 'components/Form/IsNotDelete';
import StyledWrapper from './Styled/Wrapper.jsx';

let Filter = ({ ManageComponent, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: list } } = React.useContext(ContextProps);
	const { storeName, bulkDeletion, search, manage, filters } = list;
	const [ filterFlag, setFilterFlag ] = React.useState(() => false);
	const query = hookUrlProperty('query', search);
	const filterStr = hookUrlProperty('filter', search);
	const length = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data', 'length' ]));
	const selected = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selected' ])) || [];
	const selectedForDrop = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selectedForDrop' ])) || [];
	const selectedForDropPermanently = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selectedForDropPermanently' ])) || [];
	const onBulk = React.useCallback((e) => actionApiListBulk(storeName, e), [
		storeName,
	]);
	const onDrop = React.useCallback(() => actionApiListBulkDrop(storeName), [
		storeName,
	]);
	const onFilterFlag = React.useCallback((e) => setFilterFlag(!filterFlag), [
		filterFlag,
		setFilterFlag,
	]);
	const onClear = React.useCallback(() => actionUrlFilterClear(), [
	]);
	const onManage = React.useCallback((onClick, index, selected, selectedForDrop, selectedForDropPermanently) => (e) => onClick(e, index, selected, selectedForDrop, selectedForDropPermanently, { ...list }), [
		list,
	]);

	return <StyledWrapper container display={Number(filterFlag)}>
		{bulkDeletion
			&& <Grid
				item
				xs={false}>
				<CheckboxBulk
					storeName={storeName}
					length={length}
					onClick={onBulk}
					onDrop={onDrop} />
			</Grid>}
		<Grid
			item
			xs={false}>
			{ManageComponent
				? <ManageComponent
					query={query}
					filter={filterStr}
					length={length}
					selected={selected}
					selectedForDrop={selectedForDrop}
					selectedForDropPermanently={selectedForDropPermanently} />
				: <Grid container spacing={1}>
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
				</Grid>}
		</Grid>
		{search && <FormSearchUrl />}
		{filters
			&& <React.Fragment>
				<Grid container spacing={1} className="paper-filter__manage-wrapper">
					{(utilsCheckStrFilled(query) || utilsCheckStrFilled(filterStr))
						&& <Grid
							item
							xs={false}>
							<Button onClick={onClear} startIcon={<CloseIcon />} color="error">
								Clear
							</Button>
						</Grid>}
					<Grid
						item
						xs={false}>
						<ButtonCollapse
							open={filterFlag}
							onClick={onFilterFlag}>
							Filters
						</ButtonCollapse>
					</Grid>
				</Grid>
				<Grid container spacing={3} className="paper-filter__content-wrapper">
					{Object
						.keys(filters)
						.map((key, index) => ((utilsCheckFunc(filters[key].showStrategy) && filters[key].showStrategy(selected, selectedForDrop, selectedForDropPermanently)) || !utilsCheckObj(filters[key]) || !filters[key].showStrategy)
							&& <Grid
								key={index}
								item
								xs={12}
								sm={6}
								md={4}
								lg={3}
								xl={2}>
								{filters[key]
									&& ((key === 'isNotDeleted') 
										? <FormIsNotDelete />
										: (key === 'isDeleted')
											? <FormIsDeleted />
											: (() => {
												const Component = filters[key];

												return <Component
													query={query}
													filterStr={filterStr}
													length={length}
													storeName={storeName} />;
											})())}
							</Grid>)}
				</Grid>
			</React.Fragment>}
	</StyledWrapper>;
};

Filter = React.memo(Filter);
Filter.defaultProps = {
};
Filter.propTypes = {
};

export default Filter;
