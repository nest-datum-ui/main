import styled from 'styled-components';
import Box from '@mui/material/Box';

const Wrapper = styled(Box)`
	& > .form-children__wrapper {
		display: ${({ loader }) => loader
			? 'none'
			: 'inherit'};
	}
`;

export default Wrapper;