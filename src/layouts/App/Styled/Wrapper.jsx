import styled from 'styled-components';
import Grid from '@mui/material/Grid';

const Wrapper = styled(Grid)`
	height: 100% !important;
	margin-top: 0px !important;

	& > .MuiGrid-item {
		position: relative;
		height: 100% !important;
		padding-top: 0px !important;
	}
	& > .MuiGrid-item:nth-child(1) {
		border-right: 1px solid #e0e0e0;
		min-width: 210px;
	}
	& > .MuiGrid-item:nth-child(2) {
		overflow-y: auto;
	}
`;

export default Wrapper;