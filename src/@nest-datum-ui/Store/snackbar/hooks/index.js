
const hooks = {};

export const get = (name) => hooks[name];

export const set = (name, value) => (hooks[name] = value);

export const hookSnackbar = (...props) => (hooks['snackbar'] || (() => {}))(...props);
