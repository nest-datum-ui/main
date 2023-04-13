import React from 'react';
import { Portal } from 'react-portal';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute,
	ContextService, 
	ContextList,
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiListPurge,
	actionApiListGet,
	hookUrlProperty, 
} from '@nest-datum-ui/Store';
import DialogDescription from '../../Dialog/Description';
import DialogValue from '../../Dialog/Value';
import Item from './Item';
import Arrow from './Arrow';
import StyledWrapper from './Styled/Wrapper.jsx';

const uniqueConnections = (data = []) => {
	const points = new Set();
	const arrows = new Set();
	const arrowsEmpty = new Set();
	const dataProcessed = {};
	let i = 0;

	while (i < data.length) {
		points.add(data[i].fromId);
		points.add(data[i].toId);

		arrows.add(`${data[i].fromId}-${data[i].toId}`);

		if (!data[i]['dataId']) {
			arrowsEmpty.add(`${data[i].fromId}-${data[i].toId}`);
		}
		dataProcessed[data[i].fromId] = dataProcessed[data[i].fromId] ?? [];
		
		if (data[i]['dataId']) {
			dataProcessed[data[i].fromId].push(data[i]['dataId']);
		}
		i++;
	}
	return { 
		points: Array.from(points), 
		arrows: Array.from(arrows),
		arrowsEmpty: Array.from(arrowsEmpty), 
		data: dataProcessed, 
	};
};

let Manager = ({ cellsCount, rowsCount, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
				apiFullUrl: apiUrl, 
			},
			johnConnorDescriptionList: {
				storeName: descriptionListStoreName, 
				apiFullUrl: descriptionListApiUrl, 
			},
		}, 
	} = React.useContext(ContextProps);
	const { search } = useLocation();
	const query = hookUrlProperty('query', search);
	const filter = hookUrlProperty('filter', search);
	const descriptionData = useSelector(selectorMainExtract([ 'api', 'list', descriptionListStoreName, 'data' ]));
	const descriptionDataExists = (descriptionData || []).length > 0;
	const logicData = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
	const logicDataExists = (logicData || []).length > 0;
	const { arrows, data, arrowsEmpty } = uniqueConnections(logicData);

	React.useEffect(() => {
		actionApiListGet(descriptionListStoreName, {
			apiUrl: descriptionListApiUrl,
			query,
			filter,
		})();
	}, [
		descriptionListStoreName,
		descriptionListApiUrl,
		query,
		filter,
	]);

	React.useEffect(() => {
		if (descriptionDataExists) {
			actionApiListGet(storeName, {
				apiUrl,
				query,
				filter,
			})();
		}
	}, [
		descriptionDataExists,
		storeName,
		apiUrl,
		query,
		filter,
	]);

	React.useEffect(() => () => {
		actionApiListPurge(storeName)();
	}, [
		storeName,
	]);

	return <Portal node={document && document.getElementById('root')}>
		{logicDataExists
			&& <StyledWrapper>
				<ContextList.Provider value={data}>
					{descriptionData.map((item, index) => <Item 
						key={item.neuronId} 
						index={index}
						id={`p_${item.neuronId}`}
						description={item.value}
						color={item.color}
						x={item.x}
						y={item.y} />)}
					{arrows.map((item, index) => <Arrow 
						key={item} 
						index={index} 
						id={item} 
						potential={arrowsEmpty.includes(item)} />)}
				</ContextList.Provider>
			</StyledWrapper>}
		<DialogDescription />
		<DialogValue />
	</Portal>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	cellsCount: 12,
	rowsCount: 6,
};
Manager.propTypes = {
};

export default Manager;
