import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
} from '@nest-datum-ui/Context';
import {
	selectorMainExtract,
	actionApiListGet,
	actionApiListPurge,
	actionApiListProp,
} from '@nest-datum-ui/Store';
import { 
	arr as utilsCheckArr,
	arrFilled as utilsCheckArrFilled, 
	objFilled as utilsCheckObjFilled,
	func as utilsCheckFunc,
} from '@nest-datum-utils/check';
import Typography from '@mui/material/Typography';
import Progress from '@nest-datum-ui/Progress';
import Item from './Item';
import StyledWrapper from './Styled/Wrapper.jsx';

let Value = ({ storeName: propStoreName, title: propTtitle, loadOnFirstRender, parentId, entityId }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				optionName,
				optionListName,
			}, 
		},
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: {
			[optionName]: {
				fieldsBlockTitle: contextTitle,
			},
			[optionListName]: {
				storeName: contextStoreName, 
				apiFullUrl, 
				entity, 
				entityOptionRelation,
				relation, 
				relationContent, 
				listGetRelations,
				listGetFilters,
			},
		}, 
	} = React.useContext(ContextProps);
	const storeName = propStoreName ?? contextStoreName;
	const title = propTtitle ?? contextTitle;
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
	const dataLength = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data', 'length' ]));
	const ready = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'ready' ]));
	const loaderProcessed = (!ready || unmount === true || loader || !utilsCheckArr(data) || !(dataLength >= 0));
	const onParentExistsMount = React.useCallback((isMount = false) => {
		if (loadOnFirstRender === true) {
			actionApiListGet(storeName, {
				apiUrl: apiFullUrl,
				...utilsCheckFunc(listGetRelations)
					? { relation: listGetRelations(entityId, parentId) }
					: utilsCheckObjFilled(listGetRelations)
						? { relation: listGetRelations }
						: ((listGetRelations === null)
							? {}
							: {
								relations: {
									[relation]: {
										[relationContent]: true,
									},
								},
							}),
				...utilsCheckFunc(listGetFilters)
					? { filter: listGetFilters(entityId, parentId) }
					: (utilsCheckObjFilled(listGetFilters)
						? { filter: listGetFilters }
						: ((listGetFilters === null)
							? {}
							: {
								filter: {
									isDeleted: false,
									[relation]: {
										[entity]: entityId,
										...(isMount === false)
											? {
												[relationContent]: {
													parentId,
												},
											}
											: {},
									},
								},
							})),
			})((list) => {
				if (isMount === false && list.data.length === 0) {
					return onParentExistsMount(true);
				}
				actionApiListProp(storeName, 'data', [
					...list
						.data
						.map(({ ...item }, index) => {
							const itemProcessed = (item[relation][0][relationContent].length === 0)
								? ({ 
									...item, 
									[relation]: [{ 
										[relationContent]: [{ 
											id: uuidv4(), 
											content: '', 
											[entity]: entityId,
											[entityOptionRelation]: item[relation][0].id,
										}] 
									}] 
								}) 
								: item;

							return itemProcessed;
						}),
				])(() => {
					actionApiListProp(storeName, 'ready', true)();
				});
			});
		}
	}, [
		loadOnFirstRender,
		storeName,
		apiFullUrl,
		relation,
		relationContent,
		entity,
		entityOptionRelation,
		entityId,
		parentId,
		listGetRelations,
		listGetFilters,
	]);

	React.useEffect(() => {
		onParentExistsMount();
	}, [
		onParentExistsMount,
	]);

	React.useEffect(() => () => {
		actionApiListPurge(storeName)();
	}, [
		storeName,
	]);

	return <StyledWrapper>
		<Progress visible={loaderProcessed} />
		{utilsCheckArrFilled(data)
			&& <React.Fragment>
				<Typography component="div" variant="h6">
					{title}
				</Typography>
				{data.map((item) => (item[relation] || []).map((option, optionIndex) => option[relationContent].map((optionValue, optionValueIndex) => <Item 
					key={optionValueIndex} 
					value={item}
					option={option} 
					optionValue={optionValue} 
					optionIndex={optionIndex}
					optionValueIndex={optionValueIndex}
					optionLength={item[relation].length} 
					optionValueLength={option[relationContent].length} />)))}
			</React.Fragment>}
	</StyledWrapper>;
};

Value = React.memo(Value);
Value.defaultProps = {
	parentId: '',
};
Value.propTypes = {
	storeName: PropTypes.string,
	loadOnFirstRender: PropTypes.bool,
	parentId: PropTypes.string,
	entityId: PropTypes.string,
};

export default Value;
