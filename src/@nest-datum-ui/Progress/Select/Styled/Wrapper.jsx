import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';

const Wrapper = styled(MenuItem)`
	opacity: 1 !important;

	& > .MuiBox-root {
		& > .svg {
			min-width: 48px;
			max-width: 48px;
			min-height: 48px;
			max-height: 48px;
		}
	}
`;

export default Wrapper;