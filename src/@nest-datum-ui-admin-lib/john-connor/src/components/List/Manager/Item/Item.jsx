import React from 'react';
import Draggable from 'react-draggable';
import { ContextList } from '@nest-datum-ui/Context';
import { 
	actionMenuOpen,
	actionDialogOpen, 
} from '@nest-datum-ui/Store';
import Tooltip from '@mui/material/Tooltip';
import MenuContext from '../../../Menu/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Item = ({ index, id, description, x, y, color }) => {
	const data = React.useContext(ContextList);
	const [ isDrag, setIsDrag ] = React.useState(() => false);
	const [ position, setPosition ] = React.useState(() => ({ x, y }));
	const onMenu = React.useCallback((e) => {
		e.preventDefault();

		actionMenuOpen(id, e.target)();
	}, [
		id,
	]);
	const onValue = React.useCallback(() => actionDialogOpen('dialogValue', { id })(), [
		id,
	]);
	const onDescription = React.useCallback(() => actionDialogOpen('dialogDescription', { id })(), [
		id,
	]);
	const onMove = React.useCallback(() => setIsDrag((currentState) => !currentState), [
		setIsDrag,
	]);
	const onDrag = React.useCallback((e) => {
		if (e.target && e.target.style) {
			const transformSplit = e.target
				.style
				.transform
				.replace('translate(', '')
				.replace(')', '')
				.split(',');
			const x = (transformSplit[0] || '0').trim().replace('px', '');
			const y = (transformSplit[1] || '0').trim().replace('px', '');

			setPosition({ x: parseInt(x), y: parseInt(y) });
		}
	}, [
		setPosition,
	]);
	const onStop = React.useCallback((e) => {
		if (e.target && e.target.style) {
			const transformSplit = e.target
				.style
				.transform
				.replace('translate(', '')
				.replace(')', '')
				.split(',');
			const x = (transformSplit[0] || '0').trim().replace('px', '');
			const y = (transformSplit[1] || '0').trim().replace('px', '');

			window.dispatchEvent(new CustomEvent(`arrow_from_${id}`, { 
				detail: { 
					id, 
					x: parseInt(x), 
					y: parseInt(y),
				}, 
			}));
			window.dispatchEvent(new CustomEvent(`arrow_to_${id}`, { 
				detail: { 
					id, 
					x: parseInt(x), 
					y: parseInt(y),
				}, 
			}));
			setIsDrag(false);
		}
	}, [
		id,
		setIsDrag,
	]);

	return <React.Fragment>
		{isDrag
			? <Draggable 
				bounds="parent" 
				defaultPosition={{ x: position.x, y: position.y }} 
				onDrag={onDrag} 
				onStop={onStop}>
				<Tooltip title={description}>
					<StyledWrapper 
						id={id} 
						onContextMenu={onMenu}>
						{(data[id] || []).length}
					</StyledWrapper>
				</Tooltip>
			</Draggable>
			: <Tooltip title={description}>
				<StyledWrapper 
					id={id} 
					onContextMenu={onMenu} 
					style={{ 
						transform: `translate(${position.x}px,${position.y}px)`,
						...color
							? { backgroundColor: color }
							: {}, 
					}}>
					{(data[id.replace('p_', '')] || []).length}
				</StyledWrapper>
			</Tooltip>}
		<MenuContext 
			id={id} 
			isDrag={isDrag} 
			onMove={onMove} 
			onValue={onValue} 
			onDescription={onDescription} />
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
};
Item.propTypes = {
};

export default Item;
