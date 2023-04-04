import styled from 'styled-components';
import Box from '@mui/material/Box';

const Wrapper = styled(Box)`
	padding-top: 48px;
	padding-bottom: 48px;
	width: 100%;
	height: 100%;
	display: ${({ visible }) => visible
		? 'flex'
		: 'none'};
	align-items: center;
	justify-content: center;

	& .svg {
		min-width: 120px !important;
		max-width: 120px !important;
		min-height: 120px !important;
		max-height: 120px !important;
	}
`;

export default Wrapper;