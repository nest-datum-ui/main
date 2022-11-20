
const bool = (value, allowNull) => allowNull || typeof value === 'boolean';

export default bool;
