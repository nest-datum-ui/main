import styled from 'styled-components';
import Box from '@mui/material/Box';

const StyledBoxWrapper = styled(Box)`
	& td {
		word-wrap: anywhere;
	}
`;

export default StyledBoxWrapper;