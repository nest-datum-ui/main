import styled from 'styled-components';
import Box from '@mui/material/Box';

const Empty = styled(Box)`
	justify-content: center;
	padding: 32px 0px;

	display: ${({ visible }) => visible ? 'flex' : 'none'};
`;

export default Empty;
