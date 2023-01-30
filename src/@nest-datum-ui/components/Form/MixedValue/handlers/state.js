import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';

const state = (e, stateNameForm, name, onChange = () => {}) => {
	const value = (e.target.files && e.target.files.length > 0)
		? (() => {
			e.target.files['systemId'] = e.target.value['systemId'];
			e.target.files['path'] = e.target.value['path'];

			return e.target.files;
		})()
		: e.target.value;

	actionApiFormProp(stateNameForm, name, value)();
	onChange(e, value);
};

export default state;
