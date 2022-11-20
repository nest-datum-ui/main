import main from './main/reducer.js';
import loader from './loader/reducer.js';
import menu from './menu/reducer.js';
import dialog from './dialog/reducer.js';
import breadcrumbs from './breadcrumbs/reducer.js';
import api from './api/reducer.js';
import auth from './auth/reducer.js';

const structure = {
	main,
	loader,
	menu,
	dialog,
	breadcrumbs,
	api,
	auth,
};

export default structure;
