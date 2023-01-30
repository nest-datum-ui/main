import Store from '@nest-datum-ui/components/Store';

const setDefaultValue = (stateNameForm, name, dataTypeId, setState) => {
	if (dataTypeId) {
		const value = (((Store()
			.getState()
			.api || {})
			.form || {})[stateNameForm] || {})[name];

		setState((currentState) => {
			const newValue = (value || '');

			if (newValue !== currentState) {
				return newValue;
			}
			return currentState;
		});
	}
};

export default setDefaultValue;
