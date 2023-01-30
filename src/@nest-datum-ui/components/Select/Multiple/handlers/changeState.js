import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

const changeState = (e, el, setValueState, setOpen, onChange) => {
	e.preventDefault();

	setOpen(() => {
		setTimeout(() => {
			let state;

			setValueState((currentState) => {
				state = utilsCheckArr(currentState)
					? currentState
					: [];

				const existsIndex = state.findIndex((item) => item.value === el.props.value);

				if (existsIndex >= 0) {
					state.splice(existsIndex, 1);
				}
				else {
					state.push({
						value: el.props.value,
						text: el.props.children,
					});
				}
				return state;
			});
			setTimeout(() => {
				onChange({
					target: {
						value: state,
					},
				});
			}, 0);
		}, 0);

		return false;
	});
};

export default changeState;
