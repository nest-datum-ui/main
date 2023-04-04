import styled from 'styled-components';
import Box from '@mui/material/Box';

const Wrapper = styled(Box)`
	& > .MuiGrid-container {
		align-items: center;
		padding-top: 8px;
		padding-bottom: 8px;
	}
`;

export default Wrapper;