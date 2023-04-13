import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import StyledWrapper from './Styled/Wrapper.jsx';

let Upload = ({ storeName, name, id, label, children, form, accept, ...props }) => {
	const [ savedId ] = React.useState(() => id || uuidv4());

	return <StyledWrapper { ...props } component="label" htmlFor={savedId}>
		<input 
			type="file" 
			name={name} 
			id={savedId} 
			form={form} 
			accept={accept} />
		{label || children}
	</StyledWrapper>;
};

Upload = React.memo(Upload);
Upload.defaultProps = {
	name: 'file',
	accept: '*',
};
Upload.propTypes = {
	name: PropTypes.string,
};

export default Upload;
