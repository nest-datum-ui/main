import styled from 'styled-components';
import Grid from '@mui/material/Grid';

const Wrapper = styled(Grid)`
	justify-content: space-between;

	& .paper-filter__manage-wrapper {
		justify-content: flex-end;
		padding-top: 8px;
	}
	& .paper-filter__content-wrapper {
		display: ${({ display }) => display ? 'flex' : 'none'};
	}
`;

export default Wrapper;