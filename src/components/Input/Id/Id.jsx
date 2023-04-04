import React from 'react';
import InputText from '@nest-datum-ui/Input/Text';

let Id = (props) => {
	return <InputText { ...props } />;
};

Id = React.memo(Id);
Id.defaultProps = {
	label: 'Unique identificator',
	placeholder: 'For example: test-entity-id',
};
Id.propTypes = {
};

export default Id;
