import styled from 'styled-components';
import Paper from '../../Paper.jsx';

const Wrapper = styled(Paper)`
	padding: 12px 18px;
	width: 360px;

	@media (max-width: 480px) {
		width: max-content;
		min-width: 280px;
	}
`;

export default Wrapper;