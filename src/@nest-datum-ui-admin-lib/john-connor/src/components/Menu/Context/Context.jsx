import React from 'react';
import PropTypes from 'prop-types';
import { actionMenuClose } from '@nest-datum-ui/Store';
import Menu from '@nest-datum-ui/Menu';
import ButtonMenu from '@nest-datum-ui/Button/Menu';

let Context = ({
	id,
	onClose,
	onMove,
	onValue,
	onDescription,
	isDrag,
	...props
}) => {
	const onCloseWrapper = React.useCallback((e) => {
		actionMenuClose()();
		onClose(e);
	}, [
		onClose,
	]);
	const onMoveWrapper = React.useCallback((e) => {
		const event = e;

		onCloseWrapper(event);
		setTimeout(() => onMove(event), 0);
	}, [
		onCloseWrapper,
		onMove,
	]);
	const onValueWrapper = React.useCallback((e) => {
		const event = e;

		onCloseWrapper(event);
		setTimeout(() => onValue(event), 0);
	}, [
		onCloseWrapper,
		onValue,
	]);
	const onDescriptionWrapper = React.useCallback((e) => {
		const event = e;

		onCloseWrapper(event);
		setTimeout(() => onDescription(event), 0);
	}, [
		onCloseWrapper,
		onDescription,
	]);

	return <Menu id={id} { ...props }>
		{!isDrag
			&& ([
				<ButtonMenu key={0} onClick={onValueWrapper}>
					Value
				</ButtonMenu>,
				<ButtonMenu key={1} onClick={onDescriptionWrapper}>
					Description
				</ButtonMenu>,
			])}
		<ButtonMenu onClick={onMoveWrapper}>
			{isDrag ? 'Stop' : 'Move'}
		</ButtonMenu>
	</Menu>;
};

Context = React.memo(Context);
Context.defaultProps = {
	onClose: (() => {}),
	onMove: (() => {}),
	onValue: (() => {}),
	onDescription: (() => {}),
	isDrag: false,
};
Context.propTypes = {
	id: PropTypes.string.isRequired,
	isDrag: PropTypes.bool,
	onClose: PropTypes.func,
	onMove: PropTypes.func,
	onValue: PropTypes.func,
	onDescription: PropTypes.func,
};

export default Context;
