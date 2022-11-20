
const str = (value, allowNull = false) => (typeof value === 'string' && value) || allowNull;

export default str;
