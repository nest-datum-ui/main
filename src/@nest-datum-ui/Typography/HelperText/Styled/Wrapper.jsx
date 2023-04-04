import styled from 'styled-components';
import Box from '@mui/material/Box';

const Wrapper = styled(Box)`
	white-space: nowrap;

	& .MuiTypography-root {
		white-space: initial;
		word-wrap: break-word;
		color: ${({ error }) => error
			? 'red'
			: 'inherit'};
	}
`;

export default Wrapper;