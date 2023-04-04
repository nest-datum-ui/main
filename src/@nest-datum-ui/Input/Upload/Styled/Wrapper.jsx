import styled from 'styled-components';
import Button from '@nest-datum-ui/Button';

const Wrapper = styled(Button)`
	& input {
		display: none;
	}
`;

export default Wrapper;