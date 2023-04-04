import styled from 'styled-components';
import List from 'components/List';

const Wrapper = styled(List)`
	padding-top: 8px;
	padding-bottom: 24px;

	& > .MuiGrid-container {
		padding-top: 8px;
		padding-bottom: 16px;
	}
`;

export default Wrapper;