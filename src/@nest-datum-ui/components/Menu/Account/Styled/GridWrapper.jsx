import styled from 'styled-components';
import Grid from '@mui/material/Grid';

let GridWrapper = styled(Grid)`
	& .avatar__box {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		position: relative;
		overflow: hidden;
	}
`;

export default GridWrapper;
