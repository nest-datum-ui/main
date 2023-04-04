import styled from 'styled-components';
import Progress from '../../Progress.jsx';

const Wrapper = styled(Progress)`
	padding: 0px;

	& .svg {
		min-width: 24px;
		max-width: 24px;
		min-height: 24px;
		max-height: 24px;
	}
`;

export default Wrapper;