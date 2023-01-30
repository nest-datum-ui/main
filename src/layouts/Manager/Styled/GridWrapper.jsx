import styled from 'styled-components';
import Grid from '@mui/material/Grid';

let GridWrapper = styled(Grid)`
	height: 100% !important;
	margin-top: 0px;

	& > .MuiGrid-item:nth-child(1) {
		height: 100% !important;
		padding-top: 0px !important;
		border-right: 1px solid #e0e0e0;
		min-width: 210px;
		position: relative;
	}

	& > .MuiGrid-item:nth-child(2) {
		height: 100% !important;
		padding-top: 0px !important;
		overflow-y: auto;
	}
`;

export default GridWrapper;
