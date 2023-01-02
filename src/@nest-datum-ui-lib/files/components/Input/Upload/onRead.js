
const onRead = ({
	event,
	setLocalValue,
	setRendered,
	onChange,
	previewRef,
	systemPath,
}) => {
	const reader = new FileReader();
	const files = event.target.files;

	reader.readAsDataURL(event.target.files[0]);
	reader.addEventListener('load', (event) => {
		setLocalValue((currentState) => {
			const newState = {
				...currentState,
				src: event.target.result,
				path: systemPath,
				name: files[0].name,
				size: files[0].size,
			};

			onChange({
				target: {
					value: newState,
					currentValue: newState,
					files,
				},
			});
			((previewRef.current || {}).style || {})['backgroundImage'] = `url(${event.target.result})`;

			return newState;
		});
		setRendered(true);
	});
};

export default onRead;
