import React from 'react';
import { 
	ContextProps,
	ContextService, 
} from '@nest-datum-ui/Context';
import { actionApiFormUpdate } from '@nest-datum-ui/Store';
import Xarrow from 'react-xarrows';

let isBlock = false;
let Item = ({ index, id, potential }) => {
	const serviceName = React.useContext(ContextService);
	const { 
		[serviceName]: { 
			johnConnorDescriptionList: {
				storeName, 
				apiFullUrl: apiUrl, 
			},
		}, 
	} = React.useContext(ContextProps);
	const idSplit = id.split('-');
	const fromId = idSplit[0];
	const toId = idSplit[1];
	const [ display, setDisplay ] = React.useState(() => false);
	const onUpdate = React.useCallback((e) => {
		if (isBlock === false) {
			isBlock = true;

			actionApiFormUpdate(storeName, { 
				apiUrl, 
				entityId: Number(e.detail.id.replace('p_', '')), 
				data: {
					x: e.detail.x,
					y: e.detail.y,
				},
			})(() => {
				isBlock = false;
			});
		}
		setDisplay(false);
	}, [
		setDisplay,
		apiUrl,
		storeName,
	]);

	React.useEffect(() => {
		window.addEventListener(`arrow_from_p_${fromId}`, onUpdate);
		window.addEventListener(`arrow_to_p_${toId}`, onUpdate);

		return () => {
			window.removeEventListener(`arrow_from_p_${fromId}`, onUpdate);
			window.removeEventListener(`arrow_to_p_${toId}`, onUpdate);
		};
	}, [
		fromId,
		toId,
		onUpdate,
	]);

	React.useEffect(() => {
		if (display === false) {
			setTimeout(() => setDisplay(true), 0);
		}
	}, [
		display,
		setDisplay,
	]);

	return display
		&& <Xarrow
			start={`p_${fromId}`}
			end={`p_${toId}`}
			showHead={false}
			strokeWidth={1.6}
			path="straight"
			lineColor={potential ? 'green' : 'black'} />;
};

Item = React.memo(Item);
Item.defaultProps = {
};
Item.propTypes = {
};

export default Item;
