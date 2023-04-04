import styled from 'styled-components';
import List from '@mui/material/List';

const Wrapper = styled(List)`
	& .MuiListItem-root.active {
		pointer-events: none;
		background-color: #f7f7f7;
		& .MuiTypography-root {
			font-weight: bold;
		}
	}
	& .MuiListItemText-root {
		word-wrap: anywhere;
		margin: 0px;
	}
`;

export default Wrapper;