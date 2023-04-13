import React from 'react';
import TableJob from '../../Table/Job';
import StyledWrapper from './Styled/Wrapper.jsx';

let Job = (props) => {
	return <StyledWrapper>
		<TableJob />
	</StyledWrapper>;
};

Job = React.memo(Job);
Job.defaultProps = {
};
Job.propJobs = {
};

export default Job;
