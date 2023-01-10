import utilsRegexName from '@nest-datum-ui/utils/regex/name';

const user = (e) => {
	utilsRegexName(e, /[^a-zA-Zа-яА-Я '-]+/g);
};

export default user;
