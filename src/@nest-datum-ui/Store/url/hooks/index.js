import { fireShow } from '../../loader/actions/show.js';

const hooks = {};
let timeout;

export const get = (name) => hooks[name];

export const set = (name, value) => (hooks[name] = value);

export const hookNavigate = async (to, disableUnmountFlag = false) => {
	if (!disableUnmountFlag) {
		clearTimeout(timeout);

		return await fireShow('unmount')(() => (hooks['navigate'] || (() => {}))(to));
	}
	return (hooks['navigate'] || (() => {}))(to);
};

export const hookLocation = () => hooks['location'] || {};
