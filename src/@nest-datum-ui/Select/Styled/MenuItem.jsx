import styled from 'styled-components';
import MiuMenuItem from '@mui/material/MenuItem';

const MenuItem = styled(MiuMenuItem)`
	background-color: ${({ active }) => active
		? 'rgba(200, 200, 200, .7)'
		: 'inherit'};
`;

export default MenuItem;