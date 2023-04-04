import styled from 'styled-components';
import ButtonGroup from '@mui/material/ButtonGroup';

const Wrapper = styled(ButtonGroup)`
	margin-top: 8px;

	& button.MuiButtonBase-root {
		pointer-events: none;
		background-color: #1976d2;
		color: #FFF;
	}
`;

export default Wrapper;