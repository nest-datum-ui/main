import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import { numeric as utilsCheckNumeric } from '@nest-datum-utils/check';
import StyledWrapper from './Styled/Wrapper.jsx';

let Bulk = ({
	storeName,
	onClick,
	onDrop,
	length,
	...props
}) => {
	const selected = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'selected' ])) || [];
	const checked = selected.length > 0 && selected.length === length;

	return <StyledWrapper
		{ ...utilsCheckNumeric(length)
			? {	checked }
			: { defaultChecked: checked } }
		onChange={onClick}
		label="Select all" />;
};

Bulk = React.memo(Bulk);
Bulk.defaultProps = {
	onClick: () => {},
	onDrop: () => {},
};
Bulk.propTypes = {
	storeName: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	onDrop: PropTypes.func,
	length: PropTypes.number,
};

export default Bulk;
