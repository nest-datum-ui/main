import styled from 'styled-components';
import Tab from '@mui/material/Tab';

const Wrapper = styled(Tab)`
	text-transform: initial !important;

	&.active {
		pointer-events: none;
	}
`;

export default Wrapper;