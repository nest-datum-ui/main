import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const jobFormRelationForm = {
	id: 'jobs-job-option-relations-form',
	storeName: 'jobs-job-option-relations-form',
	apiUrl: 'job/:id/option',

	title: 'Data type',

	post: {
		apiUrl: 'job/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'jobs-job-option-relations-form',
		apiUrl: 'job',
		name: 'jobId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default jobFormRelationForm;
